import { useState } from "react";

const PaymentPanel = ({ total }: { total: number }) => {
  const [amountPaid, setAmountPaid] = useState(0);
  const [mode, setMode] = useState<"cash" | "upi" | null>(null);

  const balance = total - amountPaid;

  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-80 space-y-4">

      <h3 className="font-semibold text-lg">Record Payment</h3>

      <input
        type="number"
        value={amountPaid}
        onChange={(e) => setAmountPaid(Number(e.target.value))}
        className="border rounded-md p-2 w-full"
        placeholder="Amount Paid"
      />

      <div className="flex gap-3">
        <button
          onClick={() => setMode("cash")}
          className={`flex-1 p-2 rounded-md border ${
            mode === "cash" ? "bg-blue-100 border-blue-500" : ""
          }`}
        >
          Cash
        </button>

        <button
          onClick={() => setMode("upi")}
          className={`flex-1 p-2 rounded-md border ${
            mode === "upi" ? "bg-blue-100 border-blue-500" : ""
          }`}
        >
          UPI
        </button>
      </div>

      <div className="text-right text-sm text-gray-600">
        <p>Total: ₹ {total}</p>
        <p>Balance: ₹ {balance}</p>
      </div>

      <button className="w-full bg-blue-600 text-white p-2 rounded-md">
        Save Payment
      </button>
    </div>
  );
};

export default PaymentPanel;