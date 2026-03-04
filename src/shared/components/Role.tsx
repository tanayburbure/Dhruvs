import React, { useState, useRef, useEffect } from "react";

type RoleOption = {
  label: string;
  value: string;
  icon?: React.ReactNode;
};

type RoleProps = {
  selectedRole: string | null;
  onSelect: (role: string) => void;
  roles?: RoleOption[];
  className?: string;
};

const defaultRoles: RoleOption[] = [
  { label: "Admin", value: "admin" },
  { label: "Employee", value: "employee" },
  { label: "Cutter", value: "cutter" },
  { label: "Designer", value: "guest" },
];

export default function Role({
  selectedRole,
  onSelect,
  roles = defaultRoles,
  className = "",
}: RoleProps) {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selected = roles.find((r) => r.value === selectedRole);

  return (
    <div className={`flex flex-col relative ${className}`} ref={ref}>
      {/* Label */}
      <label
        htmlFor="role-select"
        className="mb-2 text-xs font-semibold tracking-widest uppercase"
        style={{ color: "#92400e" }}
      >
        Select Role
      </label>

      {/* Trigger button */}
      <button
        id="role-select"
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="relative flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200"
        style={{
          border: `2px solid ${open ? "#eab308" : "#CAD5E2"}`,
          color: selected ? "#78350f" : "#a16207",
          boxShadow: open
            ? "0 0 0 4px rgba(234,179,8,0.15), 0 2px 8px rgba(234,179,8,0.1)"
            : "0 1px 4px rgba(234,179,8,0.08)",
          transform: open ? "translateY(-1px)" : "translateY(0)",
        }}
      >
        <span>{selected ? selected.label : "Choose your role…"}</span>

        {/* Chevron */}
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#ca8a04"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            transition: "transform 0.25s cubic-bezier(0.4,0,0.2,1)",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {/* Hidden native select */}
      <select
        value={selectedRole || ""}
        onChange={(e) => onSelect(e.target.value)}
        aria-hidden="true"
        tabIndex={-1}
        style={{
          position: "absolute",
          opacity: 0,
          pointerEvents: "none",
          width: 0,
          height: 0,
        }}
      >
        <option value="" disabled>
          Choose your role…
        </option>
        {roles.map((role) => (
          <option key={role.value} value={role.value}>
            {role.label}
          </option>
        ))}
      </select>

      {/* Floating Dropdown */}
      <div
        style={{
          position: "absolute",
          top: "100%",
          left: 0,
          width: "100%",
          marginTop: "6px",
          zIndex: 100,
          overflow: "hidden",
          borderRadius: "14px",
          maxHeight: open ? `${roles.length * 52 + 12}px` : "0px",
          opacity: open ? 1 : 0,
          transform: open
            ? "translateY(0) scale(1)"
            : "translateY(-8px) scale(0.96)",
          transformOrigin: "top",
          transition:
            "max-height 0.28s cubic-bezier(0.4,0,0.2,1), opacity 0.2s ease, transform 0.22s cubic-bezier(0.4,0,0.2,1)",
          background: "white",
          border: "2px solid #fde68a",
          boxShadow:
            "0 8px 32px rgba(234,179,8,0.14), 0 2px 8px rgba(0,0,0,0.06)",
          pointerEvents: open ? "auto" : "none",
        }}
      >
        <div className="p-2 flex flex-col gap-1">
          {roles.map((role) => {
            const isSelected = selectedRole === role.value;
            const isHovered = hovered === role.value;

            return (
              <button
                key={role.value}
                type="button"
                onClick={() => {
                  onSelect(role.value);
                  setOpen(false);
                }}
                onMouseEnter={() => setHovered(role.value)}
                onMouseLeave={() => setHovered(null)}
                className="flex items-center px-3 py-2.5 rounded-lg text-sm font-medium text-left w-full transition-all duration-150"
                style={{
                  background: isSelected
                    ? "#fef08a"
                    : isHovered
                    ? "#fefce8"
                    : "transparent",
                  color: isSelected ? "#78350f" : "#92400e",
                  border: isSelected
                    ? "1.5px solid #fde047"
                    : "1.5px solid transparent",
                  transform:
                    isHovered && !isSelected
                      ? "translateX(3px)"
                      : "translateX(0)",
                }}
              >
                {role.label}

                {isSelected && (
                  <svg
                    className="ml-auto"
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#ca8a04"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}