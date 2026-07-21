import React from 'react';
import { Navbar } from './components/layout/Navbar';

export function App() {
  return (
    <div className="min-h-screen bg-[#050C16] text-[#FAF8F2]">
      {/* Navbar Component */}
      <Navbar />

      {/* Hero Section ya Muda */}
      <section id="hero" className="h-screen flex items-center justify-center text-center px-4">
        <div>
          <h1 className="text-4xl md:text-6xl font-serif font-black mb-4">
            Maktaba ya Kihistoria ya <span className="holo-text">Mohamed Said</span>
          </h1>
          <p className="text-[#FAF8F2]/60 text-sm max-w-xl mx-auto">
            React + TypeScript na Tailwind vimeshaunganishwa kikamilifu kwenye Termux. 
          </p>
        </div>
      </section>
    </div>
  );
}

export default App;
