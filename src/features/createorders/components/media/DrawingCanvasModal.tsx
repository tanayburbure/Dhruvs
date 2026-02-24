import Modal from "@/shared/components/Modal";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const DrawingCanvasModal = ({ isOpen, onClose }: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-lg font-semibold mb-4">Drawing Canvas</h2>

      <div className="border h-64 flex items-center justify-center">
        Canvas Area (Integrate Fabric.js here)
      </div>
    </Modal>
  );
};

export default DrawingCanvasModal;