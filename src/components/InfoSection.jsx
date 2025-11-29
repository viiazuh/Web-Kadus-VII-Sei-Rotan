import React, { useState } from 'react';
import { Bell, X, AlertTriangle } from 'lucide-react';

export default function InfoSection() {
  const [showAnnouncement, setShowAnnouncement] = useState(true);

  return (
    <section id="info" className="py-10 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- HEADER --- */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-900">Papan Informasi Warga</h2>
          <p className="mt-3 text-slate-500">Update penting seputar kondisi lingkungan Dusun VII.</p>
        </div>

        {/* --- PENGUMUMAN DARURAT (MERAH) --- */}
        {showAnnouncement ? (
          <div className="max-w-4xl mx-auto bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg shadow-sm relative animate-pulse">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-red-100 rounded-full text-red-600">
                <AlertTriangle size={24} />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-red-900">PERINGATAN: WASPADA BANJIR</h3>
                <p className="mt-1 text-red-800 text-sm leading-relaxed">
                  Dihimbau kepada seluruh masyarakat Dusun 7, dikarenakan kondisi banjir saat ini, mohon <strong>AWAS HEWAN MELATA</strong> (seperti ular/lipan) yang mungkin masuk ke dalam rumah akibat naiknya debit air.
                </p>
                <div className="mt-3 inline-flex items-center px-3 py-1 bg-red-600 text-white text-xs font-bold uppercase tracking-wide rounded-full shadow-sm">
                  Status: SIAGA 1
                </div>
              </div>
              <button onClick={() => setShowAnnouncement(false)} className="absolute top-4 right-4 text-red-400 hover:text-red-600">
                <X size={20} />
              </button>
            </div>
          </div>
        ) : (
           <div className="text-center p-8 border-2 border-dashed border-slate-200 rounded-xl">
             <p className="text-slate-400">Tidak ada pengumuman darurat saat ini.</p>
           </div>
        )}
      </div>
    </section>
  );
}