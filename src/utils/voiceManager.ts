/**
 * Browser-based Voice Manager - Optimized for native accents and clarity
 */

import { selectBestVoice } from './voicePreloader';
import { 
  processTextWithEnhancements, 
  configureUtterance, 
  getSpeechPreferences 
} from './enhancedSpeech';

/**
 * Generate natural speech using browser's Web Speech API
 * Optimized for native accents and pronunciation clarity
 */
export async function generateNaturalSpeech(
  text: string,
  cityId: string
): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();

      // Get language code for city
      const languageCode = getLanguageCode(cityId);
      
      // Select best available voice for this language
      const voice = selectBestVoice(languageCode);
      
      if (!voice) {
        console.warn(`No voice found for ${languageCode}, using default`);
      }

      // Get user preferences
      const preferences = getSpeechPreferences();

      // Process text with enhancements
      const enhancedText = processTextWithEnhancements(text, preferences, languageCode);

      // Create utterance
      const utterance = new SpeechSynthesisUtterance(enhancedText);
      utterance.lang = languageCode;
      
      if (voice) {
        utterance.voice = voice;
      }

      // Configure with enhanced settings
      configureUtterance(utterance, preferences, languageCode);

      // Set up event handlers
      utterance.onend = () => {
        resolve();
      };

      utterance.onerror = (event) => {
        console.error('Speech synthesis error:', event);
        reject(new Error(`Speech synthesis failed: ${event.error}`));
      };

      // Speak
      window.speechSynthesis.speak(utterance);
      
    } catch (error) {
      console.error('Error in generateNaturalSpeech:', error);
      reject(error);
    }
  });
}

/**
 * Map city IDs to language codes for speech synthesis
 */
function getLanguageCode(cityId: string): string {
  const languageMap: Record<string, string> = {
    'paris': 'fr-FR',
    'seoul': 'ko-KR',
    'beijing': 'zh-CN',
    'new-delhi': 'hi-IN',
    'mexico-city': 'es-MX',
  };

  return languageMap[cityId] || 'en-US';
}

/**
 * Stop any ongoing speech
 */
export function stopSpeech(): void {
  window.speechSynthesis.cancel();
}

/**
 * Check if speech synthesis is available
 */
export function isSpeechSynthesisSupported(): boolean {
  return 'speechSynthesis' in window;
}
