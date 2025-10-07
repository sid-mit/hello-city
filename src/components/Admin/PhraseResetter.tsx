import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Trash2, AlertTriangle } from 'lucide-react';

export const PhraseResetter = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [phraseCount, setPhraseCount] = useState<number | null>(null);

  const fetchPhraseCount = async () => {
    const { count, error } = await supabase
      .from('phrases')
      .select('*', { count: 'exact', head: true });
    
    if (error) {
      toast.error('Failed to fetch phrase count');
      return;
    }
    
    setPhraseCount(count);
    setShowConfirm(true);
  };

  const handleDeleteAll = async () => {
    setIsDeleting(true);
    try {
      const { error } = await supabase
        .from('phrases')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all rows
      
      if (error) throw error;
      
      toast.success(`Successfully deleted all ${phraseCount} phrases`);
      setPhraseCount(0);
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Failed to delete phrases: ' + (error as Error).message);
    } finally {
      setIsDeleting(false);
      setShowConfirm(false);
    }
  };

  return (
    <>
      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            Reset Phrase Database
          </CardTitle>
          <CardDescription>
            Delete all phrases from the database before re-importing corrected data.
            <strong className="block mt-2 text-foreground">⚠️ Warning: This action cannot be undone!</strong>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted p-4 rounded-lg space-y-2">
            <h4 className="font-semibold">Reset Process:</h4>
            <ol className="list-decimal list-inside space-y-1 text-sm">
              <li>Click "Delete All Phrases" below</li>
              <li>Confirm the deletion</li>
              <li>Use the Phrase Importer above to upload the corrected CSV</li>
              <li>Verify the Korean characters display correctly</li>
            </ol>
          </div>

          <Button
            onClick={fetchPhraseCount}
            disabled={isDeleting}
            variant="destructive"
            className="w-full"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete All Phrases
          </Button>
        </CardContent>
      </Card>

      <AlertDialog open={showConfirm} onOpenChange={setShowConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription className="space-y-2">
              <p>
                This will permanently delete <strong className="text-destructive">{phraseCount} phrases</strong> from the database.
              </p>
              <p className="font-semibold text-foreground">
                This action cannot be undone. Make sure you have the corrected CSV ready to re-import!
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteAll}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? 'Deleting...' : 'Yes, Delete All'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
