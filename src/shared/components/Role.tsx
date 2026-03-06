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
        className="mb-2 text-xs font-semibold tracking-widest uppercase text-amber-900"
      >
        Select Role
      </label>

      {/* Trigger */}
      <button
        id="role-select"
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`
          relative flex items-center justify-between
          px-4 py-3 rounded-xl text-sm font-medium
          transition-all duration-200
          ${
            open
              ? "border-2 border-yellow-500 shadow-[0_0_0_4px_rgba(234,179,8,0.15),0_2px_8px_rgba(234,179,8,0.1)] -translate-y-[1px]"
              : "border-2 border-slate-300 shadow-[0_1px_4px_rgba(234,179,8,0.08)]"
          }
          ${selected ? "text-amber-900" : "text-yellow-700"}
        `}
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
          className={`transition-transform duration-200 ${
            open ? "rotate-180" : "rotate-0"
          }`}
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
        className="absolute opacity-0 pointer-events-none w-0 h-0"
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

      {/* Dropdown */}
      <div
        className={`
          absolute top-full left-0 w-full mt-1.5 z-[100]
          overflow-hidden rounded-[14px]
          bg-white border-2 border-yellow-200
          shadow-[0_8px_32px_rgba(234,179,8,0.14),0_2px_8px_rgba(0,0,0,0.06)]
          transition-all duration-200 origin-top
          ${
            open
              ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
              : "opacity-0 -translate-y-2 scale-[0.96] pointer-events-none"
          }
        `}
        style={{ maxHeight: open ? roles.length * 52 + 12 : 0 }}
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
                className={`
                  flex items-center px-3 py-2.5 rounded-lg text-sm font-medium
                  text-left w-full transition-all duration-150
                  ${
                    isSelected
                      ? "bg-yellow-200 border border-yellow-400 text-amber-900"
                      : isHovered
                      ? "bg-yellow-50 text-amber-900 translate-x-[3px]"
                      : "text-amber-900 border border-transparent"
                  }
                `}
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