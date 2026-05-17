import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  TrendingUp, 
  Users, 
  Package, 
  ShoppingBag, 
  LayoutDashboard, 
  Settings, 
  Plus, 
  Search 
} from 'lucide-react';
import { motion } from 'motion/react';

const AdminPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('inventory');

  const stats = [
    { label: 'Projected Revenue', value: '$24.5K', change: '↑ 12%', icon: TrendingUp, color: 'text-accent' },
    { label: 'Active Members', value: '890', change: '↑ 24%', icon: Users, color: 'text-secondary' },
    { label: 'Inventory Units', value: '1.2K', change: '↓ 4%', icon: Package, color: 'text-secondary' },
    { label: 'Conversion Rate', value: '4.8%', change: '↑ 1%', icon: ShoppingBag, color: 'text-accent' },
  ];

  const products = [
    { id: 1, name: 'Monochrome Shell', category: 'Archive', price: '$240', stock: 12, status: 'Active' },
    { id: 2, name: 'Raw Edge Hoodie', category: 'Innerwear', price: '$180', stock: 8, status: 'Critical' },
    { id: 3, name: 'Asymmetric Drapery', category: 'Essentials', price: '$120', stock: 45, status: 'Active' },
    { id: 4, name: 'Cargo Variant 01', category: 'Archive', price: '$210', stock: 0, status: 'Depleted' },
  ];

  return (
    <div className="min-h-full flex flex-col md:flex-row bg-[#FDFCFB]">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-72 bg-white border-r border-secondary/5 p-10 flex flex-col flex-shrink-0">
        <div className="mb-16">
          <h2 className="text-2xl font-black tracking-tighter text-secondary">MEMBER_PORTAL<span className="text-accent">.</span></h2>
          <p className="text-[9px] font-sans font-bold uppercase tracking-[0.3em] opacity-30 mt-2">DREESIFY COLLECTIVE ADMIN v1.4</p>
        </div>

        <nav className="space-y-2 flex-1">
          {[
            { id: 'dashboard', label: 'Command Center', icon: LayoutDashboard },
            { id: 'inventory', label: 'The Archive', icon: Package },
            { id: 'members', label: 'Personnel', icon: Users },
            { id: 'settings', label: 'Protocols', icon: Settings },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-6 py-4 text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer border ${
                activeTab === item.id 
                  ? 'bg-secondary text-primary border-secondary shadow-2xl shadow-secondary/20 scale-[1.02]' 
                  : 'text-secondary/40 border-transparent hover:border-secondary/10 hover:bg-secondary/5'
              }`}
            >
              <div className="flex items-center gap-4">
                <item.icon size={16} />
                {item.label}
              </div>
              {activeTab === item.id && <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>}
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-10 border-t border-secondary/10">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-secondary text-accent flex items-center justify-center font-serif font-black italic border-2 border-accent/20">
              {user?.email?.[0].toUpperCase() || 'A'}
            </div>
            <div className="overflow-hidden">
              <p className="text-[10px] font-black uppercase tracking-widest truncate">{user?.email}</p>
              <p className="text-[9px] font-bold uppercase text-accent">Tier 01 Operator</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8 md:p-14 lg:p-20 overflow-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-[2px] bg-accent"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">Strategic Operations</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter font-serif italic text-secondary uppercase leading-[0.9]">Grid<br/><span className="text-accent">Overview</span></h1>
          </div>
          
          <button className="bg-secondary text-primary group px-10 py-5 text-[11px] font-black uppercase tracking-widest flex items-center gap-6 hover:bg-accent transition-all shadow-2xl active:scale-95 cursor-pointer">
            Create Entry
            <Plus size={18} className="group-hover:rotate-90 transition-transform" />
          </button>
        </header>

        {/* Dynamic Activity Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-8 border border-secondary/5 shadow-sm group hover:border-accent transition-all relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <stat.icon size={60} />
              </div>
              <div className="flex justify-between items-center mb-6">
                <span className="text-[9px] font-black uppercase tracking-widest text-secondary/40">{stat.label}</span>
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded-sm ${stat.change.includes('↑') ? 'text-green-600 bg-green-50' : 'text-red-500 bg-red-50'}`}>{stat.change}</span>
              </div>
              <h3 className="text-4xl font-black font-serif italic text-secondary">{stat.value}</h3>
            </motion.div>
          ))}
        </div>

        {/* Repository Grid */}
        <div className="bg-white border border-secondary/5 shadow-2xl relative">
          <div className="p-10 border-b border-secondary/10 flex flex-col lg:flex-row justify-between items-center gap-8">
            <h3 className="text-sm font-black uppercase tracking-[0.3em] text-secondary">The Digital Archive</h3>
            <div className="flex items-center gap-6 w-full lg:w-auto">
              <div className="relative flex-1 lg:w-80">
                <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-secondary/30" size={18} />
                <input 
                  type="text" 
                  placeholder="FILTER ENTRIES..." 
                  className="w-full bg-transparent border-b-2 border-secondary/10 focus:border-accent py-4 pl-10 pr-4 outline-none text-[10px] font-black uppercase tracking-[0.2em] transition-all"
                />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-secondary/5">
                  <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/50">Item Reference</th>
                  <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/50">Series</th>
                  <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/50">Stockpile</th>
                  <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/50">Status</th>
                  <th className="px-10 py-6"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-secondary/5">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-secondary/[0.02] transition-colors group">
                    <td className="px-10 py-8">
                       <div className="flex items-center gap-6">
                         <div className="w-14 h-14 bg-secondary/5 border border-secondary/10 flex items-center justify-center font-serif font-black italic opacity-20 text-xl group-hover:opacity-100 group-hover:text-accent group-hover:border-accent/20 transition-all">A{p.id}</div>
                         <div>
                            <p className="font-black text-secondary uppercase tracking-tighter text-lg">{p.name}</p>
                            <p className="text-[10px] font-bold text-accent uppercase tracking-widest">{p.price}</p>
                         </div>
                       </div>
                    </td>
                    <td className="px-10 py-8 text-[11px] font-black uppercase tracking-wider text-secondary/60">{p.category}</td>
                    <td className="px-10 py-8">
                        <div className="flex items-center gap-4">
                          <div className="w-32 h-1 bg-secondary/5 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${Math.min(p.stock * 2, 100)}%` }}
                              className={`h-full ${p.stock < 10 ? 'bg-accent' : 'bg-secondary'}`} 
                            />
                          </div>
                          <span className="text-[10px] font-black text-secondary">{p.stock} Units</span>
                        </div>
                    </td>
                    <td className="px-10 py-8 text-[10px] font-black uppercase tracking-widest">
                       <span className={`inline-block px-4 py-1.5 rounded-full ${
                         p.status === 'Active' ? 'text-green-600 bg-green-50' : 
                         p.status === 'Critical' ? 'text-accent bg-accent/5' : 
                         'text-red-600 bg-red-50'
                       }`}>
                         {p.status}
                       </span>
                    </td>
                    <td className="px-10 py-8 text-right">
                       <button className="text-[10px] font-black uppercase tracking-widest text-secondary/30 hover:text-accent transition-colors underline underline-offset-4 cursor-pointer">Modify Entry</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminPage;
