import { useFormContext, useWatch } from "react-hook-form";
import { OrderFormValues } from "./../schemas/order.schema";
import {
  calculateGarmentTotal,
  calculateFabricTotal,
} from "../components/utils/calculateTotals";

const FinalOrderSummary = () => {
  const { control } = useFormContext<OrderFormValues>();

  const fullData = useWatch({ control });

  const garmentTotal = calculateGarmentTotal(fullData.garments || []);
  const fabricTotal = calculateFabricTotal(fullData.fabrics || []);
  const grandTotal = garmentTotal + fabricTotal;

  return (
    <div id="final-summary" className="bg-white p-10 rounded-xl shadow-md">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <img src="/logo.png" alt="logo" className="h-16" />

        <div className="text-right">
          <p className="font-semibold">{fullData.fullName}</p>
          <p>Order Id : 225</p>
          <p>Order Received : {new Date().toLocaleDateString()}</p>
          <p>Delivery Date : 28/12/2025</p>
        </div>
      </div>

      <hr className="mb-6" />

      {/* Garment Table */}
      <table className="w-full text-left mb-8">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">Garment Type</th>
            <th className="p-2">Quantity</th>
            <th className="p-2">Total</th>
          </tr>
        </thead>
        <tbody>
          {fullData.garments?.map((g, i) => (
            <tr key={i} className="border-b">
              <td className="p-2">{g.garmentType}</td>
              <td className="p-2">{g.quantity}</td>
              <td className="p-2">
                ₹ {g.quantity * g.stitchingCost}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Totals */}
      <div className="text-right mb-8">
        <p>Garment Total : ₹ {garmentTotal}</p>
        <p>Fabric Total : ₹ {fabricTotal}</p>
        <p className="font-semibold text-lg">
          Grand Total : ₹ {grandTotal}
        </p>
      </div>

      {/* Terms */}
      <div className="text-sm text-gray-600 border-t pt-4">
        <p>Thank you for your business</p>
        <p>*Advance amount paid cannot be refunded.</p>
        <p>*Goods once sold will not be taken back.</p>
      </div>
    </div>
  );
};

export default FinalOrderSummary;