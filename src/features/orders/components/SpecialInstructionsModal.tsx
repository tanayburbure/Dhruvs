import { useFormContext } from "react-hook-form";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const SpecialInstructionsModal = ({ isOpen, onClose }: Props) => {
  const { register } = useFormContext();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[400px] p-6 rounded-xl shadow-lg">
        <h2 className="text-lg font-semibold mb-4">
          Add Instructions
        </h2>

        <textarea
          {...register("specialInstructions")}
          placeholder="Write special instructions..."
          className="w-full h-32 border rounded-lg p-3"
        />

        <div className="flex justify-end mt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-yellow-500 text-white rounded-lg"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpecialInstructionsModal;
