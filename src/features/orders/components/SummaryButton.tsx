import { useState } from "react";
import { PDFViewer } from "@react-pdf/renderer";
import InvoicePDF from "../pdf/InvoicePDF";

const SummaryButton = ({ data }: any) => {
  const [showPDF, setShowPDF] = useState(false);

  return (
    <div>
      <button
        onClick={() => setShowPDF(true)}
        className="px-4 py-2 bg-black text-white rounded"
      >
        Summary
      </button>

      {showPDF && (
        <div style={{ height: "100vh", marginTop: 20 }}>
          <PDFViewer width="100%" height="100%">
            <InvoicePDF data={data} />
          </PDFViewer>
        </div>
      )}
    </div>
  );
};

export default SummaryButton;