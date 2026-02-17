import { useFormContext } from "react-hook-form";

const GarmentSection = ({ fieldArray }: any) => {
  const { register } = useFormContext();
  const { fields, append, remove } = fieldArray;

  return (
    <div>
      <h2 className="text-xl font-semibold">Garments</h2>

      {fields.map((field: any, index: number) => (
        <div key={field.id} className="flex gap-4 mb-2">
          <input
            {...register(`garments.${index}.garmentType`)}
            placeholder="Garment Type"
          />
          <input
            type="number"
            {...register(`garments.${index}.quantity`, { valueAsNumber: true })}
            placeholder="Quantity"
          />
          <input
            type="number"
            {...register(`garments.${index}.stitchingCost`, { valueAsNumber: true })}
            placeholder="Stitching Cost"
          />
          <button type="button" onClick={() => remove(index)}>
            Delete
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={() =>
          append({ garmentType: "", quantity: 1, stitchingCost: 0 })
        }
        className="px-4 py-1 bg-yellow-500 text-white rounded"
      >
        Add Garment
      </button>
    </div>
  );
};

export default GarmentSection;
