import { motion } from 'framer-motion';
import { User } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type GenderVariant = 'neutral' | 'female' | 'male';
export type LanguageCode = 'ko-KR' | 'zh-CN' | 'hi-IN' | 'fr-FR' | 'es-MX';

const GENDERED_LANGUAGES: LanguageCode[] = ['hi-IN', 'fr-FR', 'es-MX'];

interface GenderSelectorProps {
  langCode: LanguageCode;
  currentGender: GenderVariant;
  onGenderChange: (gender: GenderVariant) => void;
  className?: string;
}

// Only female/male for gendered languages (neutral is same as female)
const genderOptions = [
  { value: 'female' as GenderVariant, label: 'Female', emoji: '👩' },
  { value: 'male' as GenderVariant, label: 'Male', emoji: '👨' },
];

export function GenderSelector({ 
  langCode, 
  currentGender, 
  onGenderChange,
  className 
}: GenderSelectorProps) {
  // Hide for non-gendered languages
  const isGendered = GENDERED_LANGUAGES.includes(langCode);
  
  if (!isGendered) return null;

  const currentOption = genderOptions.find(opt => opt.value === currentGender) || genderOptions[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-full",
            "bg-background/80 backdrop-blur-sm border border-border",
            "hover:bg-accent transition-colors",
            "text-sm font-medium",
            className
          )}
        >
          <span className="text-base">{currentOption.emoji}</span>
          <span className="text-xs text-muted-foreground">{currentOption.label}</span>
        </motion.button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-36">
        {genderOptions.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => onGenderChange(option.value)}
            className={cn(
              "flex items-center gap-2 cursor-pointer",
              currentGender === option.value && "bg-accent"
            )}
          >
            <span className="text-base">{option.emoji}</span>
            <span>{option.label}</span>
            {currentGender === option.value && (
              <span className="ml-auto text-primary">✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}


// Export for use in other components
export { GENDERED_LANGUAGES };

// For React import
import * as React from 'react';
