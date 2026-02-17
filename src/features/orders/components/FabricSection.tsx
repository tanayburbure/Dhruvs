import { useFormContext } from "react-hook-form";

const FabricSection = ({ fieldArray }: any) => {
  const { register } = useFormContext();
  const { fields, append, remove } = fieldArray;

  return (
    <div>
      <h2 className="text-xl font-semibold">Fabrics</h2>

      {fields.map((field: any, index: number) => (
        <div key={field.id} className="flex gap-4 mb-2">
          <input
            {...register(`fabrics.${index}.garmentType`)}
            placeholder="Garment Type"
          />
          <input
            {...register(`fabrics.${index}.fabricName`)}
            placeholder="Fabric Name"
          />
          <input
            type="number"
            {...register(`fabrics.${index}.quantity`, { valueAsNumber: true })}
            placeholder="Quantity"
          />
          <input
            type="number"
            {...register(`fabrics.${index}.price`, { valueAsNumber: true })}
            placeholder="Price"
          />
          <button type="button" onClick={() => remove(index)}>
            Delete
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={() =>
          append({ garmentType: "", fabricName: "", quantity: 1, price: 0 })
        }
        className="px-4 py-1 bg-yellow-500 text-white rounded"
      >
        Add Fabric
      </button>
    </div>
  );
};

export default FabricSection;
