import { Outlet } from "react-router-dom";
import EmployeeSidebar from "@/shared/components/EmployeeSidebar";
import Header from "@/shared/components/Header";

export default function EmployeeLayout() {
  return (
    <div className="flex h-screen bg-gray-100">
      <EmployeeSidebar />

      <div className="flex-1 flex flex-col">
        <Header />

        <div className="flex-1 p-6">
          <div className="bg-white rounded-3xl p-6 h-full shadow">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
