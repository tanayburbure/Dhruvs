import { useState, useEffect, useRef, useCallback } from "react";
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
import AddPicturesPage from "../../createorders/pages/AddPicturesPage";
import FinalOrderSummary from "../pages/FinalReviewPageComponent";
import SummaryButton from "../../orders/components/SummaryButton";
import OrderDebug from "./OrderDebug";

import {
  calculateGarmentTotal,
  calculateFabricTotal,
} from "./utils/calculateTotals";

import { useOrderStore, type OrderDraft } from "../store/orderStore";

/* ─── helpers ──────────────────────────────────────────────────────────── */

function useDebouncedCallback<T extends (...args: any[]) => void>(
  fn: T,
  delay: number,
): T {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  return useCallback(
    (...args: Parameters<T>) => {
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => fn(...args), delay);
    },
    [fn, delay],
  ) as T;
}

/* ─── sub-components ────────────────────────────────────────────────────── */

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

/* ─── main ──────────────────────────────────────────────────────────────── */

const CreateOrderForm = () => {
  /**
   * Read the persisted draft ONCE for defaultValues.
   * We intentionally do NOT subscribe to store changes here — the form is
   * the source of truth while it is mounted.
   */
  const storedDraft = useOrderStore.getState().draft;
  const setDraft = useOrderStore((s) => s.setDraft);

  const methods = useForm<OrderFormValues>({
    resolver: zodResolver(orderSchema) as any, // zod preprocess infers correctly at runtime; cast avoids TS resolver mismatch
    defaultValues: {
      fullName: "",
      mobile: "",
      email: "",
      city: "",
      state: "",
      garments: [],
      fabrics: [],
      measurements: {},
      specialInstructions: "",
      ...(storedDraft as Partial<OrderFormValues>), // stored draft is structurally compatible; cast for TS
    },
  });

  const { handleSubmit, control } = methods;

  const garmentFieldArray = useFieldArray({ control, name: "garments" });
  const fabricFieldArray = useFieldArray({ control, name: "fabrics" });

  /* Watch only the fields we need for derived values */
  const garments = useWatch({ control, name: "garments" }) ?? [];
  const fabrics = useWatch({ control, name: "fabrics" }) ?? [];

  /* Watch the full form for persisting — debounced so it fires at most once
     per 500 ms instead of on every individual keystroke. */
  const allValues = useWatch({ control });

  const persistDraft = useDebouncedCallback(
    (values: OrderDraft) => {
      setDraft(values);
    },
    500,
  );

  useEffect(() => {
    if (allValues) persistDraft(allValues as OrderDraft);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allValues]);

  /* Totals */
  const garmentTotal = calculateGarmentTotal(garments);
  const fabricTotal = calculateFabricTotal(fabrics);
  const calculatedTotal = garmentTotal + fabricTotal;

  const [isInstructionOpen, setIsInstructionOpen] = useState(false);

  const onSubmit: Parameters<typeof handleSubmit>[0] = (values) => {
    console.log("Final Order Data:", values);
    // TODO: send to API, then call useOrderStore.getState().resetDraft()
  };

  return (
    <FormProvider {...methods}>
      <div className="min-h-screen bg-slate-50 px-8 mb-4">
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="rounded-[10px] border-[1.5px] border-slate-200 bg-white px-[20px] py-[20px]">
              <label className="block mb-[10px] text-[11px] font-semibold uppercase tracking-[0.09em] text-slate-400">
                Special Instructions
              </label>
              <button
                type="button"
                onClick={() => setIsInstructionOpen(true)}
                className="w-full flex items-center justify-center gap-2 px-[16px] py-[10px] rounded-[10px] border-[1.5px] border-dashed border-slate-200 bg-slate-50 text-[13.5px] font-medium text-slate-500"
              >
                Add Instructions
              </button>
            </div>

            <div className="rounded-[10px] border-[1.5px] border-slate-200 bg-white px-[20px] py-[20px]">
              <label className="block mb-[10px] text-[11px] font-semibold uppercase tracking-[0.09em] text-slate-400">
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
                className="px-7 py-3 rounded-lg text-sm font-semibold text-white bg-slate-900"
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

      <OrderDebug />
    </FormProvider>
  );
};

export default CreateOrderForm;