import { useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import GarmentMediaCard from "../components/media/GarmentMediaCard";
import ImageUploadModal, {
  ImageItem,
} from "../components/media/ImageUploadModal";
import DrawingCanvasModal from "../components/media/DrawingCanvasModal";
import ImagePreviewModal from "../components/media/ImagePreviewModal";
import { OrderFormValues } from "../schemas/order.schema";

const AddPicturesPage = () => {
  const { control } = useFormContext<OrderFormValues>();

  const garments =
    useWatch({
      control,
      name: "garments",
    }) || [];

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [drawingOpen, setDrawingOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  const [media, setMedia] = useState<Record<number, ImageItem[]>>({});

  const handleSaveImages = (newItems: ImageItem[]) => {
    if (activeIndex === null) return;

    setMedia((prev) => ({
      ...prev,
      [activeIndex]: [
        ...(prev[activeIndex] || []),
        ...newItems,
      ],
    }));
  };

  const handleUpdateImages = (updated: ImageItem[]) => {
    if (activeIndex === null) return;

    setMedia((prev) => ({
      ...prev,
      [activeIndex]: updated,
    }));
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-semibold mb-8">
        Add Pictures
      </h1>

      <div className="grid grid-cols-2 gap-8">
        {garments.map((garment, index) => (
          <GarmentMediaCard
            key={index}
            customerName="Customer Name"
            garmentType={garment.garmentType}
            orderId={100 + index}
            quantity={garment.quantity}
            onAddFabricPicture={() => {
              setActiveIndex(index);
              setUploadOpen(true);
            }}
            onAddDrawing={() => {
              setActiveIndex(index);
              setDrawingOpen(true);
            }}
            onViewImages={() => {
              setActiveIndex(index);
              setPreviewOpen(true);
            }}
          />
        ))}
      </div>

      <ImageUploadModal
        isOpen={uploadOpen}
        onClose={() => setUploadOpen(false)}
        onSave={handleSaveImages}
      />

      <DrawingCanvasModal
        isOpen={drawingOpen}
        onClose={() => setDrawingOpen(false)}
      />

      <ImagePreviewModal
        isOpen={previewOpen}
        onClose={() => setPreviewOpen(false)}
        images={
          activeIndex !== null
            ? media[activeIndex] || []
            : []
        }
        onUpdate={handleUpdateImages}
      />
    </div>
  );
};

export default AddPicturesPage;