import axios from "axios";
import { Employee } from "../types/employee.types";

export const fetchEmployees = async (): Promise<Employee[]> => {
  const response = await axios.get<Employee[]>(
    "https://jsonplaceholder.typicode.com/users"
  );
  return response.data;
};