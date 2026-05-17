import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ShoppingBag, Eye, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductPage = () => {
  const { addToCart } = useCart();
  const productsList = [
    { id: 1, name: 'Monochrome Shell', price: '$240', category: 'Outerwear', code: 'A1', img: 'https://images.unsplash.com/photo-1544441893-675973e31d85?auto=format&fit=crop&q=80' },
    { id: 2, name: 'Raw Edge Hoodie', price: '$180', category: 'Innerwear', code: 'A2', img: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80' },
    { id: 3, name: 'Asymmetric Drapery', price: '$120', category: 'Essentials', code: 'A3', img: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80' },
    { id: 4, name: 'Cargo Variant 01', price: '$210', category: 'Trousers', code: 'A4', img: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80' },
    { id: 5, name: 'Brutalist Tote', price: '$95', category: 'Accessory', code: 'A5', img: 'https://images.unsplash.com/photo-1544816153-09730734bh7f?auto=format&fit=crop&q=80' },
    { id: 6, name: 'Tonal Rib Knit', price: '$150', category: 'Knitwear', code: 'A6', img: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80' },
  ];

  return (
    <div className="bg-primary min-h-screen">
      {/* Category Header */}
      <section className="px-6 md:px-12 py-16 md:py-24 border-b border-secondary/10 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-8">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40 mb-4 block">Collection Archive / 01</span>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter font-serif uppercase italic leading-none">The<br/><span className="text-accent">Capsule</span></h1>
          </div>
          <div className="max-w-xs">
            <p className="text-sm font-sans text-secondary/60 leading-relaxed mb-6">
              A curated selection of technical silhouettes and archival essentials experiments. Each piece is constructed for seasonal transitions.
            </p>
            <div className="flex gap-4">
              <span className="text-[9px] font-bold uppercase tracking-widest border border-secondary/10 px-3 py-1">Available 06/06</span>
              <span className="text-[9px] font-bold uppercase tracking-widest bg-secondary text-primary px-3 py-1">Direct Ship</span>
            </div>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="px-6 md:px-12 py-20 pb-40">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          {productsList.map((product, i) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <div className="aspect-[3/4] relative overflow-hidden bg-secondary/5 mb-8">
                <div className="absolute top-6 left-6 z-10 bg-white/80 p-3 text-[10px] font-black italic border border-secondary/5 shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-x-4 group-hover:translate-x-0">
                  REF NO: {product.code}
                </div>
                
                <img 
                  src={product.img} 
                  alt={product.name} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-[1.05] group-hover:scale-100"
                />

                <div className="absolute inset-x-0 bottom-0 p-8 translate-y-full group-hover:translate-y-0 transition-transform duration-500 flex gap-4">
                  <Link 
                    to={`/products/${product.id}`}
                    className="flex-1 bg-secondary text-primary font-black uppercase text-[10px] tracking-widest py-4 flex items-center justify-center gap-3 hover:bg-accent transition-colors"
                  >
                    Details <Eye size={14} />
                  </Link>
                  <button 
                    onClick={() => addToCart({ ...product, price: parseFloat(product.price.replace('$', '')) })}
                    className="p-4 bg-accent text-primary hover:bg-secondary transition-colors cursor-pointer"
                  >
                    <ShoppingBag size={18} />
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-start border-l-2 border-accent pl-6">
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-secondary/40 mb-2">{product.category}</h4>
                  <h3 className="text-2xl font-black font-serif italic text-secondary leading-none mb-2">{product.name}</h3>
                  <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest text-secondary hover:text-accent transition-colors">
                    View Entry <ArrowRight size={14} />
                  </div>
                </div>
                <span className="text-xl font-serif font-black italic text-accent">{product.price}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductPage;
