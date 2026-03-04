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
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 600);
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
        transition-all duration-200 ease-out
        active:scale-[0.97]
        focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-2
        ${className}
      `}
      style={{
        background: "linear-gradient(135deg, #f59e0b 0%, #eab308 100%)",
        boxShadow: "0 4px 14px rgba(234,179,8,0.35), inset 0 1px 0 rgba(255,255,255,0.25)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow =
          "0 8px 24px rgba(234,179,8,0.45), inset 0 1px 0 rgba(255,255,255,0.25)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow =
          "0 4px 14px rgba(234,179,8,0.35), inset 0 1px 0 rgba(255,255,255,0.25)";
      }}
    >
      {/* Shimmer overlay */}
      <span
        className="pointer-events-none absolute inset-0 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300"
        style={{
          background:
            "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.18) 50%, transparent 60%)",
        }}
      />

      {/* Ripple effects */}
      {ripples.map((r) => (
        <span
          key={r.id}
          className="pointer-events-none absolute rounded-full"
          style={{
            left: r.x,
            top: r.y,
            width: "8px",
            height: "8px",
            marginLeft: "-4px",
            marginTop: "-4px",
            background: "rgba(255,255,255,0.5)",
            transform: "scale(0)",
            animation: "ripple 0.6s cubic-bezier(0.4,0,0.2,1) forwards",
          }}
        />
      ))}

      {/* Label */}
      <span className="relative z-10 flex items-center gap-2">{children}</span>

      <style>{`
        @keyframes ripple {
          to { transform: scale(18); opacity: 0; }
        }
      `}</style>
    </button>
  );
}