import { useState } from "react";
import { PDFViewer } from "@react-pdf/renderer";
import InvoicePDF from "../pdf/InvoicePDF";

const SummaryButton = ({ data }: any) => {
  const [showPDF, setShowPDF] = useState(false);

  return (
    <div>

      {showPDF && (
        <div className="h-screen mt-[20px]">
          <PDFViewer width="100%" height="100%">
            <InvoicePDF data={data} />
          </PDFViewer>
        </div>
      )}

    </div>
  );
};

export default SummaryButton;