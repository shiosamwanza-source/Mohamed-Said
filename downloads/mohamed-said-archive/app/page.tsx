"use client";

import { motion } from "framer-motion";
import { Database, Menu, Search } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const openCommandPalette = () => {
    const event = new KeyboardEvent('keydown', { key: 'k', ctrlKey: true });
    document.dispatchEvent(event);
  };

  return (
    <nav className="fixed top-0 z-50 w-full backdrop-blur-2xl bg-black/40 border-b border-yellow-500/10">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-6">

        {/* Logo */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.5 }}
          className="flex items-center space-x-3"
        >
          <Database className="w-8 h-8 text-yellow-400" />
          <div>
            <h1 className="font-serif text-xl font-bold text-white tracking-tight">Mohamed Said</h1>
            <p className="text-[10px] text-yellow-400 uppercase tracking-[0.3em] font-bold">Digital Archive</p>
          </div>
        </motion.div>

        {/* Menu ya Desktop na Kitufe cha Utafutaji */}
        <div className="hidden lg:flex items-center space-x-10 text-sm font-medium text-white/80">
          <Link href="/" className="hover:text-yellow-400 transition-colors">Home</Link>
          <Link href="/documents" className="hover:text-yellow-400 transition-colors">Documents</Link>
          <Link href="/ai" className="hover:text-yellow-400 transition-colors">AI Historian</Link>
          <Link href="/timeline" className="hover:text-yellow-400 transition-colors">Timeline</Link>

          {/* Kitufe kipya cha Command Palette (Ctrl+K) */}
          <button 
            onClick={openCommandPalette}
            className="flex items-center px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/50 text-sm hover:bg-white/10 transition-colors"
          >
            <Search className="w-4 h-4 mr-2" /> 
            Search...
            <span className="ml-4 text-xs bg-white/10 px-2 py-0.5 rounded">Ctrl K</span>
          </button>
        </div>

        {/* Kitufe cha Menu kwa Simu */}
        <button onClick={openCommandPalette} className="lg:hidden p-2 text-white" aria-label="Open Search">
          <Search className="w-6 h-6" />
        </button>
      </div>
    </nav>
  );
}

