import React, { useState, useEffect } from 'react';
import { Menu, X, MessageCircle } from 'lucide-react';

export default function Navbar({ personalInfo, navigateTo, currentPage }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle Scroll Effect untuk Navbar
  useEffect(() => {
    const handleScroll = () => {
      // Navbar tetap putih jika tidak di halaman home, atau jika discroll
      const shouldBeScrolled = window.scrollY > 20 || currentPage !== 'home';
      setScrolled(shouldBeScrolled);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage]); // Ditambahkan currentPage agar efek transparan muncul hanya di halaman home awal

  // Fungsi untuk menangani navigasi dan menutup menu mobile
  const handleNavClick = (page) => {
    navigateTo(page);
    setIsMenuOpen(false);
  };

  // Fungsi untuk scroll ke section (hanya berlaku di halaman home)
  const handleAnchorClick = (e, targetId) => {
    e.preventDefault(); // Mencegah link pindah halaman default
    
    if (currentPage !== 'home') {
      // Pindah ke home dulu, lalu scroll
      navigateTo('home');
      setTimeout(() => {
        document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
        // Jika sudah di home, scroll langsung
        const element = document.getElementById(targetId);
        if(element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Tentukan background Navbar: putih jika discroll atau tidak di halaman home
  const navBgClass = scrolled || currentPage !== 'home' ? 'bg-white shadow-md py-2' : 'bg-transparent py-4';

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${navBgClass}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            {/* Logo / Home Button */}
            <button onClick={() => navigateTo('home')} className={`text-2xl font-bold ${navBgClass.includes('bg-white') ? 'text-slate-900' : 'text-slate-900'}`}>
              Lilik<span className="text-blue-600">Suheri</span>
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            
            {/* Tombol Beranda */}
            <button 
              onClick={() => handleNavClick('home')}
              className={`font-medium transition hover:text-blue-600 ${currentPage === 'home' ? 'text-blue-600 font-bold' : 'text-gray-600'}`}
            >
              Beranda
            </button>
            
            {/* Tombol Daftar RT (Pindah Halaman) */}
            <button 
              onClick={() => handleNavClick('rt_list')}
              className={`font-medium transition hover:text-blue-600 ${currentPage === 'rt_list' ? 'text-blue-600 font-bold' : 'text-gray-600'}`}
            >
              Daftar RT
            </button>
            
            {/* Tombol Visi Misi (Pindah Halaman Baru) */}
            <button 
              onClick={() => handleNavClick('about_page')}
              className={`font-medium transition hover:text-blue-600 ${currentPage === 'about_page' ? 'text-blue-600 font-bold' : 'text-gray-600'}`}
            >
              Visi & Misi
            </button>

            {/* Tombol Dokumentasi Kegiatan (PAGE BARU) */}
            <button 
              onClick={() => handleNavClick('activity_page')}
              className={`font-medium transition hover:text-blue-600 ${currentPage === 'activity_page' ? 'text-blue-600 font-bold' : 'text-gray-600'}`}
            >
              Dokumentasi
            </button>
            
            {/* Anchor Links (Sekarang menggunakan fungsi handleAnchorClick) */}
            
            <a href="#info"
               onClick={(e) => handleAnchorClick(e, 'info')}
               className="text-gray-600 hover:text-blue-600 font-medium transition"
            >
              Info Warga
            </a>
            
            {/* Tombol WhatsApp (Tetap) */}
            <a 
              href={`https://wa.me/${personalInfo.phone}`} 
              target="_blank" 
              rel="noreferrer"
              className="px-5 py-2 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition shadow-lg flex items-center gap-2"
            >
              <MessageCircle size={18} />
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

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 shadow-xl absolute w-full">
          <div className="px-4 pt-2 pb-6 space-y-2">
            <button onClick={() => handleNavClick('home')} className="block w-full text-left px-3 py-3 rounded-md text-base font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-600">Beranda</button>
            <button onClick={() => handleNavClick('rt_list')} className="block w-full text-left px-3 py-3 rounded-md text-base font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-600">Daftar RT</button>
            <button onClick={() => handleNavClick('about_page')} className="block w-full text-left px-3 py-3 rounded-md text-base font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-600">Visi & Misi</button>
            <button onClick={() => handleNavClick('activity_page')} className="block w-full text-left px-3 py-3 rounded-md text-base font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-600">Dokumentasi</button>
            
            {/* Tambahkan link anchor di mobile menu juga, arahkan ke home lalu scroll */}
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