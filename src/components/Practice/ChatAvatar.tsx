interface ChatAvatarProps {
  speaker: 'you' | 'other';
}

export const ChatAvatar = ({ speaker }: ChatAvatarProps) => {
  return (
    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-muted flex items-center justify-center text-lg">
      {speaker === 'other' ? '👥' : '👤'}
    </div>
  );
};
