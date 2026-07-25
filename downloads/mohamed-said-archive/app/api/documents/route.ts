"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Bot, Send, Loader2 } from "lucide-react";

export default function AIHistorian() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  async function askAI() {
    if (!question) return;
    setLoading(true);
    
    // Simulating AI API Call
    setTimeout(() => {
      setAnswer("Based on the historical archives, TANU was founded on July 7, 1954, by Julius Kambarage Nyerere with the aim of fighting for Tanganyika's independence.");
      setLoading(false);
    }, 1500);
  }

  return (
    <section className="py-32 px-6 max-w-5xl mx-auto">
      <div className="glass-panel rounded-[40px] p-10 md:p-16">
        <div className="flex items-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center mr-6">
            <Bot className="w-8 h-8 text-black" />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white">AI Historian</h2>
            <p className="text-white/50 text-sm">Powered by RAG & Historical Documents</p>
          </div>
        </div>

        <div className="flex gap-4 mb-8">
          <input 
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
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
            <p className="text-white/80 leading-relaxed">{answer}</p>
            <div className="mt-4 flex items-center text-xs text-yellow-400/60">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
              Sources: tanu_history_1954.pdf, sykes_papers.pdf
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
