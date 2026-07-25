"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, ShieldCheck } from "lucide-react";

export default function Login() {
  const router = useRouter();
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock authentication
    if (password === "admin123") {
      document.cookie = "admin-session=authenticated-admin; path=/; max-age=3600"; // 1 hour
      router.push("/admin");
    } else {
      alert("Incorrect password!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-panel rounded-[40px] p-10 max-w-md w-full"
      >
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-yellow-500/20 flex items-center justify-center border border-yellow-500/30">
            <ShieldCheck className="w-8 h-8 text-yellow-400" />
          </div>
        </div>
        
        <h1 className="text-3xl font-serif font-bold text-white text-center mb-2">Admin Access</h1>
        <p className="text-white/50 text-center text-sm mb-8">Mohamed Said Archive Management</p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-yellow-400/50" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full pl-12 pr-4 py-4 rounded-xl bg-black/40 border border-yellow-500/20 text-white focus:outline-none focus:border-yellow-500/60"
            />
          </div>
          <button 
            type="submit"
            className="w-full py-4 rounded-xl bg-yellow-500 text-black font-bold hover:bg-yellow-400 transition-colors"
          >
            Login to Dashboard
          </button>
        </form>
        <p className="text-white/30 text-xs text-center mt-6">Demo Password: admin123</p>
      </motion.div>
    </div>
  );
}
