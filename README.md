# 🏋️ Personalized Fitness Class Booking Platform

A full-stack MERN application that allows users to explore and book personalized fitness classes, view trainer profiles, manage bookings, leave feedback, and make secure payments online.

---

## 🧰 Tech Stack

- **Frontend**: React, TailwindCSS, Axios, React Router
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Payment Gateway**: Stripe / Razorpay
- **Styling**: TailwindCSS
- **Deployment**: Vercel / Netlify (Frontend), Render / Railway / VPS (Backend)

---

## 📁 Folder Structure

```
project-root/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   ├── config/
│   ├── server.js
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── context/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── vite.config.js
└── README.md
```

---

## 🚀 Features

- 🔐 Secure login/signup using JWT
- 📅 Real-time class scheduling & booking
- 👩‍🏫 Trainer profile pages with bio, expertise, and reviews
- 🧾 Booking management for users and trainers
- 💬 Post-class trainer feedback system
- 💳 Stripe/Razorpay payment integration
- 📊 Personalized class recommendations
- 📱 Mobile responsive UI using TailwindCSS

---

## ⚙️ Backend Setup (Node.js + Express)

### 1. Navigate to backend folder
```bash
cd backend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create `.env` file
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/fitnessDB
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_key
```

### 4. Run the backend
```bash
npm run dev
```

Backend server will be running on: `http://localhost:5000`

---

## 💻 Frontend Setup (React + TailwindCSS)

### 1. Navigate to frontend folder
```bash
cd frontend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create `.env` file
```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
```

### 4. Run the frontend
```bash
npm run dev
```

Frontend will be running on: `http://localhost:5173`

---

## 🌐 API Overview

Base URL: `/api`

| Endpoint             | Method | Description                     |
|----------------------|--------|---------------------------------|
| `/auth/register`     | POST   | Register a new user             |
| `/auth/login`        | POST   | Login and get JWT               |
| `/classes`           | GET    | Get all fitness classes         |
| `/classes/:id`       | GET    | Get class by ID                 |
| `/bookings`          | POST   | Book a class                    |
| `/trainers`          | GET    | View trainer profiles           |
| `/payments/checkout` | POST   | Initiate payment session        |

---

## 🔐 Authentication

- JWT tokens stored in localStorage
- Protected routes on frontend using context / route guards
- Backend middleware to verify token

---

## 📦 Deployment

### Frontend (Vercel, Netlify, etc.)

Set build command:
```bash
npm run build
```
Output directory:
```
dist
```

### Backend (Render, Railway, etc.)

Set environment variables and connect MongoDB (e.g., MongoDB Atlas).

---


## 🧪 Seed Sample Data

You can add sample classes/trainers by creating a seed script or inserting JSON data into MongoDB manually or via Compass.

Example class document:
```json
{
  "name": "Pilates Core Workout with Olivia",
  "title": "Pilates Core Workout",
  "description": "Strengthen your core with a low-impact pilates session led by an experienced trainer.",
  "trainer": "65f2a7d4b8f1a2c3d4e5f681",
  "trainerName": "Olivia Martinez",
  "date": "2025-03-18T09:30:00.000Z",
  "duration": 40,
  "price": 22
}
```


