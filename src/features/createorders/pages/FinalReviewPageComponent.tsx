import { useFormContext, useWatch } from "react-hook-form";
import lobo from "@/assets/lobo.svg";
import { OrderFormValues } from "../schemas/order.schema";
import {
  calculateGarmentTotal,
  calculateFabricTotal,
} from "../components/utils/calculateTotals";

const FinalReviewPageComponent = () => {
  const { control } = useFormContext<OrderFormValues>();
  const fullData = useWatch({ control });

  const garmentTotal = calculateGarmentTotal(fullData.garments || []);
  const fabricTotal = calculateFabricTotal(fullData.fabrics || []);
  const grandTotal = garmentTotal + fabricTotal;

  return (
    <div id="final-summary" className="py-2">

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px" }}>
        <img src={lobo} alt="Logo" className="w-[20vh]" />

        <div style={{ textAlign: "right", display: "flex", flexDirection: "column", gap: "6px" }}>
          <p style={{ fontSize: "17px", fontWeight: 700, color: "#1e293b", margin: 0, letterSpacing: "-0.01em" }}>
            {fullData.fullName || "—"}
          </p>
          {[
            ["Order ID", "#225"],
            ["Received", new Date().toLocaleDateString()],
            ["Delivery", "28/12/2025"],
          ].map(([k, v]) => (
            <p key={k} style={{ fontSize: "14px", color: "#64748b", margin: 0 }}>
              <span style={{ color: "#94a3b8" }}>{k}: </span>{v}
            </p>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: "1.5px", background: "#f1f5f9", marginBottom: "24px" }} />

      {/* Garment table */}
      {(fullData.garments?.length ?? 0) > 0 && (
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "16px", marginBottom: "24px" }}>
          <thead>
            <tr style={{ background: "#f8fafc", borderBottom: "1.5px solid #e2e8f0" }}>
              {["Garment Type", "Qty", "Total"].map((h, i) => (
                <th key={h} style={{
                  padding: "11px 16px", textAlign: i === 0 ? "left" : "center",
                  fontSize: "13px", fontWeight: 600, textTransform: "uppercase",
                  letterSpacing: "0.09em", color: "#94a3b8",
                }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {fullData.garments?.map((g, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #f1f5f9" }}>
                <td style={{ padding: "13px 16px", color: "#1e293b", fontWeight: 500, fontSize: "15px" }}>{g.garmentType}</td>
                <td style={{ padding: "13px 16px", textAlign: "center", color: "#475569", fontSize: "15px" }}>{g.quantity}</td>
                <td style={{ padding: "13px 16px", textAlign: "center", fontWeight: 600, color: "#1e293b", fontSize: "15px" }}>
                  ₹{(g.quantity * g.stitchingCost).toLocaleString("en-IN")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Totals */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "flex-end", marginBottom: "24px" }}>
        {[
          ["Garment Total", garmentTotal],
          ["Fabric Total", fabricTotal],
        ].map(([label, val]) => (
          <div key={String(label)} style={{ display: "flex", gap: "36px", fontSize: "16px" }}>
            <span style={{ color: "#64748b" }}>{label}</span>
            <span style={{ fontWeight: 500, color: "#1e293b", minWidth: "90px", textAlign: "right" }}>
              ₹{Number(val).toLocaleString("en-IN")}
            </span>
          </div>
        ))}
        <div style={{ height: "1.5px", width: "250px", background: "#e2e8f0", margin: "6px 0" }} />
        <div style={{ display: "flex", gap: "36px", fontSize: "18px" }}>
          <span style={{ fontWeight: 600, color: "#1e293b" }}>Grand Total</span>
          <span style={{ fontWeight: 700, color: "#1e293b", minWidth: "90px", textAlign: "right" }}>
            ₹{grandTotal.toLocaleString("en-IN")}
          </span>
        </div>
      </div>

      {/* Terms */}
      <div style={{ borderTop: "1.5px solid #f1f5f9", paddingTop: "18px", display: "flex", flexDirection: "column", gap: "6px" }}>
        <p style={{ fontSize: "15px", color: "#475569", margin: 0 }}>Thank you for your business.</p>
        <p style={{ fontSize: "13px", color: "#94a3b8", margin: 0 }}>* Advance amount paid cannot be refunded.</p>
        <p style={{ fontSize: "13px", color: "#94a3b8", margin: 0 }}>* Goods once sold will not be taken back.</p>
      </div>

    </div>
  );
};

export default FinalReviewPageComponent;