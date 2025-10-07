import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, AlertCircle, Loader2, ArrowLeft } from 'lucide-react';
import { importAllCSVFiles } from '@/utils/importCSVData';
import { useToast } from '@/hooks/use-toast';

const AdminImport = () => {
  const [isImporting, setIsImporting] = useState(true);
  const [results, setResults] = useState<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const runImport = async () => {
      try {
        toast({
          title: 'Starting import',
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
          errors: allErrors,
          details: importResults
        });

        if (totalSuccess > 0) {
          toast({
            title: 'Import completed',
            description: `Successfully imported ${totalSuccess} phrases`,
          });
        }
      } catch (error) {
        toast({
          title: 'Import failed',
          description: error instanceof Error ? error.message : 'Unknown error',
          variant: 'destructive',
        });
        setResults({
          success: 0,
          failed: 0,
          errors: [error instanceof Error ? error.message : 'Unknown error'],
          details: []
        });
      } finally {
        setIsImporting(false);
      }
    };

    runImport();
  }, [toast]);

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="container mx-auto max-w-4xl">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to App
        </Button>

        <Card className="p-8">
          <h1 className="text-3xl font-bold mb-6">Database Import</h1>

          {isImporting && (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
              <p className="text-lg">Importing phrases from all CSV files...</p>
              <p className="text-sm text-muted-foreground mt-2">This may take a minute</p>
            </div>
          )}

          {!isImporting && results && (
            <div className="space-y-6">
              {results.success > 0 && (
                <Alert className="border-green-500">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <AlertDescription>
                    <strong>Successfully imported {results.success} phrases</strong>
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

              {results.details && results.details.length > 0 && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Import Details:</h3>
                  {results.details.map((detail: any, idx: number) => (
                    <Card key={idx} className="p-4">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{detail.file}</span>
                        <div className="flex gap-4 text-sm">
                          <span className="text-green-600">✓ {detail.success}</span>
                          {(detail.failed + detail.skipped) > 0 && (
                            <span className="text-red-600">✗ {detail.failed + detail.skipped}</span>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}

              {results.errors.length > 0 && (
                <div className="space-y-2">
                  <h3 className="font-semibold text-destructive">Errors:</h3>
                  <div className="text-sm text-muted-foreground space-y-1 max-h-60 overflow-y-auto">
                    {results.errors.map((error: string, idx: number) => (
                      <div key={idx} className="pl-4">• {error}</div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-4 pt-4">
                <Button onClick={() => navigate('/')}>
                  Go to App
                </Button>
                <Button variant="outline" onClick={() => window.location.reload()}>
                  Import Again
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default AdminImport;
