export interface ParsedPhrase {
  city: string;
  spot_type: string;
  sub_scenario: string;
  phrase_key: string;
  lang_code: string;
  translation_en: string;
  neutral_native: string;
  neutral_romanized: string;
  neutral_tts: string;
  female_native?: string;
  female_romanized?: string;
  female_tts?: string;
  male_native?: string;
  male_romanized?: string;
  male_tts?: string;
  notes?: string;
}

export const parsePhrasesCSV = (csvContent: string): ParsedPhrase[] => {
  const lines = csvContent.trim().split('\n');
  if (lines.length < 2) {
    throw new Error('CSV must contain at least a header row and one data row');
  }

  const headers = lines[0].split(',').map(h => h.trim());
  const requiredHeaders = [
    'city', 'spot_type', 'sub_scenario', 'phrase_key', 'lang_code',
    'translation_en', 'neutral_native', 'neutral_romanized', 'neutral_tts'
  ];

  const missingHeaders = requiredHeaders.filter(h => !headers.includes(h));
  if (missingHeaders.length > 0) {
    throw new Error(`Missing required headers: ${missingHeaders.join(', ')}`);
  }

  const phrases: ParsedPhrase[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const values = parseCSVLine(line);
    if (values.length !== headers.length) {
      console.warn(`Row ${i + 1} has ${values.length} columns but expected ${headers.length}. Skipping.`);
      continue;
    }

    const phrase: any = {};
    headers.forEach((header, index) => {
      const value = values[index].trim();
      phrase[header] = value || undefined;
    });

    phrases.push(phrase as ParsedPhrase);
  }

  return phrases;
};

// Helper to handle CSV lines with quoted values containing commas
const parseCSVLine = (line: string): string[] => {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  
  result.push(current);
  return result;
};

export const generateSampleCSV = (): string => {
  const headers = [
    'city', 'spot_type', 'sub_scenario', 'phrase_key', 'lang_code',
    'translation_en', 'neutral_native', 'neutral_romanized', 'neutral_tts',
    'female_native', 'female_romanized', 'female_tts',
    'male_native', 'male_romanized', 'male_tts', 'notes'
  ];

  const sampleRow = [
    'paris', 'cafe', 'ordering', 'coffee_order', 'fr',
    'I would like a coffee please', 'Je voudrais un café s\'il vous plaît',
    'Zhuh voo-dreh uhn ka-feh seel voo pleh', 'Je voudrais un café s\'il vous plaît',
    '', '', '', '', '', '', 'Common phrase for ordering'
  ];

  return [headers.join(','), sampleRow.join(',')].join('\n');
};
