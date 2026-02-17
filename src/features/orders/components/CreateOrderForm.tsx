import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { orderSchema, OrderFormValues } from "../schemas/order.schema";
import CustomerDetailsSection from "./CustomerDetailsSection";
import GarmentSection from "./GarmentSection";
import FabricSection from "./FabricSection";

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

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

        <CustomerDetailsSection />

        <GarmentSection fieldArray={garmentFieldArray} />

        <FabricSection fieldArray={fabricFieldArray} />

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
