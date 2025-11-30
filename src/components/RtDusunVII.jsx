import React, { useState, useEffect } from 'react';
import { CheckCircle2, ChevronDown, Users, Building2, MapPin, Group, Heart, Briefcase, ExternalLink, Activity } from 'lucide-react';

export default function RtDusunVII({ fullPage }) { 
  const [showAll, setShowAll] = useState(false);
  const [activeTab, setActiveTab] = useState('rt');
  
  // --- DATA UNTUK SLIDER FOTO (CAROUSEL) ---
  const carouselImages = [
    { 
        src: "/Rt.png", 
        caption: "Sinergi Membangun Desa: Struktur Rukun Tetangga (RT)",
        alt: "Foto Struktur RT" 
    },
    { 
        // Menggunakan path Ibu Zuherawati sebagai perwakilan organisasi lain
        src: "/fotom/posyandu.png", 
        caption: "Penggerak Komunitas: Kader Posyandu & Organisasi Dusun",
        alt: "Foto Organisasi Dusun" 
    },
    // Jika ada foto kegiatan lain, bisa ditambahkan di sini
  ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // LOGIC OTOMATIS GANTI FOTO (SETIAP 5 DETIK)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prevIndex => 
        (prevIndex + 1) % carouselImages.length
      );
    }, 5000); // Ganti setiap 5000 milidetik (5 detik)
    
    return () => clearInterval(interval);
  }, []); // Dependensi kosong agar hanya berjalan sekali saat mount

  const currentImage = carouselImages[currentImageIndex];

  // --- DATA KETUA RT (TIDAK BERUBAH) ---
  const dataRt = [
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

  // --- DATA ORGANISASI LAIN (Tidak Berubah) ---
  const dataOrganisasi = [
    { 
        id: 1, 
        nama: "ZUHERAWATI", 
        imgUrl: "/fotom/zuherawati.png", 
        status: "Aktif",
        jabatan: [
            "Ketua Pokja 1 Desa Sei Rotan",
            "Kader Posyandu Dsn 7 Sei Rotan",
            "Pengurus Wirid Akbar Kecamatan Percut Sei Tuan",
            "Sekretaris Wirid Akbar Desa Sei Rotan",
            "Sekretaris Perwiritan Nurul Huda Dusun 7 & 8 Sei Rotan",
            "Pengurus Anak Yatim Piatu Dusun 7 Sei Rotan",
            "Kader SPM",
        ] 
    },
    { 
        id: 2, 
        nama: "Suparni", 
        imgUrl: "/fotom/suparni.png", 
        status: "Aktif",
        jabatan: [
            "Sekretaris Pokja 1",
            "Sekretaris SPM  Posyandu Kemuning Dusun 7 Sei Rotan",
            "Kader Posyandu Dsn 7 Sei Rotan",
            "Wakil ketua Pengajian  Muslimat NU PAC Desa Sei Rotan",
            "Bendahara BUMDES SEROJA",
            "Bendahara BKR",
            "TPK",
        ] 
    },
    { 
        id: 3, 
        nama: "Mini Purwati ", 
        imgUrl: "/fotom/purwati.png", 
        status: "Aktif",
        jabatan: [
            "Pokja 1",
            "Kader SPM",
            "Kader Posyandu Dsn 7 Sei Rotan",
        ] 
    },
    { 
        id: 4, 
        nama: "Siti Rahayu Hamidah  ", 
        imgUrl: "/fotom/hamidah.png", 
        status: "Aktif",
        jabatan: [
            "Pokja 1",
            "Kader SPM",
            "Kader Posyandu Dsn 7 Sei Rotan",
        ] 
    },
    { 
        id: 5, 
        nama: "Suriyani", 
        imgUrl: "/fotom/suryani.png", 
        status: "Aktif",
        jabatan: [
            "Kader SPM dusun 7 ",
        ] 
    },
    { 
        id: 6, 
        nama: "Yuni warianti", 
        imgUrl: "/fotom/yuni.png", 
        status: "Aktif",
        jabatan: [
            "Kader SPM dusun 7",
        ] 
    },
  ];

  const displayedRt = showAll ? dataRt : dataRt.slice(0, 4);

  const getTabClass = (tabName) => (
    `py-2 px-6 font-bold text-lg rounded-full transition-all duration-300 ${
      activeTab === tabName 
        ? 'bg-blue-600 text-white shadow-lg shadow-blue-300/50' 
        : 'text-slate-600 hover:bg-white/50'
    }`
  );

  return (
    // Jika fullPage, beri padding atas yang lebih besar (pt-28)
    <section id="rtdusun" className={`py-24 bg-white/30 backdrop-blur-sm relative ${fullPage ? 'pt-28 min-h-screen' : ''}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-100/80 text-blue-700 rounded-full text-sm font-bold mb-4 shadow-sm backdrop-blur-sm">
            <Building2 size={16} /> Struktur Pemerintahan
          </div>
          <h2 className="text-4xl font-bold text-slate-900">Perangkat Dusun VII</h2>
          <p className="mt-3 text-slate-600 font-medium">Struktur Rukun Tetangga (RT) dan Organisasi Dusun yang melayani warga.</p>
        </div>

        {/* --- GAMBAR SLIDER (CAROUSEL BARU) --- */}
        <div className="relative w-full max-w-5xl mx-auto h-64 md:h-96 rounded-3xl overflow-hidden shadow-2xl mb-16 group border-4 border-white/50 backdrop-blur-sm">
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-transparent to-transparent z-10"></div>
            
            {/* Teks Dinamis */}
            <div className="absolute bottom-0 left-0 p-4 md:p-8 z-20 text-white transition-opacity duration-1000"> 
                <h3 className="text-xl md:text-3xl font-bold mb-1 md:mb-2">{currentImage.caption}</h3> 
                <p className="text-xs md:text-base text-blue-100 max-w-xl"> 
                    {currentImage.alt === "Foto Struktur RT" ? "Bersama seluruh perangkat desa yang solid menjaga kerukunan dan keamanan lingkungan Dusun VII Desa Sei Rotan." : "Dedikasi untuk layanan sosial, pendidikan, dan kesehatan warga."}
                </p>
            </div>
            
            {/* Gambar yang Berganti */}
            <img 
                key={currentImage.src} // Key untuk memicu transisi (meskipun sederhana)
                src={currentImage.src} 
                alt={currentImage.alt} 
                className="w-full h-full object-contain bg-white transition duration-1000 animate-[fadeIn_1s_ease-out] group-hover:scale-105"
                onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/960x400/CCCCCC/333333?text=Foto+Tidak+Ditemukan"; }}
            />

            {/* Indikator Slider */}
            <div className="absolute bottom-4 right-4 z-20 flex gap-2">
                {carouselImages.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-3 h-3 rounded-full transition-colors ${
                            index === currentImageIndex ? 'bg-white shadow-md' : 'bg-white/50 hover:bg-white/80'
                        }`}
                        aria-label={`Lihat gambar ${index + 1}`}
                    ></button>
                ))}
            </div>
        </div>
        <style>{`@keyframes fadeIn {from {opacity: 0;} to {opacity: 1;}}`}</style>


        {/* --- TAB NAVIGATION (Tidak Berubah) --- */}
        <div className="flex justify-center mb-12">
            <div className="bg-white/70 backdrop-blur-md p-2 rounded-full shadow-lg flex space-x-2">
                <button 
                    onClick={() => { setActiveTab('rt'); setShowAll(false); }}
                    className={getTabClass('rt')}
                >
                    <Users size={20} className="inline mr-2" /> Ketua RT
                </button>
                <button 
                    onClick={() => { setActiveTab('organisasi'); setShowAll(false); }}
                    className={getTabClass('organisasi')}
                >
                    <Heart size={20} className="inline mr-2" /> Organisasi Dusun
                </button>
            </div>
        </div>

        {/* --- KONTEN TAB: KETUA RT (Tidak Berubah) --- */}
        {activeTab === 'rt' && (
            <>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {displayedRt.map((tokoh) => (
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
            </>
        )}

        {/* --- KONTEN TAB: ORGANISASI LAIN (Tidak Berubah) --- */}
        {activeTab === 'organisasi' && (
            <>
                <div className="grid justify-center lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {dataOrganisasi.map((org) => (
                        <div key={org.id} className="bg-white/95 backdrop-blur-md rounded-2xl border border-slate-100 shadow-xl transition-all duration-300 p-6">
                            
                            {/* HEADER FOTO KIRI & NAMA */}
                            <div className="flex items-center mb-6 border-b pb-4 border-slate-100">
                                <img 
                                    src={org.imgUrl} 
                                    alt={`Foto ${org.nama}`} 
                                    className="w-16 h-16 object-cover rounded-full border-4 border-blue-100 mr-4"
                                    onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/80x80/60A5FA/ffffff?text=Z"; }} // Fallback jika gambar tidak ditemukan
                                />
                                <div>
                                    <h4 className="text-2xl font-extrabold text-blue-700">
                                        {org.nama}
                                    </h4>
                                    <span className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider bg-green-50/80 text-green-700 px-2 py-0.5 mt-1 rounded-full border border-green-100 w-fit">
                                        <CheckCircle2 size={10} /> {org.status}
                                    </span>
                                </div>
                            </div>
                            
                            {/* Daftar Jabatan */}
                            <h5 className="flex items-center text-sm font-bold text-slate-600 mb-3">
                                <Briefcase size={16} className="mr-2 text-pink-500" /> Daftar Peran & Tanggung Jawab:
                            </h5>
                            <ul className="space-y-3 text-slate-700 text-sm max-h-48 overflow-y-auto pr-2">
                                {org.jabatan.map((peran, index) => (
                                    <li key={index} className="flex items-start">
                                        <Heart size={14} className="flex-shrink-0 mt-1 mr-3 text-pink-500" />
                                        <span>{peran}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                
            </>
        )}

      </div>
    </section>
  );
}