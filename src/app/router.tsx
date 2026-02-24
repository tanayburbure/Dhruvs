import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AdminLayout from "@/app/layout/AdminLayout";
import EmployeeLayout from "@/app/layout/EmployeeLayout";

// Admin Pages
import DashboardHomePage from "@/features/dashboard/pages/DashboardHomePage";
import OrdersPage from "@/features/orders/pages/OrdersPage";
import CustomersPage from "@/features/customers/pages/CustomersPage";
import EmployeesPage from "@/features/employees/pages/EmployeesPage";
import PaymentsPage from "@/features/payments/pages/PaymentsPage";

// Employee Pages
import EmployeeDashboard from "@/features/dashboard/pages/DashboardHomePage";
import EmployeeCustomers from "@/features/customers/pages/CustomersPage";
import CreateOrderPage from "@/features/createorders/pages/CreateOrderPage";
import SetOrderLimitPage from "@/features/limits/pages/admin/SetOrderLimit";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Redirect root to admin for now */}
        <Route path="/" element={<Navigate to="/admin" replace />} />

        {/* ================= ADMIN ROUTES ================= */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashboardHomePage />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="customers" element={<CustomersPage />} />
          <Route path="employees" element={<EmployeesPage />} />
          <Route path="limits" element={<SetOrderLimitPage />} />
          <Route path="payments" element={<PaymentsPage />} />
        </Route>

        {/* ================= EMPLOYEE ROUTES ================= */}
        <Route path="/employee" element={<EmployeeLayout />}>
          <Route index element={<EmployeeDashboard />} />
          <Route path="customers" element={<EmployeeCustomers />} />
          <Route path="createorder" element={<CreateOrderPage />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}
