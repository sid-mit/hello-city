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

      // Transform into CityDataStructure
      const categories = Array.from(categoryMap.entries()).map(([spotType, situationMap]) => {
        const categoryMeta = getCategoryMetadata(spotType);

        const situations = Array.from(situationMap.entries()).map(([subScenario, phraseList]) => {
          const situationMeta = getSituationMetadata(subScenario);
          return {
            id: situationMeta.id,
            title: situationMeta.title,
            description: situationMeta.description,
            phrases: phraseList,
          };
        });

        return {
          id: categoryMeta.id,
          emoji: categoryMeta.emoji,
          title: categoryMeta.title,
          color: categoryMeta.color,
          description: categoryMeta.description,
          mapPosition: categoryMeta.mapPosition,
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
