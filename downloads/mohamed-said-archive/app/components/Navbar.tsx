"use client";

import { motion } from "framer-motion";
import { Database, Menu } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 z-50 w-full backdrop-blur-2xl bg-black/40 border-b border-yellow-500/10">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-6">
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

        <div className="hidden lg:flex items-center space-x-10 text-sm font-medium text-white/80">
          <Link href="/" className="hover:text-yellow-400 transition-colors">Home</Link>
          <Link href="/documents" className="hover:text-yellow-400 transition-colors">Documents</Link>
          <Link href="/ai" className="hover:text-yellow-400 transition-colors">AI Historian</Link>
          <Link href="/timeline" className="hover:text-yellow-400 transition-colors">Timeline</Link>
        </div>

        <button className="lg:hidden p-2 text-white">
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </nav>
  );
}

