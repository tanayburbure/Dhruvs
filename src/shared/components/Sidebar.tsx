import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const linkClass =
    "block px-4 py-2 rounded-lg font-medium transition";

  return (
    <div className="w-64 bg-white p-6 shadow">
      <h1 className="text-xl font-bold mb-8">Dhruvs</h1>

      <nav className="flex flex-col gap-3">
        <NavLink
          to="/"
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
          to="/orders"
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
          to="/customers"
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
      </nav>
    </div>
  );
}
