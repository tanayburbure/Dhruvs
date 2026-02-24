import { useEffect, useState } from "react";
import { fetchPayments } from "../services/payment.service";
import { Payment } from "../types/payment.types";

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getPayments = async () => {
      try {
        const data = await fetchPayments();
        setPayments(data);
      } catch (err) {
        setError("Failed to fetch payments");
      } finally {
        setLoading(false);
      }
    };

    getPayments();
  }, []);

  if (loading) {
    return <div className="p-4">Loading payments...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Payments</h2>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2">Order Id</th>
            <th className="p-2">Customer Name</th>
            <th className="p-2">Phone No.</th>
            <th className="p-2">Items</th>
            <th className="p-2">Delivery Date</th>
            <th className="p-2">Total Amount</th>
            <th className="p-2">Pending Amount</th>
          </tr>
        </thead>

        <tbody>
          {payments.map((payment) => {
            const items = Math.floor(Math.random() * 5) + 1;
            const totalAmount = Math.floor(Math.random() * 50000) + 20000;
            const pendingAmount = Math.floor(totalAmount * 0.4);

            return (
              <tr key={payment.id} className="border-b">
                <td className="p-2">{payment.id}</td>
                <td className="p-2">{payment.name}</td>
                <td className="p-2">{payment.phone}</td>
                <td className="p-2">{items}</td>
                <td className="p-2">12/12/2025</td>
                <td className="p-2">₹{totalAmount}</td>
                <td className="p-2">₹{pendingAmount}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}