"use client";

import ReactFlow, { Background, Controls, MiniMap, Node, Edge } from "reactflow";
import "reactflow/dist/style.css";

// Custom Node Style
const nodeStyle = {
  background: "rgba(10, 24, 40, 0.6)",
  backdropFilter: "blur(12px)",
  color: "#D4AF37",
  border: "1px solid rgba(212, 175, 55, 0.3)",
  borderRadius: "12px",
  padding: "10px 20px",
  fontSize: "14px",
  fontWeight: "bold",
  boxShadow: "0 4px 20px rgba(0,0,0,0.4)"
};

const nodes: Node[] = [
  { id: "1", position: { x: 300, y: 50 }, data: { label: "TANU (1954)" }, style: nodeStyle },
  { id: "2", position: { x: 100, y: 200 }, data: { label: "Abdulwahid Sykes" }, style: nodeStyle },
  { id: "3", position: { x: 500, y: 200 }, data: { label: "Julius Nyerere" }, style: nodeStyle },
  { id: "4", position: { x: 300, y: 350 }, data: { label: "Independence (1961)" }, style: {...nodeStyle, borderColor: "#F4C430", color: "#F4C430" } },
  { id: "5", position: { x: 50, y: 400 }, data: { label: "Dar es Salaam" }, style: nodeStyle },
];

const edges: Edge[] = [
  { id: "e1-2", source: "1", target: "2", animated: true, style: { stroke: "#D4AF37", strokeWidth: 2 } },
  { id: "e1-3", source: "1", target: "3", animated: true, style: { stroke: "#D4AF37", strokeWidth: 2 } },
  { id: "e2-4", source: "2", target: "4", style: { stroke: "rgba(212, 175, 55, 0.5)", strokeWidth: 1 } },
  { id: "e3-4", source: "3", target: "4", style: { stroke: "rgba(212, 175, 55, 0.5)", strokeWidth: 1 } },
  { id: "e2-5", source: "2", target: "5", style: { stroke: "rgba(212, 175, 55, 0.3)", strokeWidth: 1 } },
];

export default function KnowledgeGraph() {
  return (
    <section className="py-32 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <span className="text-yellow-400 uppercase tracking-[0.3em] text-xs font-bold block mb-4">Interactive AI Graph</span>
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-white">Historical Network</h2>
        <p className="text-white/50 mt-4 max-w-2xl mx-auto">Explore how people, events, and places are interconnected.</p>
      </div>

      <div className="h-[600px] rounded-3xl overflow-hidden border border-yellow-500/10 bg-black/20 backdrop-blur-md">
        <ReactFlow 
          nodes={nodes} 
          edges={edges}
          fitView
          attributionPosition="bottom-left"
        >
          <Background color="#0A1828" gap={16} />
          <Controls 
            showInteractive={false} 
            className="!bg-black/40 !border-yellow-500/20 !backdrop-blur-md !rounded-xl !overflow-hidden"
          />
          <MiniMap 
            nodeColor={() => "#D4AF37"} 
            maskColor="rgba(0, 0, 0, 0.7)"
            className="!bg-black/50 !border-yellow-500/20"
          />
        </ReactFlow>
      </div>
    </section>
  );
}
