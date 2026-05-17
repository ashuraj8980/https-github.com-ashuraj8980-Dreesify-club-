import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useCart } from '../context/CartContext';
import { Trash2, ShoppingBag, ArrowRight, Minus, Plus } from 'lucide-react';

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 25;
  const total = subtotal + shipping;

  return (
    <div className="bg-primary min-h-screen">
      <section className="px-6 md:px-12 py-16 md:py-24 border-b border-secondary/10 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-8">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40 mb-4 block">Club Cart / Active Session</span>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter font-serif uppercase italic leading-none">Your<br/><span className="text-accent underline decoration-4 underline-offset-8 decoration-accent/30">Selection</span></h1>
          </div>
          <div className="max-w-xs border-l-2 border-secondary/10 pl-8">
            <p className="text-sm font-sans text-secondary/60 leading-relaxed italic">
              "Items in your selection are reserved temporarily. Finalize your project to guarantee availability."
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-20 pb-40">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24">
          {/* Cart Items List */}
          <div className="lg:flex-1 space-y-12">
            {!cart || cart.length === 0 ? (
              <div className="py-20 border-2 border-dashed border-secondary/10 flex flex-col items-center justify-center gap-8">
                <p className="text-xl font-serif font-black italic opacity-20 uppercase tracking-widest text-secondary">The Archive is empty</p>
                <Link to="/products" className="bg-secondary text-primary px-10 py-4 text-[10px] font-black uppercase tracking-widest hover:bg-accent transition-all shadow-xl">
                  Inspect Products
                </Link>
              </div>
            ) : (
              cart.map((item, i) => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col sm:flex-row gap-10 items-center justify-between border-b border-secondary/5 pb-12 group"
                >
                  <div className="flex flex-col sm:flex-row gap-10 items-center">
                    <div className="w-40 h-52 bg-secondary/5 border border-secondary/10 relative overflow-hidden group-hover:border-accent/40 transition-colors">
                      <img src={item.img || 'https://images.unsplash.com/photo-1544441893-675973e31d85'} alt={item.name} className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" />
                      <div className="absolute top-4 left-4 bg-white/80 p-2 text-[9px] font-black italic shadow-lg">ID: A{item.id}</div>
                    </div>
                    <div>
                      <h3 className="text-3xl font-black font-serif italic text-secondary uppercase leading-none mb-3 group-hover:text-accent transition-colors">{item.name}</h3>
                      <p className="text-[10px] font-black uppercase tracking-widest text-secondary/30 mb-6">{item.category} / ARCHIVE</p>
                      
                      <div className="flex items-center gap-8">
                        <div className="flex items-center border border-secondary/10 bg-white">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-3 hover:bg-secondary/5 transition-colors cursor-pointer"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="px-6 text-sm font-black font-sans">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-3 hover:bg-secondary/5 transition-colors cursor-pointer"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-secondary/30 hover:text-red-500 transition-colors p-2 cursor-pointer"
                          title="Remove Entry"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="text-right w-full sm:w-auto">
                    <p className="text-3xl font-black font-serif italic text-secondary leading-none mb-2">${(item.price * item.quantity).toFixed(2)}</p>
                    <p className="text-[10px] font-bold text-accent uppercase tracking-widest">Base: ${item.price.toFixed(2)}</p>
                  </div>
                </motion.div>
              ))
            )}
          </div>

          {/* Sidebar Summary */}
          <div className="lg:w-[400px] flex-shrink-0">
            <div className="sticky top-32 bg-white border border-secondary/10 shadow-3xl p-10 space-y-10">
              <div className="pb-8 border-b border-secondary/10">
                <h3 className="text-sm font-black uppercase tracking-[0.3em] text-secondary mb-10">Order Logistics</h3>
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-secondary/40">Sub-Total Archive</span>
                    <span className="text-lg font-black font-serif italic text-secondary">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-secondary/40">Global Transit</span>
                    <span className="text-lg font-black font-serif italic text-secondary">${shipping.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-end mb-10">
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.4em] text-accent mb-2">Grand Total</p>
                  <p className="text-5xl font-black font-serif italic text-secondary tracking-tighter leading-none">${total.toFixed(2)}</p>
                </div>
              </div>

              <Link 
                to="/checkout" 
                className="w-full bg-secondary text-primary font-black uppercase text-[11px] tracking-[0.2em] py-6 flex items-center justify-center gap-6 hover:bg-accent transition-all shadow-3xl active:scale-95 group text-center"
              >
                PROCEED TO LOGISTICS
                <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
              </Link>
              
              <div className="flex items-center gap-4 text-[9px] font-bold uppercase tracking-widest text-secondary/30">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                Secure SSL Encrypted Session
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CartPage;
