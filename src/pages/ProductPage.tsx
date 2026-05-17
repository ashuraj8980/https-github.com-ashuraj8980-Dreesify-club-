import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { ShoppingBag, Eye, ArrowRight, Filter, Package } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { db } from '../firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';

const ProductPage = () => {
  const { addToCart } = useCart();
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    let q = query(collection(db, 'products'));
    
    if (categoryParam) {
      // Map param to display name for filtering
      const categoryMap: { [key: string]: string } = {
        'combo': 'Combo',
        'modern': 'Modern',
        'couple': 'Couple',
        'archive': 'Archive'
      };
      const filterValue = categoryMap[categoryParam] || categoryParam;
      q = query(collection(db, 'products'), where('category', '==', filterValue));
    }

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const prods = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(prods);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [categoryParam]);

  const getTitle = () => {
    if (!categoryParam) return "The Archive";
    const titles: { [key: string]: string } = {
      'combo': 'Combo Clothing',
      'modern': 'Modern Style',
      'couple': 'Couple Outfits'
    };
    return titles[categoryParam] || "Filtered Archive";
  };

  return (
    <div className="bg-primary min-h-screen">
      {/* Category Header */}
      <section className="px-6 md:px-12 py-16 md:py-32 border-b border-secondary/10 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-secondary/5 -skew-x-12 translate-x-20 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-8 relative z-10">
          <div>
            <div className="flex items-center gap-4 mb-4">
               <span className="w-8 h-[1px] bg-accent"></span>
               <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">System Registry / Archives</span>
            </div>
            <h1 className="text-6xl md:text-9xl font-black tracking-[-0.05em] font-serif uppercase italic leading-none">
              DRESSIFY<br/>
              <span className="text-accent underline decoration-secondary/10 underline-offset-16">{categoryParam ? (categoryParam.toUpperCase() + ' SERIES') : 'ARCHIVE'}</span>
            </h1>
          </div>
          <div className="max-w-xs">
            <p className="text-sm font-sans font-medium text-secondary/60 leading-relaxed mb-8">
              A meticulously curated selection of tactical garments and archival silhouettes. Each piece is authenticated and registered within the DRESSIFY Collective database.
            </p>
            <div className="flex flex-wrap gap-4">
              <span className="text-[9px] font-black uppercase tracking-widest border border-secondary/20 px-4 py-2 bg-white flex items-center gap-2">
                 <Filter size={10} /> Active Filter: {categoryParam ? categoryParam.toUpperCase() : 'TOTAL REGISTRY'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="px-6 md:px-12 py-20 pb-40">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="py-40 text-center">
               <div className="inline-block w-12 h-12 border-2 border-secondary/10 border-t-accent rounded-full animate-spin"></div>
               <p className="mt-6 text-[10px] font-black uppercase tracking-[0.5em] opacity-30 text-secondary">Decrypting Archive Data...</p>
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
              {products.map((product, i) => (
                <motion.div 
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.05 }}
                  className="group"
                >
                  <div className="aspect-[3/4] relative overflow-hidden bg-white mb-8 border border-secondary/5 group-hover:border-accent transition-colors shadow-sm group-hover:shadow-2xl">
                    <div className="absolute top-6 left-6 z-20 bg-secondary text-primary px-3 py-2 text-[9px] font-black italic tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                      ID: {product.inventoryCode || 'A-SPEC'}
                    </div>
                    
                    <img 
                      src={product.imageUrl} 
                      alt={product.name} 
                      className="w-full h-full object-cover transition-all duration-1000 scale-[1.05] group-hover:scale-100"
                    />

                    <div className="absolute inset-0 bg-secondary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-4 z-10 px-8">
                       <Link 
                         to={`/products/${product.id}`}
                         className="flex-1 bg-white text-secondary font-black uppercase text-[10px] tracking-widest py-5 flex items-center justify-center gap-3 hover:bg-accent hover:text-white transition-all transform translate-y-8 group-hover:translate-y-0"
                       >
                         Inquiry <Eye size={14} />
                       </Link>
                       <button 
                         onClick={() => addToCart({ ...product, price: parseFloat(product.price) })}
                         className="p-5 bg-accent text-white hover:bg-white hover:text-accent font-black transition-all transform translate-y-8 group-hover:translate-y-0 delay-75 cursor-pointer"
                         title="Add to Collective Cart"
                       >
                         <ShoppingBag size={18} />
                       </button>
                    </div>
                  </div>

                  <div className="flex justify-between items-start pt-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                         <span className="text-[9px] font-black uppercase tracking-widest text-accent bg-accent/5 px-2 py-0.5">{product.category} Collection</span>
                         <span className="w-1 h-1 rounded-full bg-secondary/20"></span>
                         <span className="text-[9px] font-bold text-secondary/40 uppercase tracking-widest">In Stock</span>
                      </div>
                      <Link to={`/products/${product.id}`}>
                        <h3 className="text-3xl font-black font-serif italic text-secondary leading-none mb-4 group-hover:text-accent transition-colors underline decoration-transparent group-hover:underline-offset-8 underline-offset-0 decoration-accent group-hover:decoration-accent/30">{product.name}</h3>
                      </Link>
                      <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-secondary hover:text-accent transition-colors cursor-pointer group/link">
                        Access Details <ArrowRight size={14} className="group-hover/link:translate-x-2 transition-transform" />
                      </div>
                    </div>
                    <div className="text-right">
                       <p className="text-[10px] font-black uppercase opacity-20 mb-1">Valuation</p>
                       <span className="text-2xl font-serif font-black italic text-secondary">${product.price}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="py-40 text-center bg-white border border-secondary/5">
               <Package className="mx-auto text-secondary/10 mb-8" size={64} />
               <h3 className="text-2xl font-serif font-black italic text-secondary/40">Archive Temporarily Depleted</h3>
               <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-30 mt-4 max-w-sm mx-auto leading-relaxed">
                 The requested classification has no current physical representation in the archive. Check back for future drops.
               </p>
               <Link to="/products" className="inline-block mt-10 px-8 py-4 border border-secondary/20 text-[10px] font-black uppercase tracking-widest hover:bg-secondary hover:text-primary transition-all">
                  Return to Main Registry
               </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ProductPage;
