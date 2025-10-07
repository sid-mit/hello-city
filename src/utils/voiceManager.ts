/**
 * Voice Manager - Using ElevenLabs for high-quality multilingual TTS
 */

import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { ensureAudioUnlocked } from './audioUnlocker';

// Diagnostics flag: enable with ?ttsdebug=1
const TTS_DEBUG = (() => {
  try { return new URLSearchParams(window.location.search).has('ttsdebug'); } catch { return false; }
})();

// Simple environment flags
let isSpeaking = false;

/**
 * Generate natural speech using ElevenLabs
 * High-quality multilingual text-to-speech
 */
export async function generateNaturalSpeech(
  text: string,
  cityId: string
): Promise<void> {
  return new Promise(async (resolve, reject) => {
    try {
      // Prevent re-entrancy
      if (isSpeaking) {
        if (TTS_DEBUG) console.debug('[TTS] Already speaking, ignoring new request');
        resolve();
        return;
      }

      if (!text || text.trim().length === 0) {
        toast({
          title: 'Unable to speak',
          description: 'Text is empty or invalid',
          variant: 'destructive',
        });
        reject(new Error('Empty text'));
        return;
      }

      // Ensure audio is unlocked (must be called from a user gesture)
      await ensureAudioUnlocked();

      // Get voice ID based on city
      const voiceId = getVoiceIdForCity(cityId);

      if (TTS_DEBUG) {
        console.log('🎤 ElevenLabs TTS Request:', {
          text: text.substring(0, 50),
          cityId,
          voiceId
        });
      }

      isSpeaking = true;

      // Call ElevenLabs edge function
      const { data, error } = await supabase.functions.invoke('text-to-speech', {
        body: { text, voiceId },
      });

      if (error) {
        console.error('TTS Error:', error);
        toast({
          title: 'Speech generation failed',
          description: 'Unable to generate audio. Please try again.',
          variant: 'destructive',
        });
        isSpeaking = false;
        reject(error);
        return;
      }

      if (!data?.audioContent) {
        toast({
          title: 'No audio generated',
          description: 'Please try again.',
          variant: 'destructive',
        });
        isSpeaking = false;
        reject(new Error('No audio content'));
        return;
      }

      // Create and play audio
      const audioBlob = new Blob(
        [Uint8Array.from(atob(data.audioContent), c => c.charCodeAt(0))],
        { type: 'audio/mpeg' }
      );
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);

      audio.onended = () => {
        URL.revokeObjectURL(audioUrl);
        isSpeaking = false;
        resolve();
      };

      audio.onerror = (event) => {
        URL.revokeObjectURL(audioUrl);
        isSpeaking = false;
        console.error('Audio playback error:', event);
        toast({
          title: 'Playback failed',
          description: 'Unable to play audio. Please try again.',
          variant: 'destructive',
        });
        reject(new Error('Audio playback failed'));
      };

      await audio.play();
      
    } catch (error) {
      console.error('Error in generateNaturalSpeech:', error);
      isSpeaking = false;
      toast({
        title: 'Audio error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
      reject(error as Error);
    }
  });
}

/**
 * Map city IDs to ElevenLabs voice IDs
 * Using Sarah voice (EXAVITQu4vr4xnSDxMaL) as default - natural, clear voice
 */
function getVoiceIdForCity(cityId: string): string {
  const voiceMap: Record<string, string> = {
    'paris': 'EXAVITQu4vr4xnSDxMaL', // Sarah - multilingual
    'seoul': 'EXAVITQu4vr4xnSDxMaL', // Sarah - multilingual
    'beijing': 'EXAVITQu4vr4xnSDxMaL', // Sarah - multilingual
    'new-delhi': 'EXAVITQu4vr4xnSDxMaL', // Sarah - multilingual
    'mexico-city': 'EXAVITQu4vr4xnSDxMaL', // Sarah - multilingual
  };

  return voiceMap[cityId] || 'EXAVITQu4vr4xnSDxMaL';
}

/**
 * Stop any ongoing speech
 */
export function stopSpeech(): void {
  isSpeaking = false;
}

/**
 * Check if speech synthesis is available
 */
export function isSpeechSynthesisSupported(): boolean {
  return 'speechSynthesis' in window;
}
