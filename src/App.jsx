import React, { useState, useEffect } from 'react';

// Import komponen
import Navbar from './components/Navbar';
import Home from './components/Home';
import InfoSection from './components/InfoSection';
import RtDusunVII from './components/RtDusunVII';
import ActivityGallery from './components/ActivityGallery';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import PageDecorator from './ui/PageDecorator';
import LoginModal from './ui/LoginModal'; 
import { Loader2, Lock, Unlock } from 'lucide-react'; 
import { SpeedInsights } from "@vercel/speed-insights/react";
// Fungsi navigasi URL
const getPageFromPath = (path) => {
  const pathName = path.replace('/', '');
  if (pathName === 'rt_list' || pathName === 'about_page' || pathName === 'activity_page') {
    return pathName;
  }
  return 'home';
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(getPageFromPath(window.location.pathname)); 
  const [showLoginModal, setShowLoginModal] = useState(false);

  // --- PERBAIKAN 1: STATE ADMIN DENGAN MEMORI (LOCAL STORAGE) ---
  const [isAdmin, setIsAdmin] = useState(() => {
    // Cek memori browser saat pertama kali dibuka
    return localStorage.getItem("status_pak_kadus") === "aktif";
  });

  const navigateTo = (page) => {
    setCurrentPage(page);
    window.history.pushState(null, '', `/${page}`);
    window.scrollTo(0, 0); 
  };

  // --- PERBAIKAN 2: FUNGSI LOGIN & LOGOUT YANG MENYIMPAN MEMORI ---
  const handleLoginSuccess = () => {
    setIsAdmin(true);
    setShowLoginModal(false);
    localStorage.setItem("status_pak_kadus", "aktif"); // Simpan ke memori
    alert("Mode Admin Aktif! Anda bisa Edit/Hapus sekarang.");
  };

  const handleLogout = () => {
    setIsAdmin(false);
    localStorage.removeItem("status_pak_kadus"); // Hapus dari memori
    alert("Anda sudah Logout.");
  };

  // Effect Back Button Browser
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(getPageFromPath(window.location.pathname));
    };
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // Effect Loading Awal
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000); 
    return () => clearTimeout(timer);
  }, []);

  // Data Pribadi
  const personalInfo = {
    name: "Lilik Suheri, S.Pd.",
    role: "Kepala Dusun VII Desa Sei Rotan", 
    phone: "6282294959654", 
    address: "Dusun VII, Desa Sei Rotan" 
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white text-slate-800">
        <div className="text-center animate-pulse">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Dusun VII <span className="text-blue-600">Sei Rotan</span></h1>
          <Loader2 className="w-10 h-10 text-blue-600 animate-spin mx-auto mt-4" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-sans text-slate-800 animate-[fadeIn_1s_ease-in-out] relative">
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes blob { 0% { transform: translate(0px, 0px) scale(1); } 33% { transform: translate(30px, -50px) scale(1.1); } 66% { transform: translate(-20px, 20px) scale(0.9); } 100% { transform: translate(0px, 0px) scale(1); } }
        .animate-blob { animation: blob 10s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>

      {/* Background Animasi */}
      <div className="fixed inset-0 z-[-1] overflow-hidden bg-slate-50 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-20 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>
      
      {!isLoading && <PageDecorator />} 

      <Navbar personalInfo={personalInfo} navigateTo={navigateTo} currentPage={currentPage} />
      
      {/* --- HALAMAN-HALAMAN --- */}

      {/* HALAMAN HOME */}
      {currentPage === 'home' && (
        <>
          <Home personalInfo={personalInfo} isAdmin={isAdmin} onLoginRequired={() => setShowLoginModal(true)} onLogout={handleLogout} /> 
          <InfoSection isAdmin={isAdmin} onLoginRequired={() => setShowLoginModal(true)} />
        </>
      )}

      {/* HALAMAN RT */}
      {currentPage === 'rt_list' && (
        <RtDusunVII fullPage={true} isAdmin={isAdmin} />
      )}

      {/* HALAMAN VISI MISI */}
      {currentPage === 'about_page' && (
        <AboutSection fullPage={true} isAdmin={isAdmin} />
      )}
      
      {/* HALAMAN DOKUMENTASI (KITA OPER isAdmin KE SINI) */}
      {currentPage === 'activity_page' && (
        <ActivityGallery fullPage={true} isAdmin={isAdmin} />
      )}

      {/* --- PERBAIKAN 3: TOMBOL KUNCI ADMIN MELAYANG DI SEMUA HALAMAN --- */}
      {/* Tombol ini akan selalu muncul di pojok kanan bawah, di halaman manapun */}
      <button 
          onClick={() => isAdmin ? handleLogout() : setShowLoginModal(true)}
          className={`fixed bottom-4 right-4 z-[90] p-3 rounded-full shadow-lg transition-all duration-300 flex items-center gap-2 border-2 border-white ${isAdmin ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
          title={isAdmin ? "Klik untuk Logout" : "Klik untuk Login Admin"}
        >
          {isAdmin ? <Lock size={20} /> : <Unlock size={20} />}
      </button>

      {/* MODAL LOGIN */}
      {showLoginModal && (
        <LoginModal 
          onClose={() => setShowLoginModal(false)}
          onSuccess={handleLoginSuccess}
        />
      )}

      <ContactSection personalInfo={personalInfo} />
      <Footer personalInfo={personalInfo} />


      <SpeedInsights />
    </div>
  );
}