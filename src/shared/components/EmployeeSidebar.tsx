import { NavLink } from "react-router-dom";
import lobo from "@/assets/lobo.svg";

const navItems = [
  {
    to: "",
    end: true,
    label: "Dashboard",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    to: "customers",
    label: "Customer List",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    to: "createorder",
    label: "Create Order",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="12" y1="13" x2="12" y2="17" />
        <line x1="10" y1="15" x2="14" y2="15" />
      </svg>
    ),
  },
];

export default function Sidebar() {
  return (
    <div
      className="w-64 h-screen flex flex-col"
      
    >
      {/* Logo */}
      <div className="flex justify-center pt-8 pb-6 px-6">
        <img src={lobo} alt="Logo" className="w-[24vh]" />
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-1 flex-1 px-4 pt-2">
        {navItems.map(({ to, end, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            style={{ textDecoration: "none" }}
          >
            {({ isActive }) => (
              <div
                className="flex items-center gap-3.5 px-4 py-3 rounded-full transition-all duration-200"
                style={{
                  background: isActive
                    ? "linear-gradient(135deg, #f8d748 0%, #eab308 100%)"
                    : "transparent",
                  boxShadow: isActive
                    ? "0 4px 16px rgba(234,179,8,0.3)"
                    : "none",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.background = "#f9fafb";
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.background = "transparent";
                }}
              >
                <span style={{
                  color: isActive ? "#fff" : "#c0bfbf",
                  display: "flex", alignItems: "center", flexShrink: 0,
                  transition: "color 0.2s",
                }}>
                  {icon}
                </span>
                <span style={{
                  fontSize: "14px",
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? "#fff" : "#9ca3af",
                  letterSpacing: "-0.01em",
                  transition: "color 0.2s",
                }}>
                  {label}
                </span>
              </div>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="px-8 pb-8 text-center">
        <button
          className="text-sm font-semibold transition-colors duration-150"
          style={{
            color: "#374151", background: "none", border: "none",
            cursor: "pointer", letterSpacing: "0.06em", textTransform: "uppercase",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#111827")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#374151")}
        >
          Log Out →
        </button>
      </div>
    </div>
  );
}