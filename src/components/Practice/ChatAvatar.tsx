import { cn } from "@/lib/utils";

interface ChatAvatarProps {
  speaker: 'you' | 'other';
  className?: string;
}

export const ChatAvatar = ({ speaker, className }: ChatAvatarProps) => {
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full bg-muted border-2 border-border flex-shrink-0",
        "w-10 h-10 md:w-12 md:h-12",
        className
      )}
    >
      <span className="text-lg md:text-xl">
        {speaker === 'other' ? '👥' : '👤'}
      </span>
    </div>
  );
};
