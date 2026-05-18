import React from 'react';
import { Github, Instagram, Twitter, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-secondary/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-1">
          <h2 className="text-2xl font-black tracking-tighter mb-6">DRESSIFY<span className="text-accent">.</span></h2>
          <p className="text-sm leading-relaxed text-secondary/60 font-sans mb-8">
            The Experimental Style Collective. Redefining fashion through the lens of brutalist architecture and functional avant-garde essentials.
          </p>
          <div className="flex gap-4">
            <a href="#" className="p-2 bg-secondary/5 hover:bg-secondary hover:text-primary transition-all rounded-sm">
              <Instagram size={18} />
            </a>
            <a href="#" className="p-2 bg-secondary/5 hover:bg-secondary hover:text-primary transition-all rounded-sm">
              <Twitter size={18} />
            </a>
            <a href="#" className="p-2 bg-secondary/5 hover:bg-secondary hover:text-primary transition-all rounded-sm">
              <Github size={18} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-[11px] font-bold uppercase tracking-widest mb-8 text-secondary/40">Studio Archive</h4>
          <ul className="space-y-4 text-xs font-bold uppercase tracking-widest text-[#121212]/80">
            <li><a href="#" className="hover:text-accent transition-colors">Spring Capsule</a></li>
            <li><a href="#" className="hover:text-accent transition-colors">Vol 01: Raw Edge</a></li>
            <li><a href="#" className="hover:text-accent transition-colors">Utility Series</a></li>
            <li><a href="#" className="hover:text-accent transition-colors">The Lookbook</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[11px] font-bold uppercase tracking-widest mb-8 text-secondary/40">Collective Info</h4>
          <ul className="space-y-4 text-xs font-bold uppercase tracking-widest text-[#121212]/80">
            <li><a href="#" className="hover:text-accent transition-colors">Sustainability</a></li>
            <li><a href="#" className="hover:text-accent transition-colors">Manufacturing</a></li>
            <li><a href="#" className="hover:text-accent transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-accent transition-colors">Shipping Ops</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[11px] font-bold uppercase tracking-widest mb-8 text-secondary/40">Direct Contact</h4>
          <p className="text-sm text-secondary/60 mb-6 font-sans">Join the collective to receive early access to seasonal drops and limited archival pieces.</p>
          <div className="flex bg-secondary/5 p-1 border border-secondary/10">
            <input 
              type="email" 
              placeholder="COLLECTIVE@EMAIL.COM" 
              className="bg-transparent text-[11px] font-bold uppercase tracking-widest px-4 py-3 outline-none flex-1"
            />
            <button className="bg-secondary text-primary px-6 py-2">
              <Mail size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Marquee Footer */}
      <div className="h-12 bg-secondary text-primary flex items-center overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap gap-20 opacity-80 text-[11px] font-bold uppercase tracking-widest px-12">
          <span>DRESSIFY CLUB EXCLUSIVE ACCESS</span>
          <span>●</span>
          <span>AUTUMN 24 LOOKBOOK RELEASED</span>
          <span>●</span>
          <span>MEMBERS ONLY PORTAL ACTIVE</span>
          <span>●</span>
          <span>GLOBAL SHIPPING INCLUDED</span>
          <span>●</span>
          <span>DRESSIFY CLUB EXCLUSIVE ACCESS</span>
          <span>●</span>
          <span>AUTUMN 24 LOOKBOOK RELEASED</span>
          <span>●</span>
          <span>MEMBERS ONLY PORTAL ACTIVE</span>
          <span>●</span>
          <span>GLOBAL SHIPPING INCLUDED</span>
        </div>
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 30s linear infinite;
          }
        `}</style>
      </div>
    </footer>
  );
};

export default Footer;
