import { initializeApp } from "firebase/app";
import { getFirestore, serverTimestamp } from "firebase/firestore";
// PENTING: Kita butuh Auth untuk Login Admin
import { getAuth } from "firebase/auth"; 

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID
};

// 1. Mulai Aplikasi
const app = initializeApp(firebaseConfig);

// 2. Aktifkan Layanan
const db = getFirestore(app);
const auth = getAuth(app); // Untuk Login

// 3. Export (db untuk data, auth untuk login, serverTimestamp untuk waktu)
export { db, auth, serverTimestamp };