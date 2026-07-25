"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, Html } from "@react-three/drei";
import { motion } from "framer-motion";

// Historical locations with mock coordinates
const historicalPoints = [
  { name: "Dar es Salaam", position: [-0.8, 0.5, 0.3], info: "TANU Headquarters" },
  { name: "Zanzibar", position: [0.6, 0.1, -0.7], info: "1964 Revolution" },
  { name: "Tabora", position: [0.2, 0.8, 0.1], info: "Trade Route" },
];

export default function ThreeGlobe() {
  return (
    <section className="py-32 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <span className="text-yellow-400 uppercase tracking-[0.3em] text-xs font-bold block mb-4">Interactive 3D Map</span>
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-white">Historical Geospace</h2>
        <p className="text-white/50 mt-4">Drag to rotate the globe and explore historical sites.</p>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="h-[600px] rounded-3xl overflow-hidden border border-yellow-500/10 bg-black/40 backdrop-blur-md relative"
      >
        <Canvas camera={{ position: [0, 0, 3] }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[2, 2, 2]} intensity={2} />
          
          {/* Earth Sphere */}
          <Sphere args={[1.2, 64, 64]}>
            <meshStandardMaterial 
              color="#0A1828" 
              metalness={0.8} 
              roughness={0.2} 
              emissive="#050C16" 
              emissiveIntensity={0.2} 
            />
          </Sphere>

          {/* Historical Points (Pins) */}
          {historicalPoints.map((point) => (
            <group key={point.name} position={point.position}>
              <mesh>
                <sphereGeometry args={[0.03, 16, 16]} />
                <meshStandardMaterial color="#D4AF37" emissive="#F4C430" emissiveIntensity={2} />
              </mesh>
              <Html distanceFactor={8} position={[0, 0.1, 0]}>
                <div className="bg-black/80 backdrop-blur-md border border-yellow-500/30 px-3 py-1 rounded-lg text-xs text-yellow-400 whitespace-nowrap pointer-events-none">
                  {point.name}
                </div>
              </Html>
            </group>
          ))}

          <OrbitControls 
            enablePan={false} 
            enableZoom={true} 
            autoRotate 
            autoRotateSpeed={0.5} 
            minDistance={2} 
            maxDistance={5}
          />
        </Canvas>
      </motion.div>
    </section>
  );
}
