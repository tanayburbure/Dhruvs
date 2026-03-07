import { useOrderStore } from "../store/orderStore";

const OrderDebug = () => {
  const draft = useOrderStore((state) => state.draft);

  // #region agent log
  fetch("http://127.0.0.1:7242/ingest/cc33e5ef-cd30-407f-b513-b864041834da", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      runId: "pre-fix",
      hypothesisId: "H1",
      location: "OrderDebug.tsx:7",
      message: "OrderDebug render",
      data: {
        keys: Object.keys(draft || {}),
      },
      timestamp: Date.now(),
    }),
  }).catch(() => {});
  // #endregion

  return (
    <pre className="bottom-4 right-4 bg-black text-green-400 text-xs p-4 rounded max-w-[400px] max-h-[400px] overflow-auto shadow-lg z-50">
      {JSON.stringify(draft, null, 2)}
    </pre>
  );
};

export default OrderDebug;