-- Normalize city names to match app city IDs (lowercase with hyphens)
UPDATE phrases 
SET city = 'beijing' 
WHERE city = 'Beijing';

UPDATE phrases 
SET city = 'new-delhi' 
WHERE city = 'new delhi';