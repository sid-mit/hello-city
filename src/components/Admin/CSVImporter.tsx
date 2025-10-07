import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Upload, CheckCircle, XCircle, Loader2 } from 'lucide-react';

export function CSVImporter() {
  const [isImporting, setIsImporting] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleImport = async () => {
    setIsImporting(true);
    setResults(null);

    try {
      const { data, error } = await supabase.functions.invoke('import-phrases');

      if (error) throw error;

      setResults(data);
      
      if (data.success) {
        toast.success(`Successfully imported ${data.imported} phrases!`, {
          description: `Beijing: ${data.beijing}, Delhi: ${data.delhi}`
        });
      } else {
        toast.error('Import failed', {
          description: data.error
        });
      }
    } catch (error) {
      console.error('Import error:', error);
      toast.error('Failed to import phrases', {
        description: error instanceof Error ? error.message : 'Unknown error'
      });
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Import Beijing & New Delhi Data</CardTitle>
        <CardDescription>
          Import phrases from Beijing (Chinese) and New Delhi (Hindi) CSV files
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <Button
            onClick={handleImport}
            disabled={isImporting}
            className="gap-2"
          >
            {isImporting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Importing...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4" />
                Import CSV Files
              </>
            )}
          </Button>
        </div>

        {results && (
          <div className="space-y-3 p-4 bg-muted rounded-lg">
            <div className="flex items-center gap-2">
              {results.success ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <XCircle className="h-5 w-5 text-red-500" />
              )}
              <span className="font-semibold">
                {results.success ? 'Import Successful' : 'Import Failed'}
              </span>
            </div>

            {results.success && (
              <div className="space-y-1 text-sm">
                <p>Total phrases processed: <strong>{results.total}</strong></p>
                <p>Beijing phrases: <strong>{results.beijing}</strong></p>
                <p>New Delhi phrases: <strong>{results.delhi}</strong></p>
                <p>Successfully imported: <strong>{results.imported}</strong></p>
                {results.skipped > 0 && (
                  <p>Skipped (duplicates): <strong>{results.skipped}</strong></p>
                )}
              </div>
            )}

            {results.errors && results.errors.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-semibold text-destructive">Errors:</p>
                <ul className="text-sm space-y-1 text-destructive">
                  {results.errors.map((error: string, i: number) => (
                    <li key={i}>• {error}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
