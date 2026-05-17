import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <div className="bg-primary min-h-screen flex flex-col font-sans selection:bg-accent selection:text-white">
      <Header />
      <div className="flex-1 flex flex-col md:flex-row min-h-0">
        {/* Vertical Utility Rail - Hidden on mobile */}
        <aside className="hidden md:flex w-16 border-r border-secondary/10 flex-col items-center py-10 justify-between flex-shrink-0">
          <span className="rotate-180 [writing-mode:vertical-lr] uppercase text-[10px] tracking-widest font-sans opacity-40">Established 2024</span>
          <div className="space-y-4">
            <div className="w-2 h-2 rounded-full bg-accent"></div>
            <div className="w-2 h-2 rounded-full bg-secondary/20"></div>
            <div className="w-2 h-2 rounded-full bg-secondary/20"></div>
          </div>
        </aside>

        <main className="flex-1 overflow-auto bg-primary relative">
          <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductPage />} />
            <Route path="/products/:id" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route 
              path="/admin" 
              element={
                <PrivateRoute adminOnly={true}>
                  <AdminPage />
                </PrivateRoute>
              }
            />
          </Routes>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default App;
