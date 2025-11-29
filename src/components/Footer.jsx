import React from 'react';

export default function Footer({ personalInfo }) {
  return (
    <footer className="bg-slate-950 text-slate-400 py-8 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p>&copy; {new Date().getFullYear()} {personalInfo.name}. All rights reserved.</p>
      </div>
    </footer>
  );
}