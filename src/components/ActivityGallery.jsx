import React, { useState, useEffect } from 'react';
import { MapPin, CameraOff, Image as ImageIcon, Send, Loader2, Trash2, Lock, Clock, X } from 'lucide-react';
import { db, serverTimestamp } from '../firebase'; 
import { collection, addDoc, onSnapshot, query, orderBy, deleteDoc, doc } from 'firebase/firestore';

// --- KOMPONEN BARU: SLIDER GESER (SCROLL SNAP) ---
const ImageSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) return null;

  // Kalau cuma 1 gambar, tampil biasa
  if (images.length === 1) {
    return (
      <img 
        src={images[0]} 
        alt="Dokumentasi" 
        className="w-full h-auto max-h-[500px] object-cover" 
      />
    );
  }

  // Fungsi untuk mendeteksi kita lagi di slide nomor berapa saat digeser
  const handleScroll = (e) => {
    const scrollLeft = e.target.scrollLeft;
    const width = e.target.offsetWidth;
    // Hitung index berdasarkan posisi scroll
    const index = Math.round(scrollLeft / width);
    setCurrentIndex(index);
  };

  return (
    <div className="relative w-full h-[300px] md:h-[500px] bg-slate-900 group">
      
      {/* CONTAINER GESER (Scroll Snap) */}
      <div 
        className="w-full h-full flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
        onScroll={handleScroll}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} // Sembunyikan scrollbar di Firefox/IE
      >
        {/* Loop Gambar */}
        {images.map((img, idx) => (
          <img 
            key={idx}
            src={img}
            alt={`Slide ${idx}`}
            className="w-full h-full object-cover flex-shrink-0 snap-center" // snap-center bikin gambar pas di tengah pas berhenti geser
          />
        ))}
      </div>

      {/* INDIKATOR TITIK (DOTS) */}
      <div className="absolute bottom-4 w-full flex justify-center py-2 gap-2 z-10">
        {images.map((_, slideIndex) => (
          <div
            key={slideIndex}
            className={`w-2 h-2 rounded-full transition-all duration-300 shadow-sm ${
              currentIndex === slideIndex ? 'bg-white scale-125 w-4' : 'bg-white/50'
            }`}
          ></div>
        ))}
      </div>
      
      {/* Badge Nomor Slide (Pojok Kanan Atas) */}
      <div className="absolute top-4 right-4 bg-black/60 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm border border-white/10">
        {currentIndex + 1} / {images.length}
      </div>

      {/* CSS Tambahan buat sembunyikan Scrollbar Chrome/Safari */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
      `}</style>
    </div>
  );
};

// --- BAGIAN UTAMA (SAMA SEPERTI SEBELUMNYA) ---
export default function ActivityGallery({ fullPage, isAdmin }) {
  const [posts, setPosts] = useState([]);
  const [newCaption, setNewCaption] = useState("");
  const [imageFiles, setImageFiles] = useState([]); 
  const [imagePreviews, setImagePreviews] = useState([]); 
  const [isUploading, setIsUploading] = useState(false);

  // CONFIG .ENV
  const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME; 
  const UPLOAD_PRESET = import.meta.env.VITE_UPLOAD_PRESET; 

  // 1. AMBIL DATA
  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setPosts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe(); 
  }, []);

  // Handle Pilih Banyak Foto
  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const validFiles = files.filter(file => file.size <= 5000000);
      if (validFiles.length !== files.length) alert("File > 5MB dilewati.");
      setImageFiles(validFiles);
      setImagePreviews(validFiles.map(file => URL.createObjectURL(file)));
    }
  };

  const removeImage = (index) => {
    const newFiles = [...imageFiles];
    const newPreviews = [...imagePreviews];
    newFiles.splice(index, 1);
    newPreviews.splice(index, 1);
    setImageFiles(newFiles);
    setImagePreviews(newPreviews);
  };

  // 2. UPLOAD MULTIPLE
  const handlePost = async () => {
    if (!isAdmin || (!newCaption && imageFiles.length === 0)) return;
    setIsUploading(true);

    try {
      let uploadedImageUrls = [];
      if (imageFiles.length > 0) {
        const uploadPromises = imageFiles.map(async (file) => {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", UPLOAD_PRESET);
            const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, { method: "POST", body: formData });
            const data = await res.json();
            return data.secure_url;
        });
        uploadedImageUrls = await Promise.all(uploadPromises);
      }

      await addDoc(collection(db, "posts"), {
        author: "H. Lilik Suheri, S.Pd.",
        caption: newCaption,
        location: "Dusun VII, Sei Rotan",
        images: uploadedImageUrls, 
        createdAt: serverTimestamp() 
      });

      setNewCaption("");
      setImageFiles([]);
      setImagePreviews([]);
    } catch (error) {
      alert("Error: " + error.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (isAdmin && confirm("Hapus postingan ini?")) {
        try { await deleteDoc(doc(db, "posts", id)); } 
        catch (e) { alert("Gagal hapus: " + e.message); }
    }
  }

  const formatTime = (ts) => {
    if (!ts) return "Baru saja";
    return ts.toDate().toLocaleDateString("id-ID", { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <section id="gallery" className={`py-20 bg-transparent ${fullPage ? 'pt-28 min-h-screen' : ''}`}>
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-slate-900">Dokumentasi Kegiatan</h2>
          <p className="mt-3 text-slate-500">Jurnal kegiatan dan aktivitas dusun sehari-hari.</p>
        </div>

        {/* FORM UPLOAD */}
        {isAdmin && (
          <div className="bg-white p-4 rounded-xl shadow-xl border border-blue-200 mb-8 sticky top-20 z-30 ring-4 ring-blue-500/10">
            <div className="flex gap-4">
              <img src="/maslilik.jpg" alt="Admin" className="w-10 h-10 rounded-full object-cover border border-slate-200 flex-shrink-0" />
              <div className="flex-grow">
                <div className="mb-2"><span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded flex items-center gap-1 w-fit"><Lock size={10} /> MODE ADMIN</span></div>
                <textarea
                  value={newCaption} onChange={(e) => setNewCaption(e.target.value)}
                  placeholder="Tulis caption kegiatan..." disabled={isUploading}
                  className="w-full bg-slate-50 rounded-lg p-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-200 resize-none h-24"
                ></textarea>
                
                {imagePreviews.length > 0 && (
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    {imagePreviews.map((url, idx) => (
                        <div key={idx} className="relative group aspect-square">
                            <img src={url} className="w-full h-full object-cover rounded-lg border border-slate-200" />
                            <button onClick={() => removeImage(idx)} className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"><X size={12} /></button>
                        </div>
                    ))}
                  </div>
                )}

                <div className="flex justify-between items-center mt-3 pt-3 border-t border-slate-100">
                  <label className={`flex items-center gap-2 px-3 py-2 text-blue-600 rounded-lg cursor-pointer hover:bg-blue-50 font-bold text-sm ${isUploading ? 'opacity-50' : ''}`}>
                    <ImageIcon size={18} />
                    <span>{imageFiles.length > 0 ? `+ ${imageFiles.length} Foto` : 'Tambah Foto'}</span>
                    <input type="file" accept="image/*" multiple className="hidden" onChange={handleImageSelect} disabled={isUploading} />
                  </label>
                  <button onClick={handlePost} disabled={(!newCaption && imageFiles.length === 0) || isUploading} className="flex items-center gap-2 px-6 py-2 rounded-full font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 transition-all shadow-md">
                    {isUploading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />} 
                    {isUploading ? '...' : 'Posting'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* LIST POSTINGAN */}
        <div className="space-y-8">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
                <div className="p-4 flex justify-between items-start bg-gradient-to-b from-slate-50/50 to-transparent">
                <div className="flex gap-3">
                    <div className="relative">
                    <img src="/maslilik.jpg" className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md" />
                    <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white p-0.5 rounded-full border-2 border-white"><Lock size={8} /></div>
                    </div>
                    <div>
                    <h4 className="font-bold text-slate-900 text-sm md:text-base">{post.author}</h4>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                        <span className="flex items-center gap-1 bg-slate-100 px-1.5 py-0.5 rounded"><Clock size={10} /> {formatTime(post.createdAt)}</span>
                        <span className="flex items-center gap-0.5 text-blue-600 font-medium"><MapPin size={10} /> {post.location || "Dusun VII"}</span>
                    </div>
                    </div>
                </div>
                {isAdmin && <button onClick={() => handleDelete(post.id)} className="text-slate-300 hover:text-red-500 p-2"><Trash2 size={18} /></button>}
                </div>

                {post.caption && <div className="px-5 pb-3"><p className="text-slate-700 whitespace-pre-line text-sm md:text-[15px]">{post.caption}</p></div>}

                <div className="w-full bg-slate-100 border-t border-slate-100">
                {post.images?.length > 0 ? <ImageSlider images={post.images} /> : post.image && <img src={post.image} className="w-full h-auto max-h-[500px] object-cover" />}
                </div>
                
                <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
                    <span className="text-xs font-semibold text-slate-400 flex items-center gap-1"><span className="w-2 h-2 bg-green-500 rounded-full"></span> Resmi Dusun VII</span>
                </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}