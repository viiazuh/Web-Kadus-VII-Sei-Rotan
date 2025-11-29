import React, { useState, useEffect } from 'react';

// Import komponen (Perhatikan perubahan nama file)
import Navbar from './components/Navbar';
import Home from './components/Home';           // <--- Ganti HeroSection jadi Home
import InfoSection from './components/InfoSection'; // <--- InfoSection (Khusus Pengumuman)
import RtDusunVII from './components/RtDusunVII';   // <--- File Baru (Khusus Data RT)
import ActivityGallery from './components/ActivityGallery';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import { Loader2 } from 'lucide-react';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

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
            Lilik<span className="text-blue-600">Suheri</span>
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
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 animate-[fadeIn_1s_ease-in-out]">
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* NAVIGASI */}
      <Navbar personalInfo={personalInfo} />
      
      {/* HALAMAN DEPAN (HOME) */}
      <Home personalInfo={personalInfo} />
      
      {/* PAPAN INFO PENGUMUMAN (BANJIR DLL) */}
      <InfoSection />

      {/* DATA RT & RELAWAN (FILE BARU) */}
      <RtDusunVII />
      
      {/* GALERI KEGIATAN */}
      <ActivityGallery />
      
      {/* TENTANG & VISI MISI */}
      <AboutSection />
      
      {/* KONTAK */}
      <ContactSection personalInfo={personalInfo} />
      
      {/* FOOTER */}
      <Footer personalInfo={personalInfo} />
    </div>
  );
}