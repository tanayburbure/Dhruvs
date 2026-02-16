import React from "react";

type InputProps = {
  label?: string;
  type?: "text" | "email" | "tel";
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  name?: string;
  className?: string;
  required?: boolean;
  autoComplete?: string;
};

export default function Input({
  label,
  type = "text",
  value,
  onChange,
  placeholder = "",
  name,
  className = "",
  required = false,
  autoComplete,
}: InputProps) {
  return (
    <div className="flex flex-col mb-4">
      {label && (
        <label className="mb-1 text-sm font-medium text-gray-700" htmlFor={name}>
          {label}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${className}`}
        required={required}
        autoComplete={autoComplete}
      />
    </div>
  );
}
