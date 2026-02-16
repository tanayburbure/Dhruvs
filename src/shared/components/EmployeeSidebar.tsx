import { NavLink } from "react-router-dom";
import lobo from "@/assets/lobo.svg";

export default function Sidebar() {
  const linkClass =
    "block px-4 py-2 rounded-lg font-medium transition";

  return (
    <div className="w-64 bg-white p-6 shadow">
      <img
        src={lobo}
        alt="Logo"
        className="w-[24vh] mb-4 pl-6"
      />

      <nav className="flex flex-col gap-3">
        <NavLink
          to=""
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

        <NavLink to="customers" className={({ isActive }) =>
          `${linkClass} ${isActive
            ? "bg-yellow-400 text-white"
            : "text-gray-700 hover:bg-gray-100"}`
        }>
          Customer List
        </NavLink>

        <NavLink to="createorder" className={({ isActive }) =>
          `${linkClass} ${isActive
            ? "bg-yellow-400 text-white"
            : "text-gray-700 hover:bg-gray-100"}`
        }>
          Create Order
        </NavLink>
      </nav>
    </div>
  );
}
