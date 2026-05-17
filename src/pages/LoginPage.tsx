import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await signup(email, password);
      }
      navigate('/');
    } catch (err) {
      console.error(err);
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        setError('AUTHENTICATION_FAILED: INVALID_CREDENTIALS');
      } else if (err.code === 'auth/email-already-in-use') {
        setError('REGISTRATION_FAILED: IDENTITY_EXISTS');
      } else if (err.code === 'auth/weak-password') {
        setError('SECURITY_WARNING: WEAK_CREDENTIALS');
      } else {
        setError(`SYSTEM_ERROR: ${err.message?.toUpperCase() || 'UNKNOWN_FAILURE'}`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-full flex items-center justify-center p-6 bg-primary">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[150px] md:text-[300px] font-black opacity-[0.02] font-serif uppercase select-none text-secondary">
          {isLogin ? 'LOGIN' : 'SIGNUP'}
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white border border-secondary/10 p-8 md:p-12 relative z-10 shadow-2xl"
      >
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-black tracking-tighter mb-2 font-serif text-secondary uppercase">
            {isLogin ? 'Portal Access' : 'Create Identity'}
          </h2>
          <p className="text-[10px] font-sans font-bold uppercase tracking-[0.3em] opacity-40 text-secondary">
            Level 01 Security Authorization
          </p>
        </div>

        {error && (
          <div className="bg-accent/10 border border-accent/20 text-accent p-4 text-[11px] font-bold uppercase tracking-widest mb-8 text-center leading-relaxed">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-secondary block">Identity / Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-secondary/5 border-b-2 border-secondary/10 focus:border-accent p-4 outline-none transition-colors font-sans text-sm text-secondary"
              required
              placeholder="operator@dreesify.club"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-secondary block">Credentials / Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-secondary/5 border-b-2 border-secondary/10 focus:border-accent p-4 outline-none transition-colors font-sans text-sm text-secondary"
              required
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-secondary text-primary font-sans font-black uppercase tracking-widest py-5 px-6 mt-8 active:scale-[0.98] transition-all disabled:opacity-50 hover:bg-secondary/90 flex items-center justify-center gap-4 cursor-pointer"
          >
            {isSubmitting ? 'Verifying...' : (isLogin ? 'Authorize Access' : 'Submit Manifest')}
            {!isSubmitting && <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-[10px] font-black uppercase tracking-widest text-secondary/40 hover:text-accent transition-colors cursor-pointer"
          >
            {isLogin ? 'New Operator? Request Access' : 'Existing Operator? Return to Portal'}
          </button>
        </div>

        <div className="mt-12 pt-8 border-t border-secondary/10 flex justify-between items-center opacity-40">
          <span className="text-[9px] font-bold uppercase tracking-widest text-secondary">Protocol: Secure-SSL</span>
          <span className="text-[9px] font-bold uppercase tracking-widest text-secondary">System: Operational</span>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
