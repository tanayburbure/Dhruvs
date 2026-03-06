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
  <svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
    <rect x="3" y="7" width="18" height="13" rx="2" />
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
    <circle cx="12" cy="14" r="3" />
  </svg>
);

const BrushIcon = () => (
  <svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
    <path d="M19 15V4a2 2 0 0 0-2-2H7A2 2 0 0 0 5 4v11a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2Z" />
    <path d="M9 18l6 3-6 3v-6Z" />
  </svg>
);

const ImageIcon = () => (
  <svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
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
      className={`flex items-center justify-between px-[12px] py-[13px] rounded-[13px] cursor-pointer border-2 ${
        hovered ? "bg-[#f8fafc] border-[#e2e8f0]" : "border-transparent"
      }`}
    >
      <span className={`text-[16.5px] font-semibold ${hovered ? "text-[#1e293b]" : "text-[#475569]"}`}>
        {label}
      </span>

      <span className={hovered ? "text-[#1e293b]" : "text-[#94a3b8]"}>
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
    <div className="bg-white rounded-[16px] border-2 border-[#e2e8f0] px-[18px] py-[22px] flex flex-col gap-[20px] w-[310px]">

      <div className="flex flex-col gap-[10px]">
        <p className="text-[19px] font-extrabold text-[#1e293b]">
          {customerName}
        </p>

        <div className="flex flex-col gap-[7px]">
          {[
            ["Garment", garmentType],
            ["Order ID", `#${orderId}`],
            ["Quantity", quantity],
          ].map(([key, val]) => (
            <div key={key} className="flex justify-between">
              <span className="text-[13.5px] font-bold uppercase text-[#94a3b8]">
                {key}
              </span>

              <span className="text-[15px] font-semibold text-[#475569]">
                {val}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="h-[1.5px] bg-[#f1f5f9]" />

      <div className="flex flex-col gap-[6px]">
        <ActionRow label="Add Fabric Picture" icon={<CameraIcon />} onClick={onAddFabricPicture} />
        <ActionRow label="Add Drawing" icon={<BrushIcon />} onClick={onAddDrawing} />
        <ActionRow label="View / Edit Images" icon={<ImageIcon />} onClick={onViewImages} />
      </div>

    </div>
  );
};

export default GarmentMediaCard;