/**
 * Voice Manager - Natural voice generation using ElevenLabs
 */

import { getCachedAudio, cacheAudio } from './audioCache';
import { supabase } from '@/integrations/supabase/client';

/**
 * Generate and play natural speech using ElevenLabs
 */
export const generateNaturalSpeech = async (text: string, cityId: string): Promise<void> => {
  try {
    // Check cache first
    const cachedAudio = getCachedAudio(text, cityId);
    
    if (cachedAudio) {
      console.log('Playing cached audio for:', text.substring(0, 30));
      playBase64Audio(cachedAudio);
      return;
    }

    // Generate new audio via edge function
    console.log('Generating new audio for:', text.substring(0, 30));
    const { data, error } = await supabase.functions.invoke('generate-speech', {
      body: { text, cityId }
    });

    if (error) {
      console.error('Error generating speech:', error);
      // Fallback to browser speech
      fallbackToWebSpeech(text, cityId);
      return;
    }

    if (!data?.audioContent) {
      console.error('No audio content in response');
      fallbackToWebSpeech(text, cityId);
      return;
    }

    // Cache and play
    cacheAudio(text, cityId, data.audioContent);
    playBase64Audio(data.audioContent);
  } catch (error) {
    console.error('Error in generateNaturalSpeech:', error);
    fallbackToWebSpeech(text, cityId);
  }
};

/**
 * Play base64 encoded audio
 */
function playBase64Audio(base64: string): void {
  try {
    const audio = new Audio(`data:audio/mp3;base64,${base64}`);
    audio.play().catch(err => {
      console.error('Error playing audio:', err);
    });
  } catch (error) {
    console.error('Error creating audio element:', error);
  }
}

/**
 * Fallback to browser's Web Speech API if natural speech fails
 */
function fallbackToWebSpeech(text: string, cityId: string): void {
  try {
    console.log('⚠️ Using fallback browser speech (ElevenLabs unavailable)');
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = getLanguageCode(cityId);
    utterance.rate = 0.9;
    speechSynthesis.speak(utterance);
  } catch (error) {
    console.error('Error with fallback speech:', error);
  }
}

/**
 * Get language code from city ID (for fallback)
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
