import { Camera, Brush, Image } from "lucide-react";

type Props = {
  customerName: string;
  garmentType: string;
  orderId: number;
  quantity: number;
  onAddFabricPicture: () => void;
  onAddDrawing: () => void;
  onViewImages: () => void;
};

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
        <Camera size={20} />
      </div>

      <hr />

      <div
        onClick={onAddDrawing}
        className="flex justify-between items-center cursor-pointer hover:bg-gray-50 p-2 rounded-lg"
      >
        <span>Add Drawing</span>
        <Brush size={20} />
      </div>

      <hr />

      <div
        onClick={onViewImages}
        className="flex justify-between items-center cursor-pointer hover:bg-gray-50 p-2 rounded-lg"
      >
        <span>View/Edit Images</span>
        <Image size={20} />
      </div>

    </div>
  );
};

export default GarmentMediaCard;