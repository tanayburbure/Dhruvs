import { Outlet } from "react-router-dom";
import Sidebar from "@/shared/components/Sidebar";
import Header from "@/shared/components/Header";

export default function DashboardLayout() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header />

        {/* This is the changing area */}
        <div className="flex-1 p-6">
          <div className="bg-white rounded-3xl p-6 h-full shadow">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
