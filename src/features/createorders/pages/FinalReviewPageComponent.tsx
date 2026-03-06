import { useFormContext, useWatch } from "react-hook-form";
import { useEffect } from "react";
import lobo from "@/assets/lobo.svg";
import { OrderFormValues } from "../schemas/order.schema";
import {
  calculateGarmentTotal,
  calculateFabricTotal,
} from "../components/utils/calculateTotals";
import { useOrderStore } from "../store/orderStore";

const FinalReviewPageComponent = () => {
  const { control } = useFormContext<OrderFormValues>();

  const fullData = useWatch({ control });

  const garmentTotal = calculateGarmentTotal(fullData.garments || []);
  const fabricTotal = calculateFabricTotal(fullData.fabrics || []);
  const grandTotal = garmentTotal + fabricTotal;

  const setOrder = useOrderStore((s) => s.setOrder);

  useEffect(() => {
    setOrder({
      finalReview: fullData,
    });
  }, [fullData, setOrder]);

  return (
    <div id="final-summary" className="py-2">

      <div className="flex justify-between items-start mb-[24px]">

        <img src={lobo} alt="Logo" className="w-[20vh]" />

        <div className="text-right flex flex-col gap-[6px]">

          <p className="text-[17px] font-bold text-slate-800 tracking-[-0.01em] m-0">
            {fullData.fullName || "—"}
          </p>

          {[
            ["Order ID", "#225"],
            ["Received", new Date().toLocaleDateString()],
            ["Delivery", "28/12/2025"],
          ].map(([k, v]) => (

            <p key={k} className="text-[14px] text-slate-500 m-0">
              <span className="text-slate-400">{k}: </span>
              {v}
            </p>

          ))}

        </div>

      </div>

      <div className="h-[1.5px] bg-slate-100 mb-[24px]" />

      {(fullData.garments?.length ?? 0) > 0 && (

        <table className="w-full border-collapse text-[16px] mb-[24px]">

          <thead>

            <tr className="bg-slate-50 border-b border-slate-200">

              {["Garment Type", "Qty", "Total"].map((h, i) => (

                <th
                  key={h}
                  className={`px-[16px] py-[11px] text-[13px] font-semibold uppercase tracking-[0.09em] text-slate-400 ${
                    i === 0 ? "text-left" : "text-center"
                  }`}
                >
                  {h}
                </th>

              ))}

            </tr>

          </thead>

          <tbody>

            {fullData.garments?.map((g, i) => (

              <tr key={i} className="border-b border-slate-100">

                <td className="px-[16px] py-[13px] text-slate-800 font-medium text-[15px]">
                  {g.garmentType}
                </td>

                <td className="px-[16px] py-[13px] text-center text-slate-600 text-[15px]">
                  {g.quantity}
                </td>

                <td className="px-[16px] py-[13px] text-center font-semibold text-slate-800 text-[15px]">
                  ₹{(g.quantity * g.stitchingCost).toLocaleString("en-IN")}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      )}

      <div className="flex flex-col gap-[10px] items-end mb-[24px]">

        {[
          ["Garment Total", garmentTotal],
          ["Fabric Total", fabricTotal],
        ].map(([label, val]) => (

          <div key={String(label)} className="flex gap-[36px] text-[16px]">

            <span className="text-slate-500">{label}</span>

            <span className="font-medium text-slate-800 min-w-[90px] text-right">
              ₹{Number(val).toLocaleString("en-IN")}
            </span>

          </div>

        ))}

        <div className="h-[1.5px] w-[250px] bg-slate-200 my-[6px]" />

        <div className="flex gap-[36px] text-[18px]">

          <span className="font-semibold text-slate-800">
            Grand Total
          </span>

          <span className="font-bold text-slate-800 min-w-[90px] text-right">
            ₹{grandTotal.toLocaleString("en-IN")}
          </span>

        </div>

      </div>

      <div className="border-t border-slate-100 pt-[18px] flex flex-col gap-[6px]">

        <p className="text-[15px] text-slate-600 m-0">
          Thank you for your business.
        </p>

        <p className="text-[13px] text-slate-400 m-0">
          * Advance amount paid cannot be refunded.
        </p>

        <p className="text-[13px] text-slate-400 m-0">
          * Goods once sold will not be taken back.
        </p>

      </div>

    </div>
  );
};

export default FinalReviewPageComponent;