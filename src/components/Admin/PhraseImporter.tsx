import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { supabase } from '@/integrations/supabase/client';
import { generateSampleCSV } from '@/utils/csvParser';
import { Upload, Download, CheckCircle, AlertCircle, Loader2, Play } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { importAllCSVFiles } from '@/utils/importCSVData';

export const PhraseImporter = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isBulkImporting, setIsBulkImporting] = useState(false);
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

  const handleBulkImport = async () => {
    setIsBulkImporting(true);
    setResults(null);

    try {
      toast({
        title: 'Starting bulk import',
        description: 'Importing all CSV files...',
      });

      const importResults = await importAllCSVFiles();
      
      const totalSuccess = importResults.reduce((sum, r) => sum + r.success, 0);
      const totalFailed = importResults.reduce((sum, r) => sum + r.failed + r.skipped, 0);
      const allErrors = importResults.flatMap(r => 
        r.errors.length > 0 ? [`${r.file}: ${r.errors.join(', ')}`] : []
      );

      setResults({
        success: totalSuccess,
        failed: totalFailed,
        errors: allErrors
      });

      if (totalSuccess > 0) {
        toast({
          title: 'Bulk import completed',
          description: `Successfully imported ${totalSuccess} phrases across all files`,
        });
      }

      if (totalFailed > 0) {
        toast({
          title: 'Some imports had issues',
          description: `${totalFailed} phrases failed or were skipped`,
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Bulk import failed',
        description: error instanceof Error ? error.message : 'Unknown error occurred',
        variant: 'destructive',
      });
      setResults({
        success: 0,
        failed: 0,
        errors: [error instanceof Error ? error.message : 'Unknown error']
      });
    } finally {
      setIsBulkImporting(false);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    const errors: string[] = [];

    try {
      const content = await file.text();

      toast({
        title: 'Processing phrases',
        description: 'Uploading to backend for normalization...',
      });

      // Call backend import function
      const { data, error } = await supabase.functions.invoke('import-phrases', {
        body: { csvContent: content }
      });

      if (error) {
        throw error;
      }

      const result = data as { success: number; failed: number; skipped: number; errors: string[] };
      
      setResults({ 
        success: result.success, 
        failed: result.failed + result.skipped, 
        errors: result.errors 
      });

      if (result.success > 0) {
        toast({
          title: 'Import completed',
          description: `Successfully imported ${result.success} phrases${result.skipped > 0 ? ` (${result.skipped} skipped)` : ''}`,
        });
      }

      if (result.failed > 0 || result.skipped > 0) {
        toast({
          title: 'Some imports had issues',
          description: `${result.failed} failed, ${result.skipped} skipped`,
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
              variant="default"
              onClick={handleBulkImport}
              disabled={isBulkImporting}
              className="flex items-center gap-2"
            >
              {isBulkImporting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Importing All Files...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  Import All CSV Files
                </>
              )}
            </Button>
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
                Importing...
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
