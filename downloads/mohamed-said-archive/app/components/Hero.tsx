"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Cloud, FileText, Loader2 } from "lucide-react";

type S3File = {
  Key: string;
  Size: number;
  LastModified: string;
};

export default function AwsBrowser() {
  const [files, setFiles] = useState<S3File[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/files")
      .then((res) => res.json())
      .then((data) => {
        setFiles(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section className="py-32 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <span className="text-yellow-400 uppercase tracking-[0.3em] text-xs font-bold block mb-4">AWS Cloud S3 Gateway</span>
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-white">Historical Document Vault</h2>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="w-12 h-12 text-yellow-400 animate-spin" />
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {files.map((file, index) => (
            <motion.div 
              key={file.Key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="glass-panel rounded-2xl p-6 flex flex-col"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center border border-yellow-500/20">
                  <FileText className="w-6 h-6 text-yellow-400" />
                </div>
                <Cloud className="w-5 h-5 text-white/20" />
              </div>
              
              <h3 className="font-bold text-white text-lg mb-2 truncate">{file.Key.split('/').pop()}</h3>
              <p className="text-white/40 text-sm mb-6">{(file.Size / 1024).toFixed(2)} KB • AWS S3</p>
              
              <button className="mt-auto w-full py-3 rounded-lg border border-yellow-500/50 text-yellow-400 hover:bg-yellow-500 hover:text-black transition-all font-bold text-xs uppercase tracking-wider">
                View Document
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
