import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { type GenderVariant } from '@/stores/appStore';

interface PhraseQueryParams {
  city: string;
  spotType: string;
  subScenario: string;
  genderPreference: GenderVariant;
}

export interface PhraseData {
  id: string;
  native: string;
  romanization: string;
  english: string;
}

export function usePhrases({ city, spotType, subScenario, genderPreference }: PhraseQueryParams) {
  return useQuery({
    queryKey: ['phrases', city, spotType, subScenario, genderPreference],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('phrases')
        .select('*')
        .eq('city', city)
        .eq('spot_type', spotType)
        .eq('sub_scenario', subScenario);

      if (error) throw error;

      // Map database columns to app structure based on gender preference
      return data.map((phrase) => {
        let native = phrase.neutral_native;
        let romanization = phrase.neutral_romanized;

        // Use gender-specific variant if available
        if (genderPreference === 'female' && phrase.female_native) {
          native = phrase.female_native;
          romanization = phrase.female_romanized || phrase.neutral_romanized;
        } else if (genderPreference === 'male' && phrase.male_native) {
          native = phrase.male_native;
          romanization = phrase.male_romanized || phrase.neutral_romanized;
        }

        return {
          id: phrase.id,
          native,
          romanization,
          english: phrase.translation_en,
        } as PhraseData;
      });
    },
    enabled: !!(city && spotType && subScenario),
  });
}
