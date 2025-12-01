import React, { useState, useEffect } from 'react';
import { X, Shield, AlertTriangle, Siren, MessageCircle, Edit, Trash2, Send, Loader2, Lock } from 'lucide-react'; // Tambah Lock
import { db, serverTimestamp } from '../firebase'; 
import { collection, doc, getDocs, addDoc, updateDoc, deleteDoc, query, orderBy, onSnapshot } from 'firebase/firestore';

// Komponen Modal Edit
const EditAnnouncementModal = ({ announcement, onClose, onSave }) => {
  const [caption, setCaption] = useState(announcement.caption);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!caption.trim()) return;
    setIsSaving(true);
    await onSave(announcement.id, caption);
    setIsSaving(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-6">
        <h3 className="text-xl font-bold text-slate-900 mb-4 border-b pb-2">Edit Pengumuman Darurat</h3>
        <textarea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          rows="10"
          className="w-full p-3 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-slate-700 resize-none"
        ></textarea>
        <div className="flex justify-end gap-3 mt-4">
          <button onClick={onClose} className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition">Batal</button>
          <button onClick={handleSave} disabled={isSaving} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2">
            {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />} Simpan Perubahan
          </button>
        </div>
      </div>
    </div>
  );
};

export default function InfoSection({ isAdmin, onLoginRequired }) { // Menerima prop onLoginRequired
  const [announcement, setAnnouncement] = useState(null);
  const [showModal, setShowModal] = useState(false);
  
  // Data kontak darurat
  const contactInfo = {
    phone: "6282294959654", // Nomor Kadus
  };

  // 1. AMBIL DATA PENGUMUMAN DARI DATABASE
  useEffect(() => {
    // Ambil hanya pengumuman terbaru (atau yang pertama dari koleksi)
    const q = query(collection(db, "announcements"), orderBy("createdAt", "desc"));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        // Ambil pengumuman pertama (terbaru)
        const doc = snapshot.docs[0];
        setAnnouncement({ id: doc.id, ...doc.data() });
      } else {
        // Jika tidak ada, buat dummy pertama kali (jika admin)
        if (isAdmin) {
             console.log("No announcement found. Admin can create one.");
        }
        setAnnouncement(null);
      }
    }, (error) => {
      console.error("Error fetching announcement:", error);
    });

    return () => unsubscribe();
  }, [isAdmin]);

  // FUNGSI SIMPAN/EDIT
  const handleSaveAnnouncement = async (id, newCaption) => {
    if (!isAdmin) return;
    if (id) {
        // Update yang sudah ada
        await updateDoc(doc(db, "announcements", id), {
            caption: newCaption,
            updatedAt: serverTimestamp(),
        });
    } else {
        // Buat baru (jika tidak ada data sama sekali)
        await addDoc(collection(db, "announcements"), {
            caption: newCaption,
            status: "SIAGA DARURAT",
            createdAt: serverTimestamp(),
        });
    }
    setShowModal(false);
  };

  // FUNGSI HAPUS
  const handleDeleteAnnouncement = async (id) => {
    if (!isAdmin || !confirm("Anda yakin ingin menghapus pengumuman darurat ini?")) return;
    await deleteDoc(doc(db, "announcements", id));
    setAnnouncement(null);
  };
  
  // Teks Pengumuman Default jika belum ada di DB
  const defaultCaption = announcement?.caption || 
      "Assalamualaikum warahmatullahi wabarokatuh. Saat ini belum ada pengumuman darurat yang aktif. Silakan hubungi Kadus jika ada masalah mendesak.";
  const defaultStatus = announcement?.status || "AMAN";

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

        {/* Alert Banjir/Pengumuman (Sekarang dari Database) */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className={`relative overflow-hidden ${defaultStatus === 'SIAGA DARURAT' ? 'bg-red-50/90 border-red-200 shadow-red-200/50' : 'bg-green-50/90 border-green-200 shadow-green-200/50'} border rounded-3xl p-1 shadow-2xl backdrop-blur-md`}>
            <div className={`absolute left-0 top-0 bottom-0 w-2 ${defaultStatus === 'SIAGA DARURAT' ? 'bg-red-500' : 'bg-green-500'} rounded-l-3xl`}></div>
            
            <div className="rounded-[20px] p-6 sm:p-8 flex flex-col items-start gap-6">
              
              <div className="flex-1 w-full pt-1">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 ${defaultStatus === 'SIAGA DARURAT' ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-green-100 text-green-600'} rounded-2xl flex items-center justify-center shadow-inner`}>
                          {defaultStatus === 'SIAGA DARURAT' ? <AlertTriangle size={24} /> : <Shield size={24} />}
                        </div>
                        <h3 className="text-xl font-bold text-slate-900">
                          {defaultStatus === 'SIAGA DARURAT' ? 'PERINGATAN: KONDISI DARURAT' : 'STATUS DUSUN'}
                        </h3>
                        <span className={`px-3 py-1 ${defaultStatus === 'SIAGA DARURAT' ? 'bg-red-600' : 'bg-green-600'} text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-sm animate-pulse`}>
                           {defaultStatus}
                        </span>
                    </div>
                    
                    {/* TOMBOL EDIT/HAPUS (ADMIN ONLY) */}
                    <div className="flex gap-2">
                      {isAdmin ? (
                        <>
                           <button 
                              onClick={() => setShowModal(true)} 
                              className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-full transition-all"
                              title={announcement ? "Edit Pengumuman" : "Buat Pengumuman Baru"}
                            >
                              <Edit size={16} />
                           </button>
                           {announcement && (
                              <button 
                                onClick={() => handleDeleteAnnouncement(announcement.id)} 
                                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                                title="Hapus Pengumuman"
                              >
                                <Trash2 size={16} />
                              </button>
                           )}
                        </>
                      ) : (
                          <button
                            onClick={onLoginRequired} // Tombol yang memicu modal login
                            className="p-2 px-3 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-all text-sm font-medium flex items-center gap-1"
                            title="Akses Admin"
                          >
                            <Lock size={14} /> Admin
                          </button>
                      )}
                    </div>
                </div>
                
                {/* KONTEN PENGUMUMAN */}
                <div className="text-slate-700 leading-relaxed font-medium">
                    {defaultCaption.split('\n').map((line, index) => (
                      <p key={index} className="pb-1">{line}</p>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Kotak Kontak (Tidak Berubah) */}
        <div className="grid lg:grid-cols-2 gap-8">
            {/* KARTU 1: POSKAMLING */}
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

            {/* KARTU 2: KONTAK DARURAT (KOSONG/PLACEHOLDER) */}
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
                        Data akan segera diupdate.
                    </p>
                </div>
            </div>
        </div>
      </div>
      
      {/* RENDER MODAL EDIT JIKA DIBUKA */}
      {showModal && (
          <EditAnnouncementModal 
             announcement={announcement || { caption: "" }} // Kirim data kosong jika belum ada
             onClose={() => setShowModal(false)}
             onSave={handleSaveAnnouncement}
          />
      )}
    </section>
  );
}