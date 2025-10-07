import { motion } from 'framer-motion';
import { User, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

export type GenderVariant = 'neutral' | 'female' | 'male';
export type LanguageCode = 'ko-KR' | 'zh-CN' | 'hi-IN' | 'fr-FR' | 'es-ES';

const GENDERED_LANGUAGES: LanguageCode[] = ['hi-IN', 'fr-FR', 'es-ES'];

interface GenderSelectorProps {
  langCode: LanguageCode;
  currentGender: GenderVariant;
  onGenderChange: (gender: GenderVariant) => void;
  className?: string;
}

// Only female/male for gendered languages (neutral is same as female)
const genderOptions = [
  { value: 'female' as GenderVariant, label: 'Female', icon: User, emoji: '👩' },
  { value: 'male' as GenderVariant, label: 'Male', icon: User, emoji: '👨' },
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

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "inline-flex items-center gap-1 p-1 rounded-lg bg-muted/50 border border-border",
        className
      )}
    >
      <span className="text-xs text-muted-foreground px-2 hidden sm:block">
        Gender:
      </span>
      
      {genderOptions.map((option) => {
        const isActive = currentGender === option.value;
        const Icon = option.icon;
        
        return (
          <button
            key={option.value}
            onClick={() => onGenderChange(option.value)}
            className={cn(
              "relative px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200",
              "hover:bg-accent/10 focus:outline-none focus:ring-2 focus:ring-primary/20",
              isActive 
                ? "bg-primary text-primary-foreground shadow-sm" 
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {isActive && (
              <motion.div
                layoutId="activeGender"
                className="absolute inset-0 bg-primary rounded-md"
                style={{ zIndex: -1 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            
            <span className="relative flex items-center gap-1.5">
              <span className="text-base">{option.emoji}</span>
              <span className="hidden sm:inline">{option.label}</span>
            </span>
          </button>
        );
      })}
    </motion.div>
  );
}

// Demo component to showcase the gender selector
export function GenderSelectorDemo() {
  const [hindiGender, setHindiGender] = React.useState<GenderVariant>('female');
  const [frenchGender, setFrenchGender] = React.useState<GenderVariant>('male');
  const [koreanGender, setKoreanGender] = React.useState<GenderVariant>('neutral');

  return (
    <div className="space-y-8 p-8 bg-card rounded-xl border border-border shadow-soft">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Hindi</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Female/Male toggle for gendered phrases
          </p>
          <GenderSelector
            langCode="hi-IN"
            currentGender={hindiGender}
            onGenderChange={setHindiGender}
          />
          <p className="mt-3 text-sm text-muted-foreground">
            Current: <span className="font-semibold text-foreground">{hindiGender}</span>
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">French</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Female/Male toggle for gendered phrases
          </p>
          <GenderSelector
            langCode="fr-FR"
            currentGender={frenchGender}
            onGenderChange={setFrenchGender}
          />
          <p className="mt-3 text-sm text-muted-foreground">
            Current: <span className="font-semibold text-foreground">{frenchGender}</span>
          </p>
        </div>
      </div>

      <div className="border-t border-border pt-6">
        <h3 className="text-lg font-semibold mb-2">Korean (Non-Gendered)</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Toggle auto-hidden for non-gendered languages
        </p>
        <GenderSelector
          langCode="ko-KR"
          currentGender={koreanGender}
          onGenderChange={setKoreanGender}
        />
        <p className="text-sm text-muted-foreground italic">
          ↑ No toggle shown (Korean doesn't use gendered phrases)
        </p>
      </div>

      <div className="border-t border-border pt-6">
        <h3 className="text-lg font-semibold mb-2">Example Usage in Practice</h3>
        <div className="bg-muted/30 rounded-lg p-4 space-y-3 border border-border">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-medium">भैया मेनू दिखाइए।</p>
              <p className="text-sm text-muted-foreground">Bhaiya menu dikhaiye.</p>
              <p className="text-xs text-muted-foreground mt-1">Can I see the menu?</p>
            </div>
            <GenderSelector
              langCode="hi-IN"
              currentGender={hindiGender}
              onGenderChange={setHindiGender}
              className="flex-shrink-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Export for use in other components
export { GENDERED_LANGUAGES };

// For React import
import * as React from 'react';
