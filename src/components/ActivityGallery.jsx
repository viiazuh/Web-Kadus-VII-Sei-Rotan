import React, { useState, useEffect } from 'react';
import { MapPin, CameraOff, Image as ImageIcon, Send, Loader2, Trash2, Lock, Clock } from 'lucide-react';
import { db, serverTimestamp } from '../firebase'; 
import { collection, addDoc, onSnapshot, query, orderBy, deleteDoc, doc } from 'firebase/firestore';

export default function ActivityGallery({ fullPage, isAdmin }) {
  const [posts, setPosts] = useState([]);
  const [newCaption, setNewCaption] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  // --- BAGIAN INI YANG DIUBAH (Ambil dari .env) ---
  const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME; 
  const UPLOAD_PRESET = import.meta.env.VITE_UPLOAD_PRESET; 
  // ------------------------------------------------

  // 1. AMBIL DATA REALTIME
  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPosts(postsData);
    });
    return () => unsubscribe(); 
  }, []);

  // Handle Pilih Foto
  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5000000) { 
        alert("Ukuran foto terlalu besar! Maksimal 5MB.");
        return;
      }
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // 2. FUNGSI UPLOAD (CLOUDINARY + FIREBASE)
  const handlePost = async () => {
    if (!isAdmin || (!newCaption && !imageFile)) return;

    setIsUploading(true);

    try {
      let imageUrl = "";

      // A. Upload Foto ke Cloudinary
      if (imageFile) {
        const formData = new FormData();
        formData.append("file", imageFile);
        formData.append("upload_preset", UPLOAD_PRESET); 

        // Kirim ke Cloudinary
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
          { method: "POST", body: formData }
        );

        const data = await response.json();
        
        if (data.secure_url) {
            imageUrl = data.secure_url; 
        } else {
            console.error("Cloudinary Error:", data);
            throw new Error("Gagal upload gambar. Cek koneksi atau preset.");
        }
      }

      // B. Simpan ke Database
      await addDoc(collection(db, "posts"), {
        author: "H. Lilik Suheri, S.Pd.",
        caption: newCaption,
        location: "Dusun VII, Sei Rotan",
        image: imageUrl, 
        createdAt: serverTimestamp() 
      });

      // Reset Form
      setNewCaption("");
      setImageFile(null);
      setImagePreview(null);

    } catch (error) {
      console.error("Error posting:", error);
      alert("Terjadi kesalahan: " + error.message);
    } finally {
      setIsUploading(false);
    }
  };

  // 3. FUNGSI HAPUS POSTINGAN
  const handleDelete = async (id) => {
    if (!isAdmin || !confirm("Anda yakin ingin menghapus postingan ini?")) return;
    
    try {
        await deleteDoc(doc(db, "posts", id));
    } catch (error) {
        console.error("Error deleting:", error);
        alert("Gagal menghapus: " + error.message);
    }
  }

  // Format Waktu
  const formatTime = (timestamp) => {
    if (!timestamp) return "Baru saja";
    const date = timestamp.toDate();
    return date.toLocaleDateString("id-ID", { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <section id="gallery" className={`py-20 bg-transparent ${fullPage ? 'pt-28 min-h-screen' : ''}`}>
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-slate-900">Dokumentasi Kegiatan</h2>
          <p className="mt-3 text-slate-500">Jurnal kegiatan dan aktivitas dusun sehari-hari.</p>
        </div>

        {/* --- FORM UPLOAD (Hanya Muncul Jika Admin) --- */}
        {isAdmin && (
          <div className="bg-white p-4 rounded-xl shadow-xl border border-blue-200 mb-8 sticky top-20 z-30 ring-4 ring-blue-500/10 transition-all">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                 <img src="/maslilik.jpg" alt="Admin" className="w-10 h-10 rounded-full object-cover border border-slate-200" />
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded flex items-center gap-1 uppercase tracking-wider">
                        <Lock size={10} /> Mode Admin
                    </span>
                </div>

                <textarea
                  value={newCaption}
                  onChange={(e) => setNewCaption(e.target.value)}
                  placeholder="Tulis caption kegiatan di sini..."
                  disabled={isUploading}
                  className="w-full bg-slate-50 rounded-lg p-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-200 resize-none h-24 disabled:bg-slate-100 transition-all placeholder:text-slate-400"
                ></textarea>
                
                {imagePreview && (
                  <div className="mt-3 relative group">
                    <img src={imagePreview} alt="Preview" className="w-full h-48 object-cover rounded-lg border border-slate-200 shadow-sm" />
                    <button 
                      onClick={() => { setImageFile(null); setImagePreview(null); }}
                      className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1.5 hover:bg-red-500 transition-colors backdrop-blur-sm"
                      title="Hapus Foto"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                )}

                <div className="flex justify-between items-center mt-3 pt-3 border-t border-slate-100">
                  <label className={`flex items-center gap-2 px-3 py-2 text-blue-600 rounded-lg cursor-pointer hover:bg-blue-50 transition text-sm font-bold ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                    <ImageIcon size={18} />
                    <span>{imageFile ? 'Ganti Foto' : 'Tambah Foto'}</span>
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageSelect} disabled={isUploading} />
                  </label>
                  
                  <button 
                    onClick={handlePost}
                    disabled={(!newCaption && !imageFile) || isUploading}
                    className={`flex items-center gap-2 px-6 py-2 rounded-full font-bold text-white transition-all shadow-md transform active:scale-95 ${(!newCaption && !imageFile) || isUploading ? 'bg-slate-300 cursor-not-allowed shadow-none' : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg'}`}
                  >
                    {isUploading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />} 
                    {isUploading ? 'Mengupload...' : 'Posting'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- DAFTAR POSTINGAN --- */}
        <div className="space-y-8">
          {posts.length === 0 ? (
             <div className="text-center py-16 bg-white/60 backdrop-blur-sm rounded-3xl border-2 border-dashed border-slate-300 shadow-sm">
                <div className="w-20 h-20 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                    <CameraOff size={32} />
                </div>
                <h3 className="text-lg font-bold text-slate-700">Belum Ada Dokumentasi</h3>
                <p className="text-slate-500 mt-2 text-sm">
                    {isAdmin ? 'Silakan posting kegiatan pertama Anda di atas.' : 'Kegiatan dusun akan segera diupdate.'}
                </p>
             </div>
          ) : (
            posts.map((post) => (
                <div key={post.id} className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                  <div className="p-4 flex justify-between items-start bg-gradient-to-b from-slate-50/50 to-transparent">
                    <div className="flex gap-3">
                      <div className="relative">
                        <img src="/maslilik.jpg" alt={post.author} className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md" />
                        <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white p-0.5 rounded-full border-2 border-white" title="Verified Admin">
                            <Lock size={8} />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm md:text-base">{post.author}</h4>
                        <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                          <span className="flex items-center gap-1 bg-slate-100 px-1.5 py-0.5 rounded"><Clock size={10} /> {formatTime(post.createdAt)}</span>
                          <span className="text-slate-300">•</span>
                          <span className="flex items-center gap-0.5 text-blue-600 font-medium"><MapPin size={10} /> {post.location || "Dusun VII"}</span>
                        </div>
                      </div>
                    </div>
                    {isAdmin && (
                        <button 
                        onClick={() => handleDelete(post.id)}
                        className="group flex items-center justify-center w-8 h-8 rounded-full text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all"
                        title="Hapus Postingan Ini"
                        >
                            <Trash2 size={18} className="group-hover:scale-110 transition-transform" />
                        </button>
                    )}
                  </div>

                  {post.caption && (
                    <div className="px-5 pb-3 pt-1">
                        <p className="text-slate-700 whitespace-pre-line leading-relaxed text-sm md:text-[15px] font-normal">
                            {post.caption}
                        </p>
                    </div>
                  )}

                  {post.image && (
                    <div className="w-full bg-slate-100 border-t border-slate-100">
                      <img 
                        src={post.image} 
                        alt="Dokumentasi" 
                        loading="lazy" 
                        className="w-full h-auto max-h-[500px] object-cover hover:brightness-105 transition-all duration-500" 
                      />
                    </div>
                  )}
                  
                  <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
                      <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
                         <span className="w-2 h-2 bg-green-500 rounded-full"></span> Resmi Dusun VII
                      </span>
                  </div>
                </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}