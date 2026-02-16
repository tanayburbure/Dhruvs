export default function OrdersPage() {
    return (
      <div>
        <h2 className="text-lg font-semibold mb-4">Orders</h2>
  
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-2">Order Id</th>
              <th className="p-2">Customer</th>
              <th className="p-2">Items</th>
              <th className="p-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="p-2">22312</td>
              <td className="p-2">Sarthak</td>
              <td className="p-2">4</td>
              <td className="p-2">45000</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
  