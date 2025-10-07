-- Remove the incorrect unique constraint on phrase_key
-- phrase_key should not be globally unique across all cities/contexts
ALTER TABLE public.phrases DROP CONSTRAINT IF EXISTS phrases_phrase_key_key;

-- Optionally, add a composite unique constraint to prevent true duplicates
-- This allows the same phrase_key in different cities/spot_types/sub_scenarios
-- Uncomment if you want to prevent exact duplicates:
-- ALTER TABLE public.phrases 
-- ADD CONSTRAINT phrases_unique_context 
-- UNIQUE (city, spot_type, sub_scenario, phrase_key);