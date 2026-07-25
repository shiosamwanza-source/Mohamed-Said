"use client";

import { useState, useEffect } from "react";
import { Command } from "cmdk";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Home, Bot, Cloud, Network, Clock } from "lucide-react";

export default function CommandPalette() {
  const [open, setOpen] = useState(false);

  // Listen for Ctrl+K / Cmd+K
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-md flex items-start justify-center pt-32 px-4"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.95, y: -20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: -20 }}
            transition={{ type: "spring", damping: 20 }}
            className="w-full max-w-2xl bg-zinc-900/90 border border-yellow-500/20 rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <Command loop>
              <div className="flex items-center border-b border-white/10 px-4">
                <Search className="w-5 h-5 text-yellow-400/50 mr-3" />
                <Command.Input
                  autoFocus
                  placeholder="Type a command or search documents..."
                  className="w-full bg-transparent py-4 text-white placeholder-white/30 outline-none"
                />
                <button onClick={() => setOpen(false)} className="text-xs text-white/40 bg-white/10 px-2 py-1 rounded">
                  ESC
                </button>
              </div>
              <Command.List className="max-h-[400px] overflow-y-auto p-2">
                <Command.Empty className="py-6 text-center text-white/40">No results found.</Command.Empty>

                <Command.Group heading="Navigation" className="text-yellow-400/70 text-xs uppercase px-2">
                  <Command.Item 
                    onSelect={() => { setOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="flex items-center px-3 py-3 rounded-lg text-white/80 hover:bg-yellow-500/10 cursor-pointer aria-selected:bg-yellow-500/20"
                  >
                    <Home className="w-4 h-4 mr-3 text-yellow-400" /> Go to Home
                  </Command.Item>
                  <Command.Item 
                    onSelect={() => { setOpen(false); document.getElementById('ai-historian')?.scrollIntoView({ behavior: 'smooth' }); }}
                    className="flex items-center px-3 py-3 rounded-lg text-white/80 hover:bg-yellow-500/10 cursor-pointer aria-selected:bg-yellow-500/20"
                  >
                    <Bot className="w-4 h-4 mr-3 text-yellow-400" /> Open AI Historian
                  </Command.Item>
                  <Command.Item 
                    onSelect={() => { setOpen(false); document.getElementById('aws-browser')?.scrollIntoView({ behavior: 'smooth' }); }}
                    className="flex items-center px-3 py-3 rounded-lg text-white/80 hover:bg-yellow-500/10 cursor-pointer aria-selected:bg-yellow-500/20"
                  >
                    <Cloud className="w-4 h-4 mr-3 text-yellow-400" /> Browse AWS S3 Archives
                  </Command.Item>
                  <Command.Item 
                    onSelect={() => { setOpen(false); document.getElementById('knowledge-graph')?.scrollIntoView({ behavior: 'smooth' }); }}
                    className="flex items-center px-3 py-3 rounded-lg text-white/80 hover:bg-yellow-500/10 cursor-pointer aria-selected:bg-yellow-500/20"
                  >
                    <Network className="w-4 h-4 mr-3 text-yellow-400" /> View Knowledge Graph
                  </Command.Item>
                  <Command.Item 
                    onSelect={() => { setOpen(false); document.getElementById('timeline')?.scrollIntoView({ behavior: 'smooth' }); }}
                    className="flex items-center px-3 py-3 rounded-lg text-white/80 hover:bg-yellow-500/10 cursor-pointer aria-selected:bg-yellow-500/20"
                  >
                    <Clock className="w-4 h-4 mr-3 text-yellow-400" /> View Timeline
                  </Command.Item>
                </Command.Group>
              </Command.List>
            </Command>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
