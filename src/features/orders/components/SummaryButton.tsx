import { useState } from "react";
import { PDFViewer } from "@react-pdf/renderer";
import InvoicePDF from "../pdf/InvoicePDF";

const SummaryButton = ({ data }: any) => {
  const [showPDF, setShowPDF] = useState(false);

  return (
    <div>

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