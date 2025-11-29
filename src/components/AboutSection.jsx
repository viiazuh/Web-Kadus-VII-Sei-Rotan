import React from 'react';
import { User } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-2">Tentang</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-slate-900">Prinsip Kepemimpinan</h3>
        </div>

        {/* Layout Single Column Center */}
        <div className="max-w-3xl mx-auto">
          {/* Visi Misi Card */}
          <div className="bg-white p-10 rounded-3xl shadow-lg hover:shadow-xl transition text-center border-t-8 border-blue-600 relative overflow-hidden">
            {/* Dekorasi Background */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400 to-blue-600"></div>
            
            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600 shadow-inner">
              <User size={40} />
            </div>
            
            <h4 className="text-2xl font-bold text-slate-900 mb-6">Visi & Misi</h4>
            
            <div className="space-y-4">
                {/* TEKS UTAMA (Diupdate) */}
                <p className="text-2xl text-slate-800 font-serif italic leading-relaxed">
                  "Menjunjung tinggi adat istiadat."
                </p>
                
                <div className="w-16 h-1 bg-blue-200 mx-auto rounded-full my-4"></div>
                
                <p className="text-slate-500 text-sm font-medium tracking-wide">
                    KEPALA DUSUN VII DESA SEI ROTAN
                </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}