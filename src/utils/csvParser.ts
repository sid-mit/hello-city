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
  const invalidRows: number[] = [];

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

    // Normalize city name to lowercase
    if (phrase.city) {
      phrase.city = phrase.city.toLowerCase().trim();
    }

    // Normalize sub_scenario: replace spaces with underscores
    if (phrase.sub_scenario) {
      phrase.sub_scenario = phrase.sub_scenario.toLowerCase().trim().replace(/\s+/g, '_');
    }

    // Validate that neutral_native doesn't contain underscores or dashes as placeholders
    if (phrase.neutral_native && /^[_—\-\s]+$/.test(phrase.neutral_native)) {
      invalidRows.push(i + 1);
      console.warn(`Row ${i + 1}: neutral_native contains only placeholders (underscores/dashes). Skipping.`);
      continue;
    }

    phrases.push(phrase as ParsedPhrase);
  }

  if (invalidRows.length > 0) {
    console.warn(`Skipped ${invalidRows.length} rows with invalid native text: rows ${invalidRows.join(', ')}`);
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

  const sampleRows = [
    // Paris cafe example (gender-neutral)
    [
      'paris', 'cafe', 'ordering', 'coffee_order', 'fr',
      'I would like a coffee please', 'Je voudrais un café s\'il vous plaît',
      'Zhuh voo-dreh uhn ka-feh seel voo pleh', 'Je voudrais un café s\'il vous plaît',
      '', '', '', '', '', '', 'Common phrase for ordering'
    ],
    // Seoul restaurant example (non-gendered)
    [
      'seoul', 'restaurant', 'asking', 'menu_request', 'ko',
      'Can I see the menu?', '메뉴 좀 보여주세요',
      'Menyu jom boyeojuseyo', '메뉴 좀 보여주세요',
      '', '', '', '', '', '', 'Polite form'
    ],
    // New Delhi restaurant example (gendered)
    [
      'new-delhi', 'restaurant', 'asking', 'menu_request', 'hi',
      'Can I see the menu?', 'मेनू दिखाइए',
      'Menu dikhaiye', 'Menu dikhaiye',
      'दीदी मेनू दिखाइए', 'Didi menu dikhaiye', 'Didi menu dikhaiye',
      'भैया मेनू दिखाइए', 'Bhaiya menu dikhaiye', 'Bhaiya menu dikhaiye',
      'Using didi (sister) for female, bhaiya (brother) for male'
    ],
    // Mexico City cafe example (gendered)
    [
      'mexico-city', 'cafe', 'ordering', 'coffee_order', 'es-MX',
      'I would like a coffee please', 'Quisiera un café por favor',
      'Kee-see-eh-rah oon kah-feh por fah-vor', 'Quisiera un café por favor',
      '', '', '', '', '', '', 'Neutral form works for both genders in Spanish'
    ],
  ];

  return [headers.join(','), ...sampleRows.map(row => row.join(','))].join('\n');
};
