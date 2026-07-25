"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, FileText, Filter } from "lucide-react";

export default function ArchiveSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Mock Search Function
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;
    setLoading(true);
    
    setTimeout(() => {
      setResults([
        { id: 1, title: "TANU Constitution 1954", type: "PDF", snippet: "...a party founded by Julius K. Nyerere to fight for independence..." },
        { id: 2, title: "Letter from Abdulwahid Sykes", type: "Document", snippet: "...we must unite the people of Dar es Salaam under one association..." },
      ]);
      setLoading(false);
    }, 1200);
  };

  return (
    <section className="py-32 px-6 max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <span className="text-yellow-400 uppercase tracking-[0.3em] text-xs font-bold block mb-4">Semantic Search</span>
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-white">Explore the Archives</h2>
        <p className="text-white/50 mt-4">Search through thousands of documents, letters, and transcripts.</p>
      </div>

      <form onSubmit={handleSearch} className="relative max-w-3xl mx-auto mb-12">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search historical figures, events, dates..."
          className="w-full pl-14 pr-32 py-5 rounded-full bg-black/40 border border-yellow-500/20 text-white placeholder-white/30 focus:outline-none focus:border-yellow-500/60 transition-colors"
        />
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-yellow-400/50" />
        <button 
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-3 rounded-full bg-yellow-500 text-black font-bold hover:bg-yellow-400 transition-colors"
        >
          Search
        </button>
      </form>

      <div className="grid gap-4">
        {loading ? (
          <div className="text-center text-white/50">Searching historical database...</div>
        ) : (
          results.map((res, i) => (
            <motion.div
              key={res.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-panel rounded-2xl p-6 flex items-start hover:border-yellow-500/40 transition-colors cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center border border-yellow-500/20 mr-6">
                <FileText className="w-6 h-6 text-yellow-400" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-serif font-bold text-white">{res.title}</h3>
                  <span className="text-xs text-yellow-400 bg-yellow-400/10 px-2 py-1 rounded border border-yellow-400/20">{res.type}</span>
                </div>
                <p className="text-white/60 text-sm">{res.snippet}</p>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </section>
  );
}
