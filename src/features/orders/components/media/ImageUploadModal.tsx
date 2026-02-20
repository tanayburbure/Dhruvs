import { useState } from "react";
import Modal from "@/shared/components/Modal";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (files: File[]) => void;
}

const ImageUploadModal = ({ isOpen, onClose, onSave }: Props) => {
  const [files, setFiles] = useState<File[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleSave = () => {
    onSave(files);
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