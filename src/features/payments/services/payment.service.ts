import axios from "axios";
import { Payment } from "../types/payment.types";

export const fetchPayments = async (): Promise<Payment[]> => {
  const response = await axios.get<Payment[]>(
    "https://jsonplaceholder.typicode.com/users"
  );
  return response.data;
};