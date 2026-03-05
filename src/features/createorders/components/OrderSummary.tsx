import { useFormContext, useWatch } from "react-hook-form";
import {
  calculateGarmentTotal,
  calculateFabricTotal,
} from "./utils/calculateTotals";
import PaymentModal from "./PaymentModal";

const OrderSummary = () => {
  const { control } = useFormContext();

  const garments = useWatch({ control, name: "garments" }) || [];
  const fabrics = useWatch({ control, name: "fabrics" }) || [];
  const fullName = useWatch({ control, name: "fullName" });

  const garmentTotal = calculateGarmentTotal(garments);
  const fabricTotal = calculateFabricTotal(fabrics);
  const grandTotal = garmentTotal + fabricTotal;

  return (
    <div className="space-y-6 py-2">

      {/* Customer info row */}
      <div className="flex items-center justify-between">
        <div /> {/* spacer — title is handled by Section wrapper */}
        <div style={{ textAlign: "right" }}>
          {fullName && (
            <p style={{ fontSize: "13px", fontWeight: 500, color: "#475569", margin: 0 }}>
              {fullName}
            </p>
          )}
          <p style={{ fontSize: "11px", color: "#94a3b8", margin: 0 }}>Order #3</p>
        </div>
      </div>

      {/* Garments */}
      {garments.length > 0 && (
        <div>
          <p style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.09em", color: "#94a3b8", marginBottom: "8px" }}>
            Garments
          </p>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13.5px" }}>
            <thead>
              <tr style={{ background: "#f8fafc", borderBottom: "1.5px solid #e2e8f0" }}>
                {["Garment", "Qty", "Stitching Cost", "Total"].map((h, i) => (
                  <th key={h} style={{ padding: "9px 14px", textAlign: i === 0 ? "left" : "center", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "#94a3b8" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {garments.map((g: any, i: number) => (
                <tr key={i} style={{ borderBottom: "1px solid #f1f5f9", transition: "background 0.15s" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "#fafafa")}
                  onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                >
                  <td style={{ padding: "11px 14px", color: "#1e293b", fontWeight: 500 }}>{g.garmentType}</td>
                  <td style={{ padding: "11px 14px", textAlign: "center", color: "#475569" }}>{g.quantity}</td>
                  <td style={{ padding: "11px 14px", textAlign: "center", color: "#475569" }}>₹{g.stitchingCost.toLocaleString("en-IN")}</td>
                  <td style={{ padding: "11px 14px", textAlign: "center", fontWeight: 600, color: "#1e293b" }}>₹{(g.quantity * g.stitchingCost).toLocaleString("en-IN")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Fabrics */}
      {fabrics.length > 0 && (
        <div>
          <p style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.09em", color: "#94a3b8", marginBottom: "8px" }}>
            Fabrics
          </p>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13.5px" }}>
            <thead>
              <tr style={{ background: "#f8fafc", borderBottom: "1.5px solid #e2e8f0" }}>
                {["Fabric", "Qty", "Price", "Total"].map((h, i) => (
                  <th key={h} style={{ padding: "9px 14px", textAlign: i === 0 ? "left" : "center", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "#94a3b8" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {fabrics.map((f: any, i: number) => (
                <tr key={i} style={{ borderBottom: "1px solid #f1f5f9", transition: "background 0.15s" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "#fafafa")}
                  onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                >
                  <td style={{ padding: "11px 14px", color: "#1e293b", fontWeight: 500 }}>{f.fabricName}</td>
                  <td style={{ padding: "11px 14px", textAlign: "center", color: "#475569" }}>{f.quantity}</td>
                  <td style={{ padding: "11px 14px", textAlign: "center", color: "#475569" }}>₹{f.price.toLocaleString("en-IN")}</td>
                  <td style={{ padding: "11px 14px", textAlign: "center", fontWeight: 600, color: "#1e293b" }}>₹{(f.quantity * f.price).toLocaleString("en-IN")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Empty state */}
      {garments.length === 0 && fabrics.length === 0 && (
        <div style={{ padding: "28px", textAlign: "center", borderRadius: "10px", border: "1.5px dashed #e2e8f0", background: "#f8fafc" }}>
          <p style={{ fontSize: "13px", color: "#94a3b8", margin: 0 }}>
            Add garments or fabrics to see the summary
          </p>
        </div>
      )}

      {/* Totals */}
      <div style={{ borderTop: "1.5px solid #e2e8f0", paddingTop: "16px", display: "flex", flexDirection: "column", gap: "6px", alignItems: "flex-end" }}>
        <div style={{ display: "flex", gap: "32px", fontSize: "13.5px", color: "#475569" }}>
          <span>Garment Total</span>
          <span style={{ fontWeight: 500, color: "#1e293b", minWidth: "80px", textAlign: "right" }}>₹{garmentTotal.toLocaleString("en-IN")}</span>
        </div>
        <div style={{ display: "flex", gap: "32px", fontSize: "13.5px", color: "#475569" }}>
          <span>Fabric Total</span>
          <span style={{ fontWeight: 500, color: "#1e293b", minWidth: "80px", textAlign: "right" }}>₹{fabricTotal.toLocaleString("en-IN")}</span>
        </div>
        <div style={{ height: "1px", width: "240px", background: "#e2e8f0", margin: "4px 0" }} />
        <div style={{ display: "flex", gap: "32px", fontSize: "15px" }}>
          <span style={{ fontWeight: 600, color: "#1e293b" }}>Grand Total</span>
          <span style={{ fontWeight: 700, color: "#1e293b", minWidth: "80px", textAlign: "right" }}>₹{grandTotal.toLocaleString("en-IN")}</span>
        </div>
      </div>

      {/* Payment */}
      <div style={{ display: "flex", justifyContent: "flex-end", paddingTop: "4px" }}>
        <div className="[&>button]:px-5 [&>button]:py-2.5 [&>button]:rounded-lg [&>button]:text-sm [&>button]:font-semibold [&>button]:bg-gradient-to-r [&>button]:from-yellow-400 [&>button]:to-amber-400 [&>button]:text-amber-950 [&>button]:shadow-sm [&>button]:transition-all [&>button]:duration-150 hover:[&>button]:shadow-md hover:[&>button]:-translate-y-px">
          <PaymentModal total={grandTotal} />
        </div>
      </div>

    </div>
  );
};

export default OrderSummary;