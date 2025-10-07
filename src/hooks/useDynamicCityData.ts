import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { getCategoryMetadata, getSituationMetadata } from '@/utils/categoryMappings';
import { getGenderedVariant } from '@/utils/genderVariantHelper';
import { type GenderVariant } from '@/stores/appStore';

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

      // Transform into CityDataStructure
      const categories = Array.from(categoryMap.entries()).map(([spotType, situationMap], index) => {
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

        // Generate positions in a circle around the city center
        const radius = 0.03; // ~3km radius
        const angle = (index / Array.from(categoryMap.entries()).length) * 2 * Math.PI;
        const offsetLat = radius * Math.cos(angle);
        const offsetLng = radius * Math.sin(angle);

        return {
          id: categoryMeta.id,
          emoji: categoryMeta.emoji,
          title: categoryMeta.title,
          color: categoryMeta.color,
          description: categoryMeta.description,
          mapPosition: [baseLat + offsetLat, baseLng + offsetLng] as [number, number],
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
