import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { OrderFormValues } from "../schemas/order.schema";

type MeasurementKeys = keyof OrderFormValues["measurements"];

const fields: MeasurementKeys[] = [
  "shoulder", "sleeveLength", "chest", "stomach", "neck",
  "frontShoulder", "backShoulder", "length", "waist",
  "hip", "front", "thigh", "knee", "legOpening", "bottom",
];

function MeasurementInput({ label, registerProps }: { label: string; registerProps: any }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <label style={{
        fontSize: "11px", fontWeight: 600, textTransform: "uppercase",
        letterSpacing: "0.09em", color: "#94a3b8",
      }}>
        {label}
      </label>
      <div style={{ position: "relative" }}>
        <input
          type="number"
          step="0.1"
          {...registerProps}
          onFocus={() => setFocused(true)}
          onBlur={(e) => { setFocused(false); registerProps.onBlur?.(e); }}
          style={{
            height: "44px", padding: "0 40px 0 14px", borderRadius: "10px",
            fontSize: "13.5px", color: "#1e293b", background: "#f8fafc",
            border: `1.5px solid ${focused ? "#94a3b8" : "#e2e8f0"}`,
            boxShadow: focused ? "0 0 0 3px rgba(148,163,184,0.12)" : "none",
            outline: "none", width: "100%", boxSizing: "border-box",
            transition: "border-color 0.18s ease, box-shadow 0.18s ease",
            fontFamily: "inherit",
          }}
        />
        <span style={{
          position: "absolute", right: "12px", top: "50%",
          transform: "translateY(-50%)",
          fontSize: "11px", fontWeight: 600, color: "#cbd5e1",
          pointerEvents: "none",
        }}>
          in
        </span>
      </div>
    </div>
  );
}

const MeasurementsSection = () => {
  const { register } = useFormContext<OrderFormValues>();

  return (
    <div className="py-2">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {fields.map((field) => (
          <MeasurementInput
            key={field}
            label={field.replace(/([A-Z])/g, " $1").trim()}
            registerProps={register(`measurements.${field}`, { valueAsNumber: true })}
          />
        ))}
      </div>
    </div>
  );
};

export default MeasurementsSection;