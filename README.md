# 🛍️ ShopHub E-Commerce Platform

A modern, full-stack e-commerce web application built with React, Node.js, Express, and PostgreSQL.

![ShopHub Banner](https://via.placeholder.com/800x400/ea580c/ffffff?text=ShopHub+E-Commerce)

## ✨ Features

- 🛍️ **Product Browsing** - Search, filter by category, view detailed product information
- 🛒 **Shopping Cart** - Add/remove items, adjust quantities, persistent cart storage
- 🔐 **User Authentication** - Secure JWT-based login and registration with bcrypt password hashing
- 💳 **Payment Processing** - Integrated Stripe Checkout for secure transactions
- 📱 **Responsive Design** - Mobile-first UI built with Tailwind CSS
- 🎨 **Modern UI/UX** - Clean, professional interface with smooth animations

## 🛠️ Tech Stack

### Frontend
- **React 18** - Component-based UI library
- **Vite** - Fast build tool and dev server
- **React Router** - Client-side routing
- **Zustand** - Lightweight state management
- **Tailwind CSS** - Utility-first styling
- **Axios** - HTTP client
- **Lucide React** - Icon library

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **PostgreSQL** - Relational database
- **JWT** - Token-based authentication
- **bcrypt** - Password hashing
- **Stripe API** - Payment processing
- **express-validator** - Input validation

## 📂 Project Structure
```
shophub-complete/
├── backend/                 # Node.js/Express backend
│   ├── routes/             # API route handlers
│   ├── middleware/         # Auth & validation middleware
│   ├── db.js              # Database connection
│   ├── server.js          # Server entry point
│   └── schema.sql         # Database schema
│
└── frontend/               # React frontend
    ├── src/
    │   ├── components/    # Reusable components
    │   ├── pages/        # Page components
    │   ├── services/     # API services
    │   └── store/        # Zustand stores
    └── public/           # Static assets
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn
- Stripe account (for payments)

### Installation

#### 1. Clone the repository
```bash
git clone https://github.com/Munun/shophub.git
cd shophub
```

#### 2. Set up the database
```bash
# Create PostgreSQL database
createdb shophub

# Run schema
psql shophub < backend/schema.sql
```

#### 3. Configure environment variables

**Backend (.env):**
```bash
cd backend
cp .env.example .env
```

Edit `.env`:
```
PORT=5001
DB_USER=your_db_user
DB_HOST=localhost
DB_NAME=shophub
DB_PASSWORD=your_db_password
DB_PORT=5432
JWT_SECRET=your_super_secret_jwt_key_change_this
STRIPE_SECRET_KEY=your_stripe_secret_key
CLIENT_URL=http://localhost:5173
```

**Frontend (.env):**
```bash
cd frontend
cp .env.example .env
```

Edit `.env`:
```
VITE_API_URL=http://localhost:5001/api
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
```

#### 4. Install dependencies

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

#### 5. Start the application

**Backend (Terminal 1):**
```bash
cd backend
npm run dev
```
Server runs on `http://localhost:5001`

**Frontend (Terminal 2):**
```bash
cd frontend
npm run dev
```
App runs on `http://localhost:5173`

## 🎯 Usage

1. **Register/Login** - Create an account or use demo credentials:
   - Email: `test@example.com`
   - Password: `password123`

2. **Browse Products** - Search and filter by category

3. **Add to Cart** - Select size (if applicable) and quantity

4. **Checkout** - Complete purchase with Stripe test card:
   - Card: `4242 4242 4242 4242`
   - Expiry: Any future date
   - CVC: Any 3 digits

## 📊 Database Schema
```sql
users
├── id (PRIMARY KEY)
├── email (UNIQUE)
├── password_hash
├── full_name
└── created_at

products
├── id (PRIMARY KEY)
├── name
├── description
├── price
├── category
├── stock_quantity
└── sizes (ARRAY)

orders
├── id (PRIMARY KEY)
├── user_id (FOREIGN KEY)
├── total_amount
├── status
└── stripe_payment_id

order_items
├── id (PRIMARY KEY)
├── order_id (FOREIGN KEY)
├── product_id (FOREIGN KEY)
├── quantity
└── price_at_purchase
```

## 🔐 Security Features

- ✅ Password hashing with bcrypt (10 salt rounds)
- ✅ JWT authentication with HTTP-only recommendations
- ✅ SQL injection prevention with parameterized queries
- ✅ Input validation with express-validator
- ✅ CORS configuration
- ✅ Stripe handles all sensitive payment data

## 🚧 Future Enhancements

- [ ] Product reviews and ratings system
- [ ] Order history dashboard
- [ ] Admin panel for inventory management
- [ ] Email notifications (order confirmation, shipping)
- [ ] Wishlist functionality
- [ ] Promo code system
- [ ] Advanced filtering (price range, sort options)
- [ ] Product recommendations
- [ ] Stripe webhooks for payment confirmation
- [ ] Docker containerization
- [ ] CI/CD pipeline

## 📸 Screenshots

### Products Page
![Products Page]()
<img width="2056" height="1200" alt="image" src="https://github.com/user-attachments/assets/aa56abb7-12cf-4a1d-8ef6-3ef11ea3cc57" />

### Shopping Cart
![Shopping Cart]()
<img width="2048" height="1043" alt="image" src="https://github.com/user-attachments/assets/c8266851-d611-4884-bf17-f2497469326e" />


### Checkout
![Checkout]()
<img width="2034" height="634" alt="image" src="https://github.com/user-attachments/assets/7559a913-61b4-464d-9e73-8264b45e586a" />



## 👤 Author

**Munun Patel**
- Email: Patel.mun25@gmail.com
- LinkedIn: [linkedin.com/in/munun](https://linkedin.com/in/munun)
- GitHub: [@Munun](https://github.com/Munun)

## 🙏 Acknowledgments

- Stripe for payment processing
- Tailwind CSS for styling
- Lucide for icons
- PostgreSQL community

---

⭐ If you found this project helpful, please give it a star!
