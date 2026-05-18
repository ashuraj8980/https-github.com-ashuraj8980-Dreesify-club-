import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Truck, ShieldCheck, CreditCard, ChevronLeft, ShoppingBag, CheckCircle2, AlertCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import toast from 'react-hot-toast';

declare global {
  interface Window {
    Razorpay: any;
  }
}

const CheckoutPage = () => {
  const { cart, clearCart, total } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<'online' | 'cod'>('online');
  const [formData, setFormData] = useState({
    email: user?.email || '',
    fullName: user?.displayName || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    notes: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (cart.length === 0) {
      navigate('/cart');
    }
  }, [cart, navigate]);

  const subtotal = total;
  const shipping = subtotal > 1000 ? 0 : 99;
  const onlineDiscount = paymentMethod === 'online' ? (subtotal * 0.3) : 0;
  const finalTotal = subtotal + shipping - onlineDiscount;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const createOrder = async (paymentId?: string) => {
    try {
      const orderData = {
        userId: user?.uid || 'guest',
        userEmail: formData.email,
        customerName: formData.fullName,
        phone: formData.phone,
        shippingAddress: {
          address: formData.address,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode
        },
        items: cart,
        subtotal,
        shipping,
        onlineDiscount,
        totalAmount: finalTotal,
        paymentMethod,
        paymentStatus: paymentMethod === 'online' ? 'Paid' : 'Pending',
        paymentId: paymentId || '',
        orderStatus: 'Confirmed',
        notes: formData.notes,
        createdAt: serverTimestamp()
      };

      const docRef = await addDoc(collection(db, 'orders'), orderData);
      toast.success('Order placed successfully!');
      clearCart();
      navigate(`/order-success/${docRef.id}`);
    } catch (error) {
      console.error('Order Error:', error);
      toast.error('Failed to place order. Please try again.');
    }
  };

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleOnlinePayment = async () => {
    const res = await loadRazorpay();
    if (!res) {
      toast.error('Razorpay SDK failed to load. Check your internet connection.');
      return;
    }

    const options = {
      key: "rzp_test_your_test_key", // Replace with real key in production
      amount: Math.round(finalTotal * 100),
      currency: "INR",
      name: "DRESSIFY",
      description: "Fashion Purchase",
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=200&h=200&auto=format&fit=crop",
      handler: async function (response: any) {
        await createOrder(response.razorpay_payment_id);
      },
      prefill: {
        name: formData.fullName,
        email: formData.email,
        contact: formData.phone
      },
      theme: {
        color: "#FF6B00"
      }
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    if (paymentMethod === 'online') {
      await handleOnlinePayment();
    } else {
      await createOrder();
    }
    setIsProcessing(false);
  };

  return (
    <div className="bg-[#FDFCFB] min-h-screen pb-40">
      <section className="px-6 md:px-12 py-16 md:py-24 border-b border-secondary/10 bg-white mb-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-12">
          <div>
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-accent mb-6 hover:-translate-x-2 transition-transform cursor-pointer">
              <ChevronLeft size={16} /> Retrograde to Cart
            </button>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40 mb-4 block">Final Stage / Dispatch Logistics</span>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter font-serif uppercase italic leading-none">The<br/><span className="text-accent">Protocols</span></h1>
          </div>
          <div className="max-w-md border-l-2 border-secondary/10 pl-8">
            <p className="text-sm font-sans text-secondary/60 leading-relaxed italic mb-4">
              &quot;Every shipment is a manifestation of our structural integrity. Ensure your coordinates are precise.&quot;
            </p>
            <div className="flex gap-4 items-center">
              <ShieldCheck size={20} className="text-accent" />
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-secondary">Verified Secure Tunnel Protocol Active</span>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          {/* Form Sections */}
          <div className="lg:col-span-7 space-y-20">
            {/* Identity Group */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">
              <div className="flex items-center gap-4">
                <span className="w-10 h-10 rounded-full border-2 border-secondary/10 flex items-center justify-center font-serif font-black italic text-sm">01</span>
                <h3 className="text-2xl font-black font-serif italic text-secondary uppercase tracking-tight">Identity / Coordination</h3>
              </div>
              
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary/40">Full Name Identifier</label>
                    <input required id="fullName" value={formData.fullName} onChange={handleInputChange} className="w-full bg-white border-b-2 border-secondary/5 focus:border-accent py-4 px-2 outline-none font-sans text-sm transition-all" type="text" placeholder="FULL_NAME" />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary/40">Dispatch Email</label>
                    <input required id="email" value={formData.email} onChange={handleInputChange} className="w-full bg-white border-b-2 border-secondary/5 focus:border-accent py-4 px-2 outline-none font-sans text-sm transition-all" type="email" placeholder="COORDINATES@EMAIL.COM" />
                  </div>
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary/40">Mobile Link (Phone)</label>
                  <input required id="phone" value={formData.phone} onChange={handleInputChange} className="w-full bg-white border-b-2 border-secondary/5 focus:border-accent py-4 px-2 outline-none font-sans text-sm transition-all" type="tel" placeholder="+91 XXXXX XXXXX" />
                </div>
              </div>
            </motion.div>

            {/* Logistics Group */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="space-y-10">
              <div className="flex items-center gap-4">
                <span className="w-10 h-10 rounded-full border-2 border-secondary/10 flex items-center justify-center font-serif font-black italic text-sm">02</span>
                <h3 className="text-2xl font-black font-serif italic text-secondary uppercase tracking-tight">Logistical Coordinates</h3>
              </div>
              
              <div className="space-y-8">
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary/40">Street Address Matrix</label>
                  <input required id="address" value={formData.address} onChange={handleInputChange} className="w-full bg-white border-b-2 border-secondary/5 focus:border-accent py-4 px-2 outline-none font-sans text-sm transition-all" type="text" placeholder="HOUSE NO, STREET, AREA" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary/40">City Nucleus</label>
                    <input required id="city" value={formData.city} onChange={handleInputChange} className="w-full bg-white border-b-2 border-secondary/5 focus:border-accent py-4 px-2 outline-none font-sans text-sm transition-all" type="text" placeholder="CITY" />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary/40">State/Region Zone</label>
                    <input required id="state" value={formData.state} onChange={handleInputChange} className="w-full bg-white border-b-2 border-secondary/5 focus:border-accent py-4 px-2 outline-none font-sans text-sm transition-all" type="text" placeholder="ZONE" />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary/40">PIN Allocation</label>
                    <input required id="pincode" value={formData.pincode} onChange={handleInputChange} className="w-full bg-white border-b-2 border-secondary/5 focus:border-accent py-4 px-2 outline-none font-sans text-sm transition-all" type="text" placeholder="000000" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Payment Method Group */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="space-y-10">
              <div className="flex items-center gap-4">
                <span className="w-10 h-10 rounded-full border-2 border-secondary/10 flex items-center justify-center font-serif font-black italic text-sm">03</span>
                <h3 className="text-2xl font-black font-serif italic text-secondary uppercase tracking-tight">Authorization Method</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <button 
                  type="button"
                  onClick={() => setPaymentMethod('online')}
                  className={`p-10 border-2 transition-all text-left relative overflow-hidden group ${paymentMethod === 'online' ? 'bg-secondary text-primary border-secondary' : 'bg-white text-secondary border-secondary/5 hover:border-accent/40'}`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <CreditCard size={24} />
                    {paymentMethod === 'online' && <CheckCircle2 size={16} className="text-accent" />}
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-widest mb-1">Digital Protocol</p>
                  <p className="text-xl font-serif font-black italic uppercase">Online Payment</p>
                  <div className="mt-4 inline-block bg-accent text-[8px] font-black uppercase px-2 py-1 rounded-sm text-white">30% DISCOUNT ACTIVE</div>
                </button>

                <button 
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-10 border-2 transition-all text-left relative overflow-hidden group ${paymentMethod === 'cod' ? 'bg-secondary text-primary border-secondary' : 'bg-white text-secondary border-secondary/5 hover:border-accent/40'}`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <Truck size={24} />
                    {paymentMethod === 'cod' && <CheckCircle2 size={16} className="text-accent" />}
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-widest mb-1">Physical Exchange</p>
                  <p className="text-xl font-serif font-black italic uppercase">Cash on Delivery</p>
                </button>
              </div>
            </motion.div>
          </div>

          {/* Right Summary Sidebar */}
          <div className="lg:col-span-5">
             <div className="sticky top-32 space-y-10 bg-white border border-secondary/5 p-12 shadow-3xl">
                <div className="space-y-8">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-secondary/30 pb-4 border-b border-secondary/5">Transmission Summary</h4>
                  
                  <div className="space-y-6">
                    {cart.map((item) => (
                      <div key={item.id} className="flex gap-4">
                        <div className="w-16 h-20 bg-secondary/5 flex-shrink-0">
                          <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[9px] font-black uppercase tracking-widest text-secondary truncate">{item.name}</p>
                          <p className="text-[8px] font-bold text-secondary/40 mt-1 uppercase">QTY: {item.quantity} | {item.selectedSize}</p>
                          <p className="text-xs font-black italic text-secondary mt-1">₹{item.price * item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="h-px bg-secondary/5"></div>

                  <div className="space-y-4">
                    <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-secondary/60">
                      <span>Subtotal</span>
                      <span>₹{subtotal}</span>
                    </div>
                    <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-secondary/60">
                      <span>Logistics Fee</span>
                      <span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
                    </div>
                    {onlineDiscount > 0 && (
                      <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-accent">
                        <span>Digital Discount (30%)</span>
                        <span>-₹{onlineDiscount}</span>
                      </div>
                    )}
                    <div className="h-px bg-secondary/5 my-2"></div>
                    <div className="flex justify-between items-end">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary">Final Net Liability</p>
                      <p className="text-4xl font-serif font-black italic text-secondary">₹{finalTotal}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                   <p className="text-[9px] font-sans font-bold text-secondary/60 leading-relaxed italic text-center">
                     &quot;By proceeding, I authorize the archival extraction and logistical dispatch of the selected artifacts.&quot;
                   </p>
                   <button 
                    type="submit" 
                    disabled={isProcessing}
                    className="w-full bg-secondary text-primary font-black uppercase text-[11px] tracking-[0.3em] py-8 shadow-3xl hover:bg-accent transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-4"
                   >
                     {isProcessing ? 'SYNCHRONIZING...' : 'EXECUTE MANIFEST'}
                     <ArrowRight size={18} />
                   </button>
                </div>

                <div className="flex items-center justify-center gap-4 text-[9px] font-black uppercase tracking-widest text-secondary/20">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></div>
                  Final secure tunnel protocol active
                </div>
             </div>
          </div>
        </form>
      </div>
    </div>
  );
};

import { ArrowRight } from 'lucide-react';
export default CheckoutPage;
