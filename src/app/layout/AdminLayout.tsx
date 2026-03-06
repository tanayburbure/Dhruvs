import { Outlet } from "react-router-dom";
import Sidebar from "@/shared/components/Sidebar";
import Header from "@/shared/components/Header";

export default function AdminLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-[#f4f4f6] font-['Inter',system-ui,sans-serif]">
      {/* Sidebar — fixed height, no scroll bleed */}
      <Sidebar />

      {/* Right column */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header />

        {/* Content area */}
        <main className="flex-1 overflow-y-auto px-6 py-5">
          <div className="h-full rounded-2xl overflow-auto bg-white border border-black/5 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.06)]">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}