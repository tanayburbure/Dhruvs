import React from "react";

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
  { label: "Designer", value: "designer" },
];

export default function Role({
  selectedRole,
  onSelect,
  roles = defaultRoles,
  className = "",
}: RoleProps) {
  return (
    <div className={`flex space-x-4 ${className}`}>
      {roles.map((role) => (
        <button
          type="button"
          key={role.value}
          className={`px-4 py-2 rounded border font-medium transition ${
            selectedRole === role.value
              ? "bg-blue-600 text-white border-blue-700"
              : "bg-white text-gray-900 border-gray-300 hover:bg-blue-50"
          }`}
          onClick={() => onSelect(role.value)}
          aria-pressed={selectedRole === role.value}
        >
          {role.icon && <span className="mr-2">{role.icon}</span>}
          {role.label}
        </button>
      ))}
    </div>
  );
}

