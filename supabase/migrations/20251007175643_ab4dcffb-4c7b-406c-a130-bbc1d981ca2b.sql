-- Phase 1: Remove is_gendered column (no longer needed with column-per-variant)
ALTER TABLE public.phrases DROP COLUMN IF EXISTS is_gendered;