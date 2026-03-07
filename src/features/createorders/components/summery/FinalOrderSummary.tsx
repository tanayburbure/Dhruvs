import { useFormContext } from "react-hook-form";
import FinalReviewPageComponent from "@/features/createorders/pages/FinalReviewPageComponent";
import { useOrderStore } from "../../store/orderStore";

const FinalOrderSummary = () => {

  const { getValues } = useFormContext();
  const order = useOrderStore((s) => s.order);

  const handlePrint = () => {
    window.print();
  };

  const handleFinish = () => {

    const data = getValues();

    console.log("Final Order Submitted:", data);
    console.log("Zustand Order Data:", order);

  };

  return (
    <div className="p-10 space-y-6">

      <h1 className="text-2xl font-semibold">
        Final Order Summary
      </h1>

      <FinalReviewPageComponent />

      <div className="flex justify-center gap-6 mt-6">

        <button
          onClick={handlePrint}
          className="px-6 py-2 bg-yellow-500 text-white rounded-full"
        >
          Print
        </button>

        <button
          onClick={handleFinish}
          className="px-6 py-2 bg-gray-400 text-white rounded-full"
        >
          Finish Order
        </button>

      </div>

    </div>
  );
};

export default FinalOrderSummary;