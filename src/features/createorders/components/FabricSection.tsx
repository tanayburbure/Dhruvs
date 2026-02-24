import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { OrderFormValues } from "../schemas/order.schema";

interface Props {
  fieldArray: any;
}

const garmentOptions = [
  "Kurta Pajama",
  "Men's Suit",
  "Pants",
  "Shirt",
  "Nehru Jacket",
  "Waist Coat",
  "Sherwani",
  "Indo Western",
  "Blazer",
  "Kurta",
  "Pajama",
  "Dhoti",
  "T Shirt",
  "Co Ord Set"
];
const fabricOptions =[
  "Cotton",
  "Silk",
  "Linen",
  "Wool",
  "Khadi",
  "Denim",
  "Rayon",
  "Polyester",
];
const quantityOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const FabricSection = ({ fieldArray }: Props) => {
  const { append, remove, update } = fieldArray;
  const { watch } = useFormContext<OrderFormValues>();

  const fabrics = watch("fabrics");

  const [garmentType, setGarmentType] = useState("");
  const [fabricName, setFabricName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleAddFabric = () => {
    if (!garmentType || !fabricName || price <= 0) return;

    const total = quantity * price;

    const newItem = {
      garmentType,
      fabricName,
      quantity,
      price,
      total,
    };

    if (editingIndex !== null) {
      update(editingIndex, newItem);
      setEditingIndex(null);
    } else {
      append(newItem);
    }

    // Reset fields
    setGarmentType("");
    setFabricName("");
    setQuantity(1);
    setPrice(0);
  };

  const handleEdit = (index: number) => {
    const item = fabrics[index];
    setGarmentType(item.garmentType);
    setFabricName(item.fabricName);
    setQuantity(item.quantity);
    setPrice(item.price);
    setEditingIndex(index);
  };

  return (
    <div className="bg-gray-100 p-8 py-12 rounded-xl space-y-6 border border-blue-400">
      <h2 className="text-xl font-semibold">Fabric Selection</h2>

      {/* Top Controls */}
      <div className="flex flex-wrap gap-4 items-end">
        {/* Garment Type */}
        <div>
          <label className="block text-sm font-medium">
            Garment Type
          </label>
          <select
            value={garmentType}
            onChange={(e) => setGarmentType(e.target.value)}
            className="px-4 py-2 rounded-lg border"
          >
            <option value="">Select Style</option>
            {garmentOptions.map((g) => (
              <option key={g}>{g}</option>
            ))}
          </select>
        </div>

        {/* Fabric Name */}
        <div>
          <label className="block text-sm font-medium">
            Select Fabric
          </label>
          <select
            value={fabricName}
            onChange={(e) => setFabricName(e.target.value)}
            className="px-4 py-2 rounded-lg border"
          >
            <option value="">Select Style</option>
            {fabricOptions.map((f) => (
              <option key={f}>{f}</option>
            ))}
          </select>
        </div>

        {/* Quantity */}
        <div>
          <label className="block text-sm font-medium">
            Select Quantity
          </label>
          <select
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="px-4 py-2 rounded-lg border"
          >
            {quantityOptions.map((q) => (
              <option key={q}>{q}</option>
            ))}
          </select>
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium">
            Price
          </label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            placeholder="Add Price"
            className="px-4 py-2 rounded-lg border"
          />
        </div>

        <button
          type="button"
          onClick={handleAddFabric}
          className="px-6 py-2 bg-yellow-500 text-white rounded-lg"
        >
          {editingIndex !== null ? "Update" : "Add Fabric"}
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left">Garment Type</th>
              <th className="p-3 text-left">Fabric Name</th>
              <th className="p-3">Quantity</th>
              <th className="p-3">Price</th>
              <th className="p-3">Total</th>
              <th className="p-3">Edit</th>
              <th className="p-3">Delete</th>
            </tr>
          </thead>

          <tbody>
            {fabrics?.map((item, index) => (
              <tr key={index} className="border-t text-center">
                <td className="p-3 text-left">
                  {item.garmentType}
                </td>
                <td className="text-left">
                  {item.fabricName}
                </td>
                <td>{item.quantity}</td>
                <td>{item.price}</td>
                <td>{item.total}</td>
                <td>
                  <button
                    type="button"
                    onClick={() => handleEdit(index)}
                  >
                    ✏️
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    onClick={() => remove(index)}
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FabricSection;
