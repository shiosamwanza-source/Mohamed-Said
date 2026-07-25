"use client";

import { useEffect, useRef, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Loader2 } from "lucide-react";

// Set worker path (required for PDF.js)
pdfjsLib.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

export default function PdfViewer({ url }: { url: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pdfDoc, setPdfDoc] = useState<any>(null);
  const [pageNum, setPageNum] = useState(1);
  const [scale, setScale] = useState(1.2);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const loadingTask = pdfjsLib.getDocument(url);
    
    loadingTask.promise.then((doc) => {
      setPdfDoc(doc);
      renderPage(doc, pageNum, scale);
      setLoading(false);
    }).catch((err) => {
      console.error("Error loading PDF: ", err);
      setLoading(false);
    });
  }, [url]);

  useEffect(() => {
    if (pdfDoc) renderPage(pdfDoc, pageNum, scale);
  }, [pageNum, scale, pdfDoc]);

  const renderPage = async (doc: any, num: number, sc: number) => {
    const page = await doc.getPage(num);
    const viewport = page.getViewport({ scale: sc });
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext("2d");
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      
      await page.render({
        canvasContext: context!,
        viewport,
      }).promise;
    }
  };

  return (
    <div className="bg-zinc-900 rounded-2xl border border-yellow-500/20 p-4 flex flex-col items-center">
      {/* Controls */}
      <div className="flex items-center gap-6 mb-4 bg-black/40 p-2 rounded-full border border-white/5">
        <button 
          disabled={pageNum <= 1} 
          onClick={() => setPageNum(prev => prev - 1)}
          className="p-2 rounded-full hover:bg-yellow-500/20 disabled:opacity-30 transition-colors text-white"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        
        <span className="text-white text-sm font-mono">
          {pdfDoc ? `${pageNum} / ${pdfDoc.numPages}` : 'Loading...'}
        </span>
        
        <button 
          disabled={!pdfDoc || pageNum >= pdfDoc.numPages} 
          onClick={() => setPageNum(prev => prev + 1)}
          className="p-2 rounded-full hover:bg-yellow-500/20 disabled:opacity-30 transition-colors text-white"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        <div className="w-px h-6 bg-white/10"></div>

        <button onClick={() => setScale(prev => Math.max(0.6, prev - 0.2))} className="p-2 rounded-full hover:bg-yellow-500/20 transition-colors text-white">
          <ZoomOut className="w-5 h-5" />
        </button>
        <button onClick={() => setScale(prev => Math.min(3.0, prev + 0.2))} className="p-2 rounded-full hover:bg-yellow-500/20 transition-colors text-white">
          <ZoomIn className="w-5 h-5" />
        </button>
      </div>

      {/* Canvas */}
      <div className="bg-gray-800 rounded-xl overflow-auto max-h-[70vh] w-full flex justify-center items-start">
        {loading ? (
          <div className="flex items-center justify-center h-96">
            <Loader2 className="w-10 h-10 text-yellow-400 animate-spin" />
          </div>
        ) : (
          <canvas ref={canvasRef} className="shadow-2xl" />
        )}
      </div>
    </div>
  );
}
