/**
 * Browser-based Voice Manager - Optimized for native accents and clarity
 */

import { selectBestVoice } from './voicePreloader';
import { 
  processTextWithEnhancements, 
  configureUtterance, 
  getSpeechPreferences 
} from './enhancedSpeech';
import { toast } from '@/hooks/use-toast';

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
      
      // Wait for voices to be ready
      const voices = window.speechSynthesis.getVoices();
      if (voices.length === 0) {
        toast({
          title: "Voice not ready",
          description: "Please try again in a moment.",
          variant: "destructive",
        });
        reject(new Error('No voices available'));
        return;
      }
      
      // Select best available voice for this language
      let voice = selectBestVoice(languageCode);
      
      // Fallback: if no voice found, try to get ANY voice for the language
      if (!voice) {
        console.warn(`No premium voice found for ${languageCode}, trying fallback...`);
        const fallbackVoice = voices.find(v => v.lang.startsWith(languageCode.split('-')[0]));
        
        if (fallbackVoice) {
          voice = fallbackVoice;
          console.log(`Using fallback voice: ${voice.name}`);
        } else {
          toast({
            title: "Voice unavailable",
            description: `No voice found for this language. Try using Chrome browser.`,
            variant: "destructive",
          });
          reject(new Error(`No voice available for ${languageCode}`));
          return;
        }
      }

      // Get user preferences
      const preferences = getSpeechPreferences();

      // Process text with enhancements
      const enhancedText = processTextWithEnhancements(text, preferences, languageCode);

      if (!enhancedText || enhancedText.trim().length === 0) {
        console.error('Empty text provided to speech synthesis');
        reject(new Error('Empty text'));
        return;
      }

      // Create utterance
      const utterance = new SpeechSynthesisUtterance(enhancedText);
      utterance.lang = languageCode;
      utterance.voice = voice;

      // Configure with enhanced settings
      configureUtterance(utterance, preferences, languageCode);

      // Set up event handlers
      utterance.onend = () => {
        resolve();
      };

      utterance.onerror = (event) => {
        console.error('Speech synthesis error:', event);
        toast({
          title: "Playback failed",
          description: "Unable to play audio. Please try again.",
          variant: "destructive",
        });
        reject(new Error(`Speech synthesis failed: ${event.error}`));
      };

      // Add small delay before speaking to avoid Chrome race condition
      setTimeout(() => {
        window.speechSynthesis.speak(utterance);
      }, 100);
      
    } catch (error) {
      console.error('Error in generateNaturalSpeech:', error);
      toast({
        title: "Audio error",
        description: "Something went wrong. Please refresh and try again.",
        variant: "destructive",
      });
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
