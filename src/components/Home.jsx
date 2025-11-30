import React from 'react';
import { Star } from 'lucide-react';

export default function Home({ personalInfo }) {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 pb-10 overflow-hidden">
      
      {/* --- CSS ANIMASI KUSTOM --- */}
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float-img {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(1deg); }
        }
        @keyframes scroll-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(10px); }
        }
        @keyframes gradient-x {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .animate-blob { animation: blob 10s infinite; }
        .animate-float-img { animation: float-img 6s ease-in-out infinite; }
        .animate-scroll { animation: scroll-bounce 2s infinite; }
        .animate-fade-up { animation: fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; opacity: 0; }
        .animate-gradient-text {
          background-size: 200% 200%;
          animation: gradient-x 5s ease infinite;
        }
        
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.3s; }
        .delay-300 { animation-delay: 0.5s; }
        .delay-500 { animation-delay: 0.7s; }
      `}</style>

      {/* --- BACKGROUND DYNAMIC SHAPES --- */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        {/* Blob 1 */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        {/* Blob 2 */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        {/* Blob 3 */}
        <div className="absolute -bottom-32 left-20 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        {/* Pattern Grid Overlay (Dihapus agar bersih) */}
        {/* <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div> */}
      </div>

      <div className="container max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-20">
          
          {/* --- KOLOM TEKS --- */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            
            {/* Badge */}
            <div className="animate-fade-up inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-md border border-white shadow-sm mb-6">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
              </span>
              <span className="text-sm font-semibold text-slate-600 tracking-wide uppercase">Website Resmi Dusun</span>
            </div>

            {/* Nama */}
            <h1 className="animate-fade-up delay-100 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-500 to-cyan-500 animate-gradient-text">
                Lilik Suheri,
              </span>
              <br />
              <span className="text-slate-800 text-4xl sm:text-6xl md:text-7xl">S.Pd.</span>
            </h1>

            {/* Jabatan */}
            <h2 className="animate-fade-up delay-200 text-2xl md:text-3xl text-slate-500 font-medium mb-6">
              {personalInfo.role}
            </h2>
            
            {/* Paragraf */}
            <p className="animate-fade-up delay-300 text-lg text-slate-600 leading-relaxed max-w-lg mx-auto lg:mx-0 mb-8">
              Membangun desa dengan hati, transparansi, dan gotong royong untuk kemajuan bersama Dusun VII.
            </p>

            {/* Statistik BARU */}
            <div className="animate-fade-up delay-500 flex flex-wrap justify-center lg:justify-start gap-y-4 gap-x-8 border-t border-slate-200 pt-8">
                {/* 1. RT Aktif */}
                <div className="w-1/3 sm:w-auto">
                    <p className="text-3xl font-bold text-slate-800">16</p>
                    <p className="text-sm text-slate-500 uppercase tracking-wider">RT Aktif</p>
                </div>
                
                {/* Garis pemisah hanya di desktop */}
                <div className="hidden lg:block w-px h-10 bg-slate-200"></div>

                {/* 2. KK Terdaftar (BARU) */}
                <div className="w-1/3 sm:w-auto">
                    <p className="text-3xl font-bold text-slate-800">800+</p>
                    <p className="text-sm text-slate-500 uppercase tracking-wider">Kepala Keluarga</p>
                </div>

                {/* Garis pemisah hanya di desktop */}
                <div className="hidden lg:block w-px h-10 bg-slate-200"></div>
                
                {/* 3. Layanan */}
                <div className="w-1/3 sm:w-auto">
                    <p className="text-3xl font-bold text-slate-800">24/7</p>
                    <p className="text-sm text-slate-500 uppercase tracking-wider">Layanan</p>
                </div>
            </div>
          </div>

          {/* --- KOLOM FOTO --- */}
          <div className="w-full lg:w-1/2 flex justify-center relative animate-fade-up delay-200">
            {/* Elemen Dekoratif Belakang */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-cyan-400 rounded-[2rem] rotate-6 scale-95 blur-2xl opacity-20 animate-pulse"></div>
            
            {/* Bingkai Foto */}
            <div className="relative w-72 h-96 md:w-96 md:h-[32rem] rounded-[2rem] overflow-hidden shadow-2xl border-8 border-white bg-white animate-float-img group">
                
                <img 
                    src="/maslilik.jpg" 
                    alt="H. Lilik Suheri" 
                    className="relative z-10 w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                />
                
            </div>
          </div>

        </div>
      </div>

      {/* --- SCROLL INDICATOR --- */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center animate-fade-up delay-500">
        <span className="text-xs font-medium text-slate-400 mb-2 uppercase tracking-widest">Scroll Kebawah</span>
        <div className="w-6 h-10 border-2 border-slate-300 rounded-full flex justify-center p-1">
            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-scroll"></div>
        </div>
      </div>

    </section>
  );
}