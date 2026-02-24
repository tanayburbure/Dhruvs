import axios from "axios";
import { Order } from "../types/order.types";

export const fetchOrders = async (): Promise<Order[]> => {
  const response = await axios.get<Order[]>(
    "https://jsonplaceholder.typicode.com/users"
  );
  return response.data;
};