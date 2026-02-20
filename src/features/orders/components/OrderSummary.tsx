import { useFormContext, useWatch } from "react-hook-form";
import {
  calculateGarmentTotal,
  calculateFabricTotal,
} from "./utils/calculateTotals";
import PaymentModal from "./PaymentModal";

const OrderSummary = () => {
  const { control } = useFormContext();

  const garments = useWatch({ control, name: "garments" }) || [];
  const fabrics = useWatch({ control, name: "fabrics" }) || [];
  const fullName = useWatch({ control, name: "fullName" });

  const garmentTotal = calculateGarmentTotal(garments);
  const fabricTotal = calculateFabricTotal(fabrics);
  const grandTotal = garmentTotal + fabricTotal;

  return (
    <div className="border-2 border-blue-500 rounded-xl p-6 bg-white shadow-md space-y-6">

      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Order Summary</h2>
        <div className="text-sm text-gray-600">
          <p>Customer: {fullName}</p>
          <p>Order No: #3</p>
        </div>
      </div>

      {/* Garments Table */}
      <div>
        <h3 className="font-medium mb-2">Garments</h3>
        <div className="space-y-2">
          {garments.map((g: any, i: number) => (
            <div
              key={i}
              className="grid grid-cols-4 bg-gray-100 p-2 rounded-md"
            >
              <span>{g.garmentType}</span>
              <span>{g.quantity}</span>
              <span>{g.stitchingCost}</span>
              <span>{g.quantity * g.stitchingCost}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Fabrics Table */}
      <div>
        <h3 className="font-medium mb-2">Fabrics</h3>
        <div className="space-y-2">
          {fabrics.map((f: any, i: number) => (
            <div
              key={i}
              className="grid grid-cols-4 bg-gray-100 p-2 rounded-md"
            >
              <span>{f.fabricName}</span>
              <span>{f.quantity}</span>
              <span>{f.price}</span>
              <span>{f.quantity * f.price}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Totals */}
      <div className="border-t pt-4 space-y-2 text-right">
        <p>Garment Total: ₹ {garmentTotal}</p>
        <p>Fabric Total: ₹ {fabricTotal}</p>
        <p className="font-semibold text-lg">
          Grand Total: ₹ {grandTotal}
        </p>
      </div>
      <div className="pt-6 text-right">
        <PaymentModal total={grandTotal} />
      </div>
    </div>

  );
};

export default OrderSummary;