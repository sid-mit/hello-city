import { BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/stores/appStore';

export const LearnTab = () => {
  const { setActiveTab } = useAppStore();

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center">
      {/* Empty State */}
      <div className="max-w-md space-y-6">
        <div className="text-6xl mb-4">📚</div>
        
        <h2 className="text-2xl font-bold text-foreground">
          No saved phrases yet
        </h2>
        
        <p className="text-muted-foreground text-base">
          Tap ⭐ on any situation card to save it for practice
        </p>
        
        <Button
          onClick={() => setActiveTab('explore')}
          className="bg-primary hover:bg-primary-dark text-primary-foreground"
        >
          ← Go to Explore
        </Button>
      </div>
    </div>
  );
};
