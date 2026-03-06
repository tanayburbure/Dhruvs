import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { OrderFormValues } from "../schemas/order.schema";

interface Props {
  fieldArray: any;
}

const garmentOptions = [
  "Kurta Pajama","Men's Suit","Pants","Shirt","Nehru Jacket",
  "Waist Coat","Sherwani","Indo Western","Blazer","Kurta",
  "Pajama","Dhoti","T Shirt","Co Ord Set",
];

const fabricOptions = [
  "Cotton","Silk","Linen","Wool","Khadi","Denim","Rayon","Polyester",
];

const quantityOptions = [1,2,3,4,5,6,7,8,9];

/* ── Shared select ────────────────────────────────────────── */
function SSelect({ value, onChange, children, className="" }: any) {
  const [focused, setFocused] = useState(false);

  return (
    <select
      value={value}
      onChange={onChange}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      className={`h-[44px] pl-[14px] pr-[36px] rounded-[10px] text-[13.5px] bg-slate-50 border-[1.5px] outline-none transition-all duration-[180ms] appearance-none cursor-pointer ${
        value ? "text-slate-800" : "text-slate-400"
      } ${
        focused
          ? "border-slate-400 shadow-[0_0_0_3px_rgba(148,163,184,0.12)]"
          : "border-slate-200"
      } ${className}`}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right 13px center",
      }}
    >
      {children}
    </select>
  );
}

/* ── Shared input ─────────────────────────────────────────── */
function SInput({ value, onChange, type="text", placeholder, className="" }: any) {
  const [focused, setFocused] = useState(false);

  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      className={`h-[44px] px-[14px] rounded-[10px] text-[13.5px] text-slate-800 bg-slate-50 border-[1.5px] outline-none transition-all duration-[180ms] ${
        focused
          ? "border-slate-400 shadow-[0_0_0_3px_rgba(148,163,184,0.12)]"
          : "border-slate-200"
      } ${className}`}
    />
  );
}

/* ── Field wrapper ────────────────────────────────────────── */
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-[6px]">
      <label className="text-[11px] font-semibold uppercase tracking-[0.09em] text-slate-400">
        {label}
      </label>
      {children}
    </div>
  );
}

/* ── Main ─────────────────────────────────────────────────── */
const FabricSection = ({ fieldArray }: Props) => {
  const { append, remove, update } = fieldArray;
  const { watch } = useFormContext<OrderFormValues>();
  const fabrics = watch("fabrics");

  const [garmentType, setGarmentType] = useState("");
  const [fabricName, setFabricName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState<number | "">("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const isValid = garmentType && fabricName && Number(price) > 0;

  const handleAddFabric = () => {
    if (!isValid) return;

    const total = quantity * Number(price);
    const newItem = { garmentType, fabricName, quantity, price: Number(price), total };

    if (editingIndex !== null) {
      update(editingIndex, newItem);
      setEditingIndex(null);
    } else {
      append(newItem);
    }

    setGarmentType("");
    setFabricName("");
    setQuantity(1);
    setPrice("");
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
    <div className="space-y-6 py-2">

      {/* Controls */}
      <div className="flex flex-wrap gap-4 items-end">

        <Field label="Garment Type">
          <SSelect value={garmentType} onChange={(e:any)=>setGarmentType(e.target.value)} className="min-w-[160px]">
            <option value="">Select type…</option>
            {garmentOptions.map(g=>(
              <option key={g} value={g}>{g}</option>
            ))}
          </SSelect>
        </Field>

        <Field label="Fabric">
          <SSelect value={fabricName} onChange={(e:any)=>setFabricName(e.target.value)} className="min-w-[140px]">
            <option value="">Select fabric…</option>
            {fabricOptions.map(f=>(
              <option key={f} value={f}>{f}</option>
            ))}
          </SSelect>
        </Field>

        <Field label="Quantity">
          <SSelect value={quantity} onChange={(e:any)=>setQuantity(Number(e.target.value))} className="min-w-[100px]">
            {quantityOptions.map(q=>(
              <option key={q} value={q}>{q}</option>
            ))}
          </SSelect>
        </Field>

        <Field label="Price (₹)">
          <SInput
            type="number"
            value={price}
            placeholder="0"
            onChange={(e:any)=>setPrice(e.target.value===""?"":Number(e.target.value))}
            className="w-[110px]"
          />
        </Field>

        <button
          type="button"
          onClick={handleAddFabric}
          disabled={!isValid}
          className={`h-[44px] px-[22px] rounded-[10px] text-[13.5px] font-semibold transition-all ${
            isValid
              ? "bg-gradient-to-br from-yellow-300 to-yellow-500 text-[#1c0a00] hover:-translate-y-[1px] hover:shadow-[0_4px_14px_rgba(234,179,8,0.35)]"
              : "bg-slate-100 text-slate-400 cursor-not-allowed"
          }`}
        >
          {editingIndex !== null ? "Update" : "Add Fabric"}
        </button>

      </div>

      {/* Table */}
      {fabrics?.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full text-[13.5px] border-collapse">

            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                {["Garment Type","Fabric","Qty","Price","Total","",""].map((h,i)=>(
                  <th
                    key={i}
                    className={`px-[14px] py-[10px] text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-400 whitespace-nowrap ${
                      i<2?"text-left":"text-center"
                    }`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {fabrics.map((item:any,index:number)=>(
                <tr
                  key={index}
                  className="border-b border-slate-100 hover:bg-gray-50 transition"
                >
                  <td className="px-[14px] py-[12px] text-slate-800 font-medium">{item.garmentType}</td>
                  <td className="px-[14px] py-[12px] text-slate-600">{item.fabricName}</td>
                  <td className="px-[14px] py-[12px] text-center text-slate-600">{item.quantity}</td>
                  <td className="px-[14px] py-[12px] text-center text-slate-600">₹{item.price.toLocaleString("en-IN")}</td>
                  <td className="px-[14px] py-[12px] text-center font-semibold text-slate-800">₹{item.total.toLocaleString("en-IN")}</td>

                  {/* Edit */}
                  <td className="px-[14px] py-[12px] text-center">
                    <button
                      type="button"
                      onClick={()=>handleEdit(index)}
                      className="w-[30px] h-[30px] rounded-[8px] border-[1.5px] border-slate-200 bg-slate-50 flex items-center justify-center text-slate-500 hover:border-slate-400 hover:text-slate-800 transition"
                    >
                      ✎
                    </button>
                  </td>

                  {/* Delete */}
                  <td className="px-[14px] py-[12px] text-center">
                    <button
                      type="button"
                      onClick={()=>remove(index)}
                      className="w-[30px] h-[30px] rounded-[8px] border-[1.5px] border-red-200 bg-red-50 flex items-center justify-center text-red-400 hover:bg-red-200 hover:text-red-500 transition"
                    >
                      🗑
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      ) : (
        <div className="px-[32px] py-[32px] text-center rounded-[10px] border-[1.5px] border-dashed border-slate-200 bg-slate-50">
          <p className="text-[13px] text-slate-400 m-0">
            No fabrics added yet — fill in the fields and click Add Fabric
          </p>
        </div>
      )}

    </div>
  );
};

export default FabricSection;