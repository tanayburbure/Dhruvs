import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "@/app/layout/DashboardLayout";

import DashboardHomePage from "@/features/dashboard/pages/DashboardHomePage";
import OrdersPage from "@/features/orders/pages/OrdersPage";
import CustomersPage from "@/features/customers/pages/CustomersPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<DashboardHomePage />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="customers" element={<CustomersPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
