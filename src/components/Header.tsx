import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { Heart, ShoppingBag, User, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const Header = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const cartCount = cart?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-secondary/10 px-4 md:px-12 py-4">
      <div className="grid grid-cols-3 items-center max-w-7xl mx-auto">
        {/* Left: 3-line Menu */}
        <div className="flex items-center">
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="p-2 hover:bg-secondary/5 rounded-full transition-colors cursor-pointer group"
          >
            <div className="space-y-1.5 focus:outline-none">
              <span className="block w-6 h-0.5 bg-secondary group-hover:bg-accent transition-colors"></span>
              <span className="block w-4 h-0.5 bg-secondary group-hover:bg-accent transition-colors"></span>
              <span className="block w-6 h-0.5 bg-secondary group-hover:bg-accent transition-colors"></span>
            </div>
          </button>
        </div>

        {/* Center: Brand */}
        <div className="flex justify-center">
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl md:text-3xl font-black tracking-[-0.08em] leading-none text-secondary uppercase font-serif">
              DRESSIFY<span className="text-accent">.</span>
            </h1>
          </Link>
        </div>

        {/* Right: Utility Icons and Auth */}
        <div className="flex items-center justify-end gap-2 md:gap-4 lg:gap-8">
          <button className="p-2 hover:text-accent transition-colors hidden sm:block cursor-pointer" title="Wishlist">
            <Heart size={20} />
          </button>
          
          <Link to="/cart" className="p-2 hover:text-accent transition-colors relative cursor-pointer" title="Cart">
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-accent text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>

          <div className="h-6 w-px bg-secondary/10 mx-2 hidden md:block"></div>

          {user ? (
            <div className="flex items-center gap-4">
              {user.isAdmin && (
                <Link to="/admin" className="hidden md:block text-[10px] font-black uppercase tracking-widest hover:text-accent border border-secondary/20 px-3 py-1.5 rounded-full">Terminal</Link>
              )}
              <button 
                onClick={logout}
                className="hidden md:block text-[10px] font-black uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity cursor-pointer"
              >
                Logout
              </button>
              <div className="md:hidden">
                 <User size={20} className="text-secondary" />
              </div>
            </div>
          ) : (
            <Link 
              to="/login" 
              className="bg-secondary text-primary px-4 md:px-6 py-2 md:py-2.5 text-[10px] font-black uppercase tracking-widest hover:bg-accent transition-all rounded-sm flex items-center gap-2"
            >
              <User size={14} />
              <span className="hidden sm:inline">Login</span>
            </Link>
          )}
        </div>
      </div>

      {/* Sidebar Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-secondary/40 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 h-full w-full sm:w-[450px] bg-white z-[70] p-8 md:p-16 flex flex-col shadow-2xl"
            >
              <div className="flex justify-between items-center mb-16">
                <Link to="/" onClick={() => setIsMenuOpen(false)}>
                  <h2 className="text-3xl font-black tracking-[-0.1em] font-serif uppercase">DRESSIFY<span className="text-accent">.</span></h2>
                </Link>
                <button onClick={() => setIsMenuOpen(false)} className="p-2 hover:bg-secondary/5 rounded-full cursor-pointer">
                  <X size={32} />
                </button>
              </div>

              <div className="space-y-1 text-[10px] uppercase tracking-[0.4em] font-black opacity-30 mb-8 ml-1">
                Navigation Catalogue
              </div>

              <nav className="flex flex-col gap-6 font-serif">
                <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-4xl md:text-5xl font-black italic hover:text-accent transition-all hover:translate-x-4 inline-block">Home</Link>
                <Link to="/products" onClick={() => setIsMenuOpen(false)} className="text-4xl md:text-5xl font-black italic hover:text-accent transition-all hover:translate-x-4 inline-block">The Archive</Link>
                <Link to="/products?category=combo" onClick={() => setIsMenuOpen(false)} className="text-4xl md:text-5xl font-black italic hover:text-accent transition-all hover:translate-x-4 inline-block">Combo Clothing</Link>
                <Link to="/products?category=modern" onClick={() => setIsMenuOpen(false)} className="text-4xl md:text-5xl font-black italic hover:text-accent transition-all hover:translate-x-4 inline-block">Modern Style</Link>
                <Link to="/products?category=couple" onClick={() => setIsMenuOpen(false)} className="text-4xl md:text-5xl font-black italic hover:text-accent transition-all hover:translate-x-4 inline-block">Couple Outfits</Link>
                {user?.isAdmin && (
                  <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="text-2xl mt-4 font-black uppercase tracking-widest text-accent hover:underline">Admin Panel</Link>
                )}
              </nav>

              <div className="mt-auto pt-10 border-t border-secondary/10 flex flex-col gap-8">
                <div>
                  <p className="text-[10px] font-sans font-black uppercase tracking-[0.3em] opacity-40 mb-4">Support & Registry</p>
                  <div className="flex flex-wrap gap-x-8 gap-y-2">
                    <button className="text-sm font-bold font-sans text-secondary hover:text-accent">Stock Inquiry</button>
                    <button className="text-sm font-bold font-sans text-secondary hover:text-accent">Club Shipping</button>
                    <button className="text-sm font-bold font-sans text-secondary hover:text-accent">Returns Portal</button>
                  </div>
                </div>
                
                <div className="flex justify-between items-center opacity-60">
                   <p className="text-[10px] font-black font-sans uppercase">© 2024 DRESSIFY Global</p>
                   <div className="flex gap-4">
                     <span className="w-1 h-1 rounded-full bg-secondary"></span>
                     <span className="w-1 h-1 rounded-full bg-secondary"></span>
                     <span className="w-1 h-1 rounded-full bg-secondary"></span>
                   </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
