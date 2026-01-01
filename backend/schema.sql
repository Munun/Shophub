-- ShopHub Database Schema

-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products table
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    image_url VARCHAR(500),
    category VARCHAR(100),
    stock_quantity INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders table
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    total_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    stripe_payment_id VARCHAR(255),
    shipping_address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Order items table
CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
    product_id INTEGER REFERENCES products(id),
    quantity INTEGER NOT NULL,
    price_at_purchase DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for better performance
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);

-- Sample products
INSERT INTO products (name, description, price, image_url, category, stock_quantity) VALUES
('Wireless Headphones', 'Premium noise-cancelling headphones with 30-hour battery life', 199.99, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800', 'Electronics', 50),
('Smart Watch', 'Fitness tracker with heart rate monitor and GPS', 299.99, 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800', 'Electronics', 30),
('Leather Backpack', 'Handcrafted genuine leather backpack for professionals', 149.99, 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800', 'Fashion', 25),
('Running Shoes', 'Lightweight running shoes with advanced cushioning', 129.99, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800', 'Sports', 40),
('Coffee Maker', 'Programmable drip coffee maker with thermal carafe', 89.99, 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=800', 'Home', 35),
('Yoga Mat', 'Non-slip premium yoga mat with carrying strap', 39.99, 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800', 'Sports', 60),
('Desk Lamp', 'Modern LED desk lamp with adjustable brightness', 59.99, 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800', 'Home', 45),
('Sunglasses', 'Polarized UV protection sunglasses', 79.99, 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800', 'Fashion', 55);

-- Admin user (email: admin@shophub.com, password: admin123)
INSERT INTO users (email, password_hash, full_name, is_admin) VALUES
('admin@shophub.com', '$2b$10$rKJ5Z7FQN8qN3Z3Z3Z3Z3OqN3Z3Z3Z3Z3Z3Z3Z3Z3Z3Z3Z3Z3Z3Z2', 'Admin User', TRUE);
