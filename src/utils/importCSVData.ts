import { supabase } from '@/integrations/supabase/client';

interface ImportResult {
  file: string;
  success: number;
  failed: number;
  skipped: number;
  errors: string[];
}

export async function importAllCSVFiles(): Promise<ImportResult[]> {
  const csvFiles = [
    { name: 'paris_french_phrases.csv', path: '/data/paris_french_phrases.csv' },
    { name: 'mexico_spanish_phrases.csv', path: '/data/mexico_spanish_phrases.csv' },
    { name: 'delhi_hindi_phrases.csv', path: '/data/delhi_hindi_phrases.csv' }
  ];

  const results: ImportResult[] = [];

  for (const file of csvFiles) {
    console.log(`Importing ${file.name}...`);
    
    try {
      // Fetch the CSV file from public folder
      const response = await fetch(file.path);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${file.name}`);
      }
      const content = await response.text();

      const { data, error } = await supabase.functions.invoke('import-phrases', {
        body: { csvContent: content }
      });

      if (error) {
        results.push({
          file: file.name,
          success: 0,
          failed: 0,
          skipped: 0,
          errors: [error.message]
        });
      } else {
        results.push({
          file: file.name,
          success: data.success,
          failed: data.failed,
          skipped: data.skipped,
          errors: data.errors
        });
      }
    } catch (err) {
      results.push({
        file: file.name,
        success: 0,
        failed: 0,
        skipped: 0,
        errors: [err instanceof Error ? err.message : 'Unknown error']
      });
    }
  }

  return results;
}
