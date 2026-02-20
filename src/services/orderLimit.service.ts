import axios from "axios";

export const fetchOrdersTaken = async (date: string) => {
  const res = await axios.get(`/api/orders/count?date=${date}`);
  return res.data.count;
};

export const fetchOrderLimit = async (date: string) => {
  const res = await axios.get(`/api/order-limit?date=${date}`);
  return res.data.limit;
};

export const saveOrderLimit = async (date: string, limit: number) => {
  return axios.post("/api/order-limit", { date, limit });
};