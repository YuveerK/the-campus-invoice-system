import React from "react";
import { Route, Routes } from "react-router-dom";
import Sidebar from "./Sidebar";
import Home from "./pages/Home";
import Clients from "./pages/Clients";
import Invoices from "./pages/Invoices";
import CreateInvoice from "./pages/CreateInvoice";
import PreviewPdf from "./pages/PreviewPdf";
import { PDFViewer } from "@react-pdf/renderer";
import YuveerInvoice from "./YuveerInvoice";
import InvoicePage from "./pages/InvoicePage";

const App = () => {
  return (
    <div className=" bg-gray-200 w-full h-screen">
      <div className="flex bg-white p-8 rounded-md h-full">
        <Sidebar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/invoices" element={<Invoices />} />
          <Route exact path="/clients" element={<Clients />} />
          <Route exact path="/create-invoices" element={<CreateInvoice />} />
          <Route exact path="/preview-pdf" element={<PreviewPdf />} />
          <Route exact path="/view-invoice" element={<InvoicePage />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
