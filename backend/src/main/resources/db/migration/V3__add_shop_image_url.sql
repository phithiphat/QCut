-- Add imageUrl column to shops table
ALTER TABLE shops ADD COLUMN IF NOT EXISTS image_url VARCHAR(500);
