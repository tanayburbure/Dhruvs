import { useState } from "react";

interface PaymentPanelProps {
  total: number;
  onClose: () => void;
}

const PaymentPanel = ({ total, onClose }: PaymentPanelProps) => {
  const [amountPaid, setAmountPaid] = useState<number>(0);
  const [mode, setMode] = useState<"cash" | "upi" | null>(null);

  const balance = total - amountPaid;

  const handleSave = () => {
    console.log({
      amountPaid,
      mode,
      balance,
    });

    onClose();
  };

  return (
    <div className="space-y-5">

      <h2 className="text-xl font-semibold">Record Payment</h2>

      <div>
        <label className="text-sm text-gray-500">Amount Paid (₹)</label>
        <input
          type="number"
          value={amountPaid}
          onChange={(e) => setAmountPaid(Number(e.target.value))}
          className="w-full mt-1 border rounded-md p-2"
        />
      </div>

      <div>
        <label className="text-sm text-gray-500">Payment Mode</label>
        <div className="flex gap-3 mt-2">
          <button
            type="button"
            onClick={() => setMode("cash")}
            className={`flex-1 border p-2 rounded-md ${
              mode === "cash" ? "bg-blue-100 border-blue-500" : ""
            }`}
          >
            Cash
          </button>

          <button
            type="button"
            onClick={() => setMode("upi")}
            className={`flex-1 border p-2 rounded-md ${
              mode === "upi" ? "bg-blue-100 border-blue-500" : ""
            }`}
          >
            UPI
          </button>
        </div>
      </div>

      <div className="text-sm text-right space-y-1 text-gray-600">
        <p>Total: ₹ {total}</p>
        <p>Balance: ₹ {balance}</p>
      </div>

      <div className="flex gap-3 pt-3">
        <button
          onClick={onClose}
          className="flex-1 border rounded-md p-2"
        >
          Cancel
        </button>

        <button
          onClick={handleSave}
          className="flex-1 bg-blue-600 text-white rounded-md p-2"
        >
          Save Payment
        </button>
      </div>
    </div>
  );
};

export default PaymentPanel;