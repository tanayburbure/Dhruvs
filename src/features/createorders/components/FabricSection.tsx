import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { OrderFormValues } from "../schemas/order.schema";

interface Props {
  fieldArray: any;
}

const garmentOptions = [
  "Kurta Pajama", "Men's Suit", "Pants", "Shirt", "Nehru Jacket",
  "Waist Coat", "Sherwani", "Indo Western", "Blazer", "Kurta",
  "Pajama", "Dhoti", "T Shirt", "Co Ord Set",
];
const fabricOptions = [
  "Cotton", "Silk", "Linen", "Wool", "Khadi", "Denim", "Rayon", "Polyester",
];
const quantityOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9];

/* ── Shared select ────────────────────────────────────────── */
function SSelect({ value, onChange, children, style }: any) {
  const [focused, setFocused] = useState(false);
  return (
    <select
      value={value}
      onChange={onChange}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        height: "44px", padding: "0 36px 0 14px", borderRadius: "10px",
        fontSize: "13.5px", color: value ? "#1e293b" : "#94a3b8",
        background: "#f8fafc",
        border: `1.5px solid ${focused ? "#94a3b8" : "#e2e8f0"}`,
        boxShadow: focused ? "0 0 0 3px rgba(148,163,184,0.12)" : "none",
        outline: "none", boxSizing: "border-box",
        transition: "border-color 0.18s ease, box-shadow 0.18s ease",
        appearance: "none",
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
        backgroundRepeat: "no-repeat", backgroundPosition: "right 13px center",
        cursor: "pointer", fontFamily: "inherit", ...style,
      }}
    >
      {children}
    </select>
  );
}

/* ── Shared input ─────────────────────────────────────────── */
function SInput({ value, onChange, type = "text", placeholder, style }: any) {
  const [focused, setFocused] = useState(false);
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        height: "44px", padding: "0 14px", borderRadius: "10px",
        fontSize: "13.5px", color: "#1e293b", background: "#f8fafc",
        border: `1.5px solid ${focused ? "#94a3b8" : "#e2e8f0"}`,
        boxShadow: focused ? "0 0 0 3px rgba(148,163,184,0.12)" : "none",
        outline: "none", boxSizing: "border-box",
        transition: "border-color 0.18s ease, box-shadow 0.18s ease",
        fontFamily: "inherit", ...style,
      }}
    />
  );
}

/* ── Field wrapper ────────────────────────────────────────── */
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      <label style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.09em", color: "#94a3b8" }}>
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
  const [btnHovered, setBtnHovered] = useState(false);

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
    setGarmentType(""); setFabricName(""); setQuantity(1); setPrice("");
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
          <SSelect value={garmentType} onChange={(e: any) => setGarmentType(e.target.value)} style={{ minWidth: "160px" }}>
            <option value="">Select type…</option>
            {garmentOptions.map(g => <option key={g} value={g}>{g}</option>)}
          </SSelect>
        </Field>

        <Field label="Fabric">
          <SSelect value={fabricName} onChange={(e: any) => setFabricName(e.target.value)} style={{ minWidth: "140px" }}>
            <option value="">Select fabric…</option>
            {fabricOptions.map(f => <option key={f} value={f}>{f}</option>)}
          </SSelect>
        </Field>

        <Field label="Quantity">
          <SSelect value={quantity} onChange={(e: any) => setQuantity(Number(e.target.value))} style={{ minWidth: "100px" }}>
            {quantityOptions.map(q => <option key={q} value={q}>{q}</option>)}
          </SSelect>
        </Field>

        <Field label="Price (₹)">
          <SInput
            type="number"
            value={price}
            onChange={(e: any) => setPrice(e.target.value === "" ? "" : Number(e.target.value))}
            placeholder="0"
            style={{ width: "110px" }}
          />
        </Field>

        <button
          type="button"
          onClick={handleAddFabric}
          disabled={!isValid}
          onMouseEnter={() => setBtnHovered(true)}
          onMouseLeave={() => setBtnHovered(false)}
          style={{
            height: "44px", padding: "0 22px", borderRadius: "10px",
            fontSize: "13.5px", fontWeight: 600, border: "none",
            cursor: isValid ? "pointer" : "not-allowed",
            background: isValid ? "linear-gradient(135deg, #f8d748, #eab308)" : "#f1f5f9",
            color: isValid ? "#1c0a00" : "#94a3b8",
            boxShadow: isValid && btnHovered ? "0 4px 14px rgba(234,179,8,0.35)" : "none",
            transform: isValid && btnHovered ? "translateY(-1px)" : "translateY(0)",
            transition: "all 0.18s ease", fontFamily: "inherit", alignSelf: "flex-end",
          }}
        >
          {editingIndex !== null ? "Update" : "Add Fabric"}
        </button>
      </div>

      {/* Table */}
      {fabrics?.length > 0 ? (
        <div className="overflow-x-auto">
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13.5px" }}>
            <thead>
              <tr style={{ background: "#f8fafc", borderBottom: "1.5px solid #e2e8f0" }}>
                {["Garment Type", "Fabric", "Qty", "Price", "Total", "", ""].map((h, i) => (
                  <th key={i} style={{
                    padding: "10px 14px", textAlign: i < 2 ? "left" : "center",
                    fontSize: "11px", fontWeight: 600, textTransform: "uppercase",
                    letterSpacing: "0.08em", color: "#94a3b8", whiteSpace: "nowrap",
                  }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {fabrics.map((item: any, index: number) => (
                <tr
                  key={index}
                  style={{ borderBottom: "1px solid #f1f5f9", transition: "background 0.15s ease" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "#fafafa")}
                  onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                >
                  <td style={{ padding: "12px 14px", color: "#1e293b", fontWeight: 500 }}>{item.garmentType}</td>
                  <td style={{ padding: "12px 14px", color: "#475569" }}>{item.fabricName}</td>
                  <td style={{ padding: "12px 14px", textAlign: "center", color: "#475569" }}>{item.quantity}</td>
                  <td style={{ padding: "12px 14px", textAlign: "center", color: "#475569" }}>₹{item.price.toLocaleString("en-IN")}</td>
                  <td style={{ padding: "12px 14px", textAlign: "center", fontWeight: 600, color: "#1e293b" }}>₹{item.total.toLocaleString("en-IN")}</td>
                  <td style={{ padding: "12px 14px", textAlign: "center" }}>
                    <button
                      type="button"
                      onClick={() => handleEdit(index)}
                      style={{ width: "30px", height: "30px", borderRadius: "8px", border: "1.5px solid #e2e8f0", background: "#f8fafc", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "#64748b", transition: "all 0.15s ease" }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = "#94a3b8"; e.currentTarget.style.color = "#1e293b"; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.color = "#64748b"; }}
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                    </button>
                  </td>
                  <td style={{ padding: "12px 14px", textAlign: "center" }}>
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      style={{ width: "30px", height: "30px", borderRadius: "8px", border: "1.5px solid #fee2e2", background: "#fff5f5", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "#f87171", transition: "all 0.15s ease" }}
                      onMouseEnter={e => { e.currentTarget.style.background = "#fee2e2"; e.currentTarget.style.color = "#ef4444"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = "#fff5f5"; e.currentTarget.style.color = "#f87171"; }}
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                        <path d="M10 11v6M14 11v6" /><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div style={{ padding: "32px", textAlign: "center", borderRadius: "10px", border: "1.5px dashed #e2e8f0", background: "#f8fafc" }}>
          <p style={{ fontSize: "13px", color: "#94a3b8", margin: 0 }}>
            No fabrics added yet — fill in the fields and click Add Fabric
          </p>
        </div>
      )}

    </div>
  );
};

export default FabricSection;