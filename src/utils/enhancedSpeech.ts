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
 * Sanitize text for speech synthesis - removes HTML entities, control chars, etc.
 */
export function sanitizeSpeechText(text: string): string {
  if (!text) return '';
  
  // Decode common HTML entities
  const entityMap: Record<string, string> = {
    '&mdash;': '—',
    '&ndash;': '–',
    '&hellip;': '...',
    '&quot;': '"',
    '&apos;': "'",
    '&lt;': '<',
    '&gt;': '>',
    '&amp;': '&',
    '&#39;': "'",
    '&#34;': '"',
  };
  
  let cleaned = text;
  
  // Replace HTML entities
  Object.entries(entityMap).forEach(([entity, char]) => {
    cleaned = cleaned.replace(new RegExp(entity, 'g'), char);
  });
  
  // Remove HTML tags
  cleaned = cleaned.replace(/<[^>]*>/g, '');
  
  // Remove zero-width and control characters (except newlines)
  cleaned = cleaned.replace(/[\u200B-\u200D\uFEFF\u2060-\u206F]/g, '');
  cleaned = cleaned.replace(/[\x00-\x08\x0B-\x0C\x0E-\x1F\x7F]/g, '');
  
  // Normalize dashes - replace em/en dashes with space for natural pause
  cleaned = cleaned.replace(/[—–]/g, ' ');
  
  // Collapse repeated punctuation
  cleaned = cleaned.replace(/[.,!?;:]{2,}/g, (match) => match[0]);
  
  // Collapse whitespace
  cleaned = cleaned.replace(/\s+/g, ' ');
  
  return cleaned.trim();
}

/**
 * Process text with SSML-like enhancements for better pronunciation
 */
export function processTextWithEnhancements(
  text: string,
  options: EnhancedSpeechOptions = {},
  languageCode?: string
): string {
  // Sanitize text first
  let processedText = sanitizeSpeechText(text);
  
  if (!processedText) return '';

  // Don't add pauses by default - causes punctuation narration
  if (options.addPauses) {
    // Add natural pauses between words for clarity
    processedText = processedText.replace(/\s+/g, ', ');
  }

  // Keep emphasizeSyllables disabled by default
  if (options.emphasizeSyllables) {
    // Add language-specific syllable emphasis
    processedText = addLanguageSpecificBreaks(processedText, languageCode);
  }

  return processedText;
}

/**
 * Add language-specific breaks and emphasis for better pronunciation
 */
function addLanguageSpecificBreaks(text: string, languageCode?: string): string {
  if (!languageCode) return text;

  const lang = languageCode.toLowerCase();

  // Chinese (Mandarin) - Add slight pauses between characters
  if (lang.startsWith('zh')) {
    const chars = text.split('');
    return chars.join(' ');
  }

  // Korean - Add micro-pauses between syllable blocks
  if (lang.startsWith('ko')) {
    // Korean syllables are already distinct, just add slight spacing
    const chars = text.split('');
    return chars.join(' ');
  }

  // Japanese - Similar to Korean
  if (lang.startsWith('ja')) {
    const chars = text.split('');
    return chars.join(' ');
  }

  // For other languages, return as-is
  return text;
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
 * Configure utterance with enhanced settings optimized for language learning
 */
export function configureUtterance(
  utterance: SpeechSynthesisUtterance,
  options: EnhancedSpeechOptions = {},
  languageCode?: string
): void {
  const lang = languageCode?.toLowerCase() || '';

  // Language-specific speed adjustments
  if (options.speed !== undefined) {
    utterance.rate = Math.max(0.5, Math.min(1.5, options.speed));
  } else if (options.slowMotion) {
    utterance.rate = 0.65; // Very slow for learning
  } else {
    // Language-specific default speeds for clarity
    if (lang.startsWith('hi')) {
      utterance.rate = 0.85; // Hindi - moderate for clarity
    } else if (lang.startsWith('ko') || lang.startsWith('zh') || lang.startsWith('ja')) {
      utterance.rate = 0.8; // Asian languages - slower for syllable distinction
    } else if (lang.startsWith('fr')) {
      utterance.rate = 0.88; // French - slightly slower
    } else {
      utterance.rate = 0.85; // Default slower for learning
    }
  }

  // Language-specific pitch adjustments for natural sound
  if (options.pitch !== undefined) {
    utterance.pitch = Math.max(0.8, Math.min(1.2, options.pitch));
  } else {
    // Subtle pitch adjustments per language
    if (lang.startsWith('fr')) {
      utterance.pitch = 1.05; // French benefits from slightly higher pitch
    } else if (lang.startsWith('zh')) {
      utterance.pitch = 1.02; // Chinese tones need slight elevation
    } else {
      utterance.pitch = 1.0;
    }
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
    speed: 0.85, // Slower default for learning
    pitch: 1.0,
    emphasizeSyllables: false, // Disabled - causes Chrome TTS to fail
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
