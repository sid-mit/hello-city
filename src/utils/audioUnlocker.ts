/**
 * Audio Unlocker - Ensures audio can play by resuming a WebAudio context
 * Should be called from a direct user gesture (e.g., button click)
 */

let unlocked = false;
let audioCtx: (AudioContext | null) = null;

export async function ensureAudioUnlocked(): Promise<void> {
  if (unlocked) return;
  try {
    const AC: typeof AudioContext | undefined = (window as any).AudioContext || (window as any).webkitAudioContext;
    if (AC) {
      if (!audioCtx) audioCtx = new AC();
      if (audioCtx.state === 'suspended') {
        await audioCtx.resume();
      }
      // Play a tiny silent buffer to satisfy autoplay policies
      const buffer = audioCtx.createBuffer(1, 1, 22050);
      const source = audioCtx.createBufferSource();
      source.buffer = buffer;
      source.connect(audioCtx.destination);
      source.start(0);
    }
    unlocked = true;
  } catch (e) {
    // Best-effort: some environments may still block; we'll try again on next gesture
    console.warn('Audio unlock attempt failed:', e);
  }
}

export function isAudioUnlocked(): boolean {
  return unlocked;
}
