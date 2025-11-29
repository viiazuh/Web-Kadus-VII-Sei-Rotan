import React, { useState } from 'react';
import { CheckCircle2, ChevronDown, Users, Building2, MapPin } from 'lucide-react';

export default function RtDusunVII() {
  const [showAll, setShowAll] = useState(false);

  // DATA KETUA RT (16 ORANG)
  // NAMA DIKOSONGKAN DULU ("-") SESUAI PERMINTAAN
  // Agar aman dan tidak ada kesalahan data saat deploy ke Vercel.
  const dataRelawan = [
    { id: 1, nama: "-", wilayah: "RT 01", status: "Aktif" },
    { id: 2, nama: "-", wilayah: "RT 02", status: "Aktif" },
    { id: 3, nama: "-", wilayah: "RT 03", status: "Aktif" },
    { id: 4, nama: "-", wilayah: "RT 04", status: "Aktif" },
    { id: 5, nama: "-", wilayah: "RT 05", status: "Aktif" },
    { id: 6, nama: "-", wilayah: "RT 06", status: "Aktif" },
    { id: 7, nama: "-", wilayah: "RT 07", status: "Aktif" },
    { id: 8, nama: "-", wilayah: "RT 08", status: "Aktif" },
    { id: 9, nama: "-", wilayah: "RT 09", status: "Aktif" },
    { id: 10, nama: "-", wilayah: "RT 10", status: "Aktif" },
    { id: 11, nama: "-", wilayah: "RT 11", status: "Aktif" },
    { id: 12, nama: "-", wilayah: "RT 12", status: "Aktif" },
    { id: 13, nama: "-", wilayah: "RT 13", status: "Aktif" },
    { id: 14, nama: "-", wilayah: "RT 14", status: "Aktif" },
    { id: 15, nama: "-", wilayah: "RT 15", status: "Aktif" },
    { id: 16, nama: "-", wilayah: "RT 16", status: "Aktif" },
  ];

  const displayedData = showAll ? dataRelawan : dataRelawan.slice(0, 4); // Tampilkan 4 di awal

  return (
    <section id="rtdusun" className="py-20 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- JUDUL SEKSI --- */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-bold mb-4">
            <Building2 size={16} /> Struktur Pemerintahan
          </div>
          <h2 className="text-4xl font-bold text-slate-900">Perangkat Dusun VII</h2>
          <p className="mt-3 text-slate-500">Struktur Rukun Tetangga (RT) yang melayani warga.</p>
        </div>

        {/* --- FOTO BESAR (HERO IMAGE KHUSUS RT) --- */}
        <div className="relative w-full max-w-5xl mx-auto h-64 md:h-96 rounded-3xl overflow-hidden shadow-2xl mb-16 group">
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-transparent to-transparent z-10"></div>
            
            {/* TEXT DI ATAS GAMBAR */}
            <div className="absolute bottom-0 left-0 p-8 z-20 text-white">
                <h3 className="text-3xl font-bold mb-2">Sinergi Membangun Desa</h3>
                <p className="text-blue-100 max-w-xl">
                    Bersama 16 Ketua RT yang solid menjaga kerukunan dan keamanan lingkungan Dusun VII Desa Sei Rotan.
                </p>
            </div>

            {/* GAMBAR BESAR - Pastikan file 'Rt.png' ada di folder public */}
            <img 
                src="/Rt.png" 
                alt="Foto Struktur RT" 
                className="w-full h-full object-cover transform transition duration-700 group-hover:scale-105"
            />
        </div>

        {/* --- GRID KARTU NAMA (TANPA FOTO WAJAH) --- */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayedData.map((tokoh) => (
                <div key={tokoh.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-400 transition-all duration-300 group relative overflow-hidden">
                    
                    {/* Hiasan Background Abstrak */}
                    <div className="absolute top-0 right-0 w-16 h-16 bg-blue-50 rounded-bl-full -mr-4 -mt-4 transition-colors group-hover:bg-blue-100"></div>
                    
                    <div className="flex items-start justify-between mb-4 relative z-10">
                        <div className="p-3 bg-slate-100 rounded-lg text-slate-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                            <Users size={24} />
                        </div>
                        <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-green-50 text-green-700 px-2 py-1 rounded-full border border-green-100">
                            <CheckCircle2 size={10} /> {tokoh.status}
                        </span>
                    </div>

                    <div className="relative z-10">
                        {/* Nama RT (Dikosongkan / Strip) */}
                        <h4 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                            {tokoh.nama}
                        </h4>
                        <div className="flex items-center gap-2 mt-1 text-slate-500 text-sm font-medium">
                            <MapPin size={14} className="text-blue-500" />
                            <span>Ketua {tokoh.wilayah}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>

        {/* --- TOMBOL LIHAT SEMUA --- */}
        <div className="mt-12 text-center">
            <button 
                onClick={() => setShowAll(!showAll)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-slate-200 text-slate-700 rounded-full font-bold hover:border-blue-600 hover:text-blue-600 transition-all shadow-sm hover:shadow-md"
            >
                {showAll ? (
                    <>Tutup Daftar <ChevronDown size={18} className="rotate-180" /></>
                ) : (
                    <>Lihat Seluruh 16 RT <ChevronDown size={18} /></>
                )}
            </button>
        </div>

      </div>
    </section>
  );
}