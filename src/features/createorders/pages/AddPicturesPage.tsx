import { useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import GarmentMediaCard from "../components/media/GarmentMediaCard";
import ImageUploadModal, { ImageItem } from "../components/media/ImageUploadModal";
import DrawingCanvasModal from "../components/media/DrawingCanvasModal";
import ImagePreviewModal from "../components/media/ImagePreviewModal";
import { OrderFormValues } from "../schemas/order.schema";

const AddPicturesPage = () => {
  const { control } = useFormContext<OrderFormValues>();

  const garments = useWatch({ control, name: "garments" }) || [];

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [drawingOpen, setDrawingOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [media, setMedia] = useState<Record<number, ImageItem[]>>({});

  const handleSaveImages = (newItems: ImageItem[]) => {
    if (activeIndex === null) return;
    setMedia((prev) => ({
      ...prev,
      [activeIndex]: [...(prev[activeIndex] || []), ...newItems],
    }));
  };

  const handleUpdateImages = (updated: ImageItem[]) => {
    if (activeIndex === null) return;
    setMedia((prev) => ({ ...prev, [activeIndex]: updated }));
  };

  return (
    <div className="py-2">

      {garments.length > 0 ? (
        <div className="flex flex-wrap gap-4">
          {garments.map((garment, index) => (
            <GarmentMediaCard
              key={index}
              customerName="Customer Name"
              garmentType={garment.garmentType}
              orderId={100 + index}
              quantity={garment.quantity}
              onAddFabricPicture={() => { setActiveIndex(index); setUploadOpen(true); }}
              onAddDrawing={() => { setActiveIndex(index); setDrawingOpen(true); }}
              onViewImages={() => { setActiveIndex(index); setPreviewOpen(true); }}
            />
          ))}
        </div>
      ) : (
        <div style={{
          padding: "32px", textAlign: "center", borderRadius: "10px",
          border: "1.5px dashed #e2e8f0", background: "#f8fafc",
        }}>
          <p style={{ fontSize: "13px", color: "#94a3b8", margin: 0 }}>
            No garments added yet — add garments above to attach pictures
          </p>
        </div>
      )}

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
        images={activeIndex !== null ? media[activeIndex] || [] : []}
        onUpdate={handleUpdateImages}
      />

    </div>
  );
};

export default AddPicturesPage;