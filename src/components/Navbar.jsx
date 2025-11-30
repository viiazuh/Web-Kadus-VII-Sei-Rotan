import React, { useState, useEffect } from 'react';
import { Menu, X, MessageCircle, Building2, ChevronDown, BookOpen, FileText, Camera } from 'lucide-react'; // Import ikon tambahan

export default function Navbar({ personalInfo, navigateTo, currentPage }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false); // State baru untuk menu 'Lainnya'

  // Handle Scroll Effect untuk Navbar
  useEffect(() => {
    const handleScroll = () => {
      const shouldBeScrolled = window.scrollY > 20 || currentPage !== 'home';
      setScrolled(shouldBeScrolled);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage]); 

  // Fungsi untuk menangani navigasi dan menutup menu mobile/lainnya
  const handleNavClick = (page) => {
    navigateTo(page);
    setIsMenuOpen(false);
    setIsMoreOpen(false); // Tutup menu 'Lainnya' setelah navigasi
  };

  // Fungsi untuk scroll ke section (hanya berlaku di halaman home)
  const handleAnchorClick = (e, targetId) => {
    e.preventDefault(); 
    setIsMoreOpen(false); // Tutup menu 'Lainnya'

    if (currentPage !== 'home') {
      navigateTo('home');
      setTimeout(() => {
        document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
        const element = document.getElementById(targetId);
        if(element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navBgClass = scrolled || currentPage !== 'home' ? 'bg-white shadow-md py-2' : 'bg-transparent py-4';

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${navBgClass}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            {/* Logo / Home Button - NAMA WILAYAH SAJA */}
            <button onClick={() => navigateTo('home')} className={`text-xl md:text-2xl font-bold flex items-center gap-1 ${navBgClass.includes('bg-white') ? 'text-slate-900' : 'text-slate-900'}`}>
              <Building2 size={24} className="text-blue-600" />
              Dusun <span className="text-blue-600">VII</span>
              <span className="text-slate-500 font-semibold ml-1 text-base">Sei Rotan</span>
            </button>
          </div>

          {/* Desktop Menu - KINI LEBIH RINGKAS */}
          <div className="hidden md:flex space-x-3 items-center text-sm md:space-x-4">
            
            {/* Tombol Prioritas 1 */}
            <button 
              onClick={() => handleNavClick('home')}
              className={`font-medium transition hover:text-blue-600 px-2 ${currentPage === 'home' ? 'text-blue-600 font-bold' : 'text-gray-600'}`}
            >
              Beranda
            </button>
            
            {/* Tombol Prioritas 2 */}
            <button 
              onClick={() => handleNavClick('rt_list')}
              className={`font-medium transition hover:text-blue-600 px-2 ${currentPage === 'rt_list' ? 'text-blue-600 font-bold' : 'text-gray-600'}`}
            >
              Perangkat Dusun
            </button>
            
            {/* --- MENU DROPDOWN 'LAINNYA' --- */}
            <div className="relative">
                <button 
                    onClick={() => setIsMoreOpen(!isMoreOpen)}
                    className={`font-medium transition hover:text-blue-600 px-2 flex items-center gap-1 ${
                        isMoreOpen || currentPage === 'about_page' || currentPage === 'activity_page' ? 'text-blue-600 font-bold' : 'text-gray-600'
                    }`}
                >
                    Lainnya <ChevronDown size={16} className={`transition-transform ${isMoreOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isMoreOpen && (
                    <div className="absolute right-0 mt-3 w-48 bg-white/95 backdrop-blur-md rounded-lg shadow-xl border border-slate-100 py-2 origin-top-right animate-[fadeIn_0.2s_ease-out]">
                        <button 
                          onClick={() => handleNavClick('about_page')}
                          className="w-full text-left flex items-center gap-3 px-4 py-2 text-slate-700 hover:bg-blue-50/50"
                        >
                            <BookOpen size={16} className="text-indigo-500" /> Visi & Misi
                        </button>
                        <button 
                          onClick={() => handleNavClick('activity_page')}
                          className="w-full text-left flex items-center gap-3 px-4 py-2 text-slate-700 hover:bg-blue-50/50"
                        >
                            <Camera size={16} className="text-yellow-500" /> Dokumentasi
                        </button>
                        <a 
                          href="#info" 
                          onClick={(e) => handleAnchorClick(e, 'info')}
                          className="w-full text-left flex items-center gap-3 px-4 py-2 text-slate-700 hover:bg-blue-50/50"
                        >
                            <FileText size={16} className="text-red-500" /> Info Warga
                        </a>
                    </div>
                )}
            </div>
            {/* --- AKHIR DROPDOWN --- */}
            
            {/* Tombol WhatsApp (Dipaksa ke Kanan) */}
            <a 
              href={`https://wa.me/${personalInfo.phone}`} 
              target="_blank" 
              rel="noreferrer"
              // Dibuat lebih ramping
              className="px-3 py-1.5 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition shadow-lg flex items-center gap-1.5 text-sm whitespace-nowrap"
            >
              <MessageCircle size={16} />
              Hubungi Saya
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-700 hover:text-blue-600 focus:outline-none">
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown (Diperbarui isinya) */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 shadow-xl absolute w-full">
          <div className="px-4 pt-2 pb-6 space-y-2">
            <button onClick={() => handleNavClick('home')} className="block w-full text-left px-3 py-3 rounded-md text-base font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-600">Beranda</button>
            <button onClick={() => handleNavClick('rt_list')} className="block w-full text-left px-3 py-3 rounded-md text-base font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-600">Perangkat Dusun</button>
            <button onClick={() => handleNavClick('about_page')} className="block w-full text-left px-3 py-3 rounded-md text-base font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-600">Visi & Misi</button>
            <button onClick={() => handleNavClick('activity_page')} className="block w-full text-left px-3 py-3 rounded-md text-base font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-600">Dokumentasi</button>
            
            <a href="#info" 
               onClick={(e) => { handleAnchorClick(e, 'info'); setIsMenuOpen(false); }}
               className="block px-3 py-3 rounded-md text-base font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-600"
            >
              Info Warga
            </a>

            <a href={`https://wa.me/${personalInfo.phone}`} className="block px-3 py-3 mt-4 rounded-md text-base font-bold text-center bg-blue-600 text-white">
              WhatsApp Sekarang
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}