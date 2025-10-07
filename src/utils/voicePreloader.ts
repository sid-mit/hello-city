/**
 * Voice Preloader - Initialize and warm up speech synthesis voices
 */

interface VoiceQuality {
  voice: SpeechSynthesisVoice;
  quality: number; // 0-100 score
}

const voiceCache = new Map<string, SpeechSynthesisVoice>();
let voicesInitialized = false;

/**
 * Initialize and cache best voices for each language
 */
export async function initializeVoices(): Promise<void> {
  if (voicesInitialized) return;

  console.log('🎤 Initializing voice system...');

  // Wait for voices to load (Chrome bug fix)
  await waitForVoices();

  // Cache best voices for each language
  const languages = ['fr-FR', 'ko-KR', 'zh-CN', 'hi-IN', 'es-MX', 'en-US'];
  
  for (const lang of languages) {
    const bestVoice = selectBestVoice(lang);
    if (bestVoice) {
      voiceCache.set(lang, bestVoice);
      console.log(`  ✓ Cached voice for ${lang}:`, bestVoice.name);
    }
  }

  // Pre-warm speech synthesis with silent playback
  warmUpSpeech();

  voicesInitialized = true;
  console.log('✓ Voice system ready');
}

/**
 * Wait for voices to be available (fixes Chrome initialization bug)
 */
function waitForVoices(): Promise<void> {
  return new Promise((resolve) => {
    const voices = window.speechSynthesis.getVoices();
    
    if (voices.length > 0) {
      resolve();
    } else {
      window.speechSynthesis.addEventListener('voiceschanged', () => {
        resolve();
      }, { once: true });
      
      // Fallback timeout
      setTimeout(resolve, 1000);
    }
  });
}

/**
 * Select the best available voice for a language
 */
export function selectBestVoice(languageCode: string): SpeechSynthesisVoice | null {
  // Check cache first
  const cached = voiceCache.get(languageCode);
  if (cached) return cached;

  const voices = window.speechSynthesis.getVoices();
  if (voices.length === 0) return null;

  // Filter voices by language
  const matchingVoices = voices.filter(voice => 
    voice.lang === languageCode || voice.lang.startsWith(languageCode.split('-')[0])
  );

  if (matchingVoices.length === 0) return null;

  // Score voices based on quality indicators
  const scoredVoices: VoiceQuality[] = matchingVoices.map(voice => ({
    voice,
    quality: calculateVoiceQuality(voice, languageCode),
  }));

  // Sort by quality (highest first)
  scoredVoices.sort((a, b) => b.quality - a.quality);

  return scoredVoices[0]?.voice || null;
}

/**
 * Calculate voice quality score with enhanced native accent prioritization
 */
function calculateVoiceQuality(voice: SpeechSynthesisVoice, targetLang: string): number {
  let score = 0;

  // CRITICAL: Prioritize local/native voices (highest quality)
  if (voice.localService) {
    score += 50; // Massive boost for installed OS voices
  }

  // Exact language match (including region, e.g., zh-CN vs zh-TW)
  if (voice.lang === targetLang) {
    score += 30;
  } else if (voice.lang.startsWith(targetLang.split('-')[0])) {
    // Partial match (e.g., zh-TW when looking for zh-CN)
    score += 15;
  }

  // Vendor quality ranking (platform-specific best voices)
  const vendorName = voice.name.toLowerCase();
  if (vendorName.includes('google')) {
    score += 25; // Google voices are excellent for web
  } else if (vendorName.includes('microsoft')) {
    score += 22; // Microsoft has great multilingual support
  } else if (vendorName.includes('apple')) {
    score += 20; // Apple voices are high quality on macOS/iOS
  }

  // Premium/Enhanced voice indicators
  if (vendorName.includes('premium') || 
      vendorName.includes('enhanced') ||
      vendorName.includes('natural') ||
      vendorName.includes('neural')) {
    score += 15;
  }

  // Language-specific optimizations
  if (targetLang.startsWith('zh') && vendorName.includes('chinese')) {
    score += 10;
  } else if (targetLang.startsWith('ko') && vendorName.includes('korean')) {
    score += 10;
  } else if (targetLang.startsWith('ja') && vendorName.includes('japanese')) {
    score += 10;
  } else if (targetLang.startsWith('hi') && vendorName.includes('hindi')) {
    score += 10;
  } else if (targetLang.startsWith('fr') && vendorName.includes('french')) {
    score += 10;
  }

  // Penalize very generic names
  if (voice.name === 'Default' || voice.name === 'default') {
    score -= 30;
  }

  return score;
}

/**
 * Pre-warm speech synthesis with silent utterance
 */
function warmUpSpeech(): void {
  try {
    const utterance = new SpeechSynthesisUtterance(' ');
    utterance.volume = 0; // Silent
    utterance.rate = 1;
    window.speechSynthesis.speak(utterance);
    console.log('  ✓ Speech synthesis pre-warmed');
  } catch (error) {
    console.error('  ✗ Failed to pre-warm speech:', error);
  }
}

/**
 * Get cached voice for language (fast lookup)
 */
export function getCachedVoice(languageCode: string): SpeechSynthesisVoice | null {
  return voiceCache.get(languageCode) || null;
}

/**
 * Get all available voices for a language
 */
export function getVoicesForLanguage(languageCode: string): SpeechSynthesisVoice[] {
  const voices = window.speechSynthesis.getVoices();
  return voices.filter(voice => 
    voice.lang === languageCode || voice.lang.startsWith(languageCode.split('-')[0])
  );
}
