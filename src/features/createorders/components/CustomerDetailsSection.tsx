import { useState } from "react";
import { useFormContext } from "react-hook-form";
import InputField from "@/shared/components/InputField";
import { CustomerFormData } from "../schemas/customerSchema";
import { INDIAN_STATES } from "@/shared/constants/indianStates";

/* ── Shared field wrapper ─────────────────────────────────── */
function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#94a3b8" }}>
        {label}
      </label>
      {children}
      {error && (
        <span className="flex items-center gap-1 text-xs" style={{ color: "#f87171" }}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          {error}
        </span>
      )}
    </div>
  );
}

/* ── Styled input ─────────────────────────────────────────── */
function SInput({ error, style, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { error?: boolean }) {
  const [focused, setFocused] = useState(false);
  return (
    <input
      {...props}
      onFocus={(e) => { setFocused(true); props.onFocus?.(e); }}
      onBlur={(e) => { setFocused(false); props.onBlur?.(e); }}
      style={{
        height: "44px", padding: "0 14px", borderRadius: "10px",
        fontSize: "13.5px", color: "#1e293b", background: "#f8fafc",
        border: `1.5px solid ${error ? "#fca5a5" : focused ? "#94a3b8" : "#e2e8f0"}`,
        boxShadow: focused ? "0 0 0 3px rgba(148,163,184,0.12)" : error ? "0 0 0 3px rgba(248,113,113,0.08)" : "none",
        outline: "none", width: "100%", boxSizing: "border-box",
        transition: "border-color 0.18s ease, box-shadow 0.18s ease",
        fontFamily: "inherit",
        ...style,
      }}
    />
  );
}

/* ── Styled select ────────────────────────────────────────── */
function SSelect({ error, children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement> & { error?: boolean }) {
  const [focused, setFocused] = useState(false);
  return (
    <select
      {...props}
      onFocus={(e) => { setFocused(true); props.onFocus?.(e); }}
      onBlur={(e) => { setFocused(false); props.onBlur?.(e); }}
      style={{
        height: "44px", padding: "0 36px 0 14px", borderRadius: "10px",
        fontSize: "13.5px", color: "#1e293b", background: "#f8fafc",
        border: `1.5px solid ${error ? "#fca5a5" : focused ? "#94a3b8" : "#e2e8f0"}`,
        boxShadow: focused ? "0 0 0 3px rgba(148,163,184,0.12)" : error ? "0 0 0 3px rgba(248,113,113,0.08)" : "none",
        outline: "none", width: "100%", boxSizing: "border-box",
        transition: "border-color 0.18s ease, box-shadow 0.18s ease",
        appearance: "none",
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
        backgroundRepeat: "no-repeat", backgroundPosition: "right 13px center",
        cursor: "pointer", fontFamily: "inherit",
      }}
    >
      {children}
    </select>
  );
}

/* ── Main ─────────────────────────────────────────────────── */
const CustomerDetailsSection = () => {
  const { register, formState: { errors } } = useFormContext<CustomerFormData>();

  return (
    <section className="py-8 px-2">
      <div className="w-full max-w-2xl space-y-5">

        {/* Full Name */}
        <Field label="Full Name" error={errors.fullName?.message}>
          <SInput placeholder="Enter full name" error={!!errors.fullName} {...register("fullName")} />
        </Field>

        {/* Mobile */}
        <Field label="Mobile Number" error={errors.mobile?.message}>
          <div className="flex gap-2">
            <div style={{
              height: "44px", padding: "0 13px", borderRadius: "10px", flexShrink: 0,
              background: "#f1f5f9", border: "1.5px solid #e2e8f0",
              display: "flex", alignItems: "center",
              fontSize: "13.5px", fontWeight: 600, color: "#64748b",
            }}>
              +91
            </div>
            <SInput
              type="tel"
              placeholder="Enter mobile number"
              error={!!errors.mobile}
              style={{ flex: 1, width: "auto" }}
              {...register("mobile")}
            />
          </div>
        </Field>

        {/* Email */}
        <Field label="Email Address" error={errors.email?.message}>
          <SInput type="email" placeholder="Enter email address" error={!!errors.email} {...register("email")} />
        </Field>

        {/* City + State */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="City" error={errors.city?.message}>
            <SInput placeholder="Enter city" error={!!errors.city} {...register("city")} />
          </Field>

          <Field label="State" error={errors.state?.message}>
            <SSelect error={!!errors.state} {...register("state")}>
              <option value="">Select state…</option>
              {INDIAN_STATES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </SSelect>
          </Field>
        </div>

      </div>
    </section>
  );
};

export default CustomerDetailsSection;