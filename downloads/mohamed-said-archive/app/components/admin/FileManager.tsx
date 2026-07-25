"use client";
import { useEffect, useState } from "react";
import { Trash2, FileText, Loader2, RefreshCw } from "lucide-react";

type FileItem = { Key: string; Size: number };

export default function FileManager() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFiles = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/files");
      const data = await res.json();
      setFiles(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div className="glass-panel rounded-3xl p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-serif font-bold text-white flex items-center">
          <FileText className="w-6 h-6 mr-3 text-yellow-400" /> File Manager
        </h2>
        <button onClick={fetchFiles} className="text-yellow-400 hover:text-yellow-300 p-2 rounded-full hover:bg-yellow-500/10 transition-colors">
          <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 text-yellow-400 animate-spin" />
          </div>
        ) : files.length === 0 ? (
          <p className="text-white/30 text-center py-12">No files found in AWS S3.</p>
        ) : (
          files.map((file) => (
            <div key={file.Key} className="flex items-center justify-between bg-black/30 border border-white/5 rounded-xl p-4 hover:border-yellow-500/20 transition-colors">
              <div className="flex items-center min-w-0">
                <FileText className="w-5 h-5 text-yellow-400 mr-3 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-white text-sm font-medium truncate">{file.Key.split('/').pop()}</p>
                  <p className="text-white/40 text-xs">{(file.Size / 1024).toFixed(2)} KB</p>
                </div>
              </div>
              <button className="text-red-400/70 hover:text-red-400 p-2 rounded-lg hover:bg-red-500/10 transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
