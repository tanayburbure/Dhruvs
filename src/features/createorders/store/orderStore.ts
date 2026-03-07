import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { OrderFormValues } from "../schemas/order.schema";

export type OrderDraft = Partial<OrderFormValues>;

type OrderState = {
  draft: OrderDraft;
  setDraft: (draft: OrderDraft) => void;
  resetDraft: () => void;

  // legacy aliases
  order: OrderDraft;
  setOrder: (order: OrderDraft) => void;
  updateOrder: (update: OrderDraft) => void;
  resetOrder: () => void;
};

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      draft: {},

      setDraft: (draft) => set({ draft, order: draft }),

      resetDraft: () => set({ draft: {}, order: {} }),

      /* legacy compatibility */

      order: {},

      setOrder: (order) => set({ draft: order, order }),

      updateOrder: (update) => {
        const next = { ...get().draft, ...update };
        set({ draft: next, order: next });
      },

      resetOrder: () => set({ draft: {}, order: {} }),
    }),
    {
      name: "order-draft",
    },
  ),
);