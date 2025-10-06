import { ChevronRight } from "lucide-react";

interface NextStepPreviewProps {
  nextPhrase?: string;
  remainingSteps: number;
}

export const NextStepPreview = ({ nextPhrase, remainingSteps }: NextStepPreviewProps) => {
  if (!nextPhrase) return null;

  return (
    <div className="border-t pt-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <ChevronRight className="h-4 w-4" />
        <span className="font-medium">Next: {nextPhrase}</span>
      </div>
      {remainingSteps > 1 && (
        <p className="text-xs text-muted-foreground ml-6 mt-1">
          ({remainingSteps - 1} more step{remainingSteps - 1 !== 1 ? 's' : ''} after this)
        </p>
      )}
    </div>
  );
};
