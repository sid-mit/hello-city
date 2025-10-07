import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.74.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface NormalizationResult {
  city: string;
  spotType: string;
  subScenario: string;
}

// Normalization mappings
const cityMap: Record<string, string> = {
  'new delhi': 'new-delhi',
  'paris': 'paris',
  'mexico city': 'mexico-city',
};

const spotTypeMap: Record<string, string> = {
  'restaurant': 'restaurants',
  'cafe': 'restaurants',
  'metro': 'transit',
  'subway': 'transit',
  'auto': 'transit',
  'taxi': 'transit',
  'shopping': 'shopping',
  'hotel': 'hotels',
  'pharmacy': 'emergency',
  'police': 'emergency',
  'museum': 'culture',
  'bar': 'culture',
};

const subScenarioMap: Record<string, string> = {
  'ordering': 'ordering',
  'dietary_preference': 'dietary',
  'dietary': 'dietary',
  'paying_bill': 'paying',
  'paying': 'paying',
  'asking_recommendation': 'recommendations',
  'small_talk': 'casual_chat',
  'casual_chat': 'casual_chat',
  'finding_facilities': 'finding_facilities',
  'buying_ticket': 'buying_ticket',
  'directions': 'directions',
  'reading_map': 'reading_map',
  'getting_in': 'getting_in',
  'destination': 'destination',
  'price': 'price',
  'trying_on': 'trying_on',
  'checkin': 'checkin',
  'checkout': 'checkout',
  'room_service': 'room_service',
  'symptoms': 'symptoms',
  'medicine': 'medicine',
  'ticket': 'ticket',
  'info': 'info',
  'facilities': 'facilities',
  'reporting': 'reporting',
  'help': 'help',
  'toasting': 'toasting',
  'socializing': 'socializing',
};

function normalizeData(city: string, spotType: string, subScenario: string): NormalizationResult {
  const normalizedCity = cityMap[city.toLowerCase()] || city.toLowerCase().replace(/\s+/g, '-');
  const normalizedSpotType = spotTypeMap[spotType.toLowerCase()] || spotType.toLowerCase();
  const normalizedSubScenario = subScenarioMap[subScenario.toLowerCase()] || subScenario.toLowerCase();

  return {
    city: normalizedCity,
    spotType: normalizedSpotType,
    subScenario: normalizedSubScenario,
  };
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

function parseCSV(content: string): any[] {
  const lines = content.split('\n').filter(line => line.trim());
  if (lines.length < 2) return [];

  const headers = parseCSVLine(lines[0]).map(h => h.toLowerCase().trim());
  const rows: any[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    if (values.length === headers.length) {
      const row: any = {};
      headers.forEach((header, index) => {
        row[header] = values[index]?.trim() || '';
      });
      rows.push(row);
    }
  }

  return rows;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { csvContent } = await req.json();

    if (!csvContent) {
      return new Response(
        JSON.stringify({ error: 'CSV content is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Starting CSV import process...');

    // Initialize Supabase client with service role key
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Parse CSV
    const rows = parseCSV(csvContent);
    console.log(`Parsed ${rows.length} rows from CSV`);

    const phrasesToInsert: any[] = [];
    const errors: string[] = [];
    let skippedCount = 0;

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      
      try {
        // Normalize data
        const normalized = normalizeData(
          row.city || '',
          row.spot_type || '',
          row.sub_scenario || ''
        );

        // Determine if gendered
        const isGendered = !!(row.female_native || row.male_native);

        // Apply fallbacks
        const neutralRomanized = row.neutral_romanized || row.neutral_native;
        const neutralTts = row.neutral_tts || row.neutral_native;
        const femaleRomanized = row.female_romanized || row.female_native;
        const femaleTts = row.female_tts || row.female_native;
        const maleRomanized = row.male_romanized || row.male_native;
        const maleTts = row.male_tts || row.male_native;

        const phrase = {
          phrase_key: row.phrase_key,
          lang_code: row.lang_code,
          city: normalized.city,
          spot_type: normalized.spotType,
          sub_scenario: normalized.subScenario,
          translation_en: row.translation_en,
          neutral_native: row.neutral_native,
          neutral_romanized: neutralRomanized,
          neutral_tts: neutralTts,
          is_gendered: isGendered,
          female_native: row.female_native || null,
          female_romanized: femaleRomanized || null,
          female_tts: femaleTts || null,
          male_native: row.male_native || null,
          male_romanized: maleRomanized || null,
          male_tts: maleTts || null,
          notes: row.notes || null,
        };

        phrasesToInsert.push(phrase);
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : 'Unknown error';
        errors.push(`Row ${i + 2}: ${errorMsg}`);
        skippedCount++;
      }
    }

    console.log(`Prepared ${phrasesToInsert.length} phrases for insertion`);

    // Batch insert with upsert logic
    let successCount = 0;
    let failedCount = 0;
    const batchSize = 50;

    for (let i = 0; i < phrasesToInsert.length; i += batchSize) {
      const batch = phrasesToInsert.slice(i, i + batchSize);
      
      const { data, error } = await supabase
        .from('phrases')
        .upsert(batch, { 
          onConflict: 'phrase_key',
          ignoreDuplicates: false 
        })
        .select();

      if (error) {
        console.error(`Batch ${Math.floor(i / batchSize) + 1} error:`, error);
        failedCount += batch.length;
        errors.push(`Batch ${Math.floor(i / batchSize) + 1}: ${error.message}`);
      } else {
        successCount += data?.length || 0;
        console.log(`Batch ${Math.floor(i / batchSize) + 1} success: ${data?.length} phrases`);
      }
    }

    const result = {
      success: successCount,
      failed: failedCount,
      skipped: skippedCount,
      total: rows.length,
      errors,
    };

    console.log('Import completed:', result);

    return new Response(
      JSON.stringify(result),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in import-phrases function:', error);
    const errorMsg = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ 
        error: errorMsg,
        success: 0,
        failed: 0,
        skipped: 0,
        errors: [errorMsg]
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
