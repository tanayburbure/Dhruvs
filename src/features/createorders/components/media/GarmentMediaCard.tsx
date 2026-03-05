import { useState } from "react";

type Props = {
  customerName: string;
  garmentType: string;
  orderId: number;
  quantity: number;
  onAddFabricPicture: () => void;
  onAddDrawing: () => void;
  onViewImages: () => void;
};

const ICON_SIZE = 22;

const CameraIcon = () => (
  <svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="7" width="18" height="13" rx="2" />
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
    <circle cx="12" cy="14" r="3" />
  </svg>
);

const BrushIcon = () => (
  <svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 15V4a2 2 0 0 0-2-2H7A2 2 0 0 0 5 4v11a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2Z" />
    <path d="M9 18l6 3-6 3v-6Z" />
  </svg>
);

const ImageIcon = () => (
  <svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <path d="M21 21l-6-6a2 2 0 0 0-2.828 0l-7 7" />
  </svg>
);

function ActionRow({
  label,
  icon,
  onClick,
}: {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "13px 12px",
        borderRadius: "13px",
        cursor: "pointer",
        background: hovered ? "#f8fafc" : "transparent",
        border: `2px solid ${hovered ? "#e2e8f0" : "transparent"}`,
        transition: "all 0.18s ease",
        minHeight: "40px",
      }}
    >
      <span
        style={{
          fontSize: "16.5px",
          fontWeight: 600,
          color: hovered ? "#1e293b" : "#475569",
          transition: "color 0.18s ease",
          letterSpacing: "0.02em",
        }}
      >
        {label}
      </span>
      <span
        style={{
          color: hovered ? "#1e293b" : "#94a3b8",
          transition: "color 0.18s ease",
          display: "flex",
          alignItems: "center",
        }}
      >
        {icon}
      </span>
    </div>
  );
}

const GarmentMediaCard = ({
  customerName,
  garmentType,
  orderId,
  quantity,
  onAddFabricPicture,
  onAddDrawing,
  onViewImages,
}: Props) => {
  return (
    <div
      style={{
        background: "white",
        borderRadius: "16px",
        border: "2px solid #e2e8f0",
        padding: "22px 18px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        width: "310px",
        boxShadow: "0 2px 11px rgba(0,0,0,0.07)",
      }}
    >
      {/* Info */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <p
          style={{
            fontSize: "19px",
            fontWeight: 800,
            color: "#1e293b",
            margin: 0,
            letterSpacing: "-0.03em",
          }}
        >
          {customerName}
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
          {([
            ["Garment", garmentType],
            ["Order ID", `#${orderId}`],
            ["Quantity", quantity],
          ] as [string, string | number][]).map(([key, val]) => (
            <div
              key={key}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontSize: "13.5px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.09em",
                  color: "#94a3b8",
                }}
              >
                {key}
              </span>
              <span style={{ fontSize: "15px", fontWeight: 600, color: "#475569" }}>
                {val}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: "1.5px", background: "#f1f5f9" }} />

      {/* Actions */}
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <ActionRow
          label="Add Fabric Picture"
          icon={<CameraIcon />}
          onClick={onAddFabricPicture}
        />
        <ActionRow
          label="Add Drawing"
          icon={<BrushIcon />}
          onClick={onAddDrawing}
        />
        <ActionRow
          label="View / Edit Images"
          icon={<ImageIcon />}
          onClick={onViewImages}
        />
      </div>
    </div>
  );
};

export default GarmentMediaCard;