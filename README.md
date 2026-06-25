# 🍽️ Restaurant Website

A full-stack restaurant web application built with **React + TypeScript** (frontend) and **Django REST Framework** (backend). Features include online menu browsing, cart management, order placement, reservations, and an admin dashboard.

---

## Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| React 18 + TypeScript | UI framework |
| Vite | Build tool & dev server |
| Tailwind CSS | Styling |
| React Router | Client-side routing |

### Backend
| Technology | Purpose |
|------------|---------|
| Django | Backend framework |
| Django REST Framework | REST API |
| PostgreSQL / SQLite | Database |

---

## 📁 Project Structure

```
Resturant Website/
├── app/                        # Frontend (React + TypeScript)
│   ├── public/
│   │   ├── images/             # Static images
│   │   └── videos/             # Static videos
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/             # Reusable UI components
│   │   │   ├── Footer.tsx
│   │   │   └── Navigation.tsx
│   │   ├── hooks/
│   │   │   ├── use-mobile.ts
│   │   │   ├── useAuth.ts
│   │   │   └── useCart.tsx
│   │   ├── lib/                # Utility functions
│   │   ├── pages/
│   │   │   ├── Home.tsx
│   │   │   ├── MenuPage.tsx
│   │   │   ├── CartPage.tsx
│   │   │   ├── OrdersPage.tsx
│   │   │   ├── ReservationsPage.tsx
│   │   │   ├── LoginPage.tsx
│   │   │   ├── RegisterPage.tsx
│   │   │   ├── AboutPage.tsx
│   │   │   └── AdminDashboard.tsx
│   │   ├── services/
│   │   │   ├── api.ts          # Axios API calls
│   │   │   └── demoData.ts     # Mock/demo data
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.ts
│
└── backend/                    # Backend (Django)
    └── api/
        ├── models.py           # Database models
        ├── serializers.py      # DRF serializers
        ├── views.py            # API views
        ├── admin.py            # Admin panel config
        └── migrations/         # DB migrations
```

---

## ⚙️ Getting Started

### Prerequisites
- Node.js v18+
- Python 3.10+
- pip

---

### Frontend Setup

```bash
cd app
npm install
npm run dev
```

Frontend runs at: `http://localhost:5173`

---

### Backend Setup

```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate

# Mac/Linux
source venv/bin/activate

pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

Backend runs at: `http://localhost:8000`

---

## Features

- **Home Page** — Hero section, featured items, restaurant highlights
-  **Menu Page** — Browse full menu with categories and item details
-  **Cart** — Add/remove items, quantity management
-  **Orders** — Place and track orders
-  **Reservations** — Book a table online
-  **Auth** — User registration and login
-  **Admin Dashboard** — Manage menu items, orders, and reservations
-  **Responsive** — Mobile-friendly design

---

##  Deployment

| Layer | Platform |
|-------|----------|
| Frontend | Vercel |
| Backend | Render |
| Database | Neon (PostgreSQL) |

---

##  Author

**Ishna Zaka**
[GitHub](https://github.com/fa22-bse-058-droidi)
