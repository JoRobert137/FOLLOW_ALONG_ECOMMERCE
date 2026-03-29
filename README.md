# ShopSphere - MERN E-Commerce Platform

A full-stack e-commerce application built with the MERN ecosystem, focused on real-world product workflows: user authentication, catalog management, cart and checkout, address handling, order lifecycle, and payment integration.

This project is designed as a production-style learning build with clean separation between frontend and backend, reusable UI components, route-based architecture, and API-driven data flow.

## 🚀 Project Description

ShopSphere is a complete e-commerce workflow implementation using React (Vite) on the client side and Node.js/Express with MongoDB on the server side. It demonstrates how modern commerce systems are structured, from account creation to placing and managing orders.

The current version includes core commerce functionality and is actively structured for future scaling and feature enhancements.

## ✨ Key Features

- User authentication (signup, login, token-based protected routes)
- Product management (create, list, single view, update, delete)
- Multi-image upload flow for products (Multer + Cloudinary integration)
- Cart operations for authenticated users
- Address management for checkout
- Order placement and order history endpoints
- Payment flow integration (Razorpay)
- Global state management using Redux Toolkit
- Modular backend architecture (controllers, routes, models, middleware)
- Component-driven frontend built with React + Vite

> Add any project-specific highlights here (for example: admin panel, filtering, search, coupon system, analytics).

## 🛠 Tech Stack

### Frontend
- React 18
- Vite
- React Router DOM
- Redux Toolkit + React Redux
- Axios
- Tailwind CSS

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Multer (file handling)
- Cloudinary (media storage)
- Razorpay (payments)
- Nodemailer (mail utility)
- Cookie Parser + CORS + Dotenv

### Tooling
- ESLint
- Nodemon

## 📂 Folder Structure

```text
FOLLOW_ALONG_ECOMMERCE/
|- backend/
|  |- package.json
|  |- src/
|  |  |- app.js
|  |  |- index.js
|  |  |- config/
|  |  |- DB/
|  |  |  |- database.js
|  |  |- controllers/
|  |  |- middlwares/
|  |  |- models/
|  |  |- routes/
|  |  |- utils/
|  |- temp-uploads/
|
|- frontend/
|  |- package.json
|  |- index.html
|  |- src/
|  |  |- App.jsx
|  |  |- main.jsx
|  |  |- validation.js
|  |  |- components/
|  |  |- pages/
|  |  |- Redux/
|  |  |- User/
|  |  |- Utils/
|  |- public/
|
|- README.md
```

## ⚙️ Installation & Setup

### 1. Clone Repository

```bash
git clone <your-repository-url>
cd FOLLOW_ALONG_ECOMMERCE
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create environment file:

```bash
# file path
backend/src/config/.env
```

Run backend server:

```bash
npm run dev
```

### 3. Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

By default, frontend runs on Vite dev server and backend runs via Nodemon.

## 🔐 Environment Variables

Create `backend/src/config/.env` and configure values similar to:

```env
PORT=5000
NODE_ENV=DEVELOPMENT

# Auth
SECRET_KEY=your_jwt_secret

# MongoDB (recommended)
MONGO_URI=your_mongodb_connection_string

# Cloudinary
cloud_name=your_cloud_name
api_key=your_cloudinary_api_key
api_secret=your_cloudinary_api_secret

# Razorpay
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_SECRET=your_razorpay_secret
```

Note: Move any hardcoded secrets or database URLs in code to environment variables before deployment.

## 📸 Screenshots

Add screenshots/gifs here for better portfolio impact.

- Auth Pages (Login / Signup)
- Product Listing Page
- Single Product Detail Page
- Cart Page
- Address Selection / Checkout
- Orders Page
- Payment Flow

```md
![Login](./docs/screenshots/login.png)
![Home](./docs/screenshots/home.png)
![Cart](./docs/screenshots/cart.png)
```

## 🔄 API Endpoints (Overview)

Base URL example: `http://localhost:5000`

### User Routes (`/user`)
- `POST /create-user`
- `GET /activation/:token`
- `POST /signup`
- `POST /login`
- `GET /user-data` (protected)
- `POST /add-address` (protected)
- `GET /get-addresses` (protected)

### Product Routes (`/product`)
- `POST /create-product` (protected)
- `PUT /update-products/:id`
- `GET /get-products`
- `GET /get-single/:id`
- `DELETE /:id`

### Cart Routes (`/cart`)
- `POST /add-to-cart` (protected)
- `GET /get-user-cart-data` (protected)

### Order Routes (`/orders`)
- `GET /user-orders-data` (protected)
- `POST /confirm-order` (protected)
- `PATCH /cancel-order` (protected)

### Payment Routes (`/payment`)
- `POST /create-order`
- `POST /pay-order` (protected)
- `GET /get-razorpay-key`

## 🎯 Future Improvements

- Role-based access control (admin/customer separation)
- Product search, sort, and advanced filtering
- Inventory and stock status management
- Coupon and discount engine
- Order status tracking timeline (processing, shipped, delivered)
- Payment verification webhooks and retry handling
- Unit/integration tests (frontend + backend)
- Dockerized development and deployment pipeline
- CI/CD automation (lint, test, build)
- Better observability (logging, metrics, error monitoring)

## 🙌 Author

**John Robert**

- GitHub: [Add your GitHub profile URL]
- LinkedIn: [Add your LinkedIn profile URL]
- Portfolio: [Add your portfolio URL]

---

If you find this project useful, consider giving it a star and sharing feedback.