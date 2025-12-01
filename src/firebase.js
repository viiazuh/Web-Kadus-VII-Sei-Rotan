// Import fungsi utama Firebase
import { initializeApp } from "firebase/app";
// Import layanan yang DIBUTUHKAN oleh fitur Admin kamu
import { getFirestore, serverTimestamp } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Konfigurasi Project Kamu (Ini data asli dari yang kamu kirim tadi)
const firebaseConfig = {
  apiKey: "AIzaSyAWmVdaEOpRt13J5_K2_MddwRaD3FBFp7k",
  authDomain: "web-dusun-vii.firebaseapp.com",
  projectId: "web-dusun-vii",
  storageBucket: "web-dusun-vii.firebasestorage.app", // Perhatikan ini kadang beda dikit, tapi kita pakai default dulu
  messagingSenderId: "449301658416",
  appId: "1:449301658416:web:a301586d3be1302a12e6f5",
  measurementId: "G-FBZKEXY9X9"
};

// 1. Mulai Aplikasi Firebase
const app = initializeApp(firebaseConfig);

// 2. Aktifkan Database & Storage
const db = getFirestore(app);
const storage = getStorage(app);

// 3. Export agar bisa dipakai di InfoSection.jsx dan ActivityGallery.jsx
export { db, storage, serverTimestamp };