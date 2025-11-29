import React, { useState } from 'react';
import { X, Shield, AlertTriangle, Siren, UserCheck, MessageCircle } from 'lucide-react';

export default function InfoSection() {
  const [showAnnouncement, setShowAnnouncement] = useState(true);

  // Data kontak darurat dikosongkan (placeholder)
  const contactInfo = {
    phone: "6282294959654", // Nomor Kadus (untuk dihubungi jika kontak darurat kosong)
  };

  return (
    // Background Transparan (Glass Effect) agar menyatu dengan Home
    <section id="info" className="py-24 relative overflow-hidden bg-white/30 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50/80 border border-blue-100 text-blue-600 text-sm font-bold mb-4 shadow-sm backdrop-blur-sm">
            <Shield size={16} />
            <span>Pusat Informasi</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
            Papan Informasi Warga
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
            Update terkini seputar keamanan, kondisi lingkungan, dan pengumuman penting Dusun VII.
          </p>
        </div>

        {/* Alert Banjir */}
        {showAnnouncement ? (
          <div className="max-w-5xl mx-auto mb-16">
            <div className="relative overflow-hidden bg-red-50/90 border border-red-200 rounded-3xl p-1 shadow-2xl shadow-red-200/50 backdrop-blur-md">
              <div className="absolute left-0 top-0 bottom-0 w-2 bg-red-500 rounded-l-3xl"></div>
              <div className="rounded-[20px] p-6 sm:p-8 flex flex-col md:flex-row items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center shadow-inner animate-pulse">
                    <AlertTriangle size={32} />
                  </div>
                </div>
                <div className="flex-1 pt-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-red-900">PERINGATAN: WASPADA BANJIR</h3>
                    <span className="px-3 py-1 bg-red-600 text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-sm animate-pulse">SIAGA 1</span>
                  </div>
                  <p className="text-slate-700 leading-relaxed font-medium">
                    Dihimbau kepada seluruh masyarakat Dusun 7, dikarenakan kondisi banjir saat ini, mohon <strong>AWAS HEWAN MELATA</strong> (seperti ular/lipan) yang mungkin masuk ke dalam rumah.
                  </p>
                </div>
                <button onClick={() => setShowAnnouncement(false)} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all">
                  <X size={20} />
                </button>
              </div>
            </div>
          </div>
        ) : (
           <div className="text-center p-8 border-2 border-dashed border-slate-300 rounded-3xl mb-16 max-w-2xl mx-auto bg-white/40">
             <p className="text-slate-500 font-medium">Tidak ada pengumuman darurat saat ini.</p>
           </div>
        )}

        {/* Konten Ronda & Kontak */}
        <div className="grid lg:grid-cols-2 gap-8">
            
            {/* KARTU 1: POSKAMLING (Modern Glass Dark) - Ajakan Gotong Royong */}
            <div className="bg-slate-900/95 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-10 text-white relative overflow-hidden shadow-2xl group transition-transform hover:-translate-y-1 duration-500 border border-slate-800">
                <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[conic-gradient(from_0deg,transparent_0_340deg,rgba(59,130,246,0.3)_360deg)] animate-[spin_8s_linear_infinite] opacity-40 pointer-events-none"></div>
                <div className="relative z-10">
                    <div className="flex justify-between items-start mb-8">
                        <div className="p-3.5 bg-blue-600 rounded-2xl shadow-lg shadow-blue-500/40">
                            <Shield size={32} className="text-white" />
                        </div>
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10">
                            <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-xs font-bold text-green-300 uppercase tracking-wide">Poskamling Aktif</span>
                        </div>
                    </div>
                    <h3 className="text-3xl font-bold mb-4 leading-tight">Jaga Kampung <br/><span className="text-blue-400">Bersama-sama</span></h3>
                    <p className="text-slate-300 leading-relaxed mb-8 text-lg border-l-4 border-blue-500 pl-4">"Tidak ada jadwal kaku. Kami mengundang Bapak/Saudara yang sedang senggang untuk mampir ke Poskamling."</p>
                    <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                        <div className="flex -space-x-4">
                            {[1,2,3].map((i) => (<img key={i} className="w-12 h-12 rounded-full border-4 border-slate-900 bg-slate-800" src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Warga${i}`} alt="Warga" />))}
                            <div className="w-12 h-12 rounded-full border-4 border-slate-900 bg-slate-700 flex items-center justify-center text-xs font-bold text-white">+15</div>
                        </div>
                        <span className="text-sm font-medium text-slate-400">Warga berpartisipasi</span>
                    </div>
                </div>
            </div>

            {/* KARTU 2: KONTAK DARURAT (Modern Glass Light) - KOSONG/CALL TO ACTION */}
            <div className="bg-white/70 backdrop-blur-md rounded-[2.5rem] border border-white/50 shadow-xl shadow-slate-200/50 p-1 flex flex-col h-full">
                <div className="p-8 pb-4">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-red-50 text-red-600 rounded-lg shadow-sm"><Siren size={24} /></div>
                        <h4 className="text-2xl font-bold text-slate-900">Kontak Darurat</h4>
                    </div>
                    <p className="text-slate-500 ml-11 font-medium">Hubungi langsung Kepala Dusun untuk keadaan mendesak.</p>
                </div>
                <div className="flex-1 p-2 flex flex-col items-center justify-center space-y-6">
                    <div className="p-6 bg-yellow-50 rounded-2xl border-2 border-dashed border-yellow-200 text-center">
                        <p className="text-slate-700 font-medium">Data Koordinator keamanan dan Ketua RT sedang dalam proses konfirmasi. Silakan hubungi Kadus langsung.</p>
                    </div>
                    
                    <a href={`https://wa.me/${contactInfo.phone}`} target="_blank" rel="noreferrer" className="flex items-center gap-3 px-6 py-3 bg-green-600 text-white rounded-full font-bold hover:bg-green-700 transition shadow-md">
                        <MessageCircle size={20} /> WhatsApp Kadus
                    </a>

                    <p className="text-xs text-slate-400 mt-2">
                        {/* Status placeholder */}
                        <UserCheck size={12} className="inline mr-1" /> Data akan segera diupdate.
                    </p>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}