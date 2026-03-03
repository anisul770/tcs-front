import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from "react-router";
import AppRoutes from './routes/AppRoutes.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { CartProvider } from './context/CartContext.jsx';
import { BookingProvider } from './context/BookingContext.jsx';

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <AuthProvider>
    <CartProvider>
      <BookingProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </BookingProvider>
    </CartProvider>
  </AuthProvider>
  // </StrictMode>
)
