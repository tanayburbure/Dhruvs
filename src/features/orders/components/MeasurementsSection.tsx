import { useFormContext } from "react-hook-form";
import { OrderFormValues } from "../schemas/order.schema";

type MeasurementKeys = keyof OrderFormValues["measurements"];

const fields: MeasurementKeys[] = [
  "shoulder",
  "sleeveLength",
  "chest",
  "stomach",
  "neck",
  "frontShoulder",
  "backShoulder",
  "length",
  "waist",
  "hip",
  "front",
  "thigh",
  "knee",
  "legOpening",
  "bottom",
];

const MeasurementsSection = () => {
  const { register } = useFormContext<OrderFormValues>();

  return (
    <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
      <h2 className="text-xl font-semibold">Add Measurements</h2>

      <div className="grid grid-cols-3 gap-6">
        {fields.map((field) => (
          <div key={field} className="flex flex-col">
            <label className="text-sm mb-1 capitalize">
              {field.replace(/([A-Z])/g, " $1")}
            </label>

            <input
              type="number"
              step="0.1"
              {...register(`measurements.${field}`, {
                valueAsNumber: true,
              })}
              className="border rounded-md p-2"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MeasurementsSection;