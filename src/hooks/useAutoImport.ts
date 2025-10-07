import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { importAllCSVFiles } from '@/utils/importCSVData';
import { toast } from '@/hooks/use-toast';

export const useAutoImport = () => {
  const [isImporting, setIsImporting] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAndImport = async () => {
      // Check if we've already imported (localStorage flag)
      const hasImported = localStorage.getItem('phrases_imported');
      if (hasImported === 'true') {
        setIsChecking(false);
        return;
      }

      try {
        // Check if phrases table has data
        const { count, error } = await supabase
          .from('phrases')
          .select('*', { count: 'exact', head: true });

        if (error) throw error;

        // If table is empty, trigger import
        if (count === 0) {
          setIsImporting(true);
          toast({
            title: "Setting up your data",
            description: "First-time setup: importing phrase database...",
          });

          const results = await importAllCSVFiles();
          
          const totalSuccess = results.reduce((sum, r) => sum + r.success, 0);
          const totalFailed = results.reduce((sum, r) => sum + r.failed, 0);

          if (totalSuccess > 0) {
            localStorage.setItem('phrases_imported', 'true');
            toast({
              title: "Setup complete!",
              description: `Successfully imported ${totalSuccess} phrases. Ready to explore!`,
            });
          } else {
            toast({
              title: "Import failed",
              description: `Failed to import data. Please try manually at /admin/import`,
              variant: "destructive",
            });
          }

          setIsImporting(false);
        }
        
        setIsChecking(false);
      } catch (error) {
        console.error('Auto-import error:', error);
        setIsChecking(false);
        setIsImporting(false);
      }
    };

    checkAndImport();
  }, []);

  return { isImporting, isChecking };
};
