import { useState, useEffect } from "react";
import Modal from "@/shared/components/Modal";

export interface ImageItem {
  preview: string;
  description: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (items: ImageItem[]) => void;
}

const ImageUploadModal = ({ isOpen, onClose, onSave }: Props) => {
  const [images, setImages] = useState<ImageItem[]>([]);

  // Reset every time modal opens
  useEffect(() => {
    if (isOpen) {
      setImages([]);
    }
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const newFiles = Array.from(e.target.files).map((file) => ({
      preview: URL.createObjectURL(file),
      description: "",
    }));

    setImages((prev) => [...prev, ...newFiles]);
  };

  const handleDescriptionChange = (index: number, value: string) => {
    setImages((prev) =>
      prev.map((img, i) =>
        i === index ? { ...img, description: value } : img
      )
    );
  };

  const handleSave = () => {
    onSave(images);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-lg font-semibold mb-4">
        Upload Fabric Pictures
      </h2>

      <input
        type="file"
        multiple
        onChange={handleChange}
        className="mb-4"
      />

      <div className="grid grid-cols-2 gap-4 mb-4">
        {images.map((img, index) => (
          <div key={index} className="flex flex-col gap-2">
            <img
              src={img.preview}
              alt="preview"
              className="rounded-lg h-32 object-cover"
            />
            <input
              type="text"
              placeholder="Enter description"
              value={img.description}
              onChange={(e) =>
                handleDescriptionChange(index, e.target.value)
              }
              className="border rounded-md px-2 py-1"
            />
          </div>
        ))}
      </div>

      <button
        onClick={handleSave}
        className="px-4 py-2 bg-blue-600 text-white rounded-md"
      >
        Save Images
      </button>
    </Modal>
  );
};

export default ImageUploadModal;