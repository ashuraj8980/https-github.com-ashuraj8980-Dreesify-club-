import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { db, storage } from '../firebase';
import { 
  collection, 
  addDoc, 
  onSnapshot, 
  query, 
  orderBy, 
  deleteDoc, 
  doc, 
  updateDoc,
  serverTimestamp 
} from 'firebase/firestore';
import { 
  ref, 
  uploadBytes, 
  getDownloadURL 
} from 'firebase/storage';
import { 
  TrendingUp, 
  Users, 
  Package, 
  ShoppingBag, 
  LayoutDashboard, 
  Settings, 
  Plus, 
  Search,
  Trash2,
  Edit,
  X,
  Upload,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const AdminPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('inventory');
  const [products, setProducts] = useState<any[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [showWelcome, setShowWelcome] = useState(true);
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    category: 'Modern',
    price: '',
    stock: '',
    description: '',
    image: null as File | null
  });
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const prods = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(prods);
    });

    const timer = setTimeout(() => setShowWelcome(false), 5000);

    return () => {
      unsubscribe();
      clearTimeout(timer);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, image: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    setError('');

    try {
      let imageUrl = '';
      if (formData.image) {
        const storageRef = ref(storage, `products/${Date.now()}_${formData.image.name}`);
        const uploadResult = await uploadBytes(storageRef, formData.image);
        imageUrl = await getDownloadURL(uploadResult.ref);
      }

      const productData = {
        name: formData.name,
        category: formData.category,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        description: formData.description,
        imageUrl: imageUrl || (isEditing ? products.find(p => p.id === isEditing)?.imageUrl : 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop'),
        updatedAt: serverTimestamp(),
        inventoryCode: `AST-${Math.random().toString(36).substring(2, 7).toUpperCase()}`
      };

      if (isEditing) {
        await updateDoc(doc(db, 'products', isEditing), productData);
      } else {
        await addDoc(collection(db, 'products'), {
          ...productData,
          createdAt: serverTimestamp()
        });
      }

      setShowAddModal(false);
      setIsEditing(null);
      setFormData({ name: '', category: 'Modern', price: '', stock: '', description: '', image: null });
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this entry from the archive?')) {
      try {
        await deleteDoc(doc(db, 'products', id));
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleEdit = (product: any) => {
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      stock: product.stock.toString(),
      description: product.description || '',
      image: null
    });
    setIsEditing(product.id);
    setShowAddModal(true);
  };

  const stats = [
    { label: 'Projected Revenue', value: '$24.5K', change: '↑ 12%', icon: TrendingUp, color: 'text-accent' },
    { label: 'Active Personnel', value: '890', change: '↑ 24%', icon: Users, color: 'text-secondary' },
    { label: 'Inventory Units', value: products.reduce((acc, p) => acc + (p.stock || 0), 0).toString(), change: '↑ NET', icon: Package, color: 'text-secondary' },
    { label: 'Listing Count', value: products.length.toString(), change: 'LIVE', icon: ShoppingBag, color: 'text-accent' },
  ];

  return (
    <div className="min-h-full flex flex-col md:flex-row bg-[#FDFCFB]">
      {/* Welcome Notification */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div 
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] bg-secondary text-primary px-8 py-4 shadow-2xl flex items-center gap-4 border border-accent/20"
          >
            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
              <CheckCircle2 size={24} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Authentication Success</p>
              <p className="text-sm font-bold font-serif italic">Welcome back, {user?.displayName || 'Operator'} Sir.</p>
            </div>
            <div className="ml-4 pl-4 border-l border-primary/10">
               <span className="bg-accent text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-sm">OWNER</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar Navigation */}
      <aside className="w-full md:w-72 bg-white border-r border-secondary/5 p-10 flex flex-col flex-shrink-0">
        <div className="mb-16">
          <h2 className="text-2xl font-black tracking-[-0.05em] text-secondary font-serif uppercase">Terminal<span className="text-accent">.</span></h2>
          <p className="text-[9px] font-sans font-bold uppercase tracking-[0.3em] opacity-30 mt-2 italic">Aésthetè Control v2.0</p>
        </div>

        <nav className="space-y-2 flex-1">
          {[
            { id: 'dashboard', label: 'Nexus Hub', icon: LayoutDashboard },
            { id: 'inventory', label: 'The Archive', icon: Package },
            { id: 'members', label: 'Personnel', icon: Users },
            { id: 'settings', label: 'Systems', icon: Settings },
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
              {user?.displayName?.[0] || user?.email?.[0].toUpperCase() || 'A'}
            </div>
            <div className="overflow-hidden">
              <p className="text-[10px] font-black uppercase tracking-widest truncate">{user?.displayName || 'Operator'}</p>
              <p className="text-[9px] font-bold uppercase text-accent flex items-center gap-1">
                <CheckCircle2 size={8} /> OWNER IDENTIFIED
              </p>
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
              <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">Operational Grid</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter font-serif italic text-secondary uppercase leading-[0.9]">Archive<br/><span className="text-accent">Manager</span></h1>
          </div>
          
          <button 
            onClick={() => {
              setIsEditing(null);
              setShowAddModal(true);
            }}
            className="bg-secondary text-primary group px-10 py-5 text-[11px] font-black uppercase tracking-widest flex items-center gap-6 hover:bg-accent transition-all shadow-2xl active:scale-95 cursor-pointer"
          >
            Add New Entry
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
                <span className="text-[9px] font-bold px-2 py-0.5 rounded-sm text-green-600 bg-green-50">{stat.change}</span>
              </div>
              <h3 className="text-4xl font-black font-serif italic text-secondary">{stat.value}</h3>
            </motion.div>
          ))}
        </div>

        {activeTab === 'dashboard' && (
          <div className="space-y-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
               <div className="bg-white p-12 border border-secondary/5 shadow-2xl relative overflow-hidden">
                  <div className="flex justify-between items-start mb-12">
                     <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-secondary/40 mb-3 block">Real-time Analytics</p>
                        <h3 className="text-3xl font-black font-serif italic text-secondary uppercase">Inventory Health</h3>
                     </div>
                     <div className="p-4 bg-accent/5 rounded-full text-accent">
                        <Package size={24} />
                     </div>
                  </div>
                  <div className="space-y-10">
                     {['Modern', 'Combo', 'Couple', 'Archive'].map(cat => {
                        const count = products.filter(p => p.category === cat).length;
                        const total = products.length || 1;
                        const percentage = (count / total) * 100;
                        return (
                           <div key={cat} className="space-y-4">
                              <div className="flex justify-between text-[11px] font-black uppercase tracking-widest">
                                 <span>{cat} Series</span>
                                 <span className="text-accent">{count} Artifacts</span>
                              </div>
                              <div className="h-1 text-xs flex rounded bg-secondary/5 overflow-hidden">
                                 <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${percentage}%` }}
                                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-secondary"
                                 ></motion.div>
                              </div>
                           </div>
                        );
                     })}
                  </div>
               </div>

               <div className="bg-secondary p-12 shadow-2xl relative overflow-hidden flex flex-col justify-between group">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-accent opacity-5 -translate-y-20 translate-x-20 rounded-full group-hover:scale-150 transition-transform duration-1000"></div>
                  <div className="relative z-10">
                     <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/40 mb-4 block">System Maintenance</p>
                     <h3 className="text-4xl font-black font-serif italic text-primary uppercase leading-tight mb-8">Archival<br/>Protocols<br/>Active</h3>
                     <p className="text-sm font-sans text-primary/60 leading-relaxed max-w-xs mb-10 italic">
                        All systems operational. Global dispatch synchronization at 99.8%. No anomalies detected in current archive series.
                     </p>
                  </div>
                  <button onClick={() => setActiveTab('inventory')} className="relative z-10 w-full py-5 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest hover:bg-accent hover:border-accent transition-all flex items-center justify-center gap-4">
                     Review Full Catalog <ArrowRight size={16} />
                  </button>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {[
                  { label: 'Dispatch Center', val: 'Operational', status: 'Stable', icon: Truck },
                  { label: 'Cloud Sync', val: 'Encrypted', status: 'Active', icon: ShieldCheck },
                  { label: 'Global Traffic', val: 'Low Latency', status: '9ms', icon: TrendingUp },
               ].map((mod, i) => (
                  <div key={i} className="p-8 border border-secondary/5 bg-white flex items-center gap-6 group hover:shadow-xl transition-all">
                     <div className="p-4 bg-secondary/5 text-secondary group-hover:bg-accent group-hover:text-primary transition-colors">
                        <mod.icon size={20} />
                     </div>
                     <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-secondary opacity-30 mb-1">{mod.label}</p>
                        <p className="text-sm font-black italic">{mod.val}</p>
                        <p className="text-[9px] font-bold text-accent uppercase tracking-widest mt-1">{mod.status}</p>
                     </div>
                  </div>
               ))}
            </div>
          </div>
        )}

        {activeTab === 'inventory' && (
          <div className="bg-white border border-secondary/5 shadow-2xl relative">
          <div className="p-10 border-b border-secondary/10 flex flex-col lg:flex-row justify-between items-center gap-8">
            <h3 className="text-sm font-black uppercase tracking-[0.3em] text-secondary underline decoration-accent underline-offset-8">Physical Catalog</h3>
            <div className="flex items-center gap-6 w-full lg:w-auto">
              <div className="relative flex-1 lg:w-80">
                <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-secondary/30" size={18} />
                <input 
                  type="text" 
                  placeholder="FILTER ARCHIVE..." 
                  className="w-full bg-transparent border-b-2 border-secondary/10 focus:border-accent py-4 pl-10 pr-4 outline-none text-[10px] font-black uppercase tracking-[0.2em] transition-all"
                />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-secondary/5">
                  <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/50">Asset Information</th>
                  <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/50">Collection</th>
                  <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/50">Inventory</th>
                  <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-secondary/50">Registry Status</th>
                  <th className="px-10 py-6"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-secondary/5">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-secondary/[0.02] transition-colors group">
                    <td className="px-10 py-8">
                       <div className="flex items-center gap-6">
                         <div className="w-16 h-16 bg-white border border-secondary/10 overflow-hidden relative group-hover:border-accent transition-all">
                            <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                         </div>
                         <div>
                            <p className="font-black text-secondary uppercase tracking-tighter text-lg">{p.name}</p>
                            <p className="text-[10px] font-bold text-accent uppercase tracking-[0.2em] font-mono">{p.inventoryCode || 'INV-000'}</p>
                            <p className="text-[10px] font-black text-secondary/40 mt-1">${p.price}</p>
                         </div>
                       </div>
                    </td>
                    <td className="px-10 py-8 text-[11px] font-black uppercase tracking-wider text-secondary/60">{p.category}</td>
                    <td className="px-10 py-8">
                        <div className="flex items-center gap-4">
                          <div className="w-32 h-1 bg-secondary/5 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${Math.min((p.stock / 50) * 100, 100)}%` }}
                              className={`h-full ${p.stock < 10 ? 'bg-accent' : 'bg-secondary'}`} 
                            />
                          </div>
                          <span className="text-[10px] font-black text-secondary">{p.stock} Units</span>
                        </div>
                    </td>
                    <td className="px-10 py-8 text-[10px] font-black uppercase tracking-widest">
                       <span className={`inline-block px-4 py-1.5 rounded-full ${
                         p.stock > 10 ? 'text-green-600 bg-green-50' : 
                         p.stock > 0 ? 'text-accent bg-accent/5' : 
                         'text-red-600 bg-red-50'
                       }`}>
                         {p.stock > 10 ? 'Available' : p.stock > 0 ? 'Low Stock' : 'Depleted'}
                       </span>
                    </td>
                    <td className="px-10 py-8 text-right">
                       <div className="flex items-center justify-end gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                         <button onClick={() => handleEdit(p)} className="p-2 hover:bg-secondary/5 rounded-full text-secondary hover:text-accent cursor-pointer transition-colors" title="Edit Entry">
                           <Edit size={16} />
                         </button>
                         <button onClick={() => handleDelete(p.id)} className="p-2 hover:bg-accent/5 rounded-full text-secondary hover:text-accent cursor-pointer transition-colors" title="Delete Entry">
                           <Trash2 size={16} />
                         </button>
                       </div>
                    </td>
                  </tr>
                ))}
                {products.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-10 py-20 text-center text-secondary/20 font-black uppercase tracking-[0.5em]">No Entries Found in Registry</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 sm:p-12">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-secondary/60 backdrop-blur-md"
              onClick={() => { if (!uploading) setShowAddModal(false); }}
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="w-full max-w-2xl bg-white shadow-2xl relative z-10 flex flex-col max-h-[90vh]"
            >
              <div className="p-8 border-b border-secondary/10 flex justify-between items-center bg-secondary text-primary">
                <div>
                   <h3 className="text-2xl font-black tracking-tighter uppercase font-serif italic">{isEditing ? 'Modify Entry' : 'Create New Entry'}</h3>
                   <p className="text-[9px] font-sans font-bold uppercase tracking-[0.3em] opacity-40">Authentication Level 1 Required</p>
                </div>
                <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-white/10 rounded-full cursor-pointer transition-colors">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-8 overflow-auto flex-1 custom-scrollbar">
                {error && (
                  <div className="mb-8 p-4 bg-accent/5 border border-accent/20 text-accent text-[10px] font-black uppercase tracking-widest flex items-center gap-3">
                    <AlertCircle size={14} /> {error}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-secondary/40">Product Designation</label>
                       <input 
                         required
                         name="name"
                         value={formData.name}
                         onChange={handleInputChange}
                         placeholder="E.G. MONOCHROME SHELL"
                         className="w-full bg-secondary/5 border border-secondary/10 py-4 px-6 outline-none focus:border-accent text-sm font-bold uppercase tracking-widest"
                       />
                    </div>

                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-secondary/40">Classification</label>
                       <select 
                         name="category"
                         value={formData.category}
                         onChange={handleInputChange}
                         className="w-full bg-secondary/5 border border-secondary/10 py-4 px-6 outline-none focus:border-accent text-sm font-bold uppercase tracking-widest appearance-none cursor-pointer"
                       >
                         <option value="Modern">Modern Style</option>
                         <option value="Combo">Combo Clothing</option>
                         <option value="Couple">Couple Outfits</option>
                         <option value="Archive">The Archive</option>
                       </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                         <label className="text-[10px] font-black uppercase tracking-widest text-secondary/40">Valuation ($)</label>
                         <input 
                           required
                           type="number"
                           name="price"
                           value={formData.price}
                           onChange={handleInputChange}
                           className="w-full bg-secondary/5 border border-secondary/10 py-4 px-6 outline-none focus:border-accent text-sm font-bold uppercase tracking-widest"
                         />
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-black uppercase tracking-widest text-secondary/40">Quantity</label>
                         <input 
                           required
                           type="number"
                           name="stock"
                           value={formData.stock}
                           onChange={handleInputChange}
                           className="w-full bg-secondary/5 border border-secondary/10 py-4 px-6 outline-none focus:border-accent text-sm font-bold uppercase tracking-widest"
                         />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-secondary/40">Asset Manifest (Image)</label>
                       <div className="relative group divide-y divide-secondary/10 border border-secondary/10">
                          <div className="aspect-square bg-secondary/5 flex items-center justify-center relative overflow-hidden">
                             {formData.image ? (
                               <img src={URL.createObjectURL(formData.image)} alt="Preview" className="w-full h-full object-cover" />
                             ) : (
                               <div className="text-center p-8">
                                  <Upload className="mx-auto mb-4 text-secondary/20" size={40} />
                                  <p className="text-[9px] font-black uppercase tracking-widest text-secondary/30">Upload Visual Data</p>
                               </div>
                             )}
                             <input 
                               type="file"
                               onChange={handleFileChange}
                               className="absolute inset-0 opacity-0 cursor-pointer"
                               accept="image/*"
                             />
                          </div>
                          <div className="p-4 bg-secondary/5 text-center">
                             <p className="text-[9px] font-bold uppercase tracking-widest text-secondary/40">Recommended: High-Res Vertical</p>
                          </div>
                       </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-widest text-secondary/40">Technical Description</label>
                   <textarea 
                     name="description"
                     value={formData.description}
                     onChange={handleInputChange}
                     rows={4}
                     className="w-full bg-secondary/5 border border-secondary/10 py-4 px-6 outline-none focus:border-accent text-sm font-bold uppercase tracking-widest resize-none"
                     placeholder="DETAILED ATTRIBUTES AND FABRIC SPECIFICATIONS..."
                   />
                </div>

                <div className="mt-12 flex gap-4">
                   <button 
                     type="submit" 
                     disabled={uploading}
                     className="flex-1 bg-secondary text-primary py-5 px-10 text-[11px] font-black uppercase tracking-widest hover:bg-accent transition-all shadow-2xl disabled:opacity-50 cursor-pointer"
                   >
                     {uploading ? 'Transmitting Data...' : (isEditing ? 'Commit Changes' : 'Initialize Entry')}
                   </button>
                   {!uploading && (
                     <button 
                       type="button" 
                       onClick={() => setShowAddModal(false)}
                       className="px-10 text-[11px] font-black uppercase tracking-widest border border-secondary/10 hover:bg-secondary/5 transition-all"
                     >
                       Abort
                     </button>
                   )}
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminPage;

