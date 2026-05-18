import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Chrome, Mail, Lock, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const { login, signup, googleLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    try {
      if (isLogin) {
        await login(email, password);
        toast.success('Successfully logged in');
      } else {
        await signup(email, password);
        toast.success('Account created successfully');
      }
      navigate('/');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Authentication failed');
      toast.error(err.message || 'Authentication failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
      toast.success('Logged in with Google');
      navigate('/');
    } catch (err: any) {
      toast.error('Google login failed');
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white">
      {/* Left Column: Visual */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#F9F8F6] items-center justify-center p-20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80')] bg-cover bg-center grayscale"></div>
        <div className="relative z-10 text-center">
           <h2 className="text-[12vw] font-serif font-black italic text-secondary/5 leading-[0.8] mb-8 select-none">DRESSIFY</h2>
           <p className="text-sm font-black uppercase tracking-[0.5em] text-accent">Strategic Fashion Collection</p>
        </div>
      </div>

      {/* Right Column: Auth Form */}
      <div className="flex-1 flex flex-col justify-center p-8 md:p-16 lg:p-24 relative">
        <div className="max-w-md w-full mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-serif font-black italic uppercase tracking-tight text-secondary mb-4">
              {isLogin ? 'Sign In' : 'Join Us'}
            </h1>
            <p className="text-sm text-secondary/50 font-medium">
              Access your personal archive and exclusive collective benefits.
            </p>
          </motion.div>

          <div className="space-y-4 mb-10">
             <button 
               onClick={handleGoogleLogin}
               className="w-full flex items-center justify-center gap-4 border border-secondary/10 py-5 hover:bg-secondary hover:text-primary transition-all group"
             >
                <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center border border-secondary/10 overflow-hidden">
                   <img src="https://www.google.com/favicon.ico" alt="Google" className="w-full h-full" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Continue with Google</span>
             </button>
             
             <div className="flex items-center gap-4 py-4">
                <div className="flex-1 h-[1px] bg-secondary/5"></div>
                <span className="text-[10px] font-black uppercase tracking-widest opacity-20">Or use email</span>
                <div className="flex-1 h-[1px] bg-secondary/5"></div>
             </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-secondary/40 block ml-1">Email Address</label>
              <div className="relative">
                 <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary/20" size={16} />
                 <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#F9F8F6] border-b-2 border-transparent focus:border-accent p-5 pl-12 outline-none transition-all font-sans text-sm font-semibold"
                  required
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-secondary/40 block ml-1">Password</label>
              <div className="relative">
                 <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary/20" size={16} />
                 <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#F9F8F6] border-b-2 border-transparent focus:border-accent p-5 pl-12 outline-none transition-all font-sans text-sm font-semibold"
                  required
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-secondary text-primary font-black uppercase text-[11px] tracking-[0.3em] py-6 shadow-2xl hover:bg-accent transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-4 mt-10"
            >
              {isSubmitting ? 'Authenticating...' : (isLogin ? 'Sign In' : 'Join Collection')}
              {!isSubmitting && <ArrowRight size={16} />}
            </button>
          </form>

          <div className="mt-12 text-center">
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-[10px] font-black uppercase tracking-widest text-secondary shadow-sm hover:text-accent transition-all pb-1 border-b border-accent"
            >
              {isLogin ? 'Create New Account' : 'Already A Member? Sign In'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
