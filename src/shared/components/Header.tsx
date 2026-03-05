import { useState } from "react";

export default function Header() {
  const [searchFocused, setSearchFocused] = useState(false);
  const [btnHovered, setBtnHovered] = useState(false);

  return (
    <div
      style={{
        height: "60px",
        background: "white",
        borderBottom: "1px solid #f1f5f9",
        padding: "0 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "16px",
      }}
    >
      {/* Search */}
      <div style={{ position: "relative", width: "280px" }}>
        <svg
          width="14" height="14" viewBox="0 0 24 24" fill="none"
          stroke="#94a3b8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
          style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
        >
          <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          placeholder="Search..."
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
          style={{
            width: "100%", height: "38px",
            padding: "0 14px 0 34px",
            borderRadius: "10px", fontSize: "13.5px",
            color: "#1e293b", background: "#f8fafc",
            border: `1.5px solid ${searchFocused ? "#94a3b8" : "#e2e8f0"}`,
            boxShadow: searchFocused ? "0 0 0 3px rgba(148,163,184,0.12)" : "none",
            outline: "none", boxSizing: "border-box",
            transition: "border-color 0.18s ease, box-shadow 0.18s ease",
            fontFamily: "inherit",
          }}
        />
      </div>

      {/* Create Order */}
      <button
        onMouseEnter={() => setBtnHovered(true)}
        onMouseLeave={() => setBtnHovered(false)}
        style={{
          display: "flex", alignItems: "center", gap: "6px",
          height: "38px", padding: "0 18px",
          borderRadius: "10px", fontSize: "13.5px", fontWeight: 600,
          background: "linear-gradient(135deg, #f8d748, #eab308)",
          color: "#1c0a00", border: "none", cursor: "pointer",
          boxShadow: btnHovered ? "0 4px 14px rgba(234,179,8,0.35)" : "0 2px 8px rgba(234,179,8,0.2)",
          transform: btnHovered ? "translateY(-1px)" : "translateY(0)",
          transition: "all 0.18s ease", fontFamily: "inherit",
          whiteSpace: "nowrap",
        }}
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        Create Order
      </button>
    </div>
  );
}