import { PDFViewer } from "@react-pdf/renderer";
import React from "react";
import InvoicePdf from "../InvoicePdf";
import YuveerInvoice from "../YuveerInvoice";

const PreviewPdf = ({
  complexName,
  invoiceNumber,
  invoiceDate,
  invoiceDueDate,
  list,
}) => {
  return (
    <PDFViewer width={"70%"} height={"90%"}>
      <InvoicePdf
        complexName={complexName}
        invoiceNumber={invoiceNumber}
        invoiceDate={invoiceDate}
        invoiceDueDate={invoiceDueDate}
        list={list}
      />
    </PDFViewer>
  );
};

export default PreviewPdf;
