"use client";
import { useState } from "react";
import Tesseract from "tesseract.js";
import { motion } from "framer-motion";
import { Upload, Loader2, FileCheck, ScanText } from "lucide-react";

export default function UploadPanel() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [ocrText, setOcrText] = useState("");
  const [ocrLoading, setOcrLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Handle File Selection and OCR
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    
    setFile(selectedFile);
    setSuccess(false);
    setOcrText("");

    // Run OCR if it's an image
    if (selectedFile.type.startsWith("image/")) {
      setOcrLoading(true);
      try {
        const result = await Tesseract.recognize(selectedFile, "eng");
        setOcrText(result.data.text);
      } catch (error) {
        console.error("OCR Error:", error);
        setOcrText("Failed to extract text.");
      }
      setOcrLoading(false);
    }
  };

  // Upload to AWS S3 via API
  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      
      if (res.ok) {
        setSuccess(true);
        setFile(null);
        setOcrText("");
      }
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="glass-panel rounded-3xl p-8">
      <h2 className="text-2xl font-serif font-bold text-white mb-6 flex items-center">
        <Upload className="w-6 h-6 mr-3 text-yellow-400" /> Upload Document
      </h2>

      <div className="border-2 border-dashed border-yellow-500/20 rounded-2xl p-8 text-center hover:border-yellow-500/50 transition-colors cursor-pointer">
        <input type="file" id="fileUpload" className="hidden" onChange={handleFileChange} />
        <label htmlFor="fileUpload" className="cursor-pointer block">
          <Upload className="w-10 h-10 text-yellow-400/50 mx-auto mb-4" />
          <p className="text-white/70 font-medium">
            {file ? file.name : "Click to select file (PDF, Image, Audio)"}
          </p>
          <p className="text-white/30 text-xs mt-2">Max size: 50MB</p>
        </label>
      </div>

      {/* OCR Processing */}
      {ocrLoading && (
        <div className="mt-6 flex items-center justify-center text-yellow-400 bg-yellow-500/10 p-4 rounded-xl border border-yellow-500/20">
          <ScanText className="w-5 h-5 mr-3 animate-pulse" />
          <span>Running AI OCR to extract text...</span>
        </div>
      )}

      {ocrText && (
        <div className="mt-6 bg-black/40 border border-white/5 rounded-xl p-4">
          <h4 className="text-xs uppercase tracking-widest text-yellow-400 mb-2 flex items-center">
            <ScanText className="w-4 h-4 mr-2" /> Extracted Text (OCR)
          </h4>
          <p className="text-white/60 text-sm max-h-32 overflow-y-auto whitespace-pre-wrap">{ocrText}</p>
        </div>
      )}

      {success && (
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="mt-6 flex items-center text-green-400 bg-green-400/10 p-4 rounded-xl border border-green-400/20"
        >
          <FileCheck className="w-5 h-5 mr-3" /> File successfully uploaded to AWS S3!
        </motion.div>
      )}

      <button 
        onClick={handleUpload}
        disabled={!file || uploading}
        className="w-full mt-6 py-4 rounded-xl bg-yellow-500 text-black font-bold flex items-center justify-center hover:bg-yellow-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {uploading ? (
          <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Uploading to AWS S3...</>
        ) : (
          <>Upload to Archive</>
        )}
      </button>
    </div>
  );
}
