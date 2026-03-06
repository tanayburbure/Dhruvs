import React, { useState } from "react";

type ButtonProps = {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
};

export default function Button({
  onClick,
  children,
  className = "",
  type = "button",
}: ButtonProps) {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();

    setRipples((prev) => [...prev, { x, y, id }]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 600);

    onClick?.();
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      className={`
        relative overflow-hidden
        px-6 py-2.5
        rounded-xl
        text-sm font-semibold tracking-wide
        text-amber-950
        bg-gradient-to-br from-amber-500 to-yellow-400
        shadow-[0_4px_14px_rgba(234,179,8,0.35),inset_0_1px_0_rgba(255,255,255,0.25)]
        transition-all duration-200 ease-out
        active:scale-[0.97]
        hover:-translate-y-[2px]
        hover:shadow-[0_8px_24px_rgba(234,179,8,0.45),inset_0_1px_0_rgba(255,255,255,0.25)]
        focus:outline-none
        focus-visible:ring-2
        focus-visible:ring-yellow-400
        focus-visible:ring-offset-2
        ${className}
      `}
    >
      {/* Shimmer overlay */}
      <span
        className="
          pointer-events-none absolute inset-0 rounded-xl
          opacity-0 hover:opacity-100 transition-opacity duration-300
          bg-[linear-gradient(105deg,transparent_40%,rgba(255,255,255,0.18)_50%,transparent_60%)]
        "
      />

      {/* Ripple effects */}
      {ripples.map((r) => (
        <span
          key={r.id}
          className="pointer-events-none absolute rounded-full bg-white/50 animate-[ripple_0.6s_cubic-bezier(0.4,0,0.2,1)_forwards]"
          style={{
            left: r.x,
            top: r.y,
            width: "8px",
            height: "8px",
            marginLeft: "-4px",
            marginTop: "-4px",
          }}
        />
      ))}

      {/* Label */}
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>

      <style>{`
        @keyframes ripple {
          to { transform: scale(18); opacity: 0; }
        }
      `}</style>
    </button>
  );
}