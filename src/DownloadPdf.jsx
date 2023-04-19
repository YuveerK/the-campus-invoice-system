import React from "react";
import { useLocation } from "react-router-dom";
import InvoicePdf from "./InvoicePdf";
import { PDFDownloadLink } from "@react-pdf/renderer";

const DownloadPdf = () => {
  const location = useLocation();
  const data = location.state;
  const {
    complexName,
    invoiceNumber,
    invoiceDate,
    invoiceDueDate,
    description,
    quantity,
    amount,
    list,
  } = data;

  return (
    <PDFDownloadLink
      document={
        <InvoicePdf
          complexName={complexName}
          invoiceNumber={invoiceNumber}
          invoiceDate={invoiceDate}
          invoiceDueDate={invoiceDueDate}
          list={list}
        />
      }
      fileName="somename.pdf"
    >
      {({ blob, url, loading, error }) =>
        loading ? "Loading document..." : "Download now!"
      }
    </PDFDownloadLink>
  );
};

export default DownloadPdf;
