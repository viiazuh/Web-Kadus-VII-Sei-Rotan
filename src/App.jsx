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
import PageDecorator from './ui/PageDecorator'; // <-- PATH SUDAH DIPERBAIKI: dari ./components/ ke ./ui/
import { Loader2 } from 'lucide-react';

// Fungsi untuk menentukan halaman awal dari URL
const getPageFromPath = (path) => {
  const pathName = path.replace('/', '');
  if (pathName === 'rt_list' || pathName === 'about_page' || pathName === 'activity_page') {
    return pathName;
  }
  return 'home'; // Default ke home jika path kosong atau tidak dikenal
};


export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  // Ambil halaman awal dari URL saat aplikasi dimuat
  const [currentPage, setCurrentPage] = useState(getPageFromPath(window.location.pathname)); 

  // FUNGSI UNTUK PINDAH HALAMAN
  const navigateTo = (page) => {
    // 1. Ubah state internal
    setCurrentPage(page);
    // 2. Catat di riwayat browser (History API)
    window.history.pushState(null, '', `/${page}`);
    // 3. Scroll ke atas
    window.scrollTo(0, 0); 
  };

  // --- EFFECT UNTUK MENDENGARKAN TOMBOL BACK/FORWARD BROWSER ---
  useEffect(() => {
    const handlePopState = () => {
      // Saat tombol back/forward ditekan, ambil path baru dari URL
      setCurrentPage(getPageFromPath(window.location.pathname));
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);


  // DATA PRIBADI (Pusat Data)
  const personalInfo = {
    name: "Lilik Suheri, S.Pd.",
    role: "Kepala Dusun VII Desa Sei Rotan", 
    phone: "6282294959654", 
    address: "Dusun VII, Desa Sei Rotan" 
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); 
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white text-slate-800">
        <div className="text-center animate-pulse">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Dusun VII <span className="text-blue-600">Sei Rotan</span>
          </h1>
          <p className="text-slate-500 text-sm tracking-widest uppercase mb-6">
            Website Resmi
          </p>
          <div className="flex justify-center">
            <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-sans text-slate-800 animate-[fadeIn_1s_ease-in-out] relative">
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob { animation: blob 10s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        @keyframes float { 
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>

      {/* --- GLOBAL BACKGROUND (WALLPAPER HIDUP - POLOS TANPA KOTAK) --- */}
      <div className="fixed inset-0 z-[-1] overflow-hidden bg-slate-50 pointer-events-none">
        {/* Blob 1 */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        {/* Blob 2 */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        {/* Blob 3 */}
        <div className="absolute -bottom-32 left-20 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>
      
      {/* --- DEKORASI PAGE BARU --- */}
      {/* Muncul di semua halaman kecuali loading */}
      {!isLoading && <PageDecorator />} 

      <Navbar personalInfo={personalInfo} navigateTo={navigateTo} currentPage={currentPage} />
      
      {/* --- KONDISIONAL RENDERING (MENGGANTI HALAMAN) --- */}

      {/* HALAMAN BERANDA (HOME PAGE) */}
      {currentPage === 'home' && (
        <>
          <Home personalInfo={personalInfo} /> 
          <InfoSection />
        </>
      )}

      {/* HALAMAN DAFTAR RT (PAGE BARU) */}
      {currentPage === 'rt_list' && (
        <RtDusunVII fullPage={true} />
      )}

      {/* HALAMAN VISI MISI (PAGE BARU) */}
      {currentPage === 'about_page' && (
        <AboutSection fullPage={true} />
      )}
      
      {/* HALAMAN DOKUMENTASI KEGIATAN (PAGE BARU) */}
      {currentPage === 'activity_page' && (
        <ActivityGallery fullPage={true} />
      )}

      {/* Footer dan ContactSection tetap tampil di semua halaman */}
      <ContactSection personalInfo={personalInfo} />
      <Footer personalInfo={personalInfo} />
    </div>
  );
}