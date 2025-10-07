/**
 * Audio Cache Utility
 * Caches generated audio to reduce API calls and improve performance
 */

interface CachedAudio {
  base64: string;
  timestamp: number;
}

const CACHE_KEY_PREFIX = 'audio_cache_';
const CACHE_EXPIRY_MS = 24 * 60 * 60 * 1000; // 24 hours

/**
 * Generate a unique cache key for audio
 */
function getCacheKey(text: string, cityId: string): string {
  const hash = Array.from(text).reduce((acc, char) => {
    return ((acc << 5) - acc) + char.charCodeAt(0);
  }, 0);
  return `${CACHE_KEY_PREFIX}${cityId}_${hash}`;
}

/**
 * Get cached audio if available and not expired
 */
export function getCachedAudio(text: string, cityId: string): string | null {
  try {
    const key = getCacheKey(text, cityId);
    const cached = sessionStorage.getItem(key);
    
    if (!cached) return null;
    
    const parsed: CachedAudio = JSON.parse(cached);
    
    // Check if expired
    if (Date.now() - parsed.timestamp > CACHE_EXPIRY_MS) {
      sessionStorage.removeItem(key);
      return null;
    }
    
    return parsed.base64;
  } catch (error) {
    console.error('Error retrieving cached audio:', error);
    return null;
  }
}

/**
 * Cache audio for future use
 */
export function cacheAudio(text: string, cityId: string, base64Audio: string): void {
  try {
    const key = getCacheKey(text, cityId);
    const cached: CachedAudio = {
      base64: base64Audio,
      timestamp: Date.now(),
    };
    
    sessionStorage.setItem(key, JSON.stringify(cached));
  } catch (error) {
    console.error('Error caching audio:', error);
    // If storage is full, clear old entries
    if (error instanceof DOMException && error.name === 'QuotaExceededError') {
      clearOldCache();
      // Try again
      try {
        const key = getCacheKey(text, cityId);
        const cached: CachedAudio = {
          base64: base64Audio,
          timestamp: Date.now(),
        };
        sessionStorage.setItem(key, JSON.stringify(cached));
      } catch {
        // Silent fail if still can't cache
      }
    }
  }
}

/**
 * Clear old cached audio entries
 */
function clearOldCache(): void {
  try {
    const keys = Object.keys(sessionStorage);
    const cacheKeys = keys.filter(key => key.startsWith(CACHE_KEY_PREFIX));
    
    const entries = cacheKeys.map(key => {
      const data = sessionStorage.getItem(key);
      if (!data) return null;
      try {
        const parsed: CachedAudio = JSON.parse(data);
        return { key, timestamp: parsed.timestamp };
      } catch {
        return null;
      }
    }).filter(Boolean) as { key: string; timestamp: number }[];
    
    // Sort by timestamp (oldest first)
    entries.sort((a, b) => a.timestamp - b.timestamp);
    
    // Remove oldest 25% of entries
    const removeCount = Math.ceil(entries.length * 0.25);
    for (let i = 0; i < removeCount; i++) {
      sessionStorage.removeItem(entries[i].key);
    }
  } catch (error) {
    console.error('Error clearing old cache:', error);
  }
}
