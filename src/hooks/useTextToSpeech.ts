import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface TTSOptions {
  text: string;
  voiceId?: string;
}

export function useTextToSpeech() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  const generateAndPlay = async ({ text, voiceId }: TTSOptions) => {
    if (!text) {
      toast.error('No text provided for speech');
      return;
    }

    setIsGenerating(true);

    try {
      // Stop any currently playing audio
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }

      const { data, error } = await supabase.functions.invoke('text-to-speech', {
        body: { text, voiceId },
      });

      if (error) {
        console.error('TTS Error:', error);
        toast.error('Failed to generate speech');
        return;
      }

      if (!data?.audioContent) {
        toast.error('No audio generated');
        return;
      }

      // Create audio element and play
      const audioBlob = new Blob(
        [Uint8Array.from(atob(data.audioContent), c => c.charCodeAt(0))],
        { type: 'audio/mpeg' }
      );
      const audioUrl = URL.createObjectURL(audioBlob);
      const audioElement = new Audio(audioUrl);
      
      setAudio(audioElement);
      await audioElement.play();

      // Cleanup URL after playing
      audioElement.onended = () => {
        URL.revokeObjectURL(audioUrl);
      };

    } catch (err) {
      console.error('Error playing speech:', err);
      toast.error('Failed to play speech');
    } finally {
      setIsGenerating(false);
    }
  };

  const stop = () => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  };

  return {
    generateAndPlay,
    stop,
    isGenerating,
  };
}