import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.74.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ParsedPhrase {
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

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  
  return result;
}

function normalizeCity(city: string): string {
  return city.toLowerCase().trim();
}

function normalizeSubScenario(subScenario: string): string {
  return subScenario.trim().replace(/\s+/g, '_');
}

function parseCSV(csvContent: string): ParsedPhrase[] {
  const lines = csvContent.split('\n').filter(line => line.trim());
  if (lines.length === 0) return [];
  
  const headers = parseCSVLine(lines[0]).map(h => h.trim());
  const phrases: ParsedPhrase[] = [];
  
  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    if (values.length < 9) continue; // Skip incomplete rows
    
    const row: any = {};
    headers.forEach((header, index) => {
      row[header] = values[index]?.trim() || '';
    });
    
    const phrase: ParsedPhrase = {
      city: normalizeCity(row.city || ''),
      spot_type: row.spot_type || '',
      sub_scenario: normalizeSubScenario(row.sub_scenario || ''),
      phrase_key: row.phrase_key || '',
      lang_code: row.lang_code || '',
      translation_en: row.translation_en || '',
      neutral_native: row.neutral_native || '',
      neutral_romanized: row.neutral_romanized || '',
      neutral_tts: row.neutral_tts || '',
    };
    
    // Handle optional gendered fields
    if (row.female_native) phrase.female_native = row.female_native;
    if (row.female_romanized) phrase.female_romanized = row.female_romanized;
    if (row.female_tts) phrase.female_tts = row.female_tts;
    if (row.male_native) phrase.male_native = row.male_native;
    if (row.male_romanized) phrase.male_romanized = row.male_romanized;
    if (row.male_tts) phrase.male_tts = row.male_tts;
    if (row.notes) phrase.notes = row.notes;
    
    if (phrase.city && phrase.phrase_key) {
      phrases.push(phrase);
    }
  }
  
  return phrases;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    console.log('Starting CSV import...');

    // Fetch CSV files from public folder
    const beijingUrl = `${supabaseUrl}/storage/v1/object/public/Content_Database_-_Beijing.csv`;
    const delhiUrl = `${supabaseUrl}/storage/v1/object/public/Content_Database_Hindi_Cleaned_Final.csv`;

    let allPhrases: ParsedPhrase[] = [];
    let beijingCount = 0;
    let delhiCount = 0;

    // Try to read Beijing CSV from public folder directly
    try {
      const beijingResponse = await fetch(new URL('../../public/Content_Database_-_Beijing.csv', import.meta.url).href);
      if (beijingResponse.ok) {
        const beijingContent = await beijingResponse.text();
        const beijingPhrases = parseCSV(beijingContent);
        beijingCount = beijingPhrases.length;
        allPhrases.push(...beijingPhrases);
        console.log(`Parsed ${beijingCount} Beijing phrases`);
      }
    } catch (error) {
      console.error('Error reading Beijing CSV:', error);
    }

    // Try to read Delhi CSV from public folder directly
    try {
      const delhiResponse = await fetch(new URL('../../public/Content_Database_Hindi_Cleaned_Final.csv', import.meta.url).href);
      if (delhiResponse.ok) {
        const delhiContent = await delhiResponse.text();
        const delhiPhrases = parseCSV(delhiContent);
        delhiCount = delhiPhrases.length;
        allPhrases.push(...delhiPhrases);
        console.log(`Parsed ${delhiCount} Delhi phrases`);
      }
    } catch (error) {
      console.error('Error reading Delhi CSV:', error);
    }

    if (allPhrases.length === 0) {
      throw new Error('No phrases found in CSV files');
    }

    console.log(`Total phrases to import: ${allPhrases.length}`);

    // Batch insert with upsert to handle duplicates
    const batchSize = 50;
    let imported = 0;
    let skipped = 0;
    const errors: string[] = [];

    for (let i = 0; i < allPhrases.length; i += batchSize) {
      const batch = allPhrases.slice(i, i + batchSize);
      
      const { data, error } = await supabase
        .from('phrases')
        .upsert(batch, {
          onConflict: 'city,phrase_key',
          ignoreDuplicates: false
        });

      if (error) {
        console.error(`Batch ${i / batchSize + 1} error:`, error);
        errors.push(`Batch ${i / batchSize + 1}: ${error.message}`);
      } else {
        imported += batch.length;
        console.log(`Imported batch ${i / batchSize + 1}: ${batch.length} phrases`);
      }
    }

    const result = {
      success: true,
      total: allPhrases.length,
      beijing: beijingCount,
      delhi: delhiCount,
      imported,
      skipped,
      errors: errors.length > 0 ? errors : undefined
    };

    console.log('Import completed:', result);

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error) {
    console.error('Import error:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
