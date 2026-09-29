# HairVision – AI HairStyle & HairCare Recommendation Platform

A modern, responsive, production-style full-stack MERN application that helps **men and women** discover suitable hairstyles based on facial geometry, hair texture, length, lifestyle, and maintenance preferences, while providing personalized daily hair-care routines and product recommendations.

---

## 🌟 Key Features

1. **Intelligent 100-Point Hairstyle Finder**:
   - 7-step consultative wizard:
     - Gender (Men, Women)
     - Face Shape (Oval, Round, Square, Heart, Diamond, Oblong, Rectangle)
     - Hair Type (Straight, Wavy, Curly, Coily)
     - Hair Length (Very Short, Short, Medium, Long)
     - Hair Thickness (Thin, Medium, Thick)
     - Lifestyle (College Student, Office / Professional, Casual, Party / Events, Sports / Active, Traditional)
     - Maintenance Preference (Low, Medium, High)
   - Weighted compatibility scoring algorithm:
     - Face Shape Match: **+30 pts**
     - Hair Type Match: **+25 pts**
     - Hair Length Match: **+15 pts**
     - Hair Thickness Match: **+10 pts**
     - Lifestyle Match: **+10 pts**
     - Maintenance Match: **+10 pts**
     - Total: **100%** maximum compatibility score.
   - Shows match percentage badge, compatibility star rating, and exact anatomical match reasons.

2. **Rich Curated Hairstyle Catalogs**:
   - **18 Men's Hairstyles**: Low Fade, Mid Fade, High Fade, Skin Fade, Buzz Cut, Crew Cut, French Crop, Textured Crop, Caesar Cut, Undercut, Slick Back, Side Part, Pompadour, Quiff, Messy Fringe, Curtains, Bro Flow, Man Bun.
   - **17 Women's Hairstyles**: Bob Cut, Long Layers, Curtain Bangs, Wolf Cut, Butterfly Cut, Pixie Cut, Shag Cut, U Cut, V Cut, Straight Long Hair, Shoulder-Length Layers, Blunt Bob, Side-Swept Bangs, Beach Waves, Layered Cut, Long Bob (Lob), Textured Shag.
   - Detailed hairstyle specifications: step-by-step styling routine, trim frequency, difficulty rating, and complementary product pairings.

3. **Visual Consultation & Photo Analysis Staging ("Analyze My Hair")**:
   - Drag-and-drop portrait photo uploader with preview and remove.
   - Clean architectural hook for integrating real computer vision APIs.
   - Interactive manual confirmation of face shape, hair type, length, and density.

4. **Daily Hair Care Protocols**:
   - Texture-specific routines for **Straight, Wavy, Curly, and Coily** hair.
   - **Morning Routine**: Detangling, volume elevation, and UV/environmental defense.
   - **Weekly Routine**: Cleansing cadence, deep conditioning masks, and scalp care.
   - **Hair Concerns Guide**: Evidence-backed care for Dry Hair, Frizzy Hair, Oily Hair, Dandruff, Hair Breakage, Split Ends, Damaged Hair, and Lack of Volume with clinical dermatology consult reminders.

5. **Filterable Products Catalog**:
   - 22+ formulations across all 11 core categories: Shampoo, Conditioner, Hair Oil, Hair Serum, Hair Mask, Hair Cream, Hair Wax, Hair Gel, Heat Protectant, Hair Spray, Scalp Care.
   - Live filtering by Category, Hair Type, Max Price, and Minimum Rating.

6. **User Authentication & Dashboard**:
   - Secure JWT authentication with bcrypt password hashing.
   - Protected routes.
   - User Dashboard featuring:
     - Profile overview and personal traits editor.
     - Bookmarked favorite hairstyles.
     - Saved products wishlist.
     - Historical recommendation logs.
     - Personalized daily routine checklist.

7. **Admin Control Panel**:
   - Real-time platform analytics: total users, hairstyles count (men vs women), products, and recommendations.
   - Hairstyle management: Add, edit, and delete hairstyles.
   - Product management: Add, edit, and delete products.
   - User management: View registered users and promote/demote roles.

8. **Dual-Mode Database Architecture**:
   - Seamlessly connects to MongoDB Atlas or local MongoDB via `MONGODB_URI`.
   - If local MongoDB daemon is not running, it automatically spins up an embedded `mongodb-memory-server` in development mode and auto-seeds all 35 hairstyles, 22 products, and admin accounts.

---

## 🛠️ Technology Stack

### Frontend
- **React.js (v18)** + **Vite**
- **Tailwind CSS** (Custom luxury salon theme)
- **React Router (v6)**
- **Axios** (Centralized API client with JWT interceptor)
- **Lucide React** (Modern iconography)

### Backend
- **Node.js** + **Express.js** (REST API)
- **MongoDB** + **Mongoose**
- **JWT (jsonwebtoken)** + **bcryptjs**
- **CORS** + **dotenv** + **morgan**
- **mongodb-memory-server** (Automatic zero-setup development fallback)

---

## 📁 Project Structure

```
project.js/
├── backend/
│   ├── config/
│   │   └── db.js                 # Database connection + memory server fallback
│   ├── controllers/
│   │   ├── authController.js     # Auth, register, profile
│   │   ├── hairstyleController.js# Hairstyle CRUD + filters
│   │   ├── recommendationController.js # 100-pt scoring engine
│   │   ├── productController.js  # Product catalog CRUD
│   │   ├── haircareController.js # Routines & hair concerns
│   │   ├── favoriteController.js # User bookmarks
│   │   └── adminController.js    # Admin stats & user management
│   ├── middleware/
│   │   ├── authMiddleware.js     # JWT verification & adminOnly check
│   │   └── errorMiddleware.js    # Global error handler
│   ├── models/
│   │   ├── User.js
│   │   ├── Hairstyle.js
│   │   ├── Product.js
│   │   ├── Recommendation.js
│   │   └── Favorite.js
│   ├── routes/                   # Express API routes
│   ├── seed/
│   │   ├── hairstylesData.js     # 35 hairstyles dataset
│   │   ├── productsData.js       # 22 products dataset
│   │   ├── haircareData.js       # Hair routines & concerns
│   │   └── seed.js               # CLI & auto-seed script
│   ├── utils/
│   │   └── scoringEngine.js      # Weighted algorithm
│   ├── .env.example
│   ├── .env
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── api/                  # Centralized API modules
│   │   ├── components/
│   │   │   ├── common/           # Navbar, Footer, StarRating, etc.
│   │   │   ├── hairstyles/       # HairstyleCard
│   │   │   └── products/         # ProductCard
│   │   ├── context/
│   │   │   ├── AuthContext.jsx   # Global auth state
│   │   │   └── ToastContext.jsx  # Floating toast system
│   │   ├── pages/                # All 11 platform pages
│   │   ├── routes/               # Protected & public routes
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
└── README.md
```

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v18+ recommended, tested on v24)
- npm (v9+)

### 1. Backend Setup
```bash
cd backend
npm install
npm run seed     # (Optional: seeds DB immediately)
npm start        # Runs backend on port 5000
```

> **Note on MongoDB**: If you have MongoDB Atlas, paste your connection URI into `backend/.env`. If you don't have MongoDB running locally, the server will automatically launch an embedded in-memory MongoDB server and seed it for you!

### 2. Frontend Setup
In a new terminal:
```bash
cd frontend
npm install
npm run dev      # Runs frontend on http://localhost:5173
```

Open your browser to `http://localhost:5173`.

---

## 🔑 Pre-Seeded Test Credentials

| Role | Email | Password |
|---|---|---|
| **Administrator** | `admin@hairvision.com` | `Admin@12345` |
| **Demo User** | `karthik@example.com` | `Password@123` |

*(You can also click the quick login buttons on the `/login` page for 1-click access!)*

---

## 📡 REST API Reference

### Authentication
- `POST /api/auth/register` - Create user account
- `POST /api/auth/login` - Authenticate & obtain JWT
- `GET  /api/auth/me` - Get profile (Protected)
- `PUT  /api/auth/profile` - Update profile & hair traits (Protected)

### Recommendations & Scoring
- `POST /api/recommendations` - Run 100-pt compatibility scoring engine
- `GET  /api/recommendations/history` - Get user consultation history (Protected)

### Hairstyles
- `GET    /api/hairstyles` - Filterable query (`gender`, `faceShape`, `hairType`, `maintenance`, `search`)
- `GET    /api/hairstyles/:id` - Get hairstyle details, similar styles & products
- `POST   /api/hairstyles` - Add hairstyle (Admin only)
- `PUT    /api/hairstyles/:id` - Update hairstyle (Admin only)
- `DELETE /api/hairstyles/:id` - Delete hairstyle (Admin only)

### Products
- `GET    /api/products` - Filter by category, hair type, maxPrice, minRating, search
- `GET    /api/products/:id` - Get product details & related items
- `POST   /api/products` - Create product (Admin only)
- `PUT    /api/products/:id` - Update product (Admin only)
- `DELETE /api/products/:id` - Delete product (Admin only)

### Hair Care
- `GET /api/haircare/routines/:hairType?` - Routines for Straight, Wavy, Curly, Coily
- `GET /api/haircare/concerns` - All 8 hair concerns & protocols
- `GET /api/haircare/concerns/:id` - Specific concern breakdown

### Favorites
- `GET    /api/favorites` - Get user saved hairstyles & products (Protected)
- `POST   /api/favorites` - Add item to favorites (Protected)
- `DELETE /api/favorites/:id` - Remove item from favorites (Protected)
- `GET    /api/favorites/check/:itemId` - Check favorite status (Protected)

### Admin
- `GET /api/admin/stats` - Total users, styles, products, recommendations (Admin only)
- `GET /api/admin/users` - List all users (Admin only)
- `PUT /api/admin/users/:id/role` - Toggle user role (Admin only)

---

## ☁️ Deployment Instructions

### Deploy Frontend to Vercel
1. Set framework preset to **Vite**.
2. Root Directory: `frontend`
3. Build Command: `npm run build`
4. Output Directory: `dist`
5. Environment Variable: `VITE_API_BASE_URL=https://your-backend-url.onrender.com/api`

### Deploy Backend to Render / Railway
1. Root Directory: `backend`
2. Build Command: `npm install`
3. Start Command: `npm start`
4. Environment Variables:
   - `PORT=5000`
   - `MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/hairvision?retryWrites=true&w=majority`
   - `JWT_SECRET=your_production_secret_key`
   - `NODE_ENV=production`

---

## ⚖️ Disclaimer
HairVision recommendations are designed for styling, aesthetic facial symmetry, and cosmetic grooming purposes. For persistent or severe scalp scaling, hair thinning, or skin conditions, please consult a certified dermatologist or licensed medical trichologist.
