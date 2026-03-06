import { create } from "zustand";
import { persist } from "zustand/middleware";
import { OrderFormValues } from "../schemas/order.schema";
import type { ImageItem } from "../components/media/ImageUploadModal";
import type { DeepPartial } from "react-hook-form";

type OrderDraft = DeepPartial<OrderFormValues> & {
  images?: ImageItem[];
  garmentImages?: Record<number, ImageItem[]>;
  finalReview?: DeepPartial<OrderFormValues>;
  amountPaid?: number;
  paymentMode?: "cash" | "upi" | null;
  balance?: number;
  [key: string]: unknown;
};

type OrderStore = {
  order: OrderDraft;

  setOrder: (data: OrderDraft) => void;
  resetOrder: () => void;
};

export const useOrderStore = create<OrderStore>()(
  persist(
    (set) => ({
      order: {},

      setOrder: (data) =>
        set((state) => ({
          order: {
            ...state.order,
            ...data,
          },
        })),

      resetOrder: () => set({ order: {} }),
    }),
    {
      name: "order-draft",
    }
  )
);