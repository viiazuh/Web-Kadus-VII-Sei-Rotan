import React from 'react';
import { User, MapPin, Shield, Heart, Camera, Zap, Sunrise } from 'lucide-react';

export default function PageDecorator() {
  return (
    // Lapisan dekoratif ini berfungsi sebagai latar depan di atas background global
    // tapi di bawah konten utama (z-10)
    <div className="absolute inset-0 pointer-events-none z-[5]">
      
      {/* KARTU DEKORATIF 1 (KIRI ATAS) - Lebih Menonjol */}
      <div className="hidden lg:block absolute top-20 left-10 w-64 h-48 bg-white/70 backdrop-blur-lg rounded-3xl shadow-xl border border-white/80 p-6 transform rotate-[-5deg] animate-[fadeIn_1s_ease-out] delay-300">
        <h4 className="text-xl font-bold text-blue-700 mb-3">Pilar Utama</h4>
        <ul className="text-sm text-slate-700 space-y-2">
          <li className="flex items-center gap-2 font-semibold"><MapPin size={16} className="text-red-500" /> 16 Rukun Tetangga</li>
          <li className="flex items-center gap-2 font-semibold"><User size={16} className="text-yellow-500" /> Perangkat Aktif</li>
          <li className="flex items-center gap-2 font-semibold"><Shield size={16} className="text-green-500" /> Siskamling Swadaya</li>
        </ul>
      </div>

      {/* KARTU DEKORATIF 2 (KANAN BAWAH) - Lebih Menonjol */}
      <div className="hidden lg:block absolute bottom-20 right-10 w-56 h-40 bg-white/70 backdrop-blur-lg rounded-3xl shadow-xl border border-white/80 p-6 transform rotate-[3deg] animate-[fadeIn_1s_ease-out] delay-500">
        <h4 className="text-xl font-bold text-pink-600 mb-2">Fokus Sosial</h4>
        <ul className="text-sm text-slate-700 space-y-2">
          <li className="flex items-center gap-2 font-semibold"><Heart size={16} className="text-pink-500" /> Kader Posyandu</li>
          <li className="flex items-center gap-2 font-semibold"><Camera size={16} className="text-slate-500" /> Dokumentasi Kegiatan</li>
        </ul>
      </div>

      {/* IKON BERGERAK TAMBAHAN (Mengisi Ruang Kosong) */}
      <div className="absolute top-1/2 left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl h-full">
          {/* Ikon Utama */}
          <Shield size={72} className="absolute top-10 right-40 opacity-15 animate-[float_8s_ease-in-out_infinite] text-blue-400" />
          
          {/* Ikon Tambahan 1 (Kiri Tengah) */}
          <Zap size={40} className="absolute top-1/3 left-20 opacity-15 animate-[float_4s_ease-in-out_infinite_1s] text-yellow-500" />

          {/* Ikon Tambahan 2 (Kanan Tengah Bawah) */}
          <Sunrise size={56} className="absolute bottom-1/4 right-20 opacity-15 animate-[float_5s_ease-in-out_infinite_3s] text-orange-500" />

          {/* Ikon Tambahan 3 (Kiri Bawah) */}
          <Heart size={48} className="absolute bottom-20 left-1/4 opacity-15 animate-[float_6s_ease-in-out_infinite_2s] text-pink-400" />
      </div>

    </div>
  );
}