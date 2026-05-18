import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { Heart, ShoppingBag, User, X, Search, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

const categories = [
  { name: 'Home', path: '/' },
  { name: 'Women Clothing', path: '/products?category=Women Clothing' },
  { name: 'Him & Her', path: '/products?category=Him & Her' },
  { name: 'Combo Sets', path: '/products?category=Combo Sets' },
  { name: 'Birthday Dresses', path: '/products?category=Birthday Dresses' },
  { name: 'Party Wear', path: '/products?category=Party Wear' },
  { name: 'Casual Wear', path: '/products?category=Casual Wear' },
  { name: 'New Arrivals', path: '/products?category=New Arrivals' },
  { name: 'Trending Collection', path: '/products?category=Trending Collection' },
  { name: 'Best Sellers', path: '/products?category=Best Sellers' },
  { name: 'Support', path: '/support' },
  { name: 'About Us', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

const Header = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();

  const cartCount = cart?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-secondary/5 h-20 flex items-center px-4 md:px-12">
      <div className="grid grid-cols-3 items-center w-full max-w-[1920px] mx-auto">
        
        {/* Left: Hamburger menu */}
        <div className="flex items-center">
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="p-2 hover:bg-secondary/5 rounded-full transition-colors cursor-pointer group"
          >
            <Menu size={24} className="text-secondary group-hover:text-accent transition-colors" />
          </button>
        </div>

        {/* Center: Dressify Logo */}
        <div className="flex justify-center">
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl md:text-4xl font-black tracking-[-0.05em] leading-none text-secondary uppercase font-serif">
              DRESSIFY<span className="text-accent">.</span>
            </h1>
          </Link>
        </div>

        {/* Right: Icons and Profile */}
        <div className="flex items-center justify-end gap-1 md:gap-6">
          <button 
            onClick={() => setIsSearchOpen(true)}
            className="p-2 hover:text-accent transition-colors cursor-pointer" 
            title="Search"
          >
            <Search size={22} />
          </button>
          
          <button 
            className="p-2 hover:text-accent transition-colors hidden md:block cursor-pointer" 
            title="Wishlist"
          >
            <Heart size={22} />
          </button>
          
          <Link to="/cart" className="p-2 hover:text-accent transition-colors relative cursor-pointer" title="Cart">
            <ShoppingBag size={22} />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 bg-accent text-white text-[9px] font-black w-4 h-4 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>

          <div className="hidden md:flex items-center gap-4 ml-2">
            {user ? (
              <div className="flex items-center gap-4">
                <Link to="/profile" className="flex items-center gap-2 group">
                  <div className="w-8 h-8 rounded-full bg-secondary/5 flex items-center justify-center border border-secondary/10 group-hover:border-accent transition-colors overflow-hidden">
                    {user.photoURL ? (
                      <img src={user.photoURL} alt={user.displayName} className="w-full h-full object-cover" />
                    ) : (
                      <User size={16} className="text-secondary group-hover:text-accent transition-colors" />
                    )}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-secondary group-hover:text-accent transition-colors hidden lg:block">
                    {user.displayName || user.email?.split('@')[0]}
                  </span>
                </Link>
                {user.isAdmin && (
                  <Link to="/admin" className="text-[9px] font-black uppercase tracking-widest bg-secondary text-primary px-3 py-1.5 hover:bg-accent transition-colors rounded-sm">Admin</Link>
                )}
              </div>
            ) : (
              <Link 
                to="/login" 
                className="p-2 hover:text-accent transition-colors cursor-pointer"
                title="Login"
              >
                <User size={22} />
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Full-screen Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white z-[100] flex flex-col pt-20"
          >
            <button 
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-6 right-6 p-2 hover:bg-secondary/5 rounded-full cursor-pointer"
            >
              <X size={32} />
            </button>
            
            <div className="flex-1 overflow-y-auto px-8 py-10">
              <nav className="flex flex-col items-center gap-6 max-w-md mx-auto">
                {categories.map((cat, idx) => (
                  <motion.div
                    key={cat.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <Link 
                      to={cat.path} 
                      onClick={() => setIsMenuOpen(false)}
                      className="text-2xl md:text-3xl font-serif font-black italic hover:text-accent transition-colors uppercase tracking-tight"
                    >
                      {cat.name}
                    </Link>
                  </motion.div>
                ))}
                
                {user ? (
                  <button 
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="mt-8 text-sm font-black uppercase tracking-[0.3em] text-accent border-b-2 border-accent"
                  >
                    Logout
                  </button>
                ) : (
                  <Link 
                    to="/login" 
                    onClick={() => setIsMenuOpen(false)}
                    className="mt-8 text-sm font-black uppercase tracking-[0.3em] text-accent border-b-2 border-accent"
                  >
                    Login / Signup
                  </Link>
                )}
              </nav>
            </div>
            
            <div className="p-8 border-t border-secondary/5 text-center">
               <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40">© 2024 DRESSIFY COLLECTIVE</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-0 h-40 bg-white shadow-2xl z-[110] flex items-center px-6 md:px-20"
          >
            <div className="flex items-center w-full max-w-4xl mx-auto gap-6">
              <Search className="text-secondary/40" size={32} />
              <input 
                autoFocus
                type="text" 
                placeholder="SEARCH ARCHIVE..." 
                className="flex-1 text-3xl font-serif font-black italic uppercase text-secondary outline-none placeholder:opacity-10"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    navigate(`/products?q=${e.currentTarget.value}`);
                    setIsSearchOpen(false);
                  }
                }}
              />
              <button onClick={() => setIsSearchOpen(false)} className="p-2 hover:bg-secondary/5 rounded-full">
                <X size={32} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
