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
import {
  calculateGarmentTotal,
  calculateFabricTotal,
} from "./utils/calculateTotals";
import MeasurementsSection from "./MeasurementsSection";
import AddPicturesPage from "../../createorders/pages/AddPicturesPage";
import FinalOrderSummary from "../../createorders/pages/FinalReviewPage";
import SummaryButton from "../../orders/components/SummaryButton"; // <-- Import SummeryButton

/* ── Section card ─────────────────────────────────────────────────────────── */
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
    <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
      <div className="flex items-center gap-3 px-6 py-3.5 border-b border-slate-100 bg-slate-50">
        <div className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center shrink-0">
          {icon}
        </div>
        <h3 className="text-xs font-semibold tracking-widest uppercase text-slate-500">
          {title}
        </h3>
      </div>
      <div className="px-6 py-5">{children}</div>
    </div>
  );
}

/* ── Step indicator ───────────────────────────────────────────────────────── */
function Step({ n, label }: { n: number; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-[10px] font-bold text-white shrink-0">
        {n}
      </div>
      <span className="text-xs font-medium text-slate-500 hidden sm:block">{label}</span>
    </div>
  );
}

/* ── Main ─────────────────────────────────────────────────────────────────── */
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

  const onSubmit = (data: OrderFormValues) => {
    console.log("Final Order Data:", data);
  };

  const [isInstructionOpen, setIsInstructionOpen] = useState(false);
  const [submitHovered, setSubmitHovered] = useState(false);

  const garments = useWatch({ control, name: "garments" }) || [];
  const fabrics = useWatch({ control, name: "fabrics" }) || [];
  const garmentTotal = calculateGarmentTotal(garments);
  const fabricTotal = calculateFabricTotal(fabrics);
  const calculatedTotal = garmentTotal + fabricTotal;

  return (
    <FormProvider {...methods}>
      <div
        className="min-h-screen bg-slate-50 px-4 py-8 sm:px-8"
        style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
      >
        {/* ── Page header ── */}
        <div className="max-w-3xl mx-auto mb-7">
          <div className="flex items-start justify-between mb-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1">
                Orders / New
              </p>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                Create Order
              </h1>
            </div>

            {/* Step pills */}
            <div className="flex items-center gap-2.5 bg-white border border-slate-200 rounded-xl px-4 py-2.5 shadow-sm">
              <Step n={1} label="Customer" />
              <div className="w-4 h-px bg-slate-200" />
              <Step n={2} label="Garments" />
              <div className="w-4 h-px bg-slate-200" />
              <Step n={3} label="Fabrics" />
              <div className="w-4 h-px bg-slate-200" />
              <Step n={4} label="Measurements" />
              <div className="w-4 h-px bg-slate-200" />
              <Step n={5} label="Review" />
            </div>
          </div>
          <div className="h-px bg-slate-200 w-full" />
        </div>

        {/* ── Form ── */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-3xl mx-auto space-y-4"
        >
          {/* 1 · Customer */}
          <Section
            title="Customer Details"
            icon={
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            }
          >
            <CustomerDetailsSection />
          </Section>

          {/* 2 · Garments */}
          <Section
            title="Garments"
            icon={
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.57a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.57a2 2 0 0 0-1.34-2.23z" />
              </svg>
            }
          >
            <GarmentSection fieldArray={garmentFieldArray} />
          </Section>

          {/* 3 · Fabrics */}
          <Section
            title="Fabric Selection"
            icon={
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <path d="M8 21h8M12 17v4" />
              </svg>
            }
          >
            <FabricSection fieldArray={fabricFieldArray} />
          </Section>

          {/* 4 · Instructions + Delivery */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-slate-200 bg-white shadow-sm px-6 py-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">
                Special Instructions
              </p>
              <button
                type="button"
                onClick={() => setIsInstructionOpen(true)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-dashed border-slate-300 text-sm font-medium text-slate-600 bg-slate-50 hover:bg-slate-100 hover:border-slate-400 transition-all duration-150"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                Add Instructions
              </button>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white shadow-sm px-6 py-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">
                Delivery Date
              </p>
              <DeliveryDatePicker />
            </div>
          </div>

          {/* 5 · Order Summary */}
          <Section
            title="Order Summary"
            icon={
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" />
                <line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
              </svg>
            }
          >
            <OrderSummary />
          </Section>

          {/* 6 · Measurements */}
          <Section
            title="Measurements"
            icon={
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 12h20M12 2v20" />
              </svg>
            }
          >
            <MeasurementsSection />
          </Section>

          {/* 7 · Pictures */}
          <Section
            title="Attach Pictures"
            icon={
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
            }
          >
            <AddPicturesPage />
          </Section>

          {/* 8 · Final Review */}
          <Section
            title="Final Review"
            icon={
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            }
          >
            <FinalOrderSummary />
          </Section>

          {/* ── Sticky submit bar ── */}
          <div
            className="sticky bottom-4 rounded-xl border border-slate-200 bg-white/90 px-6 py-4 flex items-center justify-between gap-4 shadow-lg"
            style={{ backdropFilter: "blur(12px)" }}
          >
            <div className="flex items-center gap-4">
              <div>
                <p className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">
                  Total
                </p>
                <p className="text-xl font-bold text-slate-900 tracking-tight">
                  ₹{calculatedTotal.toLocaleString("en-IN")}
                </p>
              </div>
              <div className="h-8 w-px bg-slate-100" />
              <p className="text-xs text-slate-400">
                <span className="font-semibold text-slate-600">{garments.length}</span>{" "}
                garment{garments.length !== 1 ? "s" : ""}&nbsp;·&nbsp;
                <span className="font-semibold text-slate-600">{fabrics.length}</span>{" "}
                fabric{fabrics.length !== 1 ? "s" : ""}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <SummaryButton />
              <button
                type="submit"
                onMouseEnter={() => setSubmitHovered(true)}
                onMouseLeave={() => setSubmitHovered(false)}
                className="flex items-center gap-2 px-7 py-2.5 rounded-lg text-sm font-semibold text-white transition-all duration-150"
                style={{
                  background: "#0f172a",
                  boxShadow: submitHovered
                    ? "0 6px 20px rgba(15,23,42,0.3)"
                    : "0 2px 8px rgba(15,23,42,0.15)",
                  transform: submitHovered ? "translateY(-1px)" : "translateY(0)",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
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