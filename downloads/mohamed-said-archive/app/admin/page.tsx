"use client";
import StatsCards from "@/components/admin/StatsCards";
import UploadPanel from "@/components/admin/UploadPanel";
import FileManager from "@/components/admin/FileManager";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();

  const handleLogout = () => {
    document.cookie = "admin-session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.push("/");
  };

  return (
    <main className="min-h-screen pt-24 pb-12 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold holo-text">Admin Dashboard</h1>
          <p className="text-white/50 mt-2">Manage historical documents, upload files, and monitor archives.</p>
        </div>
        <button 
          onClick={handleLogout}
          className="flex items-center px-5 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 transition-colors text-sm font-bold"
        >
          <LogOut className="w-4 h-4 mr-2" /> Logout
        </button>
      </div>

      <StatsCards />

      <div className="grid lg:grid-cols-2 gap-8 mt-12">
        <UploadPanel />
        <FileManager />
      </div>
    </main>
  );
}
