/**
 * Voice Manager - Intelligent voice selection for high-quality speech synthesis
 * Automatically selects the best available voice for each language
 */

interface VoiceScore {
  voice: SpeechSynthesisVoice;
  score: number;
}

let voicesCache: SpeechSynthesisVoice[] | null = null;

/**
 * Load and cache all available voices
 */
const loadVoices = (): Promise<SpeechSynthesisVoice[]> => {
  return new Promise((resolve) => {
    if (voicesCache) {
      resolve(voicesCache);
      return;
    }

    const voices = speechSynthesis.getVoices();
    if (voices.length > 0) {
      voicesCache = voices;
      resolve(voices);
      return;
    }

    // Some browsers need to wait for voices to load
    speechSynthesis.onvoiceschanged = () => {
      const loadedVoices = speechSynthesis.getVoices();
      voicesCache = loadedVoices;
      resolve(loadedVoices);
    };
  });
};

/**
 * Score a voice based on quality indicators
 */
const scoreVoice = (voice: SpeechSynthesisVoice, languageCode: string): number => {
  let score = 0;
  const nameLower = voice.name.toLowerCase();
  const langMatch = voice.lang.toLowerCase().startsWith(languageCode.toLowerCase());

  if (!langMatch) return -1000; // Wrong language

  // Premium/Enhanced indicators
  if (nameLower.includes('premium') || nameLower.includes('enhanced') || 
      nameLower.includes('neural') || nameLower.includes('natural')) {
    score += 100;
  }

  // Local/offline voices are usually higher quality
  if (voice.localService) {
    score += 50;
  }

  // Google voices are consistently good
  if (nameLower.includes('google')) {
    score += 40;
  }

  // Platform-specific premium voices
  if (nameLower.includes('amelie') || nameLower.includes('thomas') ||  // French
      nameLower.includes('yuna') ||  // Korean
      nameLower.includes('ting-ting') || nameLower.includes('mei-jia') ||  // Chinese
      nameLower.includes('lekha') ||  // Hindi
      nameLower.includes('paulina') || nameLower.includes('juan')) {  // Spanish
    score += 80;
  }

  // Avoid known low-quality voices
  if (nameLower.includes('microsoft david') || nameLower.includes('zira') || 
      nameLower.includes('mark') || nameLower.includes('samantha (novelty)')) {
    score -= 50;
  }

  // Default voice for language gets bonus
  if (voice.default) {
    score += 10;
  }

  return score;
};

/**
 * Get the best available voice for a language
 */
export const getHighQualityVoice = async (languageCode: string): Promise<SpeechSynthesisVoice | null> => {
  const voices = await loadVoices();
  
  const scoredVoices: VoiceScore[] = voices
    .map(voice => ({
      voice,
      score: scoreVoice(voice, languageCode)
    }))
    .filter(v => v.score > -1000)
    .sort((a, b) => b.score - a.score);

  if (scoredVoices.length === 0) {
    console.warn(`No voice found for language: ${languageCode}`);
    return null;
  }

  const bestVoice = scoredVoices[0];
  console.log(`Selected voice for ${languageCode}:`, bestVoice.voice.name, `(score: ${bestVoice.score})`);
  
  return bestVoice.voice;
};

/**
 * Get voice quality tier for UI display
 */
export const getVoiceQualityTier = (voice: SpeechSynthesisVoice | null): 'premium' | 'standard' | 'basic' => {
  if (!voice) return 'basic';
  
  const nameLower = voice.name.toLowerCase();
  
  if (nameLower.includes('premium') || nameLower.includes('enhanced') || 
      nameLower.includes('neural') || nameLower.includes('amelie') || 
      nameLower.includes('yuna') || nameLower.includes('ting-ting') ||
      nameLower.includes('lekha') || nameLower.includes('paulina')) {
    return 'premium';
  }
  
  if (voice.localService || nameLower.includes('google')) {
    return 'standard';
  }
  
  return 'basic';
};

/**
 * Get language code from city ID
 */
export const getLanguageCode = (cityId: string): string => {
  const languageMap: Record<string, string> = {
    'paris': 'fr-FR',
    'seoul': 'ko-KR',
    'beijing': 'zh-CN',
    'new-delhi': 'hi-IN',
    'mexico-city': 'es-MX',
  };
  return languageMap[cityId] || 'en-US';
};
