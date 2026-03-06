import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { OrderFormValues } from "../schemas/order.schema";

type MeasurementKeys = keyof OrderFormValues["measurements"];

const fields: MeasurementKeys[] = [
  "shoulder",
  "sleeveLength",
  "chest",
  "stomach",
  "neck",
  "frontShoulder",
  "backShoulder",
  "length",
  "waist",
  "hip",
  "front",
  "thigh",
  "knee",
  "legOpening",
  "bottom",
];

function MeasurementInput({
  label,
  registerProps,
}: {
  label: string;
  registerProps: any;
}) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="flex flex-col gap-[8px]">
      <label className="text-[11px] font-semibold uppercase tracking-[0.09em] text-slate-400">
        {label}
      </label>

      <div className="relative">
        <input
          type="number"
          step="0.1"
          {...registerProps}
          onFocus={() => setFocused(true)}
          onBlur={(e) => {
            setFocused(false);
            registerProps.onBlur?.(e);
          }}
          className={`h-[44px] w-full pl-[14px] pr-[40px] rounded-[10px] text-[13.5px] text-slate-800 bg-slate-50 border-[1.5px] outline-none box-border transition-all duration-[180ms] ${
            focused
              ? "border-slate-400 shadow-[0_0_0_3px_rgba(148,163,184,0.12)]"
              : "border-slate-200"
          }`}
        />

        <span className="absolute right-[12px] top-1/2 -translate-y-1/2 text-[11px] font-semibold text-slate-300 pointer-events-none">
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
            registerProps={register(`measurements.${field}`, {
              valueAsNumber: true,
            })}
          />
        ))}
      </div>
    </div>
  );
};

export default MeasurementsSection;