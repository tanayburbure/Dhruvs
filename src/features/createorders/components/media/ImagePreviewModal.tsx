import Modal from "@/shared/components/Modal";
import { ImageItem } from "./ImageUploadModal";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  images: ImageItem[];
  onUpdate: (updated: ImageItem[]) => void;
}

const ImagePreviewModal = ({
  isOpen,
  onClose,
  images,
  onUpdate,
}: Props) => {

  const handleDescriptionChange = (index: number, value: string) => {
    const updated = images.map((img, i) =>
      i === index ? { ...img, description: value } : img
    );
    onUpdate(updated);
  };

  const handleDelete = (index: number) => {
    const updated = images.filter((_, i) => i !== index);
    onUpdate(updated);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-lg font-semibold mb-4">
        View / Edit Images
      </h2>

      <div className="grid grid-cols-2 gap-4">
        {images.length === 0 ? (
          <p>No images uploaded</p>
        ) : (
          images.map((img, i) => (
            <div key={i} className="flex flex-col gap-2">
              <img
                src={img.preview}
                alt="preview"
                className="rounded-lg h-32 object-cover"
              />

              <input
                type="text"
                value={img.description}
                onChange={(e) =>
                  handleDescriptionChange(i, e.target.value)
                }
                className="border rounded-md px-2 py-1"
              />

              <button
                onClick={() => handleDelete(i)}
                className="px-2 py-1 bg-red-600 text-white rounded-md"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </Modal>
  );
};

export default ImagePreviewModal;