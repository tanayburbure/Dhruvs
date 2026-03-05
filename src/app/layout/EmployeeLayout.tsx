import { Outlet } from "react-router-dom";
import EmployeeSidebar from "@/shared/components/EmployeeSidebar";
import Header from "@/shared/components/Header";

export default function EmployeeLayout() {
  return (
    <div
      className="flex h-screen overflow-hidden"
    >
      <EmployeeSidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header />

        <main className="flex-1 overflow-y-auto px-6 py-5">
          <div
            className="h-full rounded-2xl p-2 overflow-auto"
            style={{
              background: "#F8FAFC",
              boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.06)",
              border: "1px solid rgba(0,0,0,0.05)",
            }}
          >
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}