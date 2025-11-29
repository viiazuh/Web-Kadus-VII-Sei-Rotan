import React from 'react';
import { ChevronRight, Star } from 'lucide-react';

export default function HeroSection({ personalInfo }) {
  return (
    <section id="home" className="pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-50 relative">
      {/* CSS Lokal untuk Animasi Unik */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-fade-up {
          animation: fadeInUp 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
          opacity: 0; /* Mulai hidden */
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
      `}</style>

      {/* Background Shapes Abstrak */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-gradient-to-br from-blue-100/40 to-purple-100/40 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-[10%] left-[-10%] w-[400px] h-[400px] bg-gradient-to-tr from-green-100/40 to-blue-100/40 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
          
          {/* Text Content */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <div className="animate-fade-up inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-blue-100 text-blue-700 rounded-full text-sm font-bold mb-6 shadow-sm hover:scale-105 transition-transform cursor-default">
              <Star size={14} className="fill-blue-500 text-blue-500" />
              <span>Website Resmi Dusun</span>
            </div>
            
            {/* NAMA - Diperbarui sesuai permintaan */}
            <h1 className="animate-fade-up delay-100 text-5xl md:text-7xl lg:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-700 leading-tight mb-4 tracking-tight drop-shadow-sm">
              Lilik Suheri, S.Pd.
            </h1>

            {/* JABATAN */}
            <h2 className="animate-fade-up delay-200 text-2xl md:text-3xl text-slate-500 font-light mb-8">
              {personalInfo.role}
            </h2>
            
            {/* Paragraf dikosongkan sesuai permintaan */}
            
            <div className="animate-fade-up delay-300 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a 
                href="#info" 
                className="group relative overflow-hidden px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-200 hover:shadow-blue-400 transition-all duration-300 flex items-center justify-center gap-3 w-full sm:w-auto hover:-translate-y-1"
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                <span>Lihat Jadwal Ronda</span>
                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* FOTO KADUS SECTION - Floating Animation */}
          <div className="w-full md:w-1/2 flex justify-center relative animate-fade-up delay-200">
            {/* Elemen Dekoratif Berputar di Belakang */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
               <div className="w-[120%] h-[120%] border border-dashed border-slate-200 rounded-full animate-spin-slow"></div>
            </div>
            
            {/* Bingkai Foto Mengambang */}
            <div className="relative group animate-float">
                {/* Efek Glow */}
                <div className="absolute -inset-4 bg-gradient-to-tr from-blue-400 to-purple-400 rounded-[2rem] blur-xl opacity-30 group-hover:opacity-50 transition duration-700"></div>
                
                {/* Container Foto */}
                <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white w-72 h-96 md:w-80 md:h-[30rem] bg-slate-100">
                    {/* FOTO DIPERBARUI KE file lokal 'maslilik.jpg' */}
                    {/* Pastikan file 'maslilik.jpg' ada di folder public */}
                    <img 
                        src="/maslilik.jpg" 
                        alt="Foto Profil Lilik Suheri, S.Pd." 
                        className="w-full h-full object-cover transform transition duration-700 group-hover:scale-110"
                    />
                    
                    {/* Glassmorphism Overlay di Bawah */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-2 group-hover:translate-y-0">
                      <p className="font-bold text-lg">Siap Melayani</p>
                      <p className="text-xs text-slate-200">24 Jam untuk Warga</p>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}