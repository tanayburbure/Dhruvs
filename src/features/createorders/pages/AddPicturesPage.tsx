import { useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import GarmentMediaCard from "../components/media/GarmentMediaCard";
import ImageUploadModal from "../components/media/ImageUploadModal";
import DrawingCanvasModal from "../components/media/DrawingCanvasModal";
import ImagePreviewModal from "../components/media/ImagePreviewModal";
import { OrderFormValues } from "../schemas/order.schema";

const AddPicturesPage = () => {
  const { control } = useFormContext<OrderFormValues>();

  const garments = useWatch({
    control,
    name: "garments",
  }) || [];

  // Track which garment is active
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [drawingOpen, setDrawingOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  // Store images per garment index
  const [media, setMedia] = useState<Record<number, string[]>>({});

  const handleSaveImages = (files: File[]) => {
    if (activeIndex === null) return;

    const urls = files.map((f) => URL.createObjectURL(f));

    setMedia((prev) => ({
      ...prev,
      [activeIndex]: [...(prev[activeIndex] || []), ...urls],
    }));
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-semibold mb-8">Add Pictures</h1>

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

      {/* Upload Modal */}
      <ImageUploadModal
        isOpen={uploadOpen}
        onClose={() => setUploadOpen(false)}
        onSave={handleSaveImages}
      />

      {/* Drawing Modal */}
      <DrawingCanvasModal
        isOpen={drawingOpen}
        onClose={() => setDrawingOpen(false)}
      />

      {/* Preview Modal */}
      <ImagePreviewModal
        isOpen={previewOpen}
        onClose={() => setPreviewOpen(false)}
        images={
          activeIndex !== null
            ? media[activeIndex] || []
            : []
        }
      />
    </div>
  );
};

export default AddPicturesPage;