-- Create phrases table for multilingual phrase database
CREATE TABLE public.phrases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  city TEXT NOT NULL,
  spot_type TEXT NOT NULL,
  sub_scenario TEXT NOT NULL,
  phrase_key TEXT NOT NULL UNIQUE,
  lang_code TEXT NOT NULL,
  translation_en TEXT NOT NULL,
  
  -- Neutral variant (always present)
  neutral_native TEXT NOT NULL,
  neutral_romanized TEXT NOT NULL,
  neutral_tts TEXT NOT NULL,
  
  -- Female variant (for gendered languages)
  female_native TEXT,
  female_romanized TEXT,
  female_tts TEXT,
  
  -- Male variant (for gendered languages)
  male_native TEXT,
  male_romanized TEXT,
  male_tts TEXT,
  
  -- Computed column to detect gendered languages
  is_gendered BOOLEAN GENERATED ALWAYS AS (
    female_native IS NOT NULL AND male_native IS NOT NULL
  ) STORED,
  
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for fast lookup
CREATE INDEX idx_phrases_phrase_key ON public.phrases(phrase_key);
CREATE INDEX idx_phrases_city ON public.phrases(city);
CREATE INDEX idx_phrases_city_spot_type ON public.phrases(city, spot_type);
CREATE INDEX idx_phrases_lang_code ON public.phrases(lang_code);
CREATE INDEX idx_phrases_spot_sub ON public.phrases(spot_type, sub_scenario);

-- Enable Row Level Security
ALTER TABLE public.phrases ENABLE ROW LEVEL SECURITY;

-- Public read policy (all users can read phrases)
CREATE POLICY "Phrases are publicly readable"
  ON public.phrases
  FOR SELECT
  USING (true);

-- Admin insert policy (for CSV import - will use service role key)
CREATE POLICY "Service role can insert phrases"
  ON public.phrases
  FOR INSERT
  WITH CHECK (true);

-- Admin update policy
CREATE POLICY "Service role can update phrases"
  ON public.phrases
  FOR UPDATE
  USING (true);

-- Trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_phrases_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_phrases_timestamp
BEFORE UPDATE ON public.phrases
FOR EACH ROW
EXECUTE FUNCTION public.update_phrases_updated_at();