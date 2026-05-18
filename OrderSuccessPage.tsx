import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { motion } from 'motion/react';
import { CheckCircle2, Package, Truck, Download, ArrowRight, ShoppingBag } from 'lucide-react';

const OrderSuccessPage = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) return;
      try {
        const docRef = doc(db, 'orders', orderId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setOrder({ id: docSnap.id, ...docSnap.data() });
        }
      } catch (error) {
        console.error('Error fetching order:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-2 border-secondary/10 border-t-accent rounded-full animate-spin mb-6 mx-auto"></div>
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-secondary">Decrypting Manifest...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8">
        <h2 className="text-4xl font-serif font-black italic text-secondary uppercase mb-8 text-center">Transmission Error</h2>
        <Link to="/" className="bg-secondary text-primary px-12 py-6 text-[10px] font-black uppercase tracking-widest hover:bg-accent transition-all">
          Return to Hub
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#FDFCFB] min-h-screen pb-40">
      <section className="px-6 md:px-12 py-20 md:py-32 bg-secondary text-primary relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent opacity-10 rounded-full translate-x-1/2 -translate-y-1/2"></div>
        <div className="max-w-5xl mx-auto relative z-10 text-center">
           <motion.div
             initial={{ scale: 0, rotate: -180 }}
             animate={{ scale: 1, rotate: 0 }}
             transition={{ type: 'spring', damping: 10 }}
             className="w-24 h-24 bg-accent rounded-full flex items-center justify-center mx-auto mb-10 shadow-2xl"
           >
              <CheckCircle2 size={48} className="text-white" />
           </motion.div>
           <h1 className="text-6xl md:text-8xl font-black tracking-tighter font-serif uppercase italic leading-none mb-6">Success<br/><span className="text-accent text-[0.4em] tracking-[0.4em] block font-sans not-italic font-black mt-2">Authenticated</span></h1>
           <p className="text-sm font-sans tracking-[0.3em] font-medium opacity-60 uppercase mb-4">Transmission ID: {order.id}</p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 md:px-12 -mt-20 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
           <div className="lg:col-span-8 space-y-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-10 md:p-16 shadow-2xl border border-secondary/5"
              >
                 <div className="flex justify-between items-center mb-16 pb-8 border-b border-secondary/5">
                    <div>
                       <h3 className="text-2xl font-black font-serif italic text-secondary uppercase tracking-tight">Order Manifest</h3>
                       <p className="text-[10px] font-black uppercase tracking-widest opacity-30 mt-2">DRESSIFY CORE REGISTRY</p>
                    </div>
                    <div className="text-right">
                       <p className="text-[10px] font-black uppercase tracking-widest text-secondary/40">Timestamp</p>
                       <p className="text-sm font-bold">{order.createdAt?.toDate().toLocaleDateString()}</p>
                    </div>
                 </div>

                 <div className="space-y-10">
                    {order.items.map((item: any, idx: number) => (
                       <div key={idx} className="flex gap-8 group">
                          <div className="w-24 h-32 bg-secondary/5 overflow-hidden border border-secondary/5">
                             <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                          </div>
                          <div className="flex-1">
                             <div className="flex justify-between">
                                <h4 className="text-lg font-black text-secondary uppercase tracking-tight">{item.name}</h4>
                                <p className="text-lg font-black italic">₹{item.price * item.quantity}</p>
                             </div>
                             <p className="text-[10px] font-black uppercase tracking-widest text-secondary/40 mt-2">Unit: {item.selectedSize} / {item.selectedColor}</p>
                             <div className="mt-4 flex items-center gap-4">
                                <span className="text-[9px] font-black uppercase tracking-widest border border-secondary/10 px-2 py-1">QTY: {item.quantity}</span>
                                <span className="text-[9px] font-black uppercase tracking-widest bg-secondary/5 px-2 py-1">₹{item.price} / UNIT</span>
                             </div>
                          </div>
                       </div>
                    ))}
                 </div>

                 <div className="mt-16 pt-10 border-t border-secondary/10 space-y-4">
                    <div className="flex justify-between text-[11px] font-black uppercase tracking-widest opacity-40">
                       <span>Sub-Aggregate</span>
                       <span>₹{order.subtotal}</span>
                    </div>
                    <div className="flex justify-between text-[11px] font-black uppercase tracking-widest opacity-40">
                       <span>Logistics Allocation</span>
                       <span>{order.shipping === 0 ? 'NEUTRAL' : `₹${order.shipping}`}</span>
                    </div>
                    {order.onlineDiscount > 0 && (
                       <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-accent">
                          <span>Digital Protocol Scaling (-30%)</span>
                          <span>-₹{order.onlineDiscount}</span>
                       </div>
                    )}
                    <div className="h-px bg-secondary/10 my-6"></div>
                    <div className="flex justify-between items-end">
                       <p className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary">Final Net Liquidation</p>
                       <p className="text-5xl font-serif font-black italic text-secondary">₹{order.totalAmount}</p>
                    </div>
                 </div>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="bg-white p-10 shadow-xl border border-secondary/5">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary/40 mb-6 flex items-center gap-3">
                       <Truck size={14} /> Dispatch Coordinate
                    </h4>
                    <div className="text-[11px] font-bold uppercase tracking-widest text-secondary space-y-2 leading-relaxed">
                       <p>{order.customerName}</p>
                       <p>{order.shippingAddress.address}</p>
                       <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.pincode}</p>
                       <p className="text-accent mt-4">PH: {order.phone}</p>
                    </div>
                 </div>
                 <div className="bg-white p-10 shadow-xl border border-secondary/5">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary/40 mb-6 flex items-center gap-3">
                       <ShieldCheck size={14} /> Authorization Logic
                    </h4>
                    <div className="space-y-4">
                       <div className="flex justify-between items-center">
                          <p className="text-[10px] font-black uppercase tracking-widest">Method</p>
                          <p className="text-[10px] font-black uppercase tracking-widest text-accent">{order.paymentMethod === 'online' ? 'Digital Protocol' : 'Physical Exchange'}</p>
                       </div>
                       <div className="flex justify-between items-center">
                          <p className="text-[10px] font-black uppercase tracking-widest">Status</p>
                          <p className="text-[10px] font-black uppercase tracking-widest bg-green-50 text-green-600 px-2 py-0.5">{order.paymentStatus}</p>
                       </div>
                    </div>
                 </div>
              </div>
           </div>

           <div className="lg:col-span-4 space-y-8">
              <div className="bg-secondary p-12 text-primary shadow-2xl relative group overflow-hidden">
                 <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:rotate-12 transition-transform">
                    <Package size={120} />
                 </div>
                 <h3 className="text-3xl font-black font-serif italic uppercase mb-8 relative z-10 leading-tight">What<br/>Happens<br/>Next?</h3>
                 <div className="space-y-10 relative z-10">
                    <div className="flex gap-4">
                       <div className="w-8 h-8 rounded-full border border-primary/20 flex flex-shrink-0 items-center justify-center font-black italic text-xs">01</div>
                       <div>
                          <p className="text-[10px] font-black uppercase tracking-widest mb-1">Verification</p>
                          <p className="text-[10px] font-bold opacity-40 uppercase leading-relaxed">System validates artifact integrity and availability within 12h.</p>
                       </div>
                    </div>
                    <div className="flex gap-4">
                       <div className="w-8 h-8 rounded-full border border-primary/20 flex flex-shrink-0 items-center justify-center font-black italic text-xs">02</div>
                       <div>
                          <p className="text-[10px] font-black uppercase tracking-widest mb-1">Encapsulation</p>
                          <p className="text-[10px] font-bold opacity-40 uppercase leading-relaxed">Item is carefully prepared and sealed in proprietary DRESSIFY housing.</p>
                       </div>
                    </div>
                    <div className="flex gap-4">
                       <div className="w-8 h-8 rounded-full border border-primary/20 flex flex-shrink-0 items-center justify-center font-black italic text-xs">03</div>
                       <div>
                          <p className="text-[10px] font-black uppercase tracking-widest mb-1">Dispatch</p>
                          <p className="text-[10px] font-bold opacity-40 uppercase leading-relaxed">Real-time tracking protocols activated upon hub departure.</p>
                       </div>
                    </div>
                 </div>
                 
                 <button onClick={() => navigate('/products')} className="w-full mt-12 py-6 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.3em] hover:bg-accent hover:border-accent transition-all flex items-center justify-center gap-4 group">
                    Continue Exploration <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                 </button>
              </div>

              <div className="bg-white p-10 border border-secondary/5 flex flex-col items-center text-center space-y-6">
                 <div className="p-4 bg-secondary/5 rounded-full text-secondary">
                    <Download size={24} />
                 </div>
                 <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest mb-2">Digital Receipt</h4>
                    <p className="text-[10px] font-bold opacity-40 uppercase leading-relaxed mb-6">Download your official manifest for archival purposes.</p>
                    <button className="w-full py-4 bg-secondary text-primary text-[9px] font-black uppercase tracking-widest hover:bg-accent transition-colors">Download Document</button>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
