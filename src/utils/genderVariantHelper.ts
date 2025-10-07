import { type GenderVariant } from '@/stores/appStore';

export interface PhraseVariants {
  neutral_native: string;
  neutral_romanized: string;
  female_native?: string | null;
  female_romanized?: string | null;
  male_native?: string | null;
  male_romanized?: string | null;
}

export interface SelectedVariant {
  native: string;
  romanization: string;
}

/**
 * Selects the correct phrase variant based on gender preference
 * Falls back to neutral if gender-specific variant is not available
 */
export function getGenderedVariant(
  phrase: PhraseVariants,
  genderPreference: GenderVariant
): SelectedVariant {
  let native = phrase.neutral_native;
  let romanization = phrase.neutral_romanized;

  // Try to use gender-specific variant if available
  if (genderPreference === 'female' && phrase.female_native) {
    native = phrase.female_native;
    romanization = phrase.female_romanized || phrase.neutral_romanized;
  } else if (genderPreference === 'male' && phrase.male_native) {
    native = phrase.male_native;
    romanization = phrase.male_romanized || phrase.neutral_romanized;
  }

  return { native, romanization };
}

/**
 * Checks if a phrase has gender-specific variants
 */
export function hasGenderVariants(phrase: PhraseVariants): boolean {
  return !!(phrase.female_native || phrase.male_native);
}
