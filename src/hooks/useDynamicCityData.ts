import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { getCategoryMetadata, getSituationMetadata } from '@/utils/categoryMappings';
import { getGenderedVariant } from '@/utils/genderVariantHelper';
import { type GenderVariant } from '@/stores/appStore';

// Simple seeded random number generator for consistent marker positions
function seededRandom(seed: string, index: number): number {
  const hash = seed.split('').reduce((acc, char, i) => {
    return acc + char.charCodeAt(0) * (i + 1);
  }, 0);
  const x = Math.sin(hash + index) * 10000;
  return x - Math.floor(x);
}

// Generate 10 random marker positions with grid-based scatter for better distribution
function generateRandomPositions(cityId: string, baseLat: number, baseLng: number): [number, number][] {
  const positions: [number, number][] = [];
  
  // Use a 4x3 grid (12 cells, we'll use 10)
  const gridRows = 3;
  const gridCols = 4;
  const cells: Array<[number, number]> = [];
  
  // Create grid cells
  for (let row = 0; row < gridRows; row++) {
    for (let col = 0; col < gridCols; col++) {
      cells.push([row, col]);
    }
  }
  
  // Shuffle cells using seeded random
  const shuffledCells = cells
    .map((cell, idx) => ({ cell, sort: seededRandom(cityId, idx + 200) }))
    .sort((a, b) => a.sort - b.sort)
    .slice(0, 10)
    .map(item => item.cell);
  
  // Place markers in shuffled grid cells with random offset
  for (let i = 0; i < 10; i++) {
    const [row, col] = shuffledCells[i];
    
    // Wider radius range for better spread (0.15 to 0.25 = ~15km to 25km)
    const minRadius = 0.15;
    const maxRadius = 0.25;
    const baseRadius = minRadius + (maxRadius - minRadius) * 0.5;
    
    // Calculate grid-based position
    const angleStep = (2 * Math.PI) / 12; // Divide circle into 12 sectors
    const gridAngle = (row * gridCols + col) * angleStep;
    
    // Add randomness to radius and angle within the sector
    const radiusVariation = (seededRandom(cityId, i * 4) - 0.5) * 0.06;
    const angleVariation = (seededRandom(cityId, i * 4 + 1) - 0.5) * angleStep * 0.8;
    
    const finalRadius = baseRadius + radiusVariation;
    const finalAngle = gridAngle + angleVariation;
    
    // Calculate position
    const offsetLat = finalRadius * Math.cos(finalAngle);
    const offsetLng = finalRadius * Math.sin(finalAngle);
    
    positions.push([
      baseLat + offsetLat,
      baseLng + offsetLng
    ]);
  }
  
  return positions;
}

interface DynamicCityDataParams {
  cityId: string;
  genderPreference: GenderVariant;
}

export interface CityDataStructure {
  cityId: string;
  cityName: string;
  emoji: string;
  categories: Array<{
    id: string;
    emoji: string;
    title: string;
    color: string;
    description: string;
    mapPosition: [number, number];
    iconImage?: string;
    situations: Array<{
      id: string;
      title: string;
      description: string;
      emoji: string;
      context: string;
      phrases: Array<{
        id: string;
        native: string;
        romanization: string;
        english: string;
      }>;
    }>;
  }>;
}

/**
 * Fetches phrases from database and transforms into CityDataStructure format
 * Groups by spot_type (category) and sub_scenario (situation)
 */
export function useDynamicCityData({ cityId, genderPreference }: DynamicCityDataParams) {
  return useQuery({
    queryKey: ['dynamic-city-data', cityId],
    queryFn: async (): Promise<CityDataStructure | null> => {
      const { data: phrases, error } = await supabase
        .from('phrases')
        .select('*')
        .eq('city', cityId);

      if (error) throw error;
      if (!phrases || phrases.length === 0) return null;

      // Group phrases by spot_type (category) and sub_scenario (situation)
      const categoryMap = new Map<string, Map<string, any[]>>();

      phrases.forEach((phrase) => {
        const spotType = phrase.spot_type;
        const subScenario = phrase.sub_scenario;

        if (!categoryMap.has(spotType)) {
          categoryMap.set(spotType, new Map());
        }

        const situationMap = categoryMap.get(spotType)!;
        if (!situationMap.has(subScenario)) {
          situationMap.set(subScenario, []);
        }

        // Select correct gender variant
        const { native, romanization } = getGenderedVariant(phrase, genderPreference);

        situationMap.get(subScenario)!.push({
          id: phrase.id,
          native,
          romanization,
          english: phrase.translation_en,
        });
      });

      // Get city coordinates for proper marker positioning
      const cityCoordinates: Record<string, [number, number]> = {
        'seoul': [37.5665, 126.9780],
        'beijing': [39.9042, 116.4074],
        'new-delhi': [28.6139, 77.2090],
        'new delhi': [28.6139, 77.2090],
        'paris': [48.8566, 2.3522],
        'mexico-city': [19.4326, -99.1332],
        'mexico city': [19.4326, -99.1332],
      };

      const baseLat = cityCoordinates[cityId]?.[0] || 0;
      const baseLng = cityCoordinates[cityId]?.[1] || 0;

      // Generate 10 random positions (Google Maps style)
      const randomPositions = generateRandomPositions(cityId, baseLat, baseLng);

      // Get all categories from the map
      const allCategories = Array.from(categoryMap.entries());

      // Always generate exactly 10 markers
      let categoriesToUse: typeof allCategories;
      if (allCategories.length < 10) {
        // Repeat categories to reach 10
        categoriesToUse = [];
        for (let i = 0; i < 10; i++) {
          categoriesToUse.push(allCategories[i % allCategories.length]);
        }
      } else if (allCategories.length > 10) {
        // Randomly select 10 using seeded random
        categoriesToUse = allCategories
          .map((cat, idx) => ({ cat, sort: seededRandom(cityId, idx + 100) }))
          .sort((a, b) => a.sort - b.sort)
          .slice(0, 10)
          .map(item => item.cat);
      } else {
        categoriesToUse = allCategories;
      }

      // Transform into CityDataStructure with random positions
      const categories = categoriesToUse.map(([spotType, situationMap], index) => {
        const categoryMeta = getCategoryMetadata(spotType, cityId);

        const situations = Array.from(situationMap.entries()).map(([subScenario, phraseList]) => {
          const situationMeta = getSituationMetadata(subScenario);
          return {
            id: situationMeta.id,
            title: situationMeta.title,
            description: situationMeta.description,
            emoji: situationMeta.emoji,
            context: situationMeta.context,
            phrases: phraseList,
          };
        });

        return {
          id: categoryMeta.id,
          emoji: categoryMeta.emoji,
          title: categoryMeta.title,
          color: categoryMeta.color,
          description: categoryMeta.description,
          mapPosition: randomPositions[index], // Use random position
          iconImage: categoryMeta.iconImage,
          situations,
        };
      });

      return {
        cityId,
        cityName: cityId.charAt(0).toUpperCase() + cityId.slice(1),
        emoji: '🌍', // Default, can be enhanced
        categories,
      };
    },
    enabled: !!cityId,
  });
}
