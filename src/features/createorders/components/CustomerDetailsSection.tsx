import { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { CustomerFormData } from "../schemas/customerSchema";
import { INDIAN_STATES } from "@/shared/constants/indianStates";
import { useOrderStore } from "../store/orderStore";

/* Field wrapper */
function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold uppercase tracking-widest text-slate-400">
        {label}
      </label>

      {children}

      {error && (
        <span className="text-xs text-red-400">{error}</span>
      )}
    </div>
  );
}

/* Styled input */
function SInput({
  error,
  className = "",
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { error?: boolean }) {
  const [focused, setFocused] = useState(false);

  return (
    <input
      {...props}
      onFocus={() => setFocused(true)}
      onBlur={(e) => {
        setFocused(false);
        props.onBlur?.(e);
      }}
      className={`h-[44px] px-[14px] rounded-[10px] text-[13.5px] bg-slate-50 border-[1.5px] outline-none w-full transition-all ${
        error
          ? "border-red-300"
          : focused
          ? "border-slate-400"
          : "border-slate-200"
      } ${className}`}
    />
  );
}

/* Styled select */
function SSelect({
  error,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & { error?: boolean }) {
  const [focused, setFocused] = useState(false);

  return (
    <select
      {...props}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      className={`h-[44px] pl-[14px] pr-[36px] rounded-[10px] text-[13.5px] bg-slate-50 border-[1.5px] outline-none w-full transition-all ${
        error
          ? "border-red-300"
          : focused
          ? "border-slate-400"
          : "border-slate-200"
      }`}
    >
      {children}
    </select>
  );
}

const CustomerDetailsSection = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<CustomerFormData>();

  const setOrder = useOrderStore((s) => s.setOrder);

  const fullName = watch("fullName");
  const mobile = watch("mobile");
  const email = watch("email");
  const city = watch("city");
  const state = watch("state");

  useEffect(() => {
    setOrder({
      fullName,
      mobile,
      email,
      city,
      state,
    });
  }, [fullName, mobile, email, city, state, setOrder]);

  return (
    <section className="py-8 px-2">
      <div className="w-full max-w-2xl space-y-5">

        <Field label="Full Name" error={errors.fullName?.message}>
          <SInput
            placeholder="Enter full name"
            error={!!errors.fullName}
            {...register("fullName")}
          />
        </Field>

        <Field label="Mobile Number" error={errors.mobile?.message}>
          <div className="flex gap-2">
            <div className="h-[44px] px-[13px] rounded-[10px] bg-slate-100 border border-slate-200 flex items-center text-sm">
              +91
            </div>

            <SInput
              type="tel"
              placeholder="Enter mobile number"
              error={!!errors.mobile}
              className="flex-1"
              {...register("mobile")}
            />
          </div>
        </Field>

        <Field label="Email Address" error={errors.email?.message}>
          <SInput
            type="email"
            placeholder="Enter email address"
            error={!!errors.email}
            {...register("email")}
          />
        </Field>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <Field label="City" error={errors.city?.message}>
            <SInput
              placeholder="Enter city"
              error={!!errors.city}
              {...register("city")}
            />
          </Field>

          <Field label="State" error={errors.state?.message}>
            <SSelect error={!!errors.state} {...register("state")}>
              <option value="">Select state…</option>

              {INDIAN_STATES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </SSelect>
          </Field>

        </div>

      </div>
    </section>
  );
};

export default CustomerDetailsSection;