"use client";
import { motion } from "framer-motion";
import { BookOpen, FileText, Image, Mic } from "lucide-react";

const stats = [
  { title: "Documents", value: "1,248", icon: FileText, color: "text-blue-400", bg: "bg-blue-500/10" },
  { title: "Images", value: "8,410", icon: Image, color: "text-green-400", bg: "bg-green-500/10" },
  { title: "Audio Files", value: "327", icon: Mic, color: "text-purple-400", bg: "bg-purple-500/10" },
  { title: "Books", value: "1,920", icon: BookOpen, color: "text-yellow-400", bg: "bg-yellow-500/10" },
];

export default function StatsCards() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {stats.map((stat, i) => (
        <motion.div 
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="glass-panel rounded-2xl p-6"
        >
          <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center mb-4 border border-white/5`}>
            <stat.icon className={`w-6 h-6 ${stat.color}`} />
          </div>
          <h3 className="text-white/50 text-sm uppercase tracking-wider">{stat.title}</h3>
          <p className="text-3xl font-bold text-white mt-2">{stat.value}</p>
        </motion.div>
      ))}
    </div>
  );
}
