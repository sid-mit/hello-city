/**
 * Enhanced Speech - SSML-like features for browser speech synthesis
 */

export interface EnhancedSpeechOptions {
  speed?: number;
  pitch?: number;
  emphasizeSyllables?: boolean;
  slowMotion?: boolean;
  addPauses?: boolean;
}

/**
 * Process text with SSML-like enhancements
 */
export function processTextWithEnhancements(
  text: string,
  options: EnhancedSpeechOptions = {}
): string {
  let processedText = text;

  if (options.addPauses) {
    // Add natural pauses between words for clarity
    processedText = processedText.replace(/\s+/g, ', ');
  }

  if (options.emphasizeSyllables) {
    // Add slight pauses between syllables for languages like Korean, Chinese
    // This helps with pronunciation clarity
    processedText = addSyllableBreaks(processedText);
  }

  return processedText;
}

/**
 * Add subtle breaks between characters for syllable emphasis
 */
function addSyllableBreaks(text: string): string {
  // For Asian languages, add micro-pauses between characters
  const chars = text.split('');
  return chars.join(' ');
}

/**
 * Configure utterance with enhanced settings
 */
export function configureUtterance(
  utterance: SpeechSynthesisUtterance,
  options: EnhancedSpeechOptions = {}
): void {
  // Speed control (0.5 - 1.5)
  if (options.speed !== undefined) {
    utterance.rate = Math.max(0.5, Math.min(1.5, options.speed));
  } else if (options.slowMotion) {
    utterance.rate = 0.7; // Slower for learning
  } else {
    utterance.rate = 0.9; // Slightly slower than normal for clarity
  }

  // Pitch control (0.8 - 1.2)
  if (options.pitch !== undefined) {
    utterance.pitch = Math.max(0.8, Math.min(1.2, options.pitch));
  }

  // Volume (always at max for clarity)
  utterance.volume = 1.0;
}

/**
 * Get user preferences from localStorage
 */
export function getSpeechPreferences(): EnhancedSpeechOptions {
  try {
    const prefs = localStorage.getItem('voicePreferences');
    if (prefs) {
      return JSON.parse(prefs);
    }
  } catch (error) {
    console.error('Error loading voice preferences:', error);
  }
  
  return {
    speed: 0.9,
    pitch: 1.0,
    emphasizeSyllables: true,
    addPauses: false,
  };
}

/**
 * Save user preferences to localStorage
 */
export function saveSpeechPreferences(options: EnhancedSpeechOptions): void {
  try {
    localStorage.setItem('voicePreferences', JSON.stringify(options));
  } catch (error) {
    console.error('Error saving voice preferences:', error);
  }
}
