# 🎧 AudioPulse - Premium Headphone E-Commerce Platform

A modern, full-stack e-commerce platform for premium headphones built with Next.js 15, Express, MongoDB, and TypeScript. Features a beautiful glassmorphism UI with smooth GSAP animations.

## 🌐 Live Demo

**Frontend:** [https://audiopluse.vercel.app](https://audiopluse.vercel.app)  
**Backend API:** [https://audio-seven-silk.vercel.app](https://audio-seven-silk.vercel.app)

## ✨ Features

### User Features

- 🛍️ Browse premium headphone products with advanced filtering
- 🔍 Real-time product search with instant results
- ❤️ Wishlist management with persistent storage
- 🛒 Shopping cart with quantity management
- 👤 User authentication (signup/login/logout)
- 📱 Fully responsive design with mobile-first approach
- ✨ Smooth GSAP animations and transitions
- 🎨 Modern glassmorphism UI design
- ⭐ Product ratings and reviews
- 📧 Contact support with EmailJS integration

### Admin Features

- 📊 Admin dashboard with product statistics
- ➕ Add new products with multiple images
- ✏️ Edit existing products
- 🗑️ Delete products with confirmation
- 🔄 Toggle product active/inactive status
- 📈 View recent products and inventory stats
- 🔐 Role-based access control

### Technical Features

- 🔒 JWT-based authentication with httpOnly cookies
- 🌐 RESTful API architecture
- 💾 MongoDB database with Mongoose ODM
- 🎯 TypeScript for type safety
- 🚀 Server-side rendering with Next.js
- 📦 Optimized image loading with Next.js Image
- 🎭 Client-side state management
- 🔄 Optimistic UI updates
- 🛡️ CORS configuration for cross-origin requests
- 📱 Progressive Web App ready

## 🛠️ Tech Stack

### Frontend

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4 + DaisyUI
- **Animations:** GSAP (GreenSock)
- **HTTP Client:** Axios
- **UI Components:** Lucide React (icons)
- **Notifications:** React Hot Toast
- **Alerts:** SweetAlert2
- **Font:** Nunito (Google Fonts)

### Backend

- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** MongoDB (Atlas)
- **ODM:** Mongoose
- **Authentication:** JWT (jsonwebtoken)
- **Password Hashing:** bcryptjs
- **CORS:** cors middleware
- **Cookie Parser:** cookie-parser

## 📁 Project Structure

```
audiopluse/
├── client/                 # Next.js frontend
│   ├── src/
│   │   ├── app/           # App router pages
│   │   │   ├── admin/     # Admin panel routes
│   │   │   ├── cart/      # Shopping cart
│   │   │   ├── products/  # Product pages
│   │   │   ├── login/     # Authentication
│   │   │   └── ...
│   │   ├── components/    # React components
│   │   │   ├── Admin/     # Admin components
│   │   │   ├── Auth/      # Auth forms
│   │   │   ├── Cart/      # Cart components
│   │   │   ├── Product/   # Product components
│   │   │   ├── Shared/    # Shared components
│   │   │   └── ...
│   │   ├── context/       # React context
│   │   ├── hooks/         # Custom hooks
│   │   ├── lib/           # Utilities (axios)
│   │   └── utils/         # Helper functions
│   └── public/            # Static assets
│
└── server/                # Express backend
    ├── src/
    │   ├── controller/    # Route controllers
    │   ├── middleware/    # Auth middleware
    │   ├── model/         # Mongoose models
    │   ├── routes/        # API routes
    │   ├── lib/           # Utilities
    │   └── index.ts       # Server entry
    └── dist/              # Compiled JS
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- MongoDB Atlas account (or local MongoDB)
- Git

### Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd audiopluse
```

2. **Install dependencies**

Frontend:

```bash
cd client
npm install
```

Backend:

```bash
cd server
npm install
```

3. **Environment Variables**

Create `.env` files:

**client/.env**

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

**server/.env**

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=8080
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

4. **Run the application**

Backend (Terminal 1):

```bash
cd server
npm run dev
```

Frontend (Terminal 2):

```bash
cd client
npm run dev
```

5. **Access the application**

- Frontend: http://localhost:3000
- Backend API: http://localhost:8080

## 📚 API Endpoints

### Authentication

- `POST /auth/signup` - Register new user
- `POST /auth/login` - Login user
- `POST /auth/logout` - Logout user
- `GET /auth/me` - Get current user

### Products

- `GET /products` - Get all products
- `GET /products/:id` - Get single product
- `GET /products/search?q=query` - Search products
- `GET /products/random` - Get random products

### Cart (Protected)

- `GET /cart` - Get user cart
- `POST /cart` - Add item to cart
- `PUT /cart/:productId` - Update cart item quantity
- `DELETE /cart/:productId` - Remove item from cart

### Wishlist (Protected)

- `GET /wishlist` - Get user wishlist
- `POST /wishlist/toggle` - Toggle product in wishlist

### Admin (Admin Only)

- `GET /admin/dashboard` - Get dashboard stats
- `GET /admin/products` - Get all products
- `POST /admin/products` - Create product
- `PUT /admin/products/:id` - Update product
- `DELETE /admin/products/:id` - Delete product
- `PATCH /admin/products/:id/toggle` - Toggle active status

## 🎨 Design Features

- **Glassmorphism UI:** Modern frosted glass effect with backdrop blur
- **GSAP Animations:** Smooth scroll animations, stagger effects, and transitions
- **Responsive Design:** Mobile-first approach with breakpoints
- **Dark/Light Mode:** DaisyUI theme support
- **Custom Components:** Reusable UI components
- **Loading States:** Skeleton loaders and spinners
- **Error Handling:** User-friendly error messages
- **Toast Notifications:** Real-time feedback

## 🔐 Authentication Flow

1. User signs up with email and password
2. Password is hashed with bcrypt (10 salt rounds)
3. JWT token is generated and stored in httpOnly cookie
4. Token expires in 7 days
5. Protected routes verify token via middleware
6. Admin routes check user role

## 🛡️ Security Features

- httpOnly cookies (prevents XSS)
- CORS configuration
- JWT token expiration
- Password hashing with bcrypt
- Input validation
- Role-based access control
- Secure cookie settings in production

## 📦 Deployment

### Frontend (Vercel)

1. Push code to GitHub
2. Import project in Vercel
3. Set environment variables
4. Deploy

### Backend (Vercel/Railway/Render)

1. Build TypeScript: `npm run build`
2. Set environment variables
3. Deploy with start command: `npm start`

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## 📝 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Built with ❤️ by Tanvir Hossain

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting
- MongoDB for database
- GSAP for animations
- All open-source contributors

---

**Note:** This is a portfolio/learning project. For production use, additional security measures and testing are recommended.
