import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore";
import { db } from '../firebase';
import { useCart } from '../context/CartContext';
import { motion } from 'motion/react';
import { ShoppingBag, ChevronLeft, ShieldCheck, Truck, ArrowRight, History } from 'lucide-react';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() });
        }
      } catch (error) {
        console.error("Error fetching product: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        ...product,
        price: parseFloat(product.price)
      });
    }
  };

  if (isLoading) {
    return (
      <div className="bg-[#FAF9F6] min-h-screen flex items-center justify-center">
        <div className="text-center">
           <div className="w-16 h-16 border-2 border-secondary/10 border-t-accent rounded-full animate-spin mb-6 mx-auto"></div>
           <p className="text-[10px] font-black uppercase tracking-[0.5em] animate-pulse">Decrypting Product Metadata...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="bg-[#FAF9F6] min-h-screen flex flex-col items-center justify-center p-8">
        <div className="max-w-md text-center">
           <History className="mx-auto text-secondary/10 mb-10" size={80} />
           <h2 className="text-4xl font-serif font-black italic text-secondary leading-none mb-6 uppercase">Archive Entry Missing</h2>
           <p className="text-[11px] font-black uppercase tracking-[0.3em] opacity-30 leading-relaxed mb-12">
             The requested object identifier does not correspond to any active physical inventory in the current series.
           </p>
           <button onClick={() => navigate('/products')} className="bg-secondary text-primary px-12 py-6 text-[10px] font-black uppercase tracking-widest hover:bg-accent transition-all shadow-3xl">
             Return to Global Registry
           </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF9F6] min-h-screen">
      {/* Detail Header / Breadcrumb */}
      <section className="px-6 md:px-16 py-12 border-b border-secondary/5 bg-white relative z-20">
        <div className="max-w-screen-2xl mx-auto flex justify-between items-center">
          <button onClick={() => navigate(-1)} className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] text-accent hover:text-secondary hover:-translate-x-3 transition-all cursor-pointer group">
            <ChevronLeft size={16} className="group-hover:scale-125 transition-transform" /> Back to Collection
          </button>
          <div className="flex items-center gap-6">
             <span className="text-[10px] font-black uppercase tracking-widest opacity-20">Catalog Status:</span>
             <span className="text-[10px] font-black uppercase tracking-widest text-green-500 bg-green-50 px-3 py-1">Stock Verified</span>
          </div>
        </div>
      </section>

      <div className="max-w-screen-2xl mx-auto px-6 md:px-16 py-12 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-32">
          {/* Visual Column */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7"
          >
            <div className="aspect-[3/4] md:aspect-square lg:aspect-[4/5] bg-white border border-secondary/5 relative group overflow-hidden shadow-2xl">
                <img 
                  src={product.imageUrl} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-all duration-1000 scale-[1.02]" 
                />
                
                {/* Visual Overlays */}
                <div className="absolute top-10 left-10 z-20 bg-secondary text-primary p-6 text-[10px] font-black italic shadow-2xl skew-x-[-12deg]">
                   <div className="skew-x-[12deg]">
                      <p className="opacity-40 mb-1 border-b border-primary/20 pb-1">INVENTORY_ID</p>
                      <p className="text-lg">{product.inventoryCode || `A-${product.id.substring(0, 6)}`}</p>
                   </div>
                </div>

                <div className="absolute bottom-10 right-10 z-20 hidden md:block">
                   <div className="bg-white/90 backdrop-blur-md p-6 border border-secondary/10 shadow-2xl space-y-4">
                      <div className="space-y-1">
                         <p className="text-[9px] font-black uppercase tracking-widest opacity-30 uppercase">Authentication</p>
                         <p className="text-xs font-black italic">DRESSIFY™ Verified</p>
                      </div>
                      <div className="flex gap-2">
                         <div className="w-8 h-1 bg-accent"></div>
                         <div className="w-4 h-1 bg-secondary/10"></div>
                         <div className="w-12 h-1 bg-secondary/10"></div>
                      </div>
                   </div>
                </div>
            </div>
          </motion.div>

          {/* Configuration Column */}
          <div className="lg:col-span-5 flex flex-col pt-4">
             <motion.div 
               initial={{ opacity: 0, x: 30 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.6, delay: 0.2 }}
               className="space-y-12"
             >
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                     <span className="px-3 py-1 bg-secondary text-primary text-[9px] font-black uppercase tracking-[0.2em]">{product.category}</span>
                     <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                     <span className="text-[9px] font-black text-accent uppercase tracking-widest italic">New Arrival Entry</span>
                  </div>
                  <h1 className="text-6xl xl:text-8xl font-black tracking-[-0.05em] font-serif italic text-secondary uppercase leading-[0.85]">
                     {product.name}
                  </h1>
                  <div className="flex items-end gap-6">
                     <p className="text-5xl font-serif font-black italic text-accent leading-none">${product.price}</p>
                     <p className="text-[10px] font-black uppercase tracking-widest opacity-20 pb-1 underline decoration-accent/30 decoration-2 underline-offset-4">VAT Included</p>
                  </div>
                </div>

                <div className="h-px bg-secondary/5"></div>

                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                       <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary">Tactical Specification</h4>
                       <span className="text-[9px] font-black uppercase text-accent">Expand Documentation +</span>
                    </div>
                    <p className="text-sm font-medium font-sans text-secondary/60 leading-relaxed italic border-l-2 border-secondary/5 pl-8 py-2">
                      {product.description || "A meticulously constructed silhouette exploring the dialogue between rigid brutalist geometry and fluid organic movement. This archive piece features reinforced structural seams and a high-density tactical finish."}
                    </p>
                </div>

                <div className="space-y-8 pt-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <button 
                       onClick={handleAddToCart}
                       className="w-full bg-secondary text-primary font-black uppercase text-[11px] tracking-[0.3em] py-8 shadow-2xl hover:bg-accent transition-all active:scale-95 flex items-center justify-center gap-6 group cursor-pointer"
                     >
                       ADD TO CART <ShoppingBag size={18} className="group-hover:rotate-12 transition-transform" />
                     </button>
                     <button 
                       onClick={() => {
                          handleAddToCart();
                          navigate('/checkout');
                       }}
                       className="w-full bg-white border border-secondary text-secondary font-black uppercase text-[11px] tracking-[0.3em] py-8 shadow-sm hover:bg-secondary hover:text-primary transition-all active:scale-95 flex items-center justify-center gap-6 group cursor-pointer"
                     >
                       BUY IT NOW <ArrowRight size={18} className="group-hover:translate-x-3 transition-transform" />
                     </button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                     <div className="p-8 border border-secondary/5 bg-white flex flex-col gap-4 group hover:border-accent transition-colors">
                        <Truck size={20} className="text-accent group-hover:translate-x-2 transition-transform" />
                        <div>
                           <p className="text-[10px] font-black uppercase tracking-widest mb-1">Global Dispatch</p>
                           <p className="text-[9px] font-medium opacity-40 uppercase">3-5 Business Cycles</p>
                        </div>
                     </div>
                     <div className="p-8 border border-secondary/5 bg-white flex flex-col gap-4 group hover:border-accent transition-colors">
                        <ShieldCheck size={20} className="text-accent group-hover:scale-110 transition-transform" />
                        <div>
                           <p className="text-[10px] font-black uppercase tracking-widest mb-1">Archive Secure</p>
                           <p className="text-[9px] font-medium opacity-40 uppercase">Authenticated Artifact</p>
                        </div>
                     </div>
                  </div>
                </div>

                <div className="pt-24 border-t border-secondary/5">
                   <div className="flex items-center gap-6 mb-4">
                      <div className="w-10 h-[1px] bg-secondary/10"></div>
                      <span className="text-[9px] font-black uppercase tracking-[0.4em] opacity-30">Archive Philosophy</span>
                   </div>
                   <p className="text-[11px] font-bold italic uppercase tracking-widest text-secondary/30 leading-loose">
                     &quot;The artifact you are viewing is part of the DRESSIFY Archivè series. We reject seasonal trends in favor of timeless structural integrity. Every garment is a statement of architectural intent.&quot;
                   </p>
                </div>
             </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
