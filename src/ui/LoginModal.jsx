import React, { useState } from 'react';
// Import icon
import { Lock, User, Key, X, LogIn, Loader2, Eye, EyeOff, Mail } from 'lucide-react';
// Import fitur Login dari Firebase
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase'; // Pastikan path ini sesuai dengan file firebase.js kamu

export default function LoginModal({ onClose, onSuccess }) {
  // Ganti Username jadi Email
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // KREDENSIAL LAMA DIHAPUS (Tidak pakai kadus7 lagi)

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsAuthenticating(true);

    try {
      // INI KUNCI KEAMANANNYA: 
      // Kita suruh Firebase mengecek ke server Google
      await signInWithEmailAndPassword(auth, email, password);
      
      // Kalau berhasil (tidak error), jalankan onSuccess
      onSuccess(); 
      
      // Opsional: Tutup modal otomatis kalau perlu, tapi biasanya diatur di App.jsx
    } catch (err) {
      console.error("Login Gagal:", err);
      
      // Handle Error supaya pesan lebih manusiawi
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        setError('Email atau Password salah!');
      } else if (err.code === 'auth/too-many-requests') {
        setError('Terlalu banyak mencoba. Tunggu sebentar.');
      } else if (err.code === 'auth/invalid-email') {
         setError('Format email tidak valid.');
      } else {
        setError('Gagal login: ' + err.message);
      }
    } finally {
      setIsAuthenticating(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-8 relative animate-[fadeIn_0.3s_ease-out]">
        
        {/* Tombol Tutup */}
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
            <X size={24} />
        </button>

        {/* Header */}
        <div className="text-center mb-8">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Lock size={28} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">Akses Admin</h3>
            <p className="text-sm text-slate-500">Akses Admin.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin}>
          
          {/* Email Input (Dulu Username) */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <div className="flex items-center border border-slate-300 rounded-xl px-4 py-3 bg-slate-50 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
              <Mail size={18} className="text-slate-400 mr-3" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@dusun.com"
                required
                disabled={isAuthenticating}
                className="w-full bg-transparent focus:outline-none text-slate-800"
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
            <div className="flex items-center border border-slate-300 rounded-xl px-4 py-3 bg-slate-50 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
              <Key size={18} className="text-slate-400 mr-3" />
              
              <input
                type={showPassword ? "text" : "password"} 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
                required
                disabled={isAuthenticating}
                className="w-full bg-transparent focus:outline-none text-slate-800"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="ml-2 text-slate-400 hover:text-blue-600 transition-colors focus:outline-none"
                tabIndex="-1"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          
          {/* Error Message */}
          {error && (
            <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg text-center font-medium animate-pulse">
              {error}
            </div>
          )}

          {/* Tombol Login */}
          <button
            type="submit"
            disabled={isAuthenticating}
            className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-500/50 flex items-center justify-center gap-2"
          >
            {isAuthenticating ? <Loader2 size={20} className="animate-spin" /> : <LogIn size={20} />}
            {isAuthenticating ? 'Memverifikasi...' : 'Login Aman'}
          </button>
        </form>
        
        <p className="text-xs text-slate-400 text-center mt-6">Hanya Admin</p>
      </div>
    </div>
  );
}