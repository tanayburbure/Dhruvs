import { useState } from "react";

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
const quantityOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const GarmentSection = ({ fieldArray }: Props) => {
  const { append, remove, update, fields } = fieldArray;

  const [selectedType, setSelectedType] = useState("");
  const [selectedQty, setSelectedQty] = useState(1);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    if (!selectedType) return;
  
    const stitchingCost = 7000;
    const total = stitchingCost * selectedQty;
  
    const newItem = {
      garmentType: selectedType,
      quantity: selectedQty,
      stitchingCost,
      total,
    };
  
    if (editingIndex !== null) {
      update(editingIndex, newItem);
      setEditingIndex(null);
    } else {
      append(newItem);
    }
  
    setSelectedType("");
    setSelectedQty(1);
  };
  

  const handleEdit = (index: number) => {
    const item = fields[index];
    setSelectedType(item.garmentType);
    setSelectedQty(item.quantity);
    setEditingIndex(index);
  };

  return (
    <div className="bg-gray-100 p-6 rounded-xl space-y-6">
      <h2 className="text-xl font-semibold">Add Order Details</h2>

      {/* Top Controls */}
      <div className="flex gap-4 items-end">
        <div>
          <label className="block text-sm font-medium">
            Garment Type
          </label>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-4 py-2 rounded-lg border"
          >
            <option value="">Select Type</option>
            {garmentOptions.map((g) => (
              <option key={g}>{g}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">
            Quantity
          </label>
          <select
            value={selectedQty}
            onChange={(e) => setSelectedQty(Number(e.target.value))}
            className="px-4 py-2 rounded-lg border"
          >
            {quantityOptions.map((q) => (
              <option key={q}>{q}</option>
            ))}
          </select>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          disabled={loading}
          className="px-6 py-2 bg-yellow-500 text-white rounded-lg"
        >
          {loading
            ? "Loading..."
            : editingIndex !== null
            ? "Update"
            : "Add"}
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto py-12">
        <table className="w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left">Garment Name</th>
              <th className="p-3">Quantity</th>
              <th className="p-3">Stitching Cost</th>
              <th className="p-3">Total</th>
              <th className="p-3">Edit</th>
              <th className="p-3">Delete</th>
            </tr>
          </thead>

          <tbody>
            {fields.map((item: any, index: number) => (
              <tr key={item.id} className="border-t text-center">
                <td className="p-3 text-left">
                  {item.garmentType}
                </td>
                <td>{item.quantity}</td>
                <td>{item.stitchingCost}</td>
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

export default GarmentSection;
