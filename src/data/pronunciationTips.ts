export interface PronunciationTip {
  language: string;
  pattern: RegExp;
  tip: string;
  example: string;
  guidance: string;
  mouthPosition?: string;
}

const pronunciationTips: PronunciationTip[] = [
  // Korean Tips
  {
    language: 'ko-KR',
    pattern: /ng$/i,
    tip: 'Korean final consonants (받침)',
    example: 'Myeong-dong → "myeong" ends with nasal "ng"',
    guidance: 'The "ng" sound should be nasal, like in "sing". Keep your tongue touching the roof of your mouth.',
    mouthPosition: 'Tongue up, air through nose',
  },
  {
    language: 'ko-KR',
    pattern: /ㄲ|ㄸ|ㅃ|ㅆ|ㅉ|kk|tt|pp|ss|jj/i,
    tip: 'Double consonants (된소리)',
    example: '빠 (ppa) vs 바 (pa)',
    guidance: 'Tense your throat and release the sound with more force. No aspiration.',
    mouthPosition: 'Tense vocal cords, sharp release',
  },
  {
    language: 'ko-KR',
    pattern: /eo|eu/i,
    tip: 'Korean vowel sounds',
    example: '어 (eo) - rounded lips, 으 (eu) - unrounded',
    guidance: 'For "eo", open your mouth medium-wide with lips slightly rounded.',
    mouthPosition: 'Medium open, slightly rounded',
  },
  
  // French Tips
  {
    language: 'fr-FR',
    pattern: /r/i,
    tip: 'French guttural R',
    example: 'Rue, Paris, Merci',
    guidance: 'The R sound comes from the back of the throat, like gargling. Not rolled like Spanish.',
    mouthPosition: 'Throat vibration, tongue down',
  },
  {
    language: 'fr-FR',
    pattern: /[aeiou]n$/i,
    tip: 'Nasal vowels (voyelles nasales)',
    example: 'Bon (bõ), Pain (pɛ̃), Un (œ̃)',
    guidance: 'Let air flow through your nose while saying the vowel. Don\'t pronounce the "n" separately.',
    mouthPosition: 'Air through nose and mouth',
  },
  {
    language: 'fr-FR',
    pattern: /e$|er$|ez$/i,
    tip: 'Silent endings',
    example: 'Parler → "parl-AY",inez → "een-AY"',
    guidance: 'Final "e", "er", and "ez" are often pronounced like "ay" in "say".',
    mouthPosition: 'Closed smile, tongue forward',
  },
  {
    language: 'fr-FR',
    pattern: /u/i,
    tip: 'French "u" sound',
    example: 'Rue, Tu, Lune',
    guidance: 'Round your lips like saying "oo" but say "ee" instead. Like "ew" in English.',
    mouthPosition: 'Lips rounded forward, tongue up',
  },
  
  // Mandarin Tips
  {
    language: 'zh-CN',
    pattern: /[āáǎà]/i,
    tip: 'Mandarin tones (声调)',
    example: 'mā (妈) high, má (麻) rising, mǎ (马) falling-rising, mà (骂) falling',
    guidance: 'Tone changes meaning! Practice with pitch patterns: ¯ (high), / (rising), ∨ (dip), \\ (falling)',
    mouthPosition: 'Control pitch with throat',
  },
  {
    language: 'zh-CN',
    pattern: /zh|ch|sh/i,
    tip: 'Retroflex consonants',
    example: 'Zhōng (中), Chī (吃), Shì (是)',
    guidance: 'Curl your tongue back toward the roof of your mouth. More "r-colored" than "z/ch/sh".',
    mouthPosition: 'Tongue curled back',
  },
  {
    language: 'zh-CN',
    pattern: /x|q/i,
    tip: 'Palatal consonants',
    example: 'Xie (谢), Qing (请)',
    guidance: 'Tongue touches the hard palate. "X" is like "sh" but with tongue forward.',
    mouthPosition: 'Tongue flat, forward',
  },
  
  // Hindi Tips
  {
    language: 'hi-IN',
    pattern: /[ṭḍṇṛṣ]/i,
    tip: 'Retroflex consonants (मूर्धन्य)',
    example: 'ट (ṭa), ड (ḍa), ण (ṇa)',
    guidance: 'Curl your tongue back to touch the roof of your mouth, then release.',
    mouthPosition: 'Tongue curled back, roof contact',
  },
  {
    language: 'hi-IN',
    pattern: /[kh|gh|ch|jh|th|dh|ph|bh]/i,
    tip: 'Aspirated consonants',
    example: 'ख (kha) vs क (ka), थ (tha) vs त (ta)',
    guidance: 'Add a strong puff of air (aspiration) after the consonant. Feel breath on your hand.',
    mouthPosition: 'Strong breath release',
  },
  {
    language: 'hi-IN',
    pattern: /ṁ|ṅ|ñ/i,
    tip: 'Nasal sounds (अनुस्वार)',
    example: 'हँ (hã), गं (gaṁ)',
    guidance: 'Air flows through the nose. The dot or symbol indicates nasalization.',
    mouthPosition: 'Air through nose',
  },
  
  // Spanish Tips
  {
    language: 'es-MX',
    pattern: /rr|r/i,
    tip: 'Rolled R (R vibrante)',
    example: 'Perro (dog), Rápido (fast)',
    guidance: 'Tap your tongue against the roof of your mouth rapidly. Single R = one tap, RR = multiple taps.',
    mouthPosition: 'Tongue fluttering, roof contact',
  },
  {
    language: 'es-MX',
    pattern: /ll|y/i,
    tip: 'Y/LL sound',
    example: 'Calle (street), Yo (I)',
    guidance: 'In Mexico, often pronounced like English "y" in "yes". In some regions, like "j" in "judge".',
    mouthPosition: 'Tongue touching palate',
  },
  {
    language: 'es-MX',
    pattern: /ñ/i,
    tip: 'Ñ sound (eñe)',
    example: 'Mañana (tomorrow), Niño (child)',
    guidance: 'Like "ny" in "canyon". Press middle of tongue to roof of mouth.',
    mouthPosition: 'Tongue pressed, nasal air',
  },
];

/**
 * Gets pronunciation tip for a specific syllable and language
 */
export function getPronunciationTip(
  syllable: string,
  language: string,
  score: number
): PronunciationTip | null {
  // Only provide tips for syllables that need work
  if (score >= 80) return null;
  
  // Find matching tip based on language and pattern
  const matchingTip = pronunciationTips.find(
    tip => tip.language === language && tip.pattern.test(syllable)
  );
  
  return matchingTip || null;
}

/**
 * Gets general pronunciation tips for a language
 */
export function getLanguageTips(language: string): PronunciationTip[] {
  return pronunciationTips.filter(tip => tip.language === language);
}

/**
 * Identifies problematic sound patterns across multiple syllables
 */
export function identifyProblemPatterns(
  syllables: Array<{ syllable: string; score: number }>,
  language: string
): PronunciationTip[] {
  const problemSyllables = syllables.filter(s => s.score < 80);
  const relevantTips = new Set<PronunciationTip>();
  
  problemSyllables.forEach(({ syllable }) => {
    const tip = getPronunciationTip(syllable, language, 50);
    if (tip) relevantTips.add(tip);
  });
  
  return Array.from(relevantTips);
}
