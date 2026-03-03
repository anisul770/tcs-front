import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from "react-router";
import AppRoutes from './routes/AppRoutes.jsx';
import App from './practice/Demo.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { CartProvider } from './context/CartContext.jsx';

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <AuthProvider>
    <CartProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
      {/* <App/> */}
    </CartProvider>
  </AuthProvider>
  // </StrictMode>
)
