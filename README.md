# HairVision – AI-Powered Hair Analysis & Recommendation System

[![HairVision AI](https://img.shields.io/badge/HairVision-v1.0.0-10b981.svg)](https://github.com/)
[![React 19](https://img.shields.io/badge/Frontend-React%2019%20%2B%20Vite-38bdf8.svg)](https://react.dev/)
[![Node Express](https://img.shields.io/badge/Backend-Node.js%20%2B%20Express-84cc16.svg)](https://expressjs.com/)
[![Database](https://img.shields.io/badge/Database-MongoDB%20%2F%20Resilient%20Fallback-10b981.svg)](https://www.mongodb.com/)
[![AI Vision](https://img.shields.io/badge/AI%20Vision-Google%20Gemini%20%2B%20Demo%20Mode-a855f7.svg)](https://ai.google.dev/)

HairVision is a full-stack web application designed to help users understand their hair condition, identify visible scalp & strand concerns, explore flattering hairstyles, and receive tailored 7-day care regimens through AI-assisted optical analysis.

---

## 🌟 Key Features

### 1. 🔬 AI Optical Hair & Scalp Analysis (Core Feature)
- **Multi-Source Image Input**: Drag-and-drop or upload JPG, PNG, WEBP files, or test immediately with 4 one-click photographic sample archetypes (Straight, Wavy, Curly, Coily).
- **Interactive Visual Scanner**: Animated laser sweep visualizer simulating optical follicular inspection.
- **Follicular Density Gauge**: SVG circular score indicator (0–100%) categorizing density from Fine to High Density Volume.
- **Pattern & Texture Classification**: Categorizes strand morphology from Type 1A to Type 4C.
- **Visible Scalp Barrier Evaluation**: Analyzes root surface reflectivity to identify normal, dry, or sebum-congested scalp states.
- **Identified Considerations**: Detects signs of cuticle roughness, split ends, frizz risk, and product buildup with severity ratings (*Mild*, *Moderate*, *Noticeable*).
- **Personalized Regimen Matrix**: 
  - Customized wash frequencies and shampoo types.
  - Conditioning techniques and cuticle-sealing methods.
  - Scalp stimulation frequencies.
  - Recommended active ingredients (*Rosemary peptide, Murumuru butter, Silk protein*) vs. ingredients to avoid (*Harsh sulfates, drying alcohols*).
- **Clinical Transparency**: Prominently labels educational observations and explains that image analysis cannot replace medical dermatological biopsies.

### 2. ✂️ Hairstyle Recommendation & 2026 Lookbook
- **Interactive AI Style Matcher**: Choose your facial contour (Oval, Round, Square, Heart, Diamond) and hair pattern for instant scored compatibility recommendations.
- **Filter & Search Engine**: Filter by hair type, face shape, length (Short, Medium, Long), and maintenance level.
- **Hairstyle Blueprint Modals**: Detailed cards with high-resolution imagery, step-by-step styling rituals, difficulty ratings, and stylist advice.

### 3. 📅 7-Day Personalized Care Routine
- **Interactive Weekly Calendar**: Monday through Sunday care schedules tailored to straight, wavy, curly, or coily textures.
- **Checkable Daily Tasks**: Wash days, scalp massagers, overnight silk wraps, and mid-week moisture refreshes with interactive checklist tracking.
- **Trichology Golden Rules**: Scientifically grounded habits for preventing mechanical breakage and balancing the scalp microbiome.

### 4. 🔐 User Authentication & Scan History
- **JWT Authentication & Password Hashing**: Secure user registration, login, and persistent sessions using `bcryptjs` and `jsonwebtoken`.
- **Private Hair History**: Logged-in users automatically save all scans to their profile to track density scores and scalp progression over time.
- **Zero-Config Resilient Database**: Automatically connects to local or Atlas MongoDB; if MongoDB is not active, seamlessly activates a local resilient data store (`backend/data/db.json`) so the application operates immediately with zero manual setup!

### 5. 🤖 AI Vision & Demo Mode
- **Dual Pipeline Engine**:
  - **Live AI Mode**: Configure `GEMINI_API_KEY` in `backend/.env` for real-time multi-modal vision inspection via Google Gemini 1.5 Flash.
  - **Demo Simulation Mode**: If no API key is provided, the backend operates in an intelligent heuristic simulation mode, clearly badged with transparent user notifications so users can explore the full experience without prerequisites.

---

## 🛠️ Technology Stack

- **Frontend**: React 19, Vite, React Router DOM v7, Axios, Lucide React icons, Canvas Confetti, CSS3 Custom Properties (Design System).
- **Backend**: Node.js, Express.js, REST API, JWT Authentication, bcryptjs, Multer for image processing, CORS.
- **Database**: MongoDB with Mongoose + Local JSON resilient fallback store.
- **AI Vision**: Google Gemini Vision API (`gemini-1.5-flash`) + Intelligent Heuristic Demo Simulator.

---

## 🚀 Quick Start Guide

### 1. Install Dependencies
```bash
# Backend dependencies
npm --prefix backend install

# Frontend dependencies
npm --prefix frontend install
```

### 2. Configure Environment (Optional)
Inspect `backend/.env`:
```env
PORT=5000
CLIENT_URL=http://localhost:5173
MONGODB_URI=mongodb://localhost:27017/hairvision
JWT_SECRET=hairvision_secret_jwt_key_2026_super_secure

# Optional: Add your Google Gemini API Key for live vision model
# If left blank, HairVision automatically runs in clearly labelled Demo Mode!
GEMINI_API_KEY=
```

### 3. Launch Both Backend & Frontend
Run the all-in-one launcher script:
```bash
node start-all.js
```
Or run separately:
```bash
# Terminal 1 (Backend on http://localhost:5000):
npm --prefix backend start

# Terminal 2 (Frontend on http://localhost:5173):
npm --prefix frontend run dev
```

Open your browser at: **`http://localhost:5173`**

---

## 🧪 Demo Test Credentials

To quickly test authenticated features without typing:
- **Email**: `alex@example.com`
- **Password**: `password123`
*(Or click the "Quick-Fill Sample Credentials" button on the Sign-In page!)*

---

## 📋 API Endpoints Summary

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | System health, DB connection status & AI mode diagnostics |
| `POST` | `/api/auth/register` | Register new user account |
| `POST` | `/api/auth/login` | Sign in & receive JWT bearer token |
| `GET` | `/api/auth/me` | Fetch authenticated user profile |
| `PUT` | `/api/auth/profile` | Update user hair profile & preferences |
| `POST` | `/api/analysis/scan` | Upload hair photo or preset for AI/Demo analysis |
| `GET` | `/api/analysis/presets/sample-images` | Get one-click sample hair photographs |
| `GET` | `/api/analysis/history` | Retrieve saved scans for logged-in user |
| `GET` | `/api/analysis/:id` | Fetch specific scan record |
| `DELETE` | `/api/analysis/:id` | Delete scan from user history |
| `GET` | `/api/hairstyles` | Query hairstyles with search and multi-attribute filters |
| `POST` | `/api/hairstyles/recommendations` | Get ranked cuts based on face shape & hair type |
| `POST` | `/api/routine/generate` | Generate 7-day personalized care calendar |

---

## ⚖️ Clinical & Educational Disclaimer

HairVision is an educational platform designed for cosmetic strand classification and personalized hair care ritual planning. Visual assessments generated through computer vision do not constitute medical diagnoses and cannot detect microscopic follicular pathologies, clinical scarring alopecias, or hormonal conditions. Always consult a board-certified dermatologist or trichologist for clinical evaluations.
