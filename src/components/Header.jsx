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
    <header className="sticky top-0 z-50 bg-primary/80 backdrop-blur-md border-b border-secondary/10 px-4 md:px-12 py-4">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Left: 3-line Menu and Brand */}
        <div className="flex items-center gap-6">
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="p-2 hover:bg-secondary/5 rounded-full transition-colors cursor-pointer group"
          >
            <div className="space-y-1.5">
              <span className="block w-6 h-0.5 bg-secondary group-hover:bg-accent transition-colors"></span>
              <span className="block w-4 h-0.5 bg-secondary group-hover:bg-accent transition-colors"></span>
              <span className="block w-6 h-0.5 bg-secondary group-hover:bg-accent transition-colors"></span>
            </div>
          </button>
          
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-black tracking-tighter leading-none text-secondary">
              DREESIFY<span className="text-accent">.</span>
            </h1>
          </Link>
        </div>

        {/* Right: Utility Icons and Auth */}
        <div className="flex items-center gap-2 md:gap-8">
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
            <div className="flex items-center gap-6">
              <Link to="/admin" className="hidden md:block text-[10px] font-black uppercase tracking-widest hover:text-accent">Portal</Link>
              <button 
                onClick={logout}
                className="bg-secondary text-primary px-5 py-2 text-[10px] font-black uppercase tracking-widest hover:bg-accent transition-all rounded-sm cursor-pointer"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link 
              to="/login" 
              className="bg-secondary text-primary px-6 py-2.5 text-[10px] font-black uppercase tracking-widest hover:bg-accent transition-all rounded-sm flex items-center gap-2"
            >
              <User size={14} />
              Login
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
              className="fixed inset-0 bg-secondary/20 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 h-full w-full sm:w-[400px] bg-white z-[70] p-12 border-r border-secondary/10 flex flex-col shadow-2xl"
            >
              <div className="flex justify-between items-center mb-20">
                <h2 className="text-3xl font-black tracking-tighter">DREESIFY<span className="text-accent">.</span></h2>
                <button onClick={() => setIsMenuOpen(false)} className="p-2 hover:bg-secondary/5 rounded-full cursor-pointer">
                  <X size={30} />
                </button>
              </div>

              <nav className="flex flex-col gap-10 font-serif text-4xl font-black italic">
                <Link to="/" onClick={() => setIsMenuOpen(false)} className="hover:text-accent transition-colors">Manifesto</Link>
                <Link to="/products" onClick={() => setIsMenuOpen(false)} className="hover:text-accent transition-colors">The Archive</Link>
                <Link to="/cart" onClick={() => setIsMenuOpen(false)} className="hover:text-accent transition-colors">Club Cart</Link>
                {user && (
                 <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="hover:text-accent transition-colors">Admin Portal</Link>
                )}
              </nav>

              <div className="mt-auto pt-10 border-t border-secondary/10">
                <p className="text-[10px] font-sans font-bold uppercase tracking-widest opacity-40 mb-6 text-secondary">Collective Direct</p>
                <div className="space-y-2">
                  <p className="text-sm font-bold font-sans text-secondary">hello@dreesify.club</p>
                  <p className="text-sm font-bold font-sans text-secondary">+1 (888) DREESIFY</p>
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
