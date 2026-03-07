import { useFormContext, useWatch } from "react-hook-form";
import { useEffect } from "react";
import {
  calculateGarmentTotal,
  calculateFabricTotal,
} from "./utils/calculateTotals";
import PaymentModal from "./PaymentModal";
import { useOrderStore } from "../store/orderStore";

const OrderSummary = () => {
  const { control } = useFormContext();

  const garments = useWatch({ control, name: "garments" }) || [];
  const fabrics = useWatch({ control, name: "fabrics" }) || [];
  const fullName = useWatch({ control, name: "fullName" });

  const garmentTotal = calculateGarmentTotal(garments);
  const fabricTotal = calculateFabricTotal(fabrics);
  const grandTotal = garmentTotal + fabricTotal;

  const order = useOrderStore((s) => s.order);
  const setOrder = useOrderStore((s) => s.setOrder);

  useEffect(() => {
    setOrder({
      ...order,
      garments,
      fabrics,
    });
  }, [garments, fabrics]);

  return (
    <div className="space-y-6 py-2">

      <div className="flex items-center justify-between">
        <div />

        <div className="text-right">
          {fullName && (
            <p className="text-[13px] font-medium text-slate-600 m-0">
              {fullName}
            </p>
          )}
          <p className="text-[11px] text-slate-400 m-0">Order #3</p>
        </div>
      </div>

      {garments.length > 0 && (
        <div>

          <p className="text-[11px] font-semibold uppercase tracking-[0.09em] text-slate-400 mb-[8px]">
            Garments
          </p>

          <table className="w-full border-collapse text-[13.5px]">

            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                {["Garment", "Qty", "Stitching Cost", "Total"].map((h, i) => (
                  <th
                    key={h}
                    className={`px-[14px] py-[9px] text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-400 ${
                      i === 0 ? "text-left" : "text-center"
                    }`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {garments.map((g: any, i: number) => (
                <tr
                  key={i}
                  className="border-b border-slate-100 hover:bg-gray-50 transition"
                >
                  <td className="px-[14px] py-[11px] text-slate-800 font-medium">
                    {g.garmentType}
                  </td>

                  <td className="px-[14px] py-[11px] text-center text-slate-600">
                    {g.quantity}
                  </td>

                  <td className="px-[14px] py-[11px] text-center text-slate-600">
                    ₹{g.stitchingCost.toLocaleString("en-IN")}
                  </td>

                  <td className="px-[14px] py-[11px] text-center font-semibold text-slate-800">
                    ₹{(g.quantity * g.stitchingCost).toLocaleString("en-IN")}
                  </td>
                </tr>
              ))}
            </tbody>

          </table>

        </div>
      )}

      {fabrics.length > 0 && (
        <div>

          <p className="text-[11px] font-semibold uppercase tracking-[0.09em] text-slate-400 mb-[8px]">
            Fabrics
          </p>

          <table className="w-full border-collapse text-[13.5px]">

            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                {["Fabric", "Qty", "Price", "Total"].map((h, i) => (
                  <th
                    key={h}
                    className={`px-[14px] py-[9px] text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-400 ${
                      i === 0 ? "text-left" : "text-center"
                    }`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {fabrics.map((f: any, i: number) => (
                <tr
                  key={i}
                  className="border-b border-slate-100 hover:bg-gray-50 transition"
                >
                  <td className="px-[14px] py-[11px] text-slate-800 font-medium">
                    {f.fabricName}
                  </td>

                  <td className="px-[14px] py-[11px] text-center text-slate-600">
                    {f.quantity}
                  </td>

                  <td className="px-[14px] py-[11px] text-center text-slate-600">
                    ₹{f.price.toLocaleString("en-IN")}
                  </td>

                  <td className="px-[14px] py-[11px] text-center font-semibold text-slate-800">
                    ₹{(f.quantity * f.price).toLocaleString("en-IN")}
                  </td>
                </tr>
              ))}
            </tbody>

          </table>

        </div>
      )}

      <div className="border-t border-slate-200 pt-[16px] flex flex-col gap-[6px] items-end">

        <div className="flex gap-[32px] text-[13.5px] text-slate-600">
          <span>Garment Total</span>
          <span className="font-medium text-slate-800 min-w-[80px] text-right">
            ₹{garmentTotal.toLocaleString("en-IN")}
          </span>
        </div>

        <div className="flex gap-[32px] text-[13.5px] text-slate-600">
          <span>Fabric Total</span>
          <span className="font-medium text-slate-800 min-w-[80px] text-right">
            ₹{fabricTotal.toLocaleString("en-IN")}
          </span>
        </div>

        <div className="h-[1px] w-[240px] bg-slate-200 my-[4px]" />

        <div className="flex gap-[32px] text-[15px]">
          <span className="font-semibold text-slate-800">Grand Total</span>
          <span className="font-bold text-slate-800 min-w-[80px] text-right">
            ₹{grandTotal.toLocaleString("en-IN")}
          </span>
        </div>

      </div>

      <div className="flex justify-end pt-[4px]">
        <PaymentModal total={grandTotal} />
      </div>

    </div>
  );
};

export default OrderSummary;