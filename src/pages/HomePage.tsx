import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { db } from '../firebase';
import { collection, query, limit, onSnapshot } from 'firebase/firestore';

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);

  useEffect(() => {
    const q = query(collection(db, 'products'), limit(4));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const prods = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setFeaturedProducts(prods);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-full flex flex-col">
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12">
        {/* Left Hero Column */}
        <div className="lg:col-span-7 p-8 md:p-16 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-secondary/10 relative overflow-hidden bg-white/40">
          <div className="absolute -left-4 top-1/2 -translate-y-1/2 text-[120px] md:text-[200px] font-black opacity-[0.03] select-none pointer-events-none font-serif text-secondary uppercase">DRSF</div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10"
          >
            <div className="flex items-center gap-4 mb-6">
               <span className="w-12 h-[1px] bg-accent"></span>
               <span className="text-[10px] font-black uppercase tracking-[0.4em] text-secondary/40 font-sans">Global Capsule Release</span>
            </div>
            <h2 className="text-[60px] md:text-[120px] leading-[0.8] font-black italic mb-10 tracking-[-0.05em] font-serif text-secondary uppercase">
               DRESSIFY<br/><span className="text-accent underline decoration-secondary/5 underline-offset-12">System 01</span>
            </h2>
            <p className="max-w-md text-xl leading-relaxed text-secondary/70 font-sans font-medium">
              A curated physical experience exploring the intersection of brutalist architecture and functional avant-garde apparel.
            </p>
            <div className="mt-16 flex flex-wrap items-center gap-8">
              <Link to="/products" className="px-12 py-6 bg-secondary text-primary font-sans font-black uppercase tracking-widest text-[11px] flex items-center gap-6 active:scale-95 transition-all hover:bg-accent shadow-2xl">
                Enter DRESSIFY
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
              </Link>
              <div className="flex flex-col">
                 <span className="font-sans text-[10px] uppercase tracking-widest opacity-30 font-black text-secondary">Registry Open</span>
                 <span className="font-sans text-[10px] font-black uppercase tracking-widest text-accent">Active Membership Required</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Sidebar Content */}
        <div className="lg:col-span-5 flex flex-col bg-[#FAF9F6]">
          <div className="flex-1 p-8 md:p-16 border-b border-secondary/10 overflow-auto custom-scrollbar">
            <div className="flex justify-between items-center mb-12">
              <div className="space-y-1">
                 <span className="block text-[10px] font-black uppercase tracking-[0.3em] text-secondary">Live Catalog</span>
                 <h3 className="text-2xl font-black italic font-serif">Featured Drops</h3>
              </div>
              <Link to="/products" className="text-[10px] font-black uppercase tracking-widest underline underline-offset-4 opacity-40 hover:opacity-100 hover:text-accent">View All</Link>
            </div>
            
            <div className="space-y-6">
              {featuredProducts.map((p, index) => (
                <Link 
                  key={p.id}
                  to={`/products/${p.id}`}
                  className="group"
                >
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
                    className="flex gap-6 items-center p-4 bg-white border border-secondary/5 hover:border-accent transition-all hover:shadow-xl relative overflow-hidden"
                  >
                    <div className="w-24 h-24 flex-shrink-0 relative overflow-hidden border border-secondary/5 bg-secondary/5">
                      <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                         <h4 className="font-black text-lg font-serif text-secondary group-hover:text-accent transition-colors leading-[1]">{p.name}</h4>
                         <span className="text-[10px] font-black text-accent">${p.price}</span>
                      </div>
                      <p className="text-[10px] font-bold uppercase tracking-widest opacity-40 text-secondary mb-3">{p.category}</p>
                      <div className="flex items-center gap-4">
                         <div className="flex-1 h-[1px] bg-secondary/10"></div>
                         <span className="text-[9px] font-black uppercase tracking-[0.2em] opacity-40">Detail Inquiry →</span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
              {featuredProducts.length === 0 && (
                 <div className="py-20 text-center opacity-30 text-[10px] font-black uppercase tracking-[0.5em]">Synchronizing Archive...</div>
              )}
            </div>
          </div>

          {/* User Status Section */}
          <div className="p-8 md:p-16 flex flex-col justify-center bg-white">
             <div className="mb-10 grid grid-cols-2 gap-8">
                <div className="space-y-1">
                   <p className="text-[10px] font-black uppercase tracking-widest opacity-30">Archive Tier</p>
                   <p className="text-xl font-black font-serif italic">Level 01</p>
                </div>
                <div className="space-y-1 text-right">
                   <p className="text-[10px] font-black uppercase tracking-widest opacity-30">Status</p>
                   <p className="text-xl font-black font-serif italic text-accent">Authorized</p>
                </div>
             </div>
             
             <div className="h-1 bg-secondary/5 overflow-hidden">
               <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '85%' }}
                transition={{ duration: 1.5, ease: "circOut" }}
                className="h-full bg-secondary"
               ></motion.div>
             </div>
             <div className="flex justify-between mt-4">
                <span className="text-[9px] font-black uppercase tracking-[0.3em] opacity-40">Tactical Progression</span>
                <span className="text-[9px] font-black uppercase tracking-[0.3em] opacity-40">85% Complete</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
