import React, { useState } from 'react';
import { CheckCircle2, ChevronDown, Users, Building2, MapPin } from 'lucide-react';

export default function RtDusunVII({ fullPage }) { // Tambahkan prop fullPage
  const [showAll, setShowAll] = useState(false);

  // DATA NAMA KETUA RT SUDAH DIMASUKKAN BERURUTAN
  const dataRelawan = [
    { id: 1, nama: "Jumangin", wilayah: "RT 01", status: "Aktif" },
    { id: 2, nama: "Sunarto", wilayah: "RT 02", status: "Aktif" },
    { id: 3, nama: "Sudarmono", wilayah: "RT 03", status: "Aktif" },
    { id: 4, nama: "Sugianto", wilayah: "RT 04", status: "Aktif" },
    { id: 5, nama: "Sukiran", wilayah: "RT 05", status: "Aktif" },
    { id: 6, nama: "Wagiono", wilayah: "RT 06", status: "Aktif" },
    { id: 7, nama: "Gunawan", wilayah: "RT 07", status: "Aktif" },
    { id: 8, nama: "Muhammad Taufik", wilayah: "RT 08", status: "Aktif" },
    { id: 9, nama: "Mulyadi", wilayah: "RT 09", status: "Aktif" },
    { id: 10, nama: "Supriandi", wilayah: "RT 10", status: "Aktif" },
    { id: 11, nama: "Bambang Irawan", wilayah: "RT 11", status: "Aktif" },
    { id: 12, nama: "Sugiman", wilayah: "RT 12", status: "Aktif" },
    { id: 13, nama: "Rudi", wilayah: "RT 13", status: "Aktif" },
    { id: 14, nama: "Misdi", wilayah: "RT 14", status: "Aktif" },
    { id: 15, nama: "Deni Syahputra", wilayah: "RT 15", status: "Aktif" },
    { id: 16, nama: "Muliadi", wilayah: "RT 16", status: "Aktif" },
  ];

  const displayedData = showAll ? dataRelawan : dataRelawan.slice(0, 4);

  return (
    // Jika fullPage, beri padding atas yang lebih besar (pt-28)
    <section id="rtdusun" className={`py-24 bg-white/30 backdrop-blur-sm relative ${fullPage ? 'pt-28 min-h-screen' : ''}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-100/80 text-blue-700 rounded-full text-sm font-bold mb-4 shadow-sm backdrop-blur-sm">
            <Building2 size={16} /> Struktur Pemerintahan
          </div>
          <h2 className="text-4xl font-bold text-slate-900">Perangkat Dusun VII</h2>
          <p className="mt-3 text-slate-600 font-medium">Struktur Rukun Tetangga (RT) yang melayani warga.</p>
        </div>

        <div className="relative w-full max-w-5xl mx-auto h-64 md:h-96 rounded-3xl overflow-hidden shadow-2xl mb-16 group border-4 border-white/50 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-transparent to-transparent z-10"></div>
            <div className="absolute bottom-0 left-0 p-4 md:p-8 z-20 text-white"> {/* Padding di Mobile dikecilkan */}
                <h3 className="text-xl md:text-3xl font-bold mb-1 md:mb-2">Sinergi Membangun Desa</h3> {/* Ukuran teks dikecilkan di mobile */}
                <p className="text-xs md:text-base text-blue-100 max-w-xl"> {/* Ukuran teks dikecilkan di mobile */}
                    Bersama 16 Ketua RT yang solid menjaga kerukunan dan keamanan lingkungan Dusun VII Desa Sei Rotan.
                </p>
            </div>
            <img 
                src="/Rt.png" 
                alt="Foto Struktur RT" 
                className="w-full h-full object-contain bg-white transform transition duration-700 group-hover:scale-105"
            />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayedData.map((tokoh) => (
                <div key={tokoh.id} className="bg-white/70 backdrop-blur-md p-6 rounded-xl border border-white/50 shadow-sm hover:shadow-xl hover:border-blue-400 transition-all duration-300 group relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-blue-50/50 rounded-bl-full -mr-4 -mt-4 transition-colors group-hover:bg-blue-100"></div>
                    
                    <div className="flex items-start justify-between mb-4 relative z-10">
                        <div className="p-3 bg-white rounded-lg text-slate-600 group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-sm">
                            <Users size={24} />
                        </div>
                        <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-green-50/80 text-green-700 px-2 py-1 rounded-full border border-green-100">
                            <CheckCircle2 size={10} /> {tokoh.status}
                        </span>
                    </div>

                    <div className="relative z-10">
                        <h4 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                            {tokoh.nama}
                        </h4>
                        <div className="flex items-center gap-2 mt-1 text-slate-600 text-sm font-medium">
                            <MapPin size={14} className="text-blue-500" />
                            <span>Ketua {tokoh.wilayah}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>

        <div className="mt-12 text-center">
            <button onClick={() => setShowAll(!showAll)} className="inline-flex items-center gap-2 px-6 py-3 bg-white/80 border-2 border-slate-200 text-slate-700 rounded-full font-bold hover:border-blue-600 hover:text-blue-600 transition-all shadow-sm hover:shadow-md backdrop-blur-sm">
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