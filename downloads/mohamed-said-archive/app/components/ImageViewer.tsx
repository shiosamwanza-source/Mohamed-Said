"use client";

import { useEffect, useRef } from "react";
import OpenSeadragon from "openseadragon";
import { ZoomIn } from "lucide-react";

export default function ImageViewer() {
  const viewerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (viewerRef.current) {
      OpenSeadragon({
        element: viewerRef.current,
        // Demo image (Replace with your AWS S3 Deep Zoom tiles or high-res image)
        tileSources: {
          type: "image",
          url: "https://openseadragon.github.io/example-images/duomo/duomo.jpg",
        },
        showNavigator: true,
        navigatorPosition: "BOTTOM_RIGHT",
        navigatorSizeRatio: 0.15,
        prefixUrl: "https://openseadragon.github.io/build/openseadragon/images/",
        minZoomLevel: 0.5,
        maxZoomLevel: 10,
        defaultZoomLevel: 1,
      });
    }
  }, []);

  return (
    <section className="py-32 px-6 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 flex flex-col justify-center">
          <span className="text-yellow-400 uppercase tracking-[0.3em] text-xs font-bold block mb-4">High-Resolution Archive</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">Deep Zoom Viewer</h2>
          <p className="text-white/50 mb-8">
            Explore historical photographs and manuscripts in microscopic detail. Scroll to zoom in and uncover hidden evidence in the archives.
          </p>
          <div className="flex items-center text-yellow-400 bg-yellow-500/10 px-4 py-2 rounded-full border border-yellow-500/20 w-max text-sm">
            <ZoomIn className="w-4 h-4 mr-2" /> Scroll to Zoom
          </div>
        </div>

        <div className="lg:col-span-2 glass-panel rounded-3xl p-4 overflow-hidden">
          <div 
            ref={viewerRef} 
            className="w-full h-[500px] rounded-2xl bg-black/60 overflow-hidden"
          />
        </div>
      </div>
    </section>
  );
}
