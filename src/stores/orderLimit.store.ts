import { create } from "zustand";
import dayjs from "dayjs";

interface OrderLimitState {
  // View section
  selectedDate: string;
  ordersTaken: number;
  currentLimit: number;

  // Set section
  setDate: string;
  setLimitValue: number;

  setSelectedDate: (date: string) => void;
  setSetDate: (date: string) => void;
  setData: (orders: number, limit?: number) => void;
  setSetLimitValue: (limit: number) => void;
}

export const useOrderLimitStore = create<OrderLimitState>((set) => ({
  selectedDate: dayjs().format("YYYY-MM-DD"),
  ordersTaken: 0,
  currentLimit: 100, // 🔥 default 100

  setDate: dayjs().format("YYYY-MM-DD"),
  setLimitValue: 100,

  setSelectedDate: (date) => set({ selectedDate: date }),
  setSetDate: (date) => set({ setDate: date }),

  setData: (orders, limit) =>
    set({
      ordersTaken: orders,
      currentLimit: limit ?? 100, // 🔥 fallback 100
    }),

  setSetLimitValue: (limit) => set({ setLimitValue: limit }),
}));