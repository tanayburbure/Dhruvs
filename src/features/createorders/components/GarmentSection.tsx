import { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useOrderStore } from "../store/orderStore";

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
  "Co Ord Set",
];

const quantityOptions = [1,2,3,4,5,6,7,8,9];

function SSelect({ value, onChange, children, className="" }: any) {

  const [focused,setFocused] = useState(false);

  return (
    <select
      value={value}
      onChange={onChange}
      onFocus={()=>setFocused(true)}
      onBlur={()=>setFocused(false)}
      className={`h-[44px] pl-[14px] pr-[36px] rounded-[10px] text-[13.5px] bg-slate-50 border-[1.5px] outline-none transition-all appearance-none cursor-pointer ${
        value ? "text-slate-800":"text-slate-400"
      } ${
        focused ? "border-slate-400":"border-slate-200"
      } ${className}`}
    >
      {children}
    </select>
  );
}

const GarmentSection = ({ fieldArray }: Props) => {

  const { append, remove, update, fields } = fieldArray;

  const { watch } = useFormContext();
  const garments = watch("garments");

  const setOrder = useOrderStore((s)=>s.setOrder);

  useEffect(()=>{
    setOrder({ garments });
  },[garments,setOrder]);

  const [selectedType,setSelectedType] = useState("");
  const [selectedQty,setSelectedQty] = useState(1);
  const [editingIndex,setEditingIndex] = useState<number|null>(null);
  const [loading,setLoading] = useState(false);

  const isValid = !!selectedType;

  const handleAdd = async () => {

    if(!selectedType) return;

    const stitchingCost = 7000;
    const total = stitchingCost * selectedQty;

    const newItem = {
      garmentType:selectedType,
      quantity:selectedQty,
      stitchingCost,
      total
    };

    if(editingIndex!==null){
      update(editingIndex,newItem);
      setEditingIndex(null);
    }else{
      append(newItem);
    }

    setSelectedType("");
    setSelectedQty(1);
  };

  const handleEdit = (index:number)=>{

    const item = fields[index];

    setSelectedType(item.garmentType);
    setSelectedQty(item.quantity);
    setEditingIndex(index);
  };

  return (

    <div className="space-y-6 py-2">

      <div className="flex flex-wrap gap-4 items-end">

        <div className="flex flex-col gap-1.5 min-w-[180px]">

          <label className="text-[11px] font-semibold uppercase tracking-[0.09em] text-slate-400">
            Garment Type
          </label>

          <SSelect
            value={selectedType}
            onChange={(e:any)=>setSelectedType(e.target.value)}
          >
            <option value="">Select type…</option>

            {garmentOptions.map(g=>(
              <option key={g} value={g}>
                {g}
              </option>
            ))}

          </SSelect>

        </div>

        <div className="flex flex-col gap-1.5">

          <label className="text-[11px] font-semibold uppercase tracking-[0.09em] text-slate-400">
            Quantity
          </label>

          <SSelect
            value={selectedQty}
            onChange={(e:any)=>setSelectedQty(Number(e.target.value))}
          >
            {quantityOptions.map(q=>(
              <option key={q} value={q}>
                {q}
              </option>
            ))}
          </SSelect>

        </div>

        <button
          type="button"
          onClick={handleAdd}
          disabled={loading || !isValid}
          className={`h-[44px] px-[22px] rounded-[10px] text-[13.5px] font-semibold ${
            isValid
              ? "bg-gradient-to-br from-yellow-300 to-yellow-500 text-[#1c0a00]"
              : "bg-slate-100 text-slate-400 cursor-not-allowed"
          }`}
        >
          {loading ? "Loading…" : editingIndex!==null ? "Update":"Add"}
        </button>

      </div>

      {fields.length>0 && (

        <div className="overflow-x-auto">

          <table className="w-full text-[13.5px] border-collapse">

            <thead>

              <tr className="bg-slate-50 border-b border-slate-200">

                {["Garment Name","Qty","Stitching Cost","Total","",""].map((h,i)=>(

                  <th
                    key={i}
                    className={`px-[14px] py-[10px] text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-400 whitespace-nowrap ${
                      i===0?"text-left":"text-center"
                    }`}
                  >
                    {h}
                  </th>

                ))}

              </tr>

            </thead>

            <tbody>

              {fields.map((item:any,index:number)=>(

                <tr
                  key={item.id}
                  className="border-b border-slate-100 hover:bg-gray-50 transition"
                >

                  <td className="px-[14px] py-[12px] text-slate-800 font-medium">
                    {item.garmentType}
                  </td>

                  <td className="px-[14px] py-[12px] text-center text-slate-600">
                    {item.quantity}
                  </td>

                  <td className="px-[14px] py-[12px] text-center text-slate-600">
                    ₹{item.stitchingCost.toLocaleString("en-IN")}
                  </td>

                  <td className="px-[14px] py-[12px] text-center font-semibold text-slate-800">
                    ₹{item.total.toLocaleString("en-IN")}
                  </td>

                  <td className="px-[14px] py-[12px] text-center">

                    <button
                      type="button"
                      onClick={()=>handleEdit(index)}
                      className="w-[30px] h-[30px] rounded-[8px] border-[1.5px] border-slate-200 bg-slate-50"
                    >
                      ✎
                    </button>

                  </td>

                  <td className="px-[14px] py-[12px] text-center">

                    <button
                      type="button"
                      onClick={()=>remove(index)}
                      className="w-[30px] h-[30px] rounded-[8px] border-[1.5px] border-red-200 bg-red-50"
                    >
                      🗑
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

      {fields.length===0 && (

        <div className="px-[32px] py-[32px] text-center rounded-[10px] border-[1.5px] border-dashed border-slate-200 bg-slate-50">

          <p className="text-[13px] text-slate-400 m-0">
            No garments added yet — select a type and click Add
          </p>

        </div>

      )}

    </div>

  );
};

export default GarmentSection;