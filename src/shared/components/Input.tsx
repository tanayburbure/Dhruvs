import React, { useState } from "react";

type InputProps = {
  label?: string;
  type?: "text" | "email" | "tel" | "password";
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
  const [focused, setFocused] = useState(false);

  const isFilled = value.length > 0;
  const isFloating = focused || isFilled;

  return (
    <div className="relative mb-6 group">
      {/* Floating Label */}
      {label && (
        <label
          htmlFor={name}
          className={`
            absolute left-3 z-10 origin-left pointer-events-none select-none
            transition-all duration-200 ease-out
            ${
              isFloating
                ? "-translate-y-[22px] scale-[0.78] text-amber-500 font-semibold tracking-wide px-1 bg-white"
                : "translate-y-[10px] scale-100 text-slate-400 font-normal"
            }
            text-sm
          `}
        >
          {label}
          {required && (
            <span className="ml-0.5 text-rose-400">*</span>
          )}
        </label>
      )}

      {/* Input Field */}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={!label ? placeholder : focused && !isFilled ? placeholder : ""}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        autoComplete={autoComplete}
        className={`
          w-full px-3 py-2.5 text-sm text-slate-800 bg-white
          border-2 rounded-xl outline-none
          transition-all duration-200 ease-out
          placeholder:text-slate-300 placeholder:text-sm

          /* Border states */
          ${
            focused
              ? "border-amber-500 shadow-[0_0_0_4px_rgba(251,191,36,0.18)]"
              : isFilled
              ? "border-slate-300 hover:border-slate-400"
              : "border-slate-200 hover:border-slate-300"
          }

          /* Subtle lift on focus */
          ${focused ? "-translate-y-px" : "translate-y-0"}

          ${className}
        `}
      />
    </div>
  );
}