// Use inline SVG icons to fix the "Cannot find module 'lucide-react'" error.

type Props = {
  customerName: string;
  garmentType: string;
  orderId: number;
  quantity: number;
  onAddFabricPicture: () => void;
  onAddDrawing: () => void;
  onViewImages: () => void;
};

// Inline SVGs for icons
const CameraIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="3" y="7" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" stroke="currentColor" strokeWidth="2" />
    <circle cx="12" cy="14" r="3" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const BrushIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M19 15V4a2 2 0 0 0-2-2H7A2 2 0 0 0 5 4v11a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2Z" stroke="currentColor" strokeWidth="2" />
    <path d="M9 18l6 3-6 3v-6Z" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const ImageIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
    <circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" strokeWidth="2" />
    <path d="M21 21l-6-6a2 2 0 0 0-2.828 0l-7 7" stroke="currentColor" strokeWidth="2" />
  </svg>
);

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
    <div className="bg-white rounded-2xl shadow-md p-6 border space-y-4">

      <div>
        <p className="font-semibold text-lg">{customerName}</p>
        <p>Garment Type : {garmentType}</p>
        <p>Order Id : {orderId}</p>
        <p>Quantity : {quantity}</p>
      </div>

      <hr />

      <div
        onClick={onAddFabricPicture}
        className="flex justify-between items-center cursor-pointer hover:bg-gray-50 p-2 rounded-lg"
      >
        <span>Add Fabric Picture</span>
        <CameraIcon size={20} />
      </div>

      <hr />

      <div
        onClick={onAddDrawing}
        className="flex justify-between items-center cursor-pointer hover:bg-gray-50 p-2 rounded-lg"
      >
        <span>Add Drawing</span>
        <BrushIcon size={20} />
      </div>

      <hr />

      <div
        onClick={onViewImages}
        className="flex justify-between items-center cursor-pointer hover:bg-gray-50 p-2 rounded-lg"
      >
        <span>View/Edit Images</span>
        <ImageIcon size={20} />
      </div>

    </div>
  );
};

export default GarmentMediaCard;