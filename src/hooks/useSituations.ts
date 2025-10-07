import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { type GenderVariant } from '@/stores/appStore';
import { SituationData } from '@/components/Cards/SituationCard';
import { groupPhrasesBySituation, enrichSituationWithMetadata } from '@/utils/phraseTransformers';

interface SituationsQueryParams {
  city: string;
  spotType: string;
  genderPreference: GenderVariant;
}

export function useSituations({ city, spotType, genderPreference }: SituationsQueryParams) {
  return useQuery({
    queryKey: ['situations', city, spotType, genderPreference],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('phrases')
        .select('*')
        .eq('city', city)
        .eq('spot_type', spotType);

      if (error) throw error;

      // Transform flat database phrases into nested situation structure
      const situations = groupPhrasesBySituation(data, genderPreference);
      
      // Enrich with metadata (emoji, title formatting, etc.)
      return situations.map(situation => 
        enrichSituationWithMetadata(situation, city)
      ) as SituationData[];
    },
    enabled: !!(city && spotType),
  });
}
