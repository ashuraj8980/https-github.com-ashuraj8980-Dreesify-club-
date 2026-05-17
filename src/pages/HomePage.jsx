import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

const HomePage = () => {
  return (
    <div className="min-h-full flex flex-col">
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12">
        {/* Left Hero Column */}
        <div className="lg:col-span-7 p-8 md:p-12 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-secondary/10 relative overflow-hidden bg-white/40">
          <div className="absolute -left-4 top-1/2 -translate-y-1/2 text-[120px] md:text-[180px] font-black opacity-[0.03] select-none pointer-events-none font-serif text-secondary">DRSF</div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10"
          >
            <h2 className="text-[60px] md:text-[110px] leading-[0.85] font-black italic mb-8 tracking-tighter font-serif text-secondary">
              VOL. 01:<br/><span className="text-accent">RAW EDGE</span>
            </h2>
            <p className="max-w-md text-lg leading-relaxed text-secondary/70 font-sans">
              Exploring the intersection of brutalist architecture and functional avant-garde apparel. A curated capsule for the modern nomad.
            </p>
            <div className="mt-12 flex flex-wrap items-center gap-6">
              <Link to="/products" className="px-10 py-5 bg-secondary text-primary font-sans font-bold uppercase tracking-tighter text-sm flex items-center gap-4 active:scale-95 transition-transform">
                Enter Archive
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
              </Link>
              <span className="font-sans text-[11px] uppercase tracking-widest opacity-40 italic font-bold text-secondary">Exclusive Drop: 22.11.24</span>
            </div>
          </motion.div>
        </div>

        {/* Right Sidebar Content */}
        <div className="lg:col-span-5 flex flex-col">
          <div className="flex-1 p-8 md:p-12 border-b border-secondary/10 bg-secondary/5">
            <div className="flex justify-between items-start mb-10">
              <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-secondary">Featured Capsule</span>
              <span className="font-sans text-[10px] font-medium uppercase px-2 py-1 bg-white border border-secondary/10 text-secondary">LIVE VIEW</span>
            </div>
            
            <div className="space-y-8">
              {[
                { id: '1', title: 'Monochrome Shell', desc: 'Limited utility outerwear.', code: 'A1' },
                { id: '2', title: 'Urban Denim', desc: 'High-weight cotton silhouettes.', code: 'A2' },
                { id: '3', title: 'Streetwear Hoodie', desc: 'Comfort and style combined.', code: 'A3' }
              ].map((item, index) => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
                  className="flex gap-6 items-center group cursor-pointer"
                >
                  <div className={`w-20 h-20 md:w-24 md:h-24 flex-shrink-0 flex items-center justify-center font-bold text-2xl italic transition-all border ${index === 0 ? 'bg-accent/10 border-accent/20 text-accent group-hover:bg-accent group-hover:text-white' : 'bg-secondary/10 border-secondary/20 text-secondary group-hover:bg-secondary group-hover:text-white'}`}>
                    {item.code}
                  </div>
                  <div>
                    <h4 className="font-bold text-xl font-serif text-secondary">{item.title}</h4>
                    <p className="text-sm opacity-60 italic text-secondary">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Stats/Status Section */}
          <div className="p-8 md:p-12 flex flex-col justify-center bg-white border-t lg:border-t-0">
             <div className="flex items-center gap-4 text-xs font-sans font-black uppercase tracking-widest text-secondary">
               <span>Club Membership:</span>
               <span className="text-accent">Member Active</span>
             </div>
             <div className="mt-4 h-1 bg-secondary/10 overflow-hidden">
               <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '66%' }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-full bg-secondary"
               ></motion.div>
             </div>
             <div className="flex justify-between mt-2 font-sans text-[9px] uppercase tracking-widest opacity-40 text-secondary">
               <span>Access Tier Progress</span>
               <span>Level 01</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
