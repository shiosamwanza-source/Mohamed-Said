"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Bot, Send, Loader2, FileText, ShieldCheck } from "lucide-react";

type Citation = { doc: string; page: number; paragraph: number };

export default function AIHistorian() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [sources, setSources] = useState<Citation[]>([]);
  const [confidence, setConfidence] = useState(0);
  const [loading, setLoading] = useState(false);

  async function askAI() {
    if (!question) return;
    setLoading(true);
    setAnswer("");
    setSources([]);
    
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      const data = await res.json();
      
      setAnswer(data.answer);
      setSources(data.sources);
      setConfidence(data.confidence);
    } catch (error) {
      setAnswer("Samahani, kuna hitilafu kwenye seva ya AI.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="py-32 px-6 max-w-5xl mx-auto">
      <div className="glass-panel rounded-[40px] p-10 md:p-16">
        <div className="flex items-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center mr-6 shadow-[0_0_20px_rgba(212,175,55,0.4)]">
            <Bot className="w-8 h-8 text-black" />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white">AI Historian (RAG)</h2>
            <p className="text-white/50 text-sm">Powered by Retrieval-Augmented Generation</p>
          </div>
        </div>

        <div className="flex gap-4 mb-8">
          <input 
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && askAI()}
            placeholder="Ask about TANU, Uhuru, or Sykes family..."
            className="flex-1 px-6 py-4 rounded-xl bg-black/40 border border-yellow-500/20 text-white placeholder-white/30 focus:outline-none focus:border-yellow-500/60 transition-colors"
          />
          <button 
            onClick={askAI}
            disabled={loading}
            className="px-8 py-4 rounded-xl bg-yellow-500 text-black font-bold flex items-center hover:bg-yellow-400 transition-colors disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
          </button>
        </div>

        {answer && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-black/40 border-l-4 border-yellow-500 p-6 rounded-r-xl"
          >
            <div className="flex justify-between items-start mb-4">
              <p className="text-white/80 leading-relaxed flex-1">{answer}</p>
              <div className="flex items-center ml-4 text-xs text-green-400 bg-green-400/10 px-3 py-1 rounded-full border border-green-400/20">
                <ShieldCheck className="w-3 h-3 mr-1" />
                {confidence}% Match
              </div>
            </div>

            {sources.length > 0 && (
              <div className="mt-6 pt-4 border-t border-white/10">
                <h4 className="text-xs uppercase tracking-widest text-yellow-400 mb-3 font-bold">Sources & Citations</h4>
                <div className="flex flex-wrap gap-3">
                  {sources.map((src, i) => (
                    <div key={i} className="flex items-center bg-zinc-800/50 border border-white/5 px-3 py-2 rounded-lg text-xs text-white/70 hover:border-yellow-500/30 cursor-pointer transition-colors">
                      <FileText className="w-4 h-4 text-yellow-400 mr-2" />
                      <span className="font-mono">{src.doc}</span>
                      <span className="mx-2 text-white/20">|</span>
                      <span>Pg. {src.page}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
}
