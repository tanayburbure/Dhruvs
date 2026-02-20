import Modal from "@/shared/components/Modal";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
}

const ImagePreviewModal = ({ isOpen, onClose, images }: Props) => {
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
            <img
              key={i}
              src={img}
              alt="preview"
              className="rounded-lg"
            />
          ))
        )}
      </div>
    </Modal>
  );
};

export default ImagePreviewModal;