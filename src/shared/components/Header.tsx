import { useState } from "react";

export default function Header() {
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <div className="h-[60px] bg-white border-b border-slate-100 px-6 flex items-center justify-between gap-4">

      {/* Search */}
      <div className="relative w-[280px]">

        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#94a3b8"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="absolute left-[12px] top-1/2 -translate-y-1/2 pointer-events-none"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>

        <input
          type="text"
          placeholder="Search..."
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
          className={`w-full h-[38px] pl-[34px] pr-[14px] rounded-[10px] text-[13.5px] text-slate-800 bg-slate-50 border-[1.5px] outline-none transition-all duration-[180ms] ${
            searchFocused
              ? "border-slate-400 shadow-[0_0_0_3px_rgba(148,163,184,0.12)]"
              : "border-slate-200"
          }`}
        />
      </div>

      {/* Create Order */}
      <button
        className="
          flex items-center gap-[6px]
          h-[38px] px-[18px]
          rounded-[10px]
          text-[13.5px] font-semibold
          whitespace-nowrap
          text-[#1c0a00]
          bg-gradient-to-br from-yellow-300 to-yellow-500
          shadow-[0_2px_8px_rgba(234,179,8,0.2)]
          transition-all duration-[180ms]
          hover:-translate-y-[1px]
          hover:shadow-[0_4px_14px_rgba(234,179,8,0.35)]
        "
      >
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>

        Create Order
      </button>

    </div>
  );
}