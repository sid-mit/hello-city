export interface SyllableAnalysis {
  syllable: string;
  spokenSyllable: string;
  score: number;
  feedback: 'excellent' | 'good' | 'needsWork';
  position: number;
}

/**
 * Analyzes pronunciation by comparing spoken text with expected text at syllable level
 * Now compares native script to native script for accurate scoring
 */
export function analyzeSyllables(
  spokenText: string,
  expectedText: string,
  romanization: string
): SyllableAnalysis[] {
  console.log('🎤 Analyzing pronunciation:');
  console.log('  Spoken:', spokenText);
  console.log('  Expected:', expectedText);
  console.log('  Romanization:', romanization);
  
  // Split both native texts into words for comparison
  const expectedWords = expectedText
    .trim()
    .split(/[\s]+/)
    .filter(s => s.length > 0);
  
  const spokenWords = spokenText
    .trim()
    .split(/[\s]+/)
    .filter(s => s.length > 0);
  
  // Split romanization for display purposes
  const romanizationSyllables = romanization
    .split(/[\s-]+/)
    .filter(s => s.length > 0);
  
  const results: SyllableAnalysis[] = [];
  
  // Align syllables using dynamic programming
  const alignment = alignSyllables(spokenWords, expectedWords);
  
  expectedWords.forEach((expectedWord, index) => {
    const spokenWord = alignment[index] || '';
    const score = calculateSyllableScore(spokenWord, expectedWord);
    
    console.log(`  Syllable ${index + 1}: "${spokenWord}" vs "${expectedWord}" = ${score}%`);
    
    results.push({
      syllable: romanizationSyllables[index] || expectedWord, // Use romanization for display
      spokenSyllable: spokenWord,
      score,
      feedback: getSyllableFeedback(score),
      position: index,
    });
  });
  
  const overallScore = calculateOverallScore(results);
  console.log(`  Overall Score: ${overallScore}%`);
  
  return results;
}

/**
 * Aligns spoken syllables with expected syllables using best-match algorithm
 */
function alignSyllables(spoken: string[], expected: string[]): string[] {
  const alignment: string[] = [];
  let spokenIndex = 0;
  
  for (let i = 0; i < expected.length; i++) {
    if (spokenIndex >= spoken.length) {
      alignment.push('');
      continue;
    }
    
    // Find best match for current expected syllable
    let bestMatch = spoken[spokenIndex];
    let bestScore = calculateSyllableScore(spoken[spokenIndex], expected[i]);
    
    // Look ahead one position if available
    if (spokenIndex + 1 < spoken.length) {
      const nextScore = calculateSyllableScore(spoken[spokenIndex + 1], expected[i]);
      if (nextScore > bestScore) {
        bestMatch = spoken[spokenIndex + 1];
        spokenIndex++; // Skip current
      }
    }
    
    alignment.push(bestMatch);
    spokenIndex++;
  }
  
  return alignment;
}

/**
 * Calculates similarity score between two syllables (0-100)
 */
export function calculateSyllableScore(spoken: string, expected: string): number {
  if (!spoken || !expected) return 0;
  
  const spokenLower = spoken.toLowerCase().trim();
  const expectedLower = expected.toLowerCase().trim();
  
  // Exact match
  if (spokenLower === expectedLower) return 100;
  
  // Calculate Levenshtein distance
  const distance = levenshteinDistance(spokenLower, expectedLower);
  const maxLength = Math.max(spokenLower.length, expectedLower.length);
  
  if (maxLength === 0) return 100;
  
  const similarity = ((maxLength - distance) / maxLength) * 100;
  
  // Phonetic bonus: check if first letters match (important for pronunciation)
  const firstLetterMatch = spokenLower[0] === expectedLower[0] ? 10 : 0;
  
  return Math.min(100, Math.round(similarity + firstLetterMatch));
}

/**
 * Levenshtein distance algorithm for string similarity
 */
function levenshteinDistance(str1: string, str2: string): number {
  const matrix: number[][] = [];
  
  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }
  
  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }
  
  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  
  return matrix[str2.length][str1.length];
}

/**
 * Determines feedback level based on syllable score
 */
function getSyllableFeedback(score: number): 'excellent' | 'good' | 'needsWork' {
  if (score >= 85) return 'excellent';
  if (score >= 65) return 'good';
  return 'needsWork';
}

/**
 * Calculates overall phrase score from syllable analyses
 */
export function calculateOverallScore(syllableAnalyses: SyllableAnalysis[]): number {
  if (syllableAnalyses.length === 0) return 0;
  
  const totalScore = syllableAnalyses.reduce((sum, analysis) => sum + analysis.score, 0);
  return Math.round(totalScore / syllableAnalyses.length);
}
