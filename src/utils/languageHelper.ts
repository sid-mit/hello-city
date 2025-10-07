import { type LanguageCode } from "@/components/Practice/GenderSelector";

const LANGUAGE_MAP: Record<string, LanguageCode> = {
  paris: "fr-FR",
  seoul: "ko-KR",
  beijing: "zh-CN",
  "new-delhi": "hi-IN",
  "mexico-city": "es-MX",
};

const GENDERED_LANGUAGES: LanguageCode[] = ['hi-IN', 'fr-FR', 'es-MX'];

export function getLanguageCode(cityId: string): LanguageCode {
  return LANGUAGE_MAP[cityId] || "en-US" as LanguageCode;
}

export function isGenderedLanguage(cityId: string): boolean {
  const langCode = getLanguageCode(cityId);
  return GENDERED_LANGUAGES.includes(langCode);
}
