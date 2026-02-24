import { useState } from "react";
import Modal from "@/shared/components/Modal";
import PaymentPanel from "./PaymentPanel";

interface PaymentModalProps {
  total: number;
}

const PaymentModal = ({ total }: PaymentModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="px-6 py-2 bg-yellow-500 text-white rounded-md"
      >
        Payment Method
      </button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <PaymentPanel total={total} onClose={() => setIsOpen(false)} />
      </Modal>
    </>
  );
};

export default PaymentModal;