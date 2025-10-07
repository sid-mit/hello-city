import { SituationData } from '@/components/Cards/SituationCard';
import { cities } from '@/data/cities';

interface DatabasePhrase {
  id: string;
  city: string;
  spot_type: string;
  sub_scenario: string;
  is_gendered: boolean;
  neutral_native: string;
  neutral_romanized: string;
  female_native?: string;
  female_romanized?: string;
  male_native?: string;
  male_romanized?: string;
  translation_en: string;
}

type GenderVariant = 'neutral' | 'female' | 'male';

/**
 * Groups flat database phrases by sub_scenario into nested situation structure
 */
export function groupPhrasesBySituation(
  phrases: DatabasePhrase[], 
  genderPreference: GenderVariant
): Partial<SituationData>[] {
  const situationMap = new Map<string, Partial<SituationData>>();

  phrases.forEach((phrase) => {
    const situationId = phrase.sub_scenario;
    
    // Determine which phrase variant to use
    let native = phrase.neutral_native;
    let romanization = phrase.neutral_romanized;

    if (phrase.is_gendered) {
      if (genderPreference === 'female' && phrase.female_native) {
        native = phrase.female_native;
        romanization = phrase.female_romanized || phrase.neutral_romanized;
      } else if (genderPreference === 'male' && phrase.male_native) {
        native = phrase.male_native;
        romanization = phrase.male_romanized || phrase.neutral_romanized;
      }
    }

    // Get or create situation
    if (!situationMap.has(situationId)) {
      situationMap.set(situationId, {
        id: situationId,
        cityId: phrase.city,
        phrases: [],
      });
    }

    const situation = situationMap.get(situationId)!;
    situation.phrases = situation.phrases || [];
    situation.phrases.push({
      native,
      romanization,
      english: phrase.translation_en,
    });
  });

  return Array.from(situationMap.values());
}

/**
 * Enriches situation with metadata (emoji, formatted title, city info)
 */
export function enrichSituationWithMetadata(
  situation: Partial<SituationData>,
  cityId: string
): SituationData {
  const city = cities.find(c => c.id === cityId);
  const title = formatSituationTitle(situation.id || '');
  const emoji = getSituationEmoji(situation.id || '');

  return {
    id: situation.id || '',
    cityId: cityId,
    cityName: city?.name || '',
    cityEmoji: city?.emoji || '',
    emoji: emoji,
    title: title,
    description: formatSituationDescription(situation.id || ''),
    context: '',
    categoryColor: situation.categoryColor || '#3B82F6',
    phrases: situation.phrases || [],
    conversationFlow: situation.conversationFlow,
    culturalTip: situation.culturalTip,
  };
}

/**
 * Converts sub_scenario slug to formatted title
 * e.g., 'ordering-food' -> 'Ordering Food'
 */
function formatSituationTitle(subScenario: string): string {
  return subScenario
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Generates a description based on the situation ID
 */
function formatSituationDescription(subScenario: string): string {
  const descriptions: Record<string, string> = {
    'ordering-food': 'Learn essential phrases for ordering at restaurants',
    'dietary-restrictions': 'Communicate your dietary needs clearly',
    'asking-bill': 'Request the check and pay',
    'buying-tickets': 'Purchase metro and train tickets',
    'finding-platform': 'Navigate the metro system',
    'asking-prices': 'Inquire about costs and sizes',
    'checking-in': 'Check into your hotel',
    'getting-help': 'Emergency phrases for urgent situations',
    'greetings': 'Essential polite expressions',
    'allergy-dietary': 'Communicate your dietary needs safely',
    'adding-orders': 'Request more items during your meal',
    'paying-bill': 'Pay and wrap up your meal',
  };

  return descriptions[subScenario] || formatSituationTitle(subScenario);
}

/**
 * Maps situation IDs to appropriate emojis
 */
function getSituationEmoji(subScenario: string): string {
  const emojiMap: Record<string, string> = {
    'ordering-food': '🍽️',
    'dietary-restrictions': '🥗',
    'asking-bill': '💳',
    'buying-tickets': '🎫',
    'finding-platform': '🚉',
    'asking-prices': '💰',
    'checking-in': '🔑',
    'getting-help': '🚨',
    'greetings': '👋',
    'allergy-dietary': '⚠️',
    'adding-orders': '➕',
    'paying-bill': '💳',
  };

  return emojiMap[subScenario] || '💬';
}
