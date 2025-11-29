import React from 'react';
import { MessageCircle, Phone, MapPin } from 'lucide-react';

export default function ContactSection({ personalInfo }) {
  return (
    <section className="py-20 bg-slate-900 text-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">Siap Melayani & Mendengar</h2>
        <p className="text-slate-400 mb-10 max-w-xl mx-auto">
          Jangan ragu untuk menghubungi saya jika ada hal mendesak, saran, atau sekadar ingin bersilaturahmi.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <a 
             href={`https://wa.me/${personalInfo.phone}`}
             target="_blank"
             rel="noreferrer"
             className="flex items-center justify-center gap-3 px-8 py-4 bg-green-600 rounded-xl font-bold text-lg hover:bg-green-500 transition w-full sm:w-auto"
          >
            <MessageCircle size={24} /> Chat WhatsApp
          </a>
          
          <a 
             href={`tel:+${personalInfo.phone}`}
             className="flex items-center justify-center gap-3 px-8 py-4 bg-slate-800 border border-slate-700 rounded-xl font-bold text-lg hover:bg-slate-700 transition w-full sm:w-auto"
          >
            <Phone size={24} /> Panggilan Telepon
          </a>
        </div>

        <div className="mt-12 flex items-center justify-center gap-2 text-slate-500 text-sm">
          <MapPin size={16} />
          <span>{personalInfo.address}</span>
        </div>
      </div>
    </section>
  );
}