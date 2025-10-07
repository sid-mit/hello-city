import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { supabase } from '@/integrations/supabase/client';
import { parsePhrasesCSV, generateSampleCSV, type ParsedPhrase } from '@/utils/csvParser';
import { Upload, Download, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const PhraseImporter = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [results, setResults] = useState<{ success: number; failed: number; errors: string[] } | null>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === 'text/csv') {
      setFile(selectedFile);
      setResults(null);
    } else {
      toast({
        title: 'Invalid file type',
        description: 'Please select a CSV file',
        variant: 'destructive',
      });
    }
  };

  const downloadSampleCSV = () => {
    const csvContent = generateSampleCSV();
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'phrases_sample.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    const errors: string[] = [];
    let successCount = 0;
    let failedCount = 0;

    try {
      const content = await file.text();
      const phrases = parsePhrasesCSV(content);

      toast({
        title: 'Processing phrases',
        description: `Found ${phrases.length} phrases to import`,
      });

      // Import phrases in batches
      const batchSize = 50;
      for (let i = 0; i < phrases.length; i += batchSize) {
        const batch = phrases.slice(i, i + batchSize);
        
        const { data, error } = await supabase
          .from('phrases')
          .insert(batch)
          .select();

        if (error) {
          failedCount += batch.length;
          errors.push(`Batch ${Math.floor(i / batchSize) + 1}: ${error.message}`);
        } else {
          successCount += data?.length || 0;
        }
      }

      setResults({ success: successCount, failed: failedCount, errors });

      if (successCount > 0) {
        toast({
          title: 'Import completed',
          description: `Successfully imported ${successCount} phrases`,
        });
      }

      if (failedCount > 0) {
        toast({
          title: 'Some imports failed',
          description: `${failedCount} phrases failed to import`,
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Import failed',
        description: error instanceof Error ? error.message : 'Unknown error occurred',
        variant: 'destructive',
      });
      errors.push(error instanceof Error ? error.message : 'Unknown error');
      setResults({ success: 0, failed: 0, errors });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card className="p-6 max-w-2xl mx-auto">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">Phrase Importer</h2>
          <p className="text-muted-foreground">
            Upload a CSV file to import phrases into the database
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={downloadSampleCSV}
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download Sample CSV
            </Button>
          </div>

          <div className="space-y-2">
            <label htmlFor="csv-upload" className="block text-sm font-medium">
              Select CSV File
            </label>
            <Input
              id="csv-upload"
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              disabled={isUploading}
            />
          </div>

          {file && (
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                File selected: {file.name} ({(file.size / 1024).toFixed(2)} KB)
              </AlertDescription>
            </Alert>
          )}

          <Button
            onClick={handleUpload}
            disabled={!file || isUploading}
            className="w-full flex items-center gap-2"
          >
            {isUploading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Importing Phrases
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" />
                Import Phrases
              </>
            )}
          </Button>
        </div>

        {results && (
          <div className="space-y-2">
            {results.success > 0 && (
              <Alert>
                <CheckCircle className="h-4 w-4 text-success" />
                <AlertDescription>
                  Successfully imported {results.success} phrases
                </AlertDescription>
              </Alert>
            )}

            {results.failed > 0 && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Failed to import {results.failed} phrases
                </AlertDescription>
              </Alert>
            )}

            {results.errors.length > 0 && (
              <div className="mt-2 space-y-1">
                <p className="text-sm font-medium text-destructive">Errors:</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {results.errors.map((error, index) => (
                    <li key={index} className="pl-4">• {error}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};
