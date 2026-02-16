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
  { label: "Designer", value: "guest" },
];

export default function Role({
  selectedRole,
  onSelect,
  roles = defaultRoles,
  className = "",
}: RoleProps) {
  return (
    <div className={`flex flex-col ${className}`}>
      <label htmlFor="role-select" className="mb-2 text-sm font-medium text-gray-700">
        Select Role
      </label>
      <select
        id="role-select"
        className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        value={selectedRole || ""}
        onChange={(e) => onSelect(e.target.value)}
      >
        <option value="" disabled>
          Choose a role...
        </option>
        {roles.map((role) => (
          <option key={role.value} value={role.value}>
            {role.label}
          </option>
        ))}
      </select>
    </div>
  );
}
