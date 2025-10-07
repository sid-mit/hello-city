-- Step 1: Delete the older duplicate (keeping the newer one)
DELETE FROM phrases 
WHERE id = '4ffd41c3-fe9b-42d2-9011-24cda66fea91';

-- Step 2: Add unique index to prevent future duplicates
CREATE UNIQUE INDEX IF NOT EXISTS phrases_city_phrase_key_unique
ON public.phrases (city, phrase_key);

-- Step 3: Ensure trigger exists for updated_at
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'set_phrases_updated_at' 
  ) THEN
    CREATE TRIGGER set_phrases_updated_at
    BEFORE UPDATE ON public.phrases
    FOR EACH ROW
    EXECUTE FUNCTION public.update_phrases_updated_at();
  END IF;
END$$;