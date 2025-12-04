# ✂️ QCut - Barber Booking System

QCut is a modern web application designed to streamline the process of booking barber appointments. It connects customers with local barbershops, allowing for real-time availability checks and instant booking.

![QCut Hero](https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=2074)

## 🚀 Live Demo

- **Frontend (Vercel):** [https://q-cut.vercel.app/](https://q-cut.vercel.app/)
- **Backend (Render):** [https://qcut-backend.onrender.com](https://qcut-backend.onrender.com)

---

## ✨ Features

### 👤 For Customers
- **Browse Shops**: View a list of available barbershops with details.
- **Book Appointments**: Select a barber, service, and time slot.
- **Manage Bookings**: View upcoming and past appointments.
- **Real-time Status**: See booking status (PENDING, CONFIRMED, REJECTED).

### 🏪 For Shop Owners
- **Shop Management**: Create and update shop details.
- **Barber Management**: Add and manage barbers and their services.
- **Booking Management**: Approve or reject incoming booking requests.
- **Dashboard**: Overview of shop performance and appointments.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React (Vite)
- **Styling**: Tailwind CSS + Framer Motion (Animations)
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Deployment**: Vercel

### Backend
- **Framework**: Spring Boot (Java)
- **Security**: Spring Security + JWT Authentication
- **Database**: PostgreSQL (Cloud hosted on Neon.tech)
- **Containerization**: Docker
- **Deployment**: Render.com

---

## ⚙️ Local Development Setup

### Prerequisites
- Node.js & npm
- Java JDK 17+
- Maven
- PostgreSQL (Local or Cloud URL)

### 1. Backend Setup
```bash
cd backend
# Configure application.properties with your DB credentials
# Run the application
./mvnw spring-boot:run
```
The backend will start on `http://localhost:8080`.

### 2. Frontend Setup
```bash
cd frontend
# Install dependencies
npm install
# Run development server
npm run dev
```
The frontend will start on `http://localhost:5173`.

---

## ☁️ Deployment Guide

### Database (Neon.tech)
1. Create a PostgreSQL project on Neon.tech.
2. Get the connection string (`postgres://...`).

### Backend (Render.com)
1. Connect GitHub repo to Render.
2. Select `Docker` environment.
3. Add Environment Variables:
   - `DB_URL`: Your Neon JDBC URL (`jdbc:postgresql://...`)
   - `DB_USERNAME`: Your DB username
   - `DB_PASSWORD`: Your DB password
   - `PORT`: `8080`

### Frontend (Vercel)
1. Connect GitHub repo to Vercel.
2. Add Environment Variable:
   - `VITE_API_URL`: Your Render Backend URL (e.g., `https://qcut-backend.onrender.com/api`)
3. Deploy!

---

## 📝 API Endpoints

### Auth
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login and get JWT

### Shops
- `GET /api/shops` - List all shops
- `POST /api/shops` - Create a shop (Owner only)

### Bookings
- `POST /api/bookings` - Create a booking
- `GET /api/bookings/my-bookings` - Get user bookings
- `PUT /api/bookings/{id}/status` - Update status (Owner only)

---

Developed by **[Your Name/Team]**
