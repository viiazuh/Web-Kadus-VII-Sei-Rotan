import React from 'react';
import { MapPin, Calendar } from 'lucide-react';

export default function ActivityGallery() {
  // DATA KEGIATAN (Diisi Manual di sini)
  // Cara tambah kegiatan baru: Copy salah satu blok {...}, lalu ganti isinya.
  const activities = [
    {
      id: 1,
      title: "Gotong Royong Bersih Lingkungan",
      date: "Minggu, 24 November 2024",
      description: "Alhamdulillah, kegiatan gotong royong membersihkan saluran air di RT 05 berjalan lancar. Terima kasih kepada warga yang sudah menyempatkan hadir. Mari kita jaga kebersihan lingkungan kita bersama! 🧹🌿",
      location: "RT 05, Dusun VII",
      // Ganti URL ini dengan foto kegiatan asli
      image: "https://images.unsplash.com/photo-1590682680695-43b964a3ae17?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "Penyaluran Bantuan Sosial",
      date: "Jumat, 22 November 2024",
      description: "Meninjau pembagian bantuan sosial di Balai Desa. Semoga amanah dan tepat sasaran untuk warga yang membutuhkan. 🤝📦",
      location: "Balai Desa Sei Rotan",
      image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=1000&auto=format&fit=crop"
    }
  ];

  return (
    <section id="gallery" className="py-20 bg-slate-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* JUDUL SECTION */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900">Dokumentasi Kegiatan</h2>
          <p className="mt-3 text-slate-500">Arsip foto dan catatan aktivitas warga Dusun VII.</p>
        </div>

        {/* LIST KEGIATAN (Style Majalah/Dokumentasi) */}
        <div className="space-y-12">
          {activities.map((item) => (
            <div key={item.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-lg transition-all duration-300 group">
              <div className="flex flex-col md:flex-row">
                
                {/* Bagian Foto (Sebelah Kiri/Atas) */}
                <div className="md:w-1/2 h-64 md:h-auto relative overflow-hidden">
                  <div className="absolute inset-0 bg-slate-200 animate-pulse"></div>
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover relative z-10 transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Badge Lokasi */}
                  <div className="absolute top-4 left-4 z-20 bg-black/60 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1">
                    <MapPin size={12} />
                    {item.location}
                  </div>
                </div>

                {/* Bagian Konten (Sebelah Kanan/Bawah) */}
                <div className="md:w-1/2 p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-2 text-blue-600 font-bold text-sm mb-4 bg-blue-50 w-fit px-3 py-1 rounded-lg">
                    <Calendar size={16} />
                    <span>{item.date}</span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-slate-900 mb-4 leading-tight group-hover:text-blue-700 transition-colors">
                    {item.title}
                  </h3>
                  
                  <p className="text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="text-center mt-12">
          <p className="text-slate-400 text-sm italic">
            *Dokumentasi akan terus diperbarui secara berkala oleh Admin Dusun.
          </p>
        </div>

      </div>
    </section>
  );
}