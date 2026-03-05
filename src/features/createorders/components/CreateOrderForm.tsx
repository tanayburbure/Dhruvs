import { useState } from "react";
import { useForm, FormProvider, useFieldArray, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { orderSchema, OrderFormValues } from "../schemas/order.schema";

import CustomerDetailsSection from "./CustomerDetailsSection";
import GarmentSection from "./GarmentSection";
import FabricSection from "./FabricSection";
import SpecialInstructionsModal from "./SpecialInstructionsModal";
import DeliveryDatePicker from "./DeliveryDatePicker";
import OrderSummary from "./OrderSummary";
import MeasurementsSection from "./MeasurementsSection";

import {
  calculateGarmentTotal,
  calculateFabricTotal,
} from "./utils/calculateTotals";

import AddPicturesPage from "../../createorders/pages/AddPicturesPage";
import FinalOrderSummary from "../pages/FinalReviewPageComponent";
import SummaryButton from "../../orders/components/SummaryButton";

/* ───────────────── Section Card ───────────────── */

function Section({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <div className="flex items-center gap-3 px-6 py-4 border-b bg-slate-50">
        <div className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center">
          {icon}
        </div>

        <h3 className="text-xs font-semibold tracking-widest uppercase text-slate-500">
          {title}
        </h3>
      </div>

      <div className="px-6 py-6">{children}</div>
    </div>
  );
}

/* ───────────────── Step Indicator ───────────────── */

function Step({ n, label }: { n: number; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-6 h-6 rounded-full bg-slate-800 text-white text-[11px] font-bold flex items-center justify-center">
        {n}
      </div>
      <span className="text-xs font-medium text-slate-500 hidden md:block">
        {label}
      </span>
    </div>
  );
}

/* ───────────────── Main Component ───────────────── */

const CreateOrderForm = () => {
  const methods = useForm<OrderFormValues>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      fullName: "",
      mobile: "",
      email: "",
      city: "",
      state: "",
      garments: [],
      fabrics: [],
      measurements: {
        shoulder: undefined,
        sleeveLength: undefined,
        chest: undefined,
        stomach: undefined,
        neck: undefined,
        frontShoulder: undefined,
        backShoulder: undefined,
        length: undefined,
        waist: undefined,
        hip: undefined,
        front: undefined,
        thigh: undefined,
        knee: undefined,
        legOpening: undefined,
        bottom: undefined,
      },
    },
  });

  const { handleSubmit, control } = methods;

  const garmentFieldArray = useFieldArray({ control, name: "garments" });
  const fabricFieldArray = useFieldArray({ control, name: "fabrics" });

  const garments = useWatch({ control, name: "garments" }) || [];
  const fabrics = useWatch({ control, name: "fabrics" }) || [];

  const garmentTotal = calculateGarmentTotal(garments);
  const fabricTotal = calculateFabricTotal(fabrics);
  const calculatedTotal = garmentTotal + fabricTotal;

  const [isInstructionOpen, setIsInstructionOpen] = useState(false);
  const [submitHovered, setSubmitHovered] = useState(false);

  const onSubmit = (data: OrderFormValues) => {
    console.log("Final Order Data:", data);
  };

  return (
    <FormProvider {...methods}>
      <div className="min-h-screen bg-slate-50 px-8 mb-4">
        {/* Header */}

        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              Create Order
            </h1>
          </div>

          <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-5 py-3 shadow-sm">
            <Step n={1} label="Customer" />
            <div className="w-6 h-px bg-slate-200" />
            <Step n={2} label="Garments" />
            <div className="w-6 h-px bg-slate-200" />
            <Step n={3} label="Fabrics" />
            <div className="w-6 h-px bg-slate-200" />
            <Step n={4} label="Measurements" />
            <div className="w-6 h-px bg-slate-200" />
            <Step n={5} label="Review" />
          </div>
        </div>

        {/* Form */}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          <Section title="Customer Details" icon={<span />}>
            <CustomerDetailsSection />
          </Section>

          <Section title="Garments" icon={<span />}>
            <GarmentSection fieldArray={garmentFieldArray} />
          </Section>

          <Section title="Fabric Selection" icon={<span />}>
            <FabricSection fieldArray={fabricFieldArray} />
          </Section>

          {/* Instructions + Delivery */}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

            {/* Special Instructions */}
            <div style={{ borderRadius: "10px", border: "1.5px solid #e2e8f0", background: "white", padding: "20px 20px" }}>
              <label style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.09em", color: "#94a3b8", display: "block", marginBottom: "10px" }}>
                Special Instructions
              </label>
              <button
                type="button"
                onClick={() => setIsInstructionOpen(true)}
                style={{
                  width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                  padding: "10px 16px", borderRadius: "10px",
                  border: "1.5px dashed #e2e8f0", background: "#f8fafc",
                  fontSize: "13.5px", fontWeight: 500, color: "#64748b",
                  cursor: "pointer", fontFamily: "inherit",
                  transition: "border-color 0.18s ease, background 0.18s ease",
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#94a3b8"; e.currentTarget.style.background = "#f1f5f9"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.background = "#f8fafc"; }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                Add Instructions
              </button>
            </div>

            {/* Delivery Date */}
            <div style={{ borderRadius: "10px", border: "1.5px solid #e2e8f0", background: "white", padding: "20px 20px" }}>
              <label style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.09em", color: "#94a3b8", display: "block", marginBottom: "10px" }}>
                Delivery Date
              </label>
              <DeliveryDatePicker />
            </div>

          </div>

          <Section title="Order Summary" icon={<span />}>
            <OrderSummary />
          </Section>

          <Section title="Measurements" icon={<span />}>
            <MeasurementsSection />
          </Section>

          <Section title="Attach Pictures" icon={<span />}>
            <AddPicturesPage />
          </Section>

          <Section title="Final Review" icon={<span />}>
            <FinalOrderSummary />
          </Section>

          {/* Sticky Footer */}

          <div className="sticky bottom-4 bg-white border rounded-xl shadow-lg px-8 py-4 flex items-center justify-between">

            <div>
              <p className="text-xs uppercase text-slate-400 tracking-wider">
                Total
              </p>

              <p className="text-2xl font-bold text-slate-900">
                ₹{calculatedTotal.toLocaleString("en-IN")}
              </p>
            </div>

            <div className="flex items-center gap-3">

              <SummaryButton />

              <button
                type="submit"
                onMouseEnter={() => setSubmitHovered(true)}
                onMouseLeave={() => setSubmitHovered(false)}
                className="px-7 py-3 rounded-lg text-sm font-semibold text-white transition-all"
                style={{
                  background: "#0f172a",
                  boxShadow: submitHovered
                    ? "0 8px 25px rgba(15,23,42,0.35)"
                    : "0 2px 8px rgba(15,23,42,0.2)",
                }}
              >
                Create Order
              </button>

            </div>
          </div>

        </form>
      </div>

      <SpecialInstructionsModal
        isOpen={isInstructionOpen}
        onClose={() => setIsInstructionOpen(false)}
      />
    </FormProvider>
  );
};

export default CreateOrderForm;