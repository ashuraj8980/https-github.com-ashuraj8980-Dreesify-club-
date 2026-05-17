import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore";
import { db } from '../firebase';
import { useCart } from '../context/CartContext';
import { motion } from 'motion/react';
import { ShoppingBag, ChevronLeft, ShieldCheck, Truck } from 'lucide-react';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() });
        } else {
          // Fallback if not in DB, use mock for demo
          const productsList = [
            { id: 1, name: 'Monochrome Shell', price: 240, category: 'Outerwear', code: 'A1', img: 'https://images.unsplash.com/photo-1544441893-675973e31d85?auto=format&fit=crop&q=80', description: 'Technically constructed shell with multi-layer membrane. Waterproof, wind-resistant, and archival in silhouette.' },
            { id: 2, name: 'Raw Edge Hoodie', price: 180, category: 'Innerwear', code: 'A2', img: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80', description: 'Heavyweight loopback cotton with hand-finished raw edge detailing. Over-sized drop shoulder construction.' },
            { id: 3, name: 'Asymmetric Drapery', price: 120, category: 'Essentials', code: 'A3', img: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80', description: 'Lightweight jersey with experimental draping logic. Designed for layering in high-density urban environments.' },
            { id: 4, name: 'Cargo Variant 01', price: 210, category: 'Trousers', code: 'A4', img: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80' },
            { id: 5, name: 'Brutalist Tote', price: 95, category: 'Accessory', code: 'A5', img: 'https://images.unsplash.com/photo-1544816153-09730734bh7f?auto=format&fit=crop&q=80' },
            { id: 6, name: 'Tonal Rib Knit', price: 150, category: 'Knitwear', code: 'A6', img: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80' },
          ];
          const mockProduct = productsList.find(p => p.id === parseInt(id));
          if (mockProduct) setProduct(mockProduct);
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
      addToCart(product);
      // We could use a toast here instead of alert
    }
  };

  if (isLoading) {
    return (
      <div className="bg-[#FDFCFB] min-h-screen flex items-center justify-center">
        <p className="text-[10px] font-black uppercase tracking-[0.5em] animate-pulse">Initializing Data Stream...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="bg-[#FDFCFB] min-h-screen flex flex-col items-center justify-center gap-8">
        <p className="text-xl font-serif font-black italic opacity-20 uppercase tracking-widest text-secondary">Entry not found in Archive</p>
        <button onClick={() => navigate('/products')} className="bg-secondary text-primary px-10 py-4 text-[10px] font-black uppercase tracking-widest hover:bg-accent transition-all shadow-xl">
          Return to The Archive
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#FDFCFB] min-h-screen pb-40">
      <section className="px-6 md:px-12 py-12 border-b border-secondary/10 bg-white">
        <div className="max-w-7xl mx-auto">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-accent mb-6 hover:-translate-x-2 transition-transform cursor-pointer">
            <ChevronLeft size={16} /> Retrograde to Archive
          </button>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          {/* Image Column */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-7 space-y-12"
          >
            <div className="aspect-[3/4] bg-secondary/5 border border-secondary/10 relative group overflow-hidden">
                <img src={product.img || product.imageUrl} alt={product.name} className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000" />
                <div className="absolute top-8 left-8 bg-white/80 p-4 text-[10px] font-black italic shadow-2xl border border-secondary/5">
                  SERIES_REF: {product.code || ('A'+product.id)}
                </div>
            </div>
          </motion.div>

          {/* Details Column */}
          <div className="lg:col-span-5 flex flex-col pt-10">
             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.2 }}
               className="space-y-12"
             >
                <div>
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40 mb-4 block">{product.category} / ARCHIVE COLLECTION</span>
                  <h1 className="text-6xl md:text-7xl font-black tracking-tighter font-serif italic text-secondary uppercase leading-[0.85] mb-6">
                    {product.name}
                  </h1>
                  <p className="text-4xl font-serif font-black italic text-accent">${product.price}</p>
                </div>

                <div className="h-px bg-secondary/10"></div>

                <div className="space-y-6">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-secondary/40">Technical Specs</h4>
                    <p className="text-sm font-sans text-secondary/60 leading-relaxed italic">
                      {product.description || "Experimental silhouette developed for high-performance urban utility. Archival grade textile construction."}
                    </p>
                </div>

                <div className="space-y-6 pt-6">
                  <button 
                    onClick={handleAddToCart}
                    className="w-full bg-secondary text-primary font-black uppercase text-[11px] tracking-[0.3em] py-8 shadow-3xl hover:bg-accent transition-all active:scale-95 flex items-center justify-center gap-4 group cursor-pointer"
                  >
                    Allocate to Project <ShoppingBag size={18} className="group-hover:rotate-12 transition-transform" />
                  </button>
                  
                  <div className="grid grid-cols-2 gap-4">
                     <div className="p-6 border border-secondary/5 bg-white flex flex-col gap-3">
                        <Truck size={16} className="text-accent" />
                        <span className="text-[9px] font-black uppercase tracking-widest">Global Dispatch</span>
                     </div>
                     <div className="p-6 border border-secondary/5 bg-white flex flex-col gap-3">
                        <ShieldCheck size={16} className="text-accent" />
                        <span className="text-[9px] font-black uppercase tracking-widest">Secured Archive</span>
                     </div>
                  </div>
                </div>

                <div className="pt-20">
                   <p className="text-[10px] font-black uppercase tracking-widest text-secondary/20 leading-loose">
                     "Each DREESIFY artifact is a result of structural experimentation. Variations in texture and 'Raw Edge' finish are intentional manifestations of the design process."
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
