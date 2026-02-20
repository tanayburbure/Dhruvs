import { useState } from "react";
import { useForm, FormProvider, useFieldArray, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { orderSchema, OrderFormValues } from "../schemas/order.schema";
import CustomerDetailsSection from "./CustomerDetailsSection";
import GarmentSection from "./GarmentSection";
import FabricSection from "./FabricSection";
import SpecialInstructionsModal from "./SpecialInstructionsModal";
import DeliveryDatePicker from "./DeliveryDatePicker";
import OrderSummary from "./OrderSummary";
import {
  calculateGarmentTotal,
  calculateFabricTotal,
} from "./utils/calculateTotals";
import MeasurementsSection from "./MeasurementsSection";
import AddPicturesPage from "../pages/AddPicturesPage";
import FinalOrderSummary from "../pages/FinalReviewPage";


const CreateOrderForm = () => {
  const methods = useForm<OrderFormValues>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      fullName: "",
      mobile: "",
      email: "",
      city: "",
      state: "",
      garments: [],
      fabrics: [],
      measurements: {
        shoulder: undefined,
        sleeveLength: undefined,
        chest: undefined,
        stomach: undefined,
        neck: undefined,
        frontShoulder: undefined,
        backShoulder: undefined,
        length: undefined,
        waist: undefined,
        hip: undefined,
        front: undefined,
        thigh: undefined,
        knee: undefined,
        legOpening: undefined,
        bottom: undefined,
      },
    },
  });

  const {
    handleSubmit,
    control,
  } = methods;

  const garmentFieldArray = useFieldArray({
    control,
    name: "garments",
  });

  const fabricFieldArray = useFieldArray({
    control,
    name: "fabrics",
  });

  const onSubmit = (data: OrderFormValues) => {
    console.log("Final Order Data:", data);
  };

  const [isInstructionOpen, setIsInstructionOpen] = useState(false);

  // Calculate total from garments and fabrics
  const garments = useWatch({ control, name: "garments" }) || [];
  const fabrics = useWatch({ control, name: "fabrics" }) || [];
  const garmentTotal = calculateGarmentTotal(garments);
  const fabricTotal = calculateFabricTotal(fabrics);
  const calculatedTotal = garmentTotal + fabricTotal;


  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

        <CustomerDetailsSection />

        <GarmentSection fieldArray={garmentFieldArray} />

        <FabricSection fieldArray={fabricFieldArray} />
        <div className="flex gap-6 items-center">

          {/* Special Instructions */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Special Instructions
            </label>
            <button
              type="button"
              onClick={() => setIsInstructionOpen(true)}
              className="px-4 py-2 border rounded-lg"
            >
              Add Instructions
            </button>
          </div>

          {/* Delivery Date */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Delivery Date
            </label>
            <DeliveryDatePicker />
          </div>

        </div>

        <SpecialInstructionsModal
          isOpen={isInstructionOpen}
          onClose={() => setIsInstructionOpen(false)}
        />
        <div>
          <OrderSummary />
        </div>
        <MeasurementsSection />
        <AddPicturesPage/>
        <FinalOrderSummary/>

        <button
          type="submit"
          className="px-6 py-2 bg-yellow-500 text-white rounded-md"
        >
          Create Order
        </button>
      </form>
    </FormProvider>
  );
};

export default CreateOrderForm;
