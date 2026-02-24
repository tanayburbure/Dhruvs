import { useEffect, useState } from "react";
import { fetchCustomers } from "../services/customer.service";
import { Customer } from "../types/customer.types";

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getCustomers = async () => {
      try {
        const data = await fetchCustomers();
        setCustomers(data);
      } catch (err) {
        setError("Failed to fetch customers");
      } finally {
        setLoading(false);
      }
    };

    getCustomers();
  }, []);

  if (loading) {
    return <div className="p-4">Loading customers...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Customers</h2>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2">Customer Id</th>
            <th className="p-2">Customer Name</th>
            <th className="p-2">Phone No.</th>
            <th className="p-2">Total Orders</th>
          </tr>
        </thead>

        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id} className="border-b">
              <td className="p-2">{customer.id}</td>
              <td className="p-2">{customer.name}</td>
              <td className="p-2">{customer.phone}</td>
              <td className="p-2">
                {Math.floor(Math.random() * 10) + 1}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}