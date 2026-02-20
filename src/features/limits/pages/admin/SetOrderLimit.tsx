import { useEffect } from "react";
import dayjs from "dayjs";
import {
  fetchOrdersTaken,
  fetchOrderLimit,
  saveOrderLimit,
} from "../../../../services/orderLimit.service";
import { useOrderLimitStore } from "../../../../stores/orderLimit.store";

export default function SetOrderLimitPage() {
  const {
    selectedDate,
    ordersTaken,
    currentLimit,
    setDate,
    setLimitValue,
    setSelectedDate,
    setSetDate,
    setData,
    setSetLimitValue,
  } = useOrderLimitStore();

  const remaining = currentLimit - ordersTaken;

  useEffect(() => {
    loadData(selectedDate);
  }, [selectedDate]);

  const loadData = async (date: string) => {
    const orders = await fetchOrdersTaken(date);
    const limit = await fetchOrderLimit(date);
    setData(orders, limit); // if limit null → 100 auto
  };

  const handleSaveLimit = async () => {
    await saveOrderLimit(setDate, setLimitValue);
    alert("Limit Saved Successfully");
  };

  return (
    <div className="p-10 bg-gray-100 rounded-3xl min-h-screen space-y-12">
      
      {/* ================= TOP SECTION (VIEW CURRENT DATE) ================= */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Select Date</h2>

        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="p-3 border rounded-lg w-64"
        />

        <div className="flex gap-6 mt-8">
          <Card title="Orders Already Taken" value={ordersTaken} highlight />
          <Card title="Current Order Limit" value={currentLimit} />
          <Card title="Remaining Order" value={remaining} />
        </div>
      </div>

      {/* ================= BOTTOM SECTION (SET LIMIT FOR ANY DATE) ================= */}

      <div className="bg-white p-8 rounded-2xl shadow">
        <h2 className="text-lg font-semibold mb-6">
          Set Maximum Order Limit For Specific Date
        </h2>

        <div className="flex items-center gap-6">
          <input
            type="number"
            value={setLimitValue}
            onChange={(e) => setSetLimitValue(Number(e.target.value))}
            className="p-3 border rounded-lg w-32"
          />

          <input
            type="date"
            value={setDate}
            onChange={(e) => setSetDate(e.target.value)}
            className="p-3 border rounded-lg"
          />

          <button
            onClick={handleSaveLimit}
            className="px-6 py-2 bg-yellow-400 rounded-full"
          >
            Save Limit
          </button>
        </div>
      </div>
    </div>
  );
}

function Card({
  title,
  value,
  highlight,
}: {
  title: string;
  value: number;
  highlight?: boolean;
}) {
  return (
    <div
      className={`p-6 rounded-2xl w-56 text-center shadow ${
        highlight ? "border-2 border-blue-500" : ""
      }`}
    >
      <p className="text-gray-600 mb-2">{title}</p>
      <h2 className="text-3xl font-bold">{value}</h2>
    </div>
  );
}