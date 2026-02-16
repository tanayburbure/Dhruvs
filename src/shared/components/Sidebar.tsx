import { NavLink } from "react-router-dom";
import lobo from "@/assets/lobo.svg";

export default function Sidebar() {
  const linkClass =
    "block px-4 py-2 rounded-lg font-medium transition";

  return (
    <div className="w-64 bg-white p-6 shadow ">
      <img
          src={lobo}
          alt="Logo"
          className="w-[24vh] mb-4 pl-6"
        />
      <nav className="flex flex-col gap-3">
        <NavLink
          to="/admin"
          end
          className={({ isActive }) =>
            `${linkClass} ${
              isActive
                ? "bg-yellow-400 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/admin/orders"
          className={({ isActive }) =>
            `${linkClass} ${
              isActive
                ? "bg-yellow-400 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`
          }
        >
          Orders
        </NavLink>

        <NavLink
          to="/admin/customers"
          className={({ isActive }) =>
            `${linkClass} ${
              isActive
                ? "bg-yellow-400 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`
          }
        >
          Customers
        </NavLink>

        <NavLink
          to="/admin/limits"
          className={({ isActive }) =>
            `${linkClass} ${
              isActive
                ? "bg-yellow-400 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`
          }
        >
          Limits
        </NavLink>

        <NavLink
          to="/admin/employees"
          className={({ isActive }) =>
            `${linkClass} ${
              isActive
                ? "bg-yellow-400 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`
          }
        >
          employees
        </NavLink>
        <NavLink
          to="/admin/payments"
          className={({ isActive }) =>
            `${linkClass} ${
              isActive
                ? "bg-yellow-400 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`
          }
        >
          payments
        </NavLink>
      </nav>
    </div>
  );
}
