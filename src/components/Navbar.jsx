import React, { useState, useEffect } from 'react';
import { Menu, X, MessageCircle } from 'lucide-react';

export default function Navbar({ personalInfo }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle Scroll Effect untuk Navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className={`text-2xl font-bold ${scrolled ? 'text-slate-900' : 'text-slate-900'}`}>
              Lilik<span className="text-blue-600">Suheri</span>
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <a href="#home" className="hover:text-blue-600 font-medium transition-colors">Beranda</a>
            <a href="#info" className="hover:text-blue-600 font-medium transition-colors">Info Warga</a>
            <a href="#about" className="hover:text-blue-600 font-medium transition-colors">Tentang</a>
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
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-700 focus:outline-none">
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 shadow-xl absolute w-full">
          <div className="px-4 pt-2 pb-6 space-y-2">
            <a href="#home" onClick={() => setIsMenuOpen(false)} className="block px-3 py-3 rounded-md text-base font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-600">Beranda</a>
            <a href="#info" onClick={() => setIsMenuOpen(false)} className="block px-3 py-3 rounded-md text-base font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-600">Info Warga</a>
            <a href="#about" onClick={() => setIsMenuOpen(false)} className="block px-3 py-3 rounded-md text-base font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-600">Tentang</a>
            <a href={`https://wa.me/${personalInfo.phone}`} className="block px-3 py-3 mt-4 rounded-md text-base font-bold text-center bg-blue-600 text-white">
              WhatsApp Sekarang
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}