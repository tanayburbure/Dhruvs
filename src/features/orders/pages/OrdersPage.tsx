import { useEffect, useState } from "react";
import { fetchOrders } from "../services/order.service";
import { Order } from "../types/order.types";

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const data = await fetchOrders();
        setOrders(data);
      } catch (err) {
        setError("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    getOrders();
  }, []);

  if (loading) {
    return <div className="p-4">Loading orders...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Orders</h2>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2">Order Id</th>
            <th className="p-2">Customer Name</th>
            <th className="p-2">Phone No.</th>
            <th className="p-2">Company</th>
            <th className="p-2">Delivery Date</th>
            <th className="p-2">Item Status</th>
            <th className="p-2">Total Amount</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-b">
              <td className="p-2">{order.id}</td>
              <td className="p-2">{order.name}</td>
              <td className="p-2">{order.phone}</td>
              <td className="p-2">{order.company.name}</td>
              <td className="p-2">12/12/2025</td>
              <td className="p-2">Under Processing</td>
              <td className="p-2">₹45000</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}