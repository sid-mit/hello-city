/**
 * Voice Manager - Natural voice generation using ElevenLabs with enhanced browser fallback
 */

import { getCachedAudio, cacheAudio } from './audioCache';
import { supabase } from '@/integrations/supabase/client';
import { 
  selectBestVoice, 
  getCachedVoice 
} from './voicePreloader';
import {
  processTextWithEnhancements,
  configureUtterance,
  getSpeechPreferences,
  EnhancedSpeechOptions,
} from './enhancedSpeech';

export type VoiceSource = 'elevenlabs' | 'browser';

export interface GenerateSpeechResult {
  source: VoiceSource;
}

/**
 * Generate and play natural speech using ElevenLabs with enhanced browser fallback
 */
export const generateNaturalSpeech = async (
  text: string, 
  cityId: string,
  options?: EnhancedSpeechOptions
): Promise<GenerateSpeechResult> => {
  try {
    // Check cache first
    const cachedAudio = getCachedAudio(text, cityId);
    
    if (cachedAudio) {
      console.log('🔊 Playing cached ElevenLabs audio for:', text.substring(0, 30));
      playBase64Audio(cachedAudio);
      return { source: 'elevenlabs' };
    }

    // Generate new audio via edge function
    console.log('🎙️ Generating new ElevenLabs audio for:', text.substring(0, 30));
    const { data, error } = await supabase.functions.invoke('generate-speech', {
      body: { text, cityId }
    });

    if (error) {
      console.error('❌ ElevenLabs error:', error.message);
      // Fallback to enhanced browser speech
      await fallbackToEnhancedWebSpeech(text, cityId, options);
      return { source: 'browser' };
    }

    if (!data?.audioContent) {
      console.error('❌ No audio content in ElevenLabs response');
      await fallbackToEnhancedWebSpeech(text, cityId, options);
      return { source: 'browser' };
    }

    // Cache and play
    cacheAudio(text, cityId, data.audioContent);
    playBase64Audio(data.audioContent);
    console.log('✓ ElevenLabs playback successful');
    return { source: 'elevenlabs' };
  } catch (error) {
    console.error('❌ Error in generateNaturalSpeech:', error);
    await fallbackToEnhancedWebSpeech(text, cityId, options);
    return { source: 'browser' };
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
 * Enhanced fallback to browser's Web Speech API with smart voice selection
 */
async function fallbackToEnhancedWebSpeech(
  text: string, 
  cityId: string,
  options?: EnhancedSpeechOptions
): Promise<void> {
  try {
    console.log('🎤 Using enhanced browser speech (ElevenLabs unavailable)');
    
    const languageCode = getLanguageCode(cityId);
    
    // Get best voice for language
    let voice = getCachedVoice(languageCode);
    if (!voice) {
      voice = selectBestVoice(languageCode);
    }
    
    if (voice) {
      console.log(`  ✓ Selected voice: ${voice.name} (${voice.lang})`);
    } else {
      console.log(`  ⚠️ No voice found for ${languageCode}, using default`);
    }
    
    // Get user preferences
    const prefs = options || getSpeechPreferences();
    
    // Process text with enhancements
    const enhancedText = processTextWithEnhancements(text, prefs);
    
    // Create and configure utterance
    const utterance = new SpeechSynthesisUtterance(enhancedText);
    utterance.lang = languageCode;
    
    if (voice) {
      utterance.voice = voice;
    }
    
    // Apply enhanced configuration
    configureUtterance(utterance, prefs);
    
    // Play with event handlers
    utterance.onstart = () => {
      console.log('  ▶️ Browser speech started');
    };
    
    utterance.onend = () => {
      console.log('  ✓ Browser speech completed');
    };
    
    utterance.onerror = (event) => {
      console.error('  ❌ Browser speech error:', event.error);
    };
    
    window.speechSynthesis.speak(utterance);
  } catch (error) {
    console.error('❌ Error with enhanced browser speech:', error);
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
