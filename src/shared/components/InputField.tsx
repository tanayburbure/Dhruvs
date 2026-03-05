import React from "react";

interface InputFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const InputField = ({ label, error, ...props }: InputFieldProps) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label
        htmlFor={props.name}
        className="text-sm font-medium text-gray-800"
      >
        {label}
      </label>

      <input
        {...props}
        className={`
          h-12 px-4 rounded-xl
          bg-gray-100
          shadow-inner
          outline-none
          focus:ring-2 focus:ring-gray-300
          ${error ? "ring-2 ring-red-400" : ""}
        `}
      />

      {error && (
        <span className="text-xs text-red-500">{error}</span>
      )}
    </div>
  );
};

export default InputField;