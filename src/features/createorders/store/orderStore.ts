import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { OrderFormValues } from "../schemas/order.schema";

export type OrderDraft = Partial<OrderFormValues>;

type OrderState = {
  draft: OrderDraft;
  setDraft: (draft: OrderDraft) => void;
  resetDraft: () => void;

  // ─── legacy aliases — keep until all child components are migrated ───
  /** @deprecated use setDraft instead */
  order: OrderDraft;
  /** @deprecated use setDraft instead */
  setOrder: (order: OrderDraft) => void;
  /** @deprecated use setDraft instead */
  updateOrder: (update: OrderDraft) => void;
  /** @deprecated use resetDraft instead */
  resetOrder: () => void;
};

/**
 * Zustand store for persisting the order draft across page reloads.
 *
 * Rules:
 * - This store is WRITE-ONLY from the form perspective.
 *   RHF (react-hook-form) is the single source of truth while the form is mounted.
 * - We only READ from this store once: when initialising RHF defaultValues.
 * - After that, the form syncs TO the store (debounced), never the other way.
 *
 * Legacy note:
 * - `setOrder` / `updateOrder` / `resetOrder` are aliases for backward compat.
 *   Migrate child components to use `setDraft` / `resetDraft` over time.
 */
export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      draft: {},

      setDraft: (draft) => set({ draft, order: draft }),

      resetDraft: () => set({ draft: {}, order: {} }),

      // ─── legacy aliases ───────────────────────────────────────────────
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