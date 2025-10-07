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
import { ensureAudioUnlocked } from './audioUnlocker';

// Diagnostics flag: enable with ?ttsdebug=1
const TTS_DEBUG = (() => {
  try { return new URLSearchParams(window.location.search).has('ttsdebug'); } catch { return false; }
})();

// Simple environment flags
let isSpeaking = false;
const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

/**
 * Wait for voices to be ready with robust retry - ensures non-empty array
 */
async function waitForVoicesReady(timeout = 3000): Promise<SpeechSynthesisVoice[]> {
  return new Promise((resolve) => {
    const startTime = Date.now();
    
    const checkVoices = () => {
      const voices = speechSynthesis.getVoices();
      if (voices.length > 0) {
        if (TTS_DEBUG) console.log('✓ Voices ready:', voices.length);
        resolve(voices);
        return true;
      }
      return false;
    };

    // Check immediately
    if (checkVoices()) return;

    // Poll every 100ms
    const pollInterval = setInterval(() => {
      if (checkVoices()) {
        clearInterval(pollInterval);
      } else if (Date.now() - startTime > timeout) {
        clearInterval(pollInterval);
        if (TTS_DEBUG) console.warn('⚠ Voices timeout, returning empty array');
        resolve([]);
      }
    }, 100);

    // Also listen for voiceschanged event
    speechSynthesis.addEventListener('voiceschanged', () => {
      if (checkVoices()) {
        clearInterval(pollInterval);
      }
    }, { once: true });
  });
}

/**
 * Generate natural speech using browser's Web Speech API
 * Optimized for native accents and pronunciation clarity
 */
export async function generateNaturalSpeech(
  text: string,
  cityId: string
): Promise<void> {
  return new Promise(async (resolve, reject) => {
    try {
      // Prevent re-entrancy to avoid cancel/error loops
      if (isSpeaking) {
        if (TTS_DEBUG) console.debug('[TTS] Already speaking, ignoring new request');
        resolve();
        return;
      }

      // Stop any ongoing speech and allow engine to settle
      window.speechSynthesis.cancel();
      await new Promise((r) => setTimeout(r, 100));

      // Ensure audio is unlocked (must be called from a user gesture)
      await ensureAudioUnlocked();

      // Get language code for city
      const languageCode = getLanguageCode(cityId);

      // Wait for voices to be available
      const voices = await waitForVoicesReady(2500);
      if (!voices || voices.length === 0) {
        toast({
          title: 'Voice not ready',
          description: 'Please try again in a moment.',
          variant: 'destructive',
        });
        reject(new Error('No voices available'));
        return;
      }

      // Select best available voice for this language
      let voice = selectBestVoice(languageCode);

      // Fallback: if no voice found, try to get ANY voice for the language family
      if (!voice) {
        if (TTS_DEBUG) console.warn(`[TTS] No premium voice for ${languageCode}, trying fallback...`);
        const fallbackVoice = voices.find((v) => v.lang === languageCode || v.lang.startsWith(languageCode.split('-')[0]));
        if (fallbackVoice) {
          voice = fallbackVoice;
          if (TTS_DEBUG) console.log(`[TTS] Using fallback voice: ${voice.name}`);
        } else {
          toast({
            title: 'Voice unavailable',
            description: `No voice found for this language. Try using Chrome browser.`,
            variant: 'destructive',
          });
          reject(new Error(`No voice available for ${languageCode}`));
          return;
        }
      }

      // Get user preferences and process text with sanitization
      const preferences = getSpeechPreferences();
      const enhancedText = processTextWithEnhancements(text, preferences, languageCode);
      
      // Abort if text is empty after sanitization
      if (!enhancedText || enhancedText.trim().length === 0) {
        if (TTS_DEBUG) console.error('[TTS] Empty text after sanitization');
        toast({
          title: 'Unable to speak',
          description: 'Text is empty or invalid',
          variant: 'destructive',
        });
        reject(new Error('Empty text'));
        return;
      }

      if (TTS_DEBUG) {
        console.log('🎤 TTS Request:', {
          originalText: text,
          enhancedText,
          cityId,
          languageCode
        });
      }

      // Retry watchdog logic
      let retried = false;

      const speakOnce = (dropVoice: boolean) => {
        const utterance = new SpeechSynthesisUtterance(enhancedText);
        utterance.lang = languageCode;
        
        // Safari: ONLY set lang, NEVER set voice (causes silence/errors)
        if (!dropVoice && !isSafari && voice) {
          utterance.voice = voice;
        }

        // Configure with enhanced settings
        configureUtterance(utterance, preferences, languageCode);

        // Log right before speak
        if (TTS_DEBUG) {
          console.log('📢 About to speak:', {
            text: utterance.text,
            lang: utterance.lang,
            voice: utterance.voice?.name || '(default)',
            rate: utterance.rate,
            pitch: utterance.pitch,
            isSafari,
            dropVoice
          });
        }

        let started = false;
        isSpeaking = true;

        const startTimer = setTimeout(() => {
          if (!started) {
            if (TTS_DEBUG) console.warn('[TTS] onstart not fired, retrying with safer fallback');
            window.speechSynthesis.cancel();
            if (!retried) {
              retried = true;
              // Retry with voice dropped (browser default for lang)
              setTimeout(() => speakOnce(true), 120);
            } else {
              isSpeaking = false;
              toast({
                title: 'Playback failed',
                description: 'Unable to play audio. Please try again.',
                variant: 'destructive',
              });
              reject(new Error('Speech synthesis timed out'));
            }
          }
        }, 1200);

        utterance.onstart = () => {
          started = true;
          clearTimeout(startTimer);
          if (TTS_DEBUG) console.debug('[TTS] onstart', { voice: utterance.voice?.name, lang: utterance.lang, dropVoice, isSafari });
        };

        utterance.onend = () => {
          clearTimeout(startTimer);
          isSpeaking = false;
          resolve();
        };

        utterance.onerror = (event) => {
          clearTimeout(startTimer);
          isSpeaking = false;
          const anyEvent: any = event;
          
          // Don't show toast for "interrupted" (user clicked again quickly)
          if (anyEvent?.error === 'interrupted') {
            if (TTS_DEBUG) console.debug('[TTS] interrupted (user action)');
            resolve();
            return;
          }
          
          console.error('Speech synthesis error:', event);
          if (TTS_DEBUG) console.log('Error details:', event);
          
          toast({
            title: 'Playback failed',
            description: 'Unable to play audio. Please try again.',
            variant: 'destructive',
          });
          reject(new Error(`Speech synthesis failed: ${anyEvent?.error || 'unknown'}`));
        };

        // Small delay to avoid Chrome race condition
        setTimeout(() => {
          window.speechSynthesis.speak(utterance);
        }, 100);
      };

      // First attempt: normal path (voice set except on Safari)
      speakOnce(false);
    } catch (error) {
      console.error('Error in generateNaturalSpeech:', error);
      isSpeaking = false;
      toast({
        title: 'Audio error',
        description: 'Something went wrong. Please refresh and try again.',
        variant: 'destructive',
      });
      reject(error as Error);
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
