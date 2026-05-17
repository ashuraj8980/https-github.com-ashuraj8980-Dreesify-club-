import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Truck, ShieldCheck, CreditCard, ChevronLeft } from 'lucide-react';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    cardNumber: '',
    expiry: '',
    cvc: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('ORDER_CONFIRMED: MISSION_SUCCESS');
    navigate('/');
  };

  return (
    <div className="bg-[#FDFCFB] min-h-screen pb-40">
      <section className="px-6 md:px-12 py-16 md:py-24 border-b border-secondary/10 bg-white mb-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-12">
          <div>
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-accent mb-6 hover:-translate-x-2 transition-transform cursor-pointer">
              <ChevronLeft size={16} /> Retrograde to Selection
            </button>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40 mb-4 block">Final Stage / Dispatch Logistics</span>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter font-serif uppercase italic leading-none">The<br/><span className="text-accent">Protocols</span></h1>
          </div>
          <div className="max-w-md border-l-2 border-secondary/10 pl-8">
            <p className="text-sm font-sans text-secondary/60 leading-relaxed italic mb-4">
              "Every shipment is a manifestation of our structural integrity. Ensure your coordinates are precise."
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
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary/40">First Name Identifier</label>
                  <input required id="firstName" onChange={handleInputChange} className="w-full bg-white border-b-2 border-secondary/5 focus:border-accent py-4 px-2 outline-none font-sans text-sm transition-all" type="text" placeholder="GIVEN_NAME" />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary/40">Last Name Identifier</label>
                  <input required id="lastName" onChange={handleInputChange} className="w-full bg-white border-b-2 border-secondary/5 focus:border-accent py-4 px-2 outline-none font-sans text-sm transition-all" type="text" placeholder="SURNAME" />
                </div>
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary/40">Official Dispatch Email</label>
                <input required id="email" onChange={handleInputChange} className="w-full bg-white border-b-2 border-secondary/5 focus:border-accent py-4 px-2 outline-none font-sans text-sm transition-all" type="email" placeholder="COORDINATES@EMAIL.COM" />
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
                  <input required id="address" onChange={handleInputChange} className="w-full bg-white border-b-2 border-secondary/5 focus:border-accent py-4 px-2 outline-none font-sans text-sm transition-all" type="text" placeholder="PHYSICAL_LOCATION_V01" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary/40">City Nucleus</label>
                    <input required id="city" onChange={handleInputChange} className="w-full bg-white border-b-2 border-secondary/5 focus:border-accent py-4 px-2 outline-none font-sans text-sm transition-all" type="text" placeholder="CITY" />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary/40">State/Region Zone</label>
                    <input required id="state" onChange={handleInputChange} className="w-full bg-white border-b-2 border-secondary/5 focus:border-accent py-4 px-2 outline-none font-sans text-sm transition-all" type="text" placeholder="ZONE" />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary/40">ZIP Allocation</label>
                    <input required id="zip" onChange={handleInputChange} className="w-full bg-white border-b-2 border-secondary/5 focus:border-accent py-4 px-2 outline-none font-sans text-sm transition-all" type="text" placeholder="00000" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Financial Group */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="space-y-10">
              <div className="flex items-center gap-4">
                <span className="w-10 h-10 rounded-full border-2 border-secondary/10 flex items-center justify-center font-serif font-black italic text-sm">03</span>
                <h3 className="text-2xl font-black font-serif italic text-secondary uppercase tracking-tight">Financial Authorization</h3>
              </div>
              
              <div className="space-y-8 p-10 border border-secondary/5 bg-white shadow-xl bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-fixed">
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary/40">Universal Card Identifier</label>
                  <div className="relative">
                    <CreditCard className="absolute left-0 top-1/2 -translate-y-1/2 text-secondary/20" size={20} />
                    <input required id="cardNumber" onChange={handleInputChange} className="w-full bg-transparent border-b-2 border-secondary/5 focus:border-accent py-4 pl-10 pr-2 outline-none font-sans text-sm transition-all" type="text" placeholder="0000 0000 0000 0000" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary/40">Expiry Sequence</label>
                    <input required id="expiry" onChange={handleInputChange} className="w-full bg-transparent border-b-2 border-secondary/5 focus:border-accent py-4 px-2 outline-none font-sans text-sm transition-all" type="text" placeholder="MM/YY" />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary/40">Security CVC Code</label>
                    <input required id="cvc" onChange={handleInputChange} className="w-full bg-transparent border-b-2 border-secondary/5 focus:border-accent py-4 px-2 outline-none font-sans text-sm transition-all" type="password" placeholder="***" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Summary Sidebar */}
          <div className="lg:col-span-5">
             <div className="sticky top-32 space-y-12 bg-white border border-secondary/5 p-12 shadow-3xl">
                <div className="space-y-6">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-secondary/30">Executive Summary</h4>
                  <div className="flex justify-between items-end">
                    <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase tracking-widest text-secondary">Dispatch Protocol</p>
                      <p className="text-xl font-serif font-black italic text-secondary uppercase">Express Global Transit</p>
                    </div>
                    <Truck className="text-accent" size={30} />
                  </div>
                </div>

                <div className="h-px bg-secondary/5"></div>

                <div className="space-y-8">
                   <p className="text-sm font-sans font-bold text-secondary/60 leading-relaxed italic">
                     "By proceeding, you acknowledge the terms of the DREESIFY Collective regarding unique archival item distribution."
                   </p>
                   <button type="submit" className="w-full bg-secondary text-primary font-black uppercase text-[11px] tracking-[0.3em] py-8 shadow-3xl hover:bg-accent transition-all active:scale-95 cursor-pointer">
                     Execute Manifest
                   </button>
                </div>

                <div className="flex items-center gap-4 text-[9px] font-black uppercase tracking-widest text-secondary/20">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                  Final authorization stage active
                </div>
             </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
