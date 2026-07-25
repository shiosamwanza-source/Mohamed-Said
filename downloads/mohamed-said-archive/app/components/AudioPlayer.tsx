"use client";

import { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import { motion } from "framer-motion";
import { Play, Pause, Loader2 } from "lucide-react";

export default function AudioPlayer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (containerRef.current && !wavesurferRef.current) {
      wavesurferRef.current = WaveSurfer.create({
        container: containerRef.current,
        waveColor: "rgba(212, 175, 55, 0.3)",
        progressColor: "#D4AF37",
        cursorColor: "#F4C430",
        barWidth: 3,
        barRadius: 3,
        barGap: 2,
        height: 120,
        url: "https://wavesurfer.xyz/wavesurfer-code/examples/audio/audio.wav", // Demo audio
      });

      wavesurferRef.current.on("ready", () => setLoading(false));
      wavesurferRef.current.on("finish", () => setIsPlaying(false));
    }

    return () => {
      wavesurferRef.current?.destroy();
      wavesurferRef.current = null;
    };
  }, []);

  const togglePlay = () => {
    if (wavesurferRef.current) {
      wavesurferRef.current.playPause();
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section className="py-32 px-6 max-w-5xl mx-auto">
      <div className="text-center mb-16">
        <span className="text-yellow-400 uppercase tracking-[0.3em] text-xs font-bold block mb-4">Oral History Archives</span>
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-white">Audio Recordings</h2>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-panel rounded-[40px] p-10"
      >
        <div className="flex items-center mb-8">
          <button 
            onClick={togglePlay}
            disabled={loading}
            className="w-16 h-16 rounded-full bg-yellow-500 text-black flex items-center justify-center mr-6 hover:bg-yellow-400 transition-colors disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
          </button>
          <div>
            <h3 className="text-xl font-serif font-bold text-white">Interview with Mzee Kondo (1954)</h3>
            <p className="text-white/40 text-sm">AI Transcribed • Dar es Salaam</p>
          </div>
        </div>

        <div className="bg-black/40 rounded-2xl p-4 border border-white/5">
          <div ref={containerRef} />
        </div>
      </motion.div>
    </section>
  );
}
