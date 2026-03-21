# TCS Service Booking Platform

A modern, full-featured service booking web application built with React and a custom REST API backend. This platform allows users to browse services, make bookings, manage carts, leave reviews, and provides administrative tools for managing the system.

## 🚀 Features

### User Features
- **User Authentication**: Registration, login, password reset, and account activation
- **Service Browsing**: View and filter services by categories
- **Service Details**: Detailed service information with pricing and reviews
- **Booking System**: Book services and manage personal bookings
- **Shopping Cart**: Add services to cart and proceed to booking
- **Review System**: Leave and view reviews for services
- **Profile Management**: Update personal information and change passwords
- **Theme Toggle**: Switch between light and dark modes

### Administrative Features
- **User Management**: View and manage customer accounts
- **Service Management**: Add, edit, and manage services
- **Category Management**: Organize services into categories
- **Review Oversight**: View all reviews across the platform
- **Dashboard Analytics**: Administrative dashboard for oversight

### Technical Features
- **Responsive Design**: Mobile-friendly interface
- **Real-time Notifications**: Toast notifications for user feedback
- **Form Validation**: Client-side validation with React Hook Form
- **Smooth Animations**: Framer Motion animations for enhanced UX
- **JWT Authentication**: Secure token-based authentication

## 🛠 Tech Stack

### Frontend
- **React 19.2.0** - UI library
- **Vite 8.0.0-beta.13** - Build tool and dev server
- **React Router 7.13.1** - Client-side routing
- **Tailwind CSS 4.2.1** - Utility-first CSS framework
- **DaisyUI 5.5.19** - Component library for Tailwind CSS
- **Framer Motion 12.37.0** - Animation library
- **Axios 1.13.5** - HTTP client for API requests
- **React Hook Form 7.71.2** - Form handling and validation
- **React Hot Toast 2.6.0** - Notification system
- **Lucide React 0.576.0** - Icon library

### Backend
- **Custom REST API** - Built with Django (based on API endpoints)
- **JWT Authentication** - JSON Web Tokens for secure authentication
- **PostgreSQL** - Database (inferred from project path)
- **Django REST Framework** - API framework

## 📁 Project Structure

```
tcs/
├── public/                    # Static assets
├── src/
│   ├── assets/                # Images and media files
│   ├── components/            # Reusable UI components
│   │   ├── Animations/        # Animation components
│   │   ├── Bookings/          # Booking-related components
│   │   ├── Cart/              # Cart components
│   │   ├── categories/        # Category components
│   │   ├── clientservice/     # Service client components
│   │   ├── dashboard/         # Admin dashboard components
│   │   ├── home/              # Homepage components
│   │   ├── Profile/           # Profile management components
│   │   ├── Registration/      # Registration components
│   │   ├── reviews/           # Review components
│   │   ├── servicedetail/     # Service detail components
│   │   └── shop/              # Shop/filtering components
│   ├── context/               # React Context providers
│   │   ├── AuthContext.jsx    # Authentication state
│   │   ├── BookingContext.jsx # Booking state
│   │   └── CartContext.jsx    # Cart state
│   ├── hooks/                 # Custom React hooks
│   ├── layouts/               # Layout components
│   │   ├── DashboardLayout.jsx # Admin dashboard layout
│   │   ├── MainLayout.jsx     # Main app layout
│   │   └── ...                # Other layouts
│   ├── pages/                 # Page components
│   ├── routes/                # App routing configuration
│   │   └── AppRoutes.jsx      # Route definitions
│   └── services/              # API client configurations
│       ├── api-client.js      # General API client
│       └── auth-api-client.js # Authenticated API client
├── index.html                 # HTML entry point
├── package.json               # Dependencies and scripts
├── vite.config.js             # Vite configuration
└── vercel.json                # Vercel deployment config
```

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Backend API server running (see API endpoints below)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd tcs
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   - The API base URL is configured in `src/services/api-client.js || auth-api-client.js`
   - Production: `https://tcs-lime.vercel.app/api/v1`
   - Development: `http://127.0.0.1:8000/api/v1`

4. **Start development server:**
   ```bash
   npm run dev
   ```


## 🌐 API Integration

The application communicates with a custom REST API backend. Key endpoints include:

### Authentication
- `POST /auth/jwt/create/` - User login
- `GET /auth/users/me/` - Get current user profile
- `POST /auth/users/` - User registration
- `POST /auth/users/activation/` - Account activation
- `POST /auth/users/reset_password/` - Password reset

### Services
- `GET /services/` - List services
- `GET /services/{id}/` - Service details
- `GET /categories/` - List categories

### Bookings
- `GET /bookings/` - User bookings
- `POST /bookings/` - Create booking
- `GET /bookings/{id}/` - Booking details

### Reviews
- `GET /reviews/` - List reviews
- `POST /reviews/` - Create review

### Admin
- `GET /admin/users/` - List users
- `GET /admin/services/` - List all services
- `POST /admin/services/` - Create service
- `PUT /admin/services/{id}/` - Update service

For full API documentation please checkout this link -> `https://tcs-lime.vercel.app/swagger/`

## 🚀 Deployment

### Vercel Deployment
The project is configured for deployment on Vercel:

1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect the configuration from `vercel.json`
3. The build command is `npm run build`
4. Deploy automatically on push to main branch


## 🎨 Theme System

The application supports light and dark themes:
- Theme preference is stored in localStorage
- Automatic theme detection on page load
- Manual toggle available in the UI

## 📱 Responsive Design

Built with mobile-first approach using Tailwind CSS:
- Fully responsive across all screen sizes
- Touch-friendly interactions
- Optimized for mobile performance

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary.

---

**Built with ❤️ using React, Vite, and modern web technologies.**