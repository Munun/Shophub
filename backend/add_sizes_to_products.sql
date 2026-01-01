-- Add sizes column to products table
ALTER TABLE products ADD COLUMN sizes TEXT[];

-- Update existing products with sizes where applicable
UPDATE products SET sizes = ARRAY['S', 'M', 'L', 'XL'] WHERE category IN ('Fashion', 'Sports');
UPDATE products SET sizes = ARRAY['One Size'] WHERE category IN ('Electronics', 'Home');

-- Add full_description column
ALTER TABLE products ADD COLUMN full_description TEXT;

-- Update with full descriptions
UPDATE products SET full_description = description || ' This premium product features high-quality materials, excellent craftsmanship, and modern design. Perfect for everyday use with outstanding durability and performance.' WHERE full_description IS NULL;
