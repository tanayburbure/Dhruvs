import axios from "axios";
import { Customer } from "../types/customer.types";

export const fetchCustomers = async (): Promise<Customer[]> => {
  const response = await axios.get<Customer[]>(
    "https://jsonplaceholder.typicode.com/users"
  );
  return response.data;
};