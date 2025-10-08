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

// Generate 10 random marker positions (Google Maps style)
function generateRandomPositions(cityId: string, baseLat: number, baseLng: number): [number, number][] {
  const positions: [number, number][] = [];
  
  for (let i = 0; i < 10; i++) {
    // Random radius between 0.02 and 0.12 (~2km to 12km)
    const minRadius = 0.02;
    const maxRadius = 0.12;
    const radius = minRadius + seededRandom(cityId, i * 2) * (maxRadius - minRadius);
    
    // Random angle (0 to 2π)
    const angle = seededRandom(cityId, i * 2 + 1) * 2 * Math.PI;
    
    // Calculate position with random variations
    const offsetLat = radius * Math.cos(angle);
    const offsetLng = radius * Math.sin(angle);
    
    // Add micro-variations for natural look
    const microVariationLat = (seededRandom(cityId, i * 3) - 0.5) * 0.01;
    const microVariationLng = (seededRandom(cityId, i * 3 + 1) - 0.5) * 0.01;
    
    positions.push([
      baseLat + offsetLat + microVariationLat,
      baseLng + offsetLng + microVariationLng
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
    queryKey: ['dynamic-city-data', cityId, genderPreference],
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
        const categoryMeta = getCategoryMetadata(spotType);

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
