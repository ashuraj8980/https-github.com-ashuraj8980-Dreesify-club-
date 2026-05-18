import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { doc, getDoc, collection, query, where, limit, getDocs } from "firebase/firestore";
import { db } from '../firebase';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  ChevronLeft, 
  ShieldCheck, 
  Truck, 
  ArrowRight, 
  History, 
  Star, 
  Heart, 
  Share2, 
  Ruler,
  ChevronRight,
  Plus,
  Minus,
  CheckCircle2
} from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Thumbs, FreeMode } from 'swiper/modules';
import toast from 'react-hot-toast';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';
import 'swiper/css/free-mode';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<any>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [couponCode, setCouponCode] = useState('');

  useEffect(() => {
    const fetchProductAndRelated = async () => {
      if (!id) return;
      try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const productData = { id: docSnap.id, ...docSnap.data() };
          setProduct(productData);
          
          // Fetch related products
          const relatedQ = query(
            collection(db, "products"), 
            where("category", "==", productData.category),
            limit(4)
          );
          const relatedSnap = await getDocs(relatedQ);
          setRelatedProducts(relatedSnap.docs
            .map(doc => ({ id: doc.id, ...doc.data() }))
            .filter(p => p.id !== id)
          );
        }
      } catch (error) {
        console.error("Error fetching product: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductAndRelated();
    window.scrollTo(0, 0);
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    if (product.sizes?.length > 0 && !selectedSize) {
      toast.error('Please select a size');
      return;
    }
    if (product.colors?.length > 0 && !selectedColor) {
      toast.error('Please select a color');
      return;
    }

    addToCart({
      ...product,
      selectedSize,
      selectedColor,
      quantity,
      price: parseFloat(product.price)
    });
    toast.success('Added to collection');
  };

  const images = product?.imageUrls || [product?.imageUrl];

  if (isLoading) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
           <div className="w-16 h-16 border-2 border-secondary/10 border-t-accent rounded-full animate-spin mb-6 mx-auto"></div>
           <p className="text-[10px] font-black uppercase tracking-[0.5em] animate-pulse text-secondary">Synchronizing Data Link...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="bg-white min-h-screen flex flex-col items-center justify-center p-8">
        <div className="max-w-md text-center">
           <History className="mx-auto text-secondary/10 mb-10" size={80} />
           <h2 className="text-4xl font-serif font-black italic text-secondary leading-none mb-6 uppercase">Artifact Not Found</h2>
           <button onClick={() => navigate('/products')} className="bg-secondary text-primary px-12 py-6 text-[10px] font-black uppercase tracking-widest hover:bg-accent transition-all">
             Browse Catalog
           </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Breadcrumb */}
      <div className="px-6 md:px-12 py-8 max-w-[1920px] mx-auto border-b border-secondary/5">
        <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-secondary/40">
           <Link to="/" className="hover:text-accent transition-colors">Home</Link>
           <ChevronRight size={12} />
           <Link to="/products" className="hover:text-accent transition-colors">Catalog</Link>
           <ChevronRight size={12} />
           <span className="text-secondary">{product.name}</span>
        </div>
      </div>

      <div className="max-w-[1920px] mx-auto px-6 md:px-12 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24">
          {/* Visuals Section */}
          <div className="space-y-6">
            <div className="sticky top-32">
              <Swiper
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs, Pagination]}
                className="aspect-[3/4] group overflow-hidden bg-[#F9F8F6] border border-secondary/5"
              >
                {images.map((img: string, idx: number) => (
                  <SwiperSlide key={idx}>
                    <img src={img} alt={`${product.name} ${idx}`} className="w-full h-full object-cover" />
                  </SwiperSlide>
                ))}
              </Swiper>
              
              <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mt-4 h-24 sm:h-32"
              >
                {images.map((img: string, idx: number) => (
                  <SwiperSlide key={idx} className="cursor-pointer border border-secondary/5 overflow-hidden opacity-50 hover:opacity-100 transition-opacity [&.swiper-slide-thumb-active]:opacity-100 [&.swiper-slide-thumb-active]:border-accent [&.swiper-slide-thumb-active]:border-2">
                    <img src={img} alt={`thumb ${idx}`} className="w-full h-full object-cover" />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>

          {/* Details Section */}
          <div className="flex flex-col">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-10"
            >
              {/* Header Info */}
              <div className="space-y-6">
                <div className="flex flex-wrap items-center gap-4">
                  <span className="bg-secondary text-primary px-3 py-1 text-[9px] font-black uppercase tracking-widest">{product.category}</span>
                  {product.isNewArrival && <span className="bg-accent text-white px-3 py-1 text-[9px] font-black uppercase tracking-widest">New Arrival</span>}
                  <div className="flex items-center gap-1 ml-auto">
                    {[...Array(5)].map((_, i) => <Star key={i} size={12} className="fill-accent text-accent" />)}
                    <span className="text-[10px] font-black uppercase ml-2 opacity-40">(48 Reviews)</span>
                  </div>
                </div>
                
                <h1 className="text-5xl md:text-7xl font-serif font-black italic uppercase text-secondary leading-none">
                  {product.name}
                </h1>

                <div className="flex items-end gap-6 text-secondary">
                  <span className="text-4xl md:text-5xl font-serif font-black italic text-accent">₹{product.price}</span>
                  {product.originalPrice > product.price && (
                    <span className="text-xl font-bold text-secondary/20 line-through pb-1">₹{product.originalPrice}</span>
                  )}
                  <span className="text-[10px] font-black uppercase tracking-widest bg-green-50 text-green-600 px-3 py-1 rounded-full border border-green-100">
                    {product.discount}% OFF ARCHIVE
                  </span>
                </div>
              </div>

              <div className="h-px bg-secondary/5"></div>

              {/* Selectors */}
              <div className="space-y-8">
                {/* Size Selector */}
                {product.sizes && product.sizes.length > 0 && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-end">
                       <h4 className="text-[10px] font-black uppercase tracking-widest text-secondary">Dimensions / Size</h4>
                       <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest opacity-40 hover:text-accent transition-colors">
                          <Ruler size={14} /> Size Guideline
                       </button>
                    </div>
                    <div className="flex flex-wrap gap-3">
                       {product.sizes.map((size: string) => (
                         <button 
                           key={size}
                           onClick={() => setSelectedSize(size)}
                           className={`w-14 h-14 border flex items-center justify-center text-xs font-black uppercase tracking-widest transition-all ${selectedSize === size ? 'bg-secondary text-primary border-secondary' : 'bg-white text-secondary border-secondary/10 hover:border-accent'}`}
                         >
                           {size}
                         </button>
                       ))}
                    </div>
                  </div>
                )}

                {/* Color Selector */}
                {product.colors && product.colors.length > 0 && (
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-secondary">Chromatic Variant</h4>
                    <div className="flex flex-wrap gap-4">
                       {product.colors.map((color: string) => (
                         <button 
                           key={color}
                           onClick={() => setSelectedColor(color)}
                           className={`w-12 h-12 rounded-full border-2 p-1 transition-all ${selectedColor === color ? 'border-accent' : 'border-transparent'}`}
                         >
                           <div 
                             className="w-full h-full rounded-full border border-secondary/10" 
                             style={{ backgroundColor: color.toLowerCase() }} 
                           />
                         </button>
                       ))}
                    </div>
                  </div>
                )}

                {/* Quantity */}
                <div className="space-y-4">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-secondary">Operational Quantity</h4>
                  <div className="flex items-center w-32 border border-secondary/10 p-2">
                     <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 flex items-center justify-center hover:bg-secondary/5">
                        <Minus size={14} />
                     </button>
                     <span className="flex-1 text-center font-black text-xs">{quantity}</span>
                     <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 flex items-center justify-center hover:bg-secondary/5">
                        <Plus size={14} />
                     </button>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-4 pt-10">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button 
                      onClick={handleAddToCart}
                      className="w-full bg-secondary text-primary font-black uppercase text-[11px] tracking-widest py-8 hover:bg-accent transition-all flex items-center justify-center gap-6 shadow-2xl active:scale-95 group"
                    >
                      SECURE ARTIFACT <ShoppingBag size={18} className="group-hover:rotate-12 transition-transform" />
                    </button>
                    <button 
                      onClick={() => {
                         handleAddToCart();
                         navigate('/checkout');
                      }}
                      className="w-full bg-white border border-secondary text-secondary font-black uppercase text-[11px] tracking-widest py-8 hover:bg-secondary hover:text-primary transition-all flex items-center justify-center gap-6 active:scale-95 group"
                    >
                      INSTANT CHECKOUT <ArrowRight size={18} className="group-hover:translate-x-3 transition-transform" />
                    </button>
                 </div>
                 <div className="flex items-center justify-center gap-12 py-6">
                    <button className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest opacity-40 hover:opacity-100 hover:text-accent transition-all">
                       <Heart size={16} /> Wishlist Archiver
                    </button>
                    <button className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest opacity-40 hover:opacity-100 hover:text-accent transition-all">
                       <Share2 size={16} /> Distribute Link
                    </button>
                 </div>
              </div>

              {/* Delivery & Coupons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-y border-secondary/5 py-12">
                 <div className="space-y-4">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-secondary flex items-center gap-3">
                       <CheckCircle2 size={14} className="text-accent" /> Exclusive Privileges
                    </h4>
                    <div className="space-y-3">
                       <div className="p-4 bg-[#F9F8F6] border border-secondary/5 rounded-sm">
                          <p className="text-[10px] font-black uppercase tracking-widest mb-1 text-accent">Promo Protocol</p>
                          <div className="flex gap-2">
                             <input 
                               value={couponCode}
                               onChange={(e) => setCouponCode(e.target.value)}
                               placeholder="ENTER CODE" 
                               className="bg-transparent border-b border-secondary/20 flex-1 outline-none text-xs font-bold" 
                             />
                             <button className="text-[9px] font-black uppercase tracking-widest text-secondary hover:text-accent transition-all">Apply</button>
                          </div>
                       </div>
                       <p className="text-[9px] font-bold text-secondary/40 italic">* Automatic 30% discount for Digital Payments</p>
                    </div>
                 </div>
                 <div className="space-y-6">
                    <div className="flex items-start gap-4">
                       <Truck size={18} className="text-secondary/30 mt-1" />
                       <div>
                          <p className="text-[10px] font-black uppercase tracking-widest">Global Logistics</p>
                          <p className="text-xs text-secondary/50 font-medium leading-relaxed">Estimated dispatch in 3-5 standard business cycles.</p>
                       </div>
                    </div>
                    <div className="flex items-start gap-4">
                       <ShieldCheck size={18} className="text-secondary/30 mt-1" />
                       <div>
                          <p className="text-[10px] font-black uppercase tracking-widest">Secure Verification</p>
                          <p className="text-xs text-secondary/50 font-medium leading-relaxed">Each piece is individually authenticated and sealed.</p>
                       </div>
                    </div>
                 </div>
              </div>

              {/* Description */}
              <div className="space-y-6">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-secondary">Tactical Documentation</h4>
                <p className="text-sm font-medium text-secondary/60 leading-relaxed font-sans italic border-l-2 border-accent pl-8 py-2">
                  {product.description || "Experimental construct derived from architectural silhouettes. Featuring high-density tactile finish and structural ribbing. A statement of uncompromising modernity."}
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Related Section */}
        {relatedProducts.length > 0 && (
          <section className="mt-40">
             <div className="flex justify-between items-end mb-16 px-4">
                <div className="space-y-4">
                   <span className="text-[10px] font-black uppercase tracking-[0.4em] text-accent">Related Synchronizations</span>
                   <h3 className="text-4xl md:text-5xl font-serif font-black italic uppercase leading-none">Complete<br/>The Aesthetic</h3>
                </div>
                <Link to="/products" className="text-xs font-black uppercase tracking-widest border-b-2 border-secondary pb-1 hover:text-accent hover:border-accent transition-all">Explore Entire Series</Link>
             </div>
             
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {relatedProducts.map((p) => (
                   <ProductCard key={p.id} product={p} />
                ))}
             </div>
          </section>
        )}
      </div>
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
      <Link to={`/products/${product.id}`} className="block relative bg-[#F9F8F6] aspect-[3/4] overflow-hidden mb-6 border border-secondary/5">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100">
           <div className="bg-white text-secondary px-6 py-4 flex items-center gap-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 shadow-2xl">
              <ShoppingBag size={14} />
              <span className="text-[10px] font-black uppercase tracking-widest">Select Variant</span>
           </div>
        </div>
      </Link>
      <div className="space-y-2 px-2">
        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary/40">{product.category}</h4>
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

export default ProductDetailPage;
