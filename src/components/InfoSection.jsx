import React, { useState, useEffect } from 'react';
import { Shield, Bell, MessageCircle, Edit, Send, Loader2, Lock, Megaphone, Trash2 } from 'lucide-react'; // Tambah Trash2
import { db, serverTimestamp } from '../firebase'; 
import { collection, doc, addDoc, updateDoc, deleteDoc, query, orderBy, onSnapshot } from 'firebase/firestore'; // Tambah deleteDoc

// --- MODAL EDIT ---
const EditAnnouncementModal = ({ announcement, onClose, onSave }) => {
  const [caption, setCaption] = useState(announcement.caption || "");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!caption.trim()) return;
    setIsSaving(true);
    await onSave(announcement.id, caption);
    setIsSaving(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-6">
        <h3 className="text-xl font-bold text-slate-900 mb-4 border-b pb-2">Edit Pengumuman</h3>
        <div className="mb-4">
            <label className="block text-sm font-bold text-slate-700 mb-2">Isi Pesan:</label>
            <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            rows="6"
            placeholder="Tulis pengumuman untuk warga di sini..."
            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-slate-700 resize-none"
            ></textarea>
        </div>
        <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
          <button onClick={onClose} className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition font-medium">Batal</button>
          <button onClick={handleSave} disabled={isSaving} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2 font-bold shadow-lg shadow-blue-500/30">
            {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />} 
            Update Papan
          </button>
        </div>
      </div>
    </div>
  );
};

// --- KOMPONEN UTAMA ---
export default function InfoSection({ isAdmin, onLoginRequired }) { 
  const [announcement, setAnnouncement] = useState(null);
  const [showModal, setShowModal] = useState(false);
   
  const contactInfo = {
    phone: "6282294959654", 
  };

  // 1. AMBIL DATA
  useEffect(() => {
    const q = query(collection(db, "announcements"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        const doc = snapshot.docs[0];
        setAnnouncement({ id: doc.id, ...doc.data() });
      } else {
        setAnnouncement(null);
      }
    }, (error) => {
      console.error("Error fetching:", error);
    });
    return () => unsubscribe();
  }, []);

  // 2. FUNGSI SIMPAN
  const handleSaveAnnouncement = async (id, newCaption) => {
    if (!isAdmin) return;
    try {
        if (id) {
            await updateDoc(doc(db, "announcements", id), {
                caption: newCaption,
                updatedAt: serverTimestamp(),
            });
        } else {
            await addDoc(collection(db, "announcements"), {
                caption: newCaption,
                createdAt: serverTimestamp(),
            });
        }
        setShowModal(false);
    } catch (error) {
        alert("Gagal menyimpan: " + error.message);
    }
  };

  // 3. FUNGSI HAPUS (INI YANG BARU)
  const handleDelete = async () => {
    if (!isAdmin || !announcement) return; // Cek admin & cek ada data gak
    
    if (confirm("Apakah Anda yakin ingin MENGHAPUS pengumuman ini? Data akan hilang dari database.")) {
        try {
            // Hapus dokumen dari Firebase biar bersih
            await deleteDoc(doc(db, "announcements", announcement.id));
            setAnnouncement(null); // Kosongkan tampilan
        } catch (error) {
            alert("Gagal menghapus: " + error.message);
        }
    }
  };

  // Default Text (Muncul kalau database kosong/dihapus)
  const currentCaption = announcement?.caption || 
       "Belum ada pengumuman resmi dari Dusun. Silakan cek kembali nanti untuk informasi terbaru.";

  return (
    <section id="info" className="py-24 relative overflow-hidden bg-white/30 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50/80 border border-blue-100 text-blue-600 text-sm font-bold mb-4 shadow-sm backdrop-blur-sm">
            <Shield size={16} />
            <span>Pusat Informasi</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
            Papan Informasi Warga
          </h2>
        </div>

        {/* --- PAPAN PENGUMUMAN --- */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="relative overflow-hidden bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50">
            <div className="h-2 w-full bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600"></div>

            <div className="p-6 md:p-8">
                <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                            <Megaphone size={24} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-slate-900">PENGUMUMAN DUSUN</h3>
                            <p className="text-sm text-slate-500">Info resmi dari Kepala Dusun</p>
                        </div>
                    </div>

                    {/* AREA TOMBOL ADMIN */}
                    <div className="flex gap-2">
                        {isAdmin ? (
                            <>
                                {/* Tombol Edit */}
                                <button 
                                    onClick={() => setShowModal(true)} 
                                    className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all border border-transparent hover:border-blue-100 flex items-center gap-2"
                                    title="Edit Pengumuman"
                                >
                                    <span className="text-xs font-bold hidden md:block">Edit</span>
                                    <Edit size={18} />
                                </button>
                                
                                {/* Tombol Hapus (Hanya muncul kalau ada pengumuman di DB) */}
                                {announcement && (
                                    <button 
                                        onClick={handleDelete} 
                                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all border border-transparent hover:border-red-100"
                                        title="Hapus Pengumuman (Bersihkan Database)"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                )}
                            </>
                        ) : (
                            <button
                                onClick={onLoginRequired}
                                className="p-2 bg-slate-50 text-slate-400 rounded-lg hover:text-blue-600 transition-all"
                                title="Admin Login"
                            >
                                <Lock size={16} />
                            </button>
                        )}
                    </div>
                </div>

                <div className="bg-slate-50/50 rounded-2xl p-6 border border-slate-100">
                    <div className="text-slate-700 leading-relaxed font-medium text-lg whitespace-pre-line">
                        {currentCaption}
                    </div>
                </div>
            </div>
          </div>
        </div>

        {/* --- GRID POSKAMLING & KONTAK --- */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-slate-900/95 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-10 text-white relative overflow-hidden shadow-2xl group border border-slate-800">
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

            <div className="bg-white/70 backdrop-blur-md rounded-[2.5rem] border border-white/50 shadow-xl shadow-slate-200/50 p-1 flex flex-col h-full">
                <div className="p-8 pb-4">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg shadow-sm"><Bell size={24} /></div>
                        <h4 className="text-2xl font-bold text-slate-900">Kontak Dusun</h4>
                    </div>
                    <p className="text-slate-500 ml-11 font-medium">Hubungi kami untuk urusan administrasi & darurat.</p>
                </div>
                <div className="flex-1 p-2 flex flex-col items-center justify-center space-y-6">
                    <a href={`https://wa.me/${contactInfo.phone}`} target="_blank" rel="noreferrer" className="flex items-center gap-3 px-8 py-4 bg-green-600 text-white rounded-full font-bold hover:bg-green-700 transition shadow-lg hover:shadow-green-500/30 w-full max-w-xs justify-center transform hover:scale-105 active:scale-95 duration-200">
                        <MessageCircle size={22} /> 
                        <span>WhatsApp Kadus</span>
                    </a>
                    <p className="text-xs text-slate-400 text-center px-8">Tombol ini akan langsung membuka chat WhatsApp dengan Kepala Dusun.</p>
                </div>
            </div>
        </div>
      </div>
      
      {showModal && (
          <EditAnnouncementModal 
             announcement={announcement || { caption: "" }} 
             onClose={() => setShowModal(false)}
             onSave={handleSaveAnnouncement}
          />
      )}
    </section>
  );
}
