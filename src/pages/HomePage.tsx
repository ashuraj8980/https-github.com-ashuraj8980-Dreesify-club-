import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { db } from '../firebase';
import { collection, query, where, limit, onSnapshot } from 'firebase/firestore';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import { ArrowRight, Star, Quote, ChevronRight, ShoppingBag } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

const HomePage = () => {
  const [newArrivals, setNewArrivals] = useState<any[]>([]);
  const [trending, setTrending] = useState<any[]>([]);
  const [bestSellers, setBestSellers] = useState<any[]>([]);

  useEffect(() => {
    // New Arrivals
    const qNew = query(collection(db, 'products'), where('isNewArrival', '==', true), limit(8));
    const unsubNew = onSnapshot(qNew, (snapshot) => {
      setNewArrivals(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    // Trending
    const qTrending = query(collection(db, 'products'), where('isTrending', '==', true), limit(8));
    const unsubTrending = onSnapshot(qTrending, (snapshot) => {
      setTrending(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    // Best Sellers
    const qBest = query(collection(db, 'products'), where('isBestSeller', '==', true), limit(4));
    const unsubBest = onSnapshot(qBest, (snapshot) => {
       setBestSellers(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => {
      unsubNew();
      unsubTrending();
      unsubBest();
    };
  }, []);

  const heroBanners = [
    {
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80',
      title: 'SUMMER ARCHIVE 24',
      subtitle: 'Exclusive Capsule Release',
      cta: 'Explore Collection'
    },
    {
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80',
      title: 'ELEGANT ESSENTIALS',
      subtitle: 'Premium Avant-Garde Silhouettes',
      cta: 'Shop Now'
    },
    {
       image: 'https://images.unsplash.com/photo-1539109132332-629963955ec2?auto=format&fit=crop&q=80',
       title: 'MODERN FEMININITY',
       subtitle: 'Redefining Structural Integrity',
       cta: 'View Trends'
    }
  ];

  const categories = [
    { name: 'Women Clothing', image: 'https://images.unsplash.com/photo-1564485377539-4af72d1f6a2f?auto=format&fit=crop&q=80' },
    { name: 'Him & Her', image: 'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?auto=format&fit=crop&q=80' },
    { name: 'Combo Sets', image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80' },
    { name: 'Birthday Dresses', image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80' },
  ];

  return (
    <div className="bg-white">
      {/* Hero Slider */}
      <section className="h-[70vh] md:h-[90vh]">
        <Swiper
          modules={[Autoplay, Pagination, Navigation, EffectFade]}
          effect="fade"
          autoplay={{ delay: 5000 }}
          pagination={{ clickable: true }}
          navigation
          loop
          className="h-full group"
        >
          {heroBanners.map((banner, idx) => (
            <SwiperSlide key={idx}>
              <div className="relative h-full w-full overflow-hidden">
                <img 
                  src={banner.image} 
                  alt={banner.title} 
                  className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-[10s] ease-linear" 
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center text-center px-4">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <p className="text-white text-xs md:text-sm font-black uppercase tracking-[0.5em] mb-4">{banner.subtitle}</p>
                    <h2 className="text-white text-5xl md:text-8xl font-serif font-black italic uppercase mb-10 tracking-tight leading-none">
                      {banner.title.split(' ')[0]}<br/>
                      <span className="text-accent underline decoration-white/20 underline-offset-8">{banner.title.split(' ').slice(1).join(' ')}</span>
                    </h2>
                    <Link to="/products" className="inline-flex items-center gap-4 bg-white text-secondary px-8 md:px-12 py-4 md:py-6 text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em] hover:bg-accent hover:text-white transition-all shadow-2xl">
                      {banner.cta} <ArrowRight size={16} />
                    </Link>
                  </motion.div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Featured Categories */}
      <section className="py-24 px-6 md:px-12 max-w-[1920px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
           <div className="space-y-4">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-accent">Categorical Archive</span>
              <h3 className="text-4xl md:text-6xl font-serif font-black italic uppercase leading-none">Curated<br/>Segments</h3>
           </div>
           <Link to="/products" className="text-xs font-black uppercase tracking-widest border-b-2 border-secondary pb-1 hover:text-accent hover:border-accent transition-all">Explore Full Index</Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
           {categories.map((cat, idx) => (
             <Link key={idx} to={`/products?category=${cat.name}`} className="group relative aspect-[3/4] overflow-hidden bg-secondary/5">
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex flex-col justify-end p-8 text-white">
                   <span className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-2">Registry 0{idx + 1}</span>
                   <h4 className="text-2xl font-serif font-black italic uppercase">{cat.name}</h4>
                   <div className="h-[1px] w-0 group-hover:w-full bg-accent mt-4 transition-all duration-500"></div>
                </div>
             </Link>
           ))}
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-24 bg-[#F9F8F6]">
        <div className="px-6 md:px-12 max-w-[1920px] mx-auto">
          <div className="text-center mb-16 space-y-4">
             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-accent">Recent Acquisitions</span>
             <h3 className="text-4xl md:text-6xl font-serif font-black italic uppercase">New Arrivals</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
             {newArrivals.map((product) => (
               <ProductCard key={product.id} product={product} />
             ))}
          </div>
          
          <div className="mt-20 text-center">
            <Link to="/products?filter=new" className="inline-block px-12 py-5 border-2 border-secondary font-black uppercase tracking-widest text-[11px] hover:bg-secondary hover:text-white transition-all">
               Load More Artifacts
            </Link>
          </div>
        </div>
      </section>

      {/* Limited Offer Banner */}
      <section className="py-24 px-6 md:px-12">
         <div className="max-w-[1920px] mx-auto bg-secondary p-12 md:p-24 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent opacity-5 -translate-y-1/2 translate-x-1/2 rounded-full group-hover:scale-150 transition-transform duration-1000"></div>
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
               <div className="max-w-xl text-center lg:text-left">
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/40 mb-6 block">Limited Archival Release</span>
                  <h3 className="text-4xl md:text-7xl font-serif font-black italic text-primary uppercase leading-[0.9] mb-8">
                     Collective Privilege 30% Discount
                  </h3>
                  <p className="text-primary/60 font-medium leading-relaxed mb-10">
                     Automatic 30% discount applied to all digital manifests (Online Payments). Register your intent now.
                  </p>
                  <Link to="/products" className="inline-block bg-accent text-white px-10 py-5 text-[11px] font-black uppercase tracking-widest hover:bg-white hover:text-secondary transition-all">
                     Claim Access
                  </Link>
               </div>
               <div className="w-full lg:w-1/3 aspect-square bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center p-12">
                  <div className="text-center">
                     <span className="text-8xl md:text-[120px] font-serif font-black italic text-accent leading-none">30</span>
                     <span className="text-4xl font-serif font-black italic text-primary">%</span>
                     <p className="text-[10px] font-black uppercase tracking-[0.5em] text-primary/40 mt-4">System Applied</p>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Trending Collection */}
      <section className="py-24 bg-white">
        <div className="px-6 md:px-12 max-w-[1920px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
             <div className="space-y-4">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-accent">Popular Protocols</span>
                <h3 className="text-4xl md:text-6xl font-serif font-black italic uppercase leading-none">Trending<br/>Now</h3>
             </div>
             <Link to="/products?category=Trending Collection" className="text-xs font-black uppercase tracking-widest border-b-2 border-secondary pb-1 hover:text-accent hover:border-accent transition-all">View Analytics</Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
             {trending.map((product) => (
               <ProductCard key={product.id} product={product} />
             ))}
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-24 bg-secondary text-primary">
         <div className="px-6 md:px-12 max-w-7xl mx-auto">
            <div className="text-center mb-16">
               <Quote className="mx-auto mb-8 text-accent opacity-50" size={48} />
               <h3 className="text-3xl md:text-5xl font-serif font-black italic uppercase">Client Testimonials</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
               {[
                 { name: 'Sana C.', role: 'Elite Member', text: 'The structural integrity of these garments is beyond anything in the current market. Pure architectural brilliance.' },
                 { name: 'Ashu K.', role: 'Global Curator', text: 'Fast, secure, and the aesthetic is uncompromisingly premium. DRESSIFY is the final destination for tactical fashion.' },
                 { name: 'Megha S.', role: 'Archive Participant', text: 'Minimalist luxury redefined. The online payment discount makes high-end couture accessible.' },
               ].map((review, i) => (
                 <div key={i} className="space-y-6 pt-10 border-t border-primary/10 relative group">
                    <div className="flex gap-1 text-accent">
                       {[...Array(5)].map((_, j) => <Star key={j} size={12} fill="currentColor" />)}
                    </div>
                    <p className="text-lg font-serif italic text-primary/70 leading-relaxed">&quot;{review.text}&quot;</p>
                    <div>
                       <p className="font-black uppercase tracking-widest text-xs">{review.name}</p>
                       <p className="text-[10px] font-bold text-accent uppercase tracking-widest mt-1">{review.role}</p>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 bg-accent relative overflow-hidden">
         <div className="px-6 md:px-12 max-w-[1920px] mx-auto relative z-10 flex flex-col items-center text-center">
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/60 mb-6">Dispatch Subscription</span>
            <h3 className="text-4xl md:text-7xl font-serif font-black italic text-white uppercase leading-[0.9] mb-12 max-w-4xl">
               Join the Collective for Exclusive Intel
            </h3>
            <div className="w-full max-w-2xl flex flex-col sm:flex-row gap-4">
               <input 
                 type="email" 
                 placeholder="ENTRY ADDRESS @ EMAIL.COM" 
                 className="flex-1 bg-white border-2 border-white px-8 py-6 text-[11px] font-black uppercase tracking-widest outline-none focus:border-secondary transition-all" 
               />
               <button className="bg-secondary text-primary px-12 py-6 text-[11px] font-black uppercase tracking-widest hover:bg-white hover:text-secondary transition-all shadow-xl">
                  Synchronize
               </button>
            </div>
            <p className="mt-8 text-[10px] font-black uppercase tracking-[0.2em] text-white/50">Secure Opt-in. No Spam Policy Active.</p>
         </div>
      </section>
    </div>
  );
};

const ProductCard = ({ product }: { product: any }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group"
    >
      <Link to={`/products/${product.id}`} className="block relative bg-secondary/5 aspect-[3/4] overflow-hidden mb-6">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110" 
        />
        {product.discount > 0 && (
          <span className="absolute top-4 left-4 bg-accent text-white text-[9px] font-black uppercase tracking-widest px-3 py-1.5 shadow-xl">
             -{product.discount}% Archive
          </span>
        )}
        {product.isNewArrival && (
          <span className="absolute top-4 right-4 bg-white text-secondary text-[9px] font-black uppercase tracking-widest px-3 py-1.5 shadow-xl">
             New Entry
          </span>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100">
           <div className="bg-white text-secondary px-6 py-4 flex items-center gap-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <ShoppingBag size={14} />
              <span className="text-[10px] font-black uppercase tracking-widest">Select Variant</span>
           </div>
        </div>
      </Link>
      <div className="space-y-2">
        <div className="flex justify-between items-start">
           <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary/40">{product.category}</h4>
           <div className="flex gap-2">
              {[...Array(5)].map((_, i) => <Star key={i} size={8} className="fill-secondary/10 text-secondary/10" />)}
           </div>
        </div>
        <Link to={`/products/${product.id}`}>
          <h3 className="text-xl font-serif font-black italic uppercase group-hover:text-accent transition-colors leading-[1]">{product.name}</h3>
        </Link>
        <div className="pt-2 flex items-center gap-4">
          <span className="text-lg font-black italic text-secondary">₹{product.price}</span>
          {product.originalPrice > product.price && (
            <span className="text-sm font-bold text-secondary/20 line-through">₹{product.originalPrice}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default HomePage;
