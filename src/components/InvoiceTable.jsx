import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import InvoicePdf from "../InvoicePdf";
import { PDFDownloadLink } from "@react-pdf/renderer";
import FilterTable from "./home/FilterTable";
import { MdDownloadDone, MdPending } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const InvoiceTable = ({ batchNumber, onStatusChange }) => {
  const [invoices, setInvoices] = useState([]);
  const [displayedInvoices, setDisplayedInvoices] = useState([]);
  const [generatePdfForInvoice, setGeneratePdfForInvoice] = useState(null);
  const navigate = useNavigate();
  const handleDocumentLoadSuccess = () => {
    setGeneratePdfForInvoice(null);
  };

  const handleStatusChange = async (invoiceId, newStatus, totalAmount) => {
    let newSplitCost = newStatus === "Paid" ? 0 : parseFloat(totalAmount) / 8;

    await db.collection("invoices").doc(invoiceId).update({
      status: newStatus,
      splitCost: newSplitCost,
    });

    fetchData();
    if (onStatusChange) onStatusChange();
  };

  const fetchData = async () => {
    let query = db.collection("invoices");
    if (batchNumber || batchNumber === 0) {
      query = query.where("batchNumber", "==", batchNumber);
    }

    const data = await query.get();
    setInvoices(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    if (batchNumber || batchNumber === 0) fetchData();
  }, [batchNumber]);

  useEffect(() => {
    setDisplayedInvoices(invoices);
  }, [invoices]);

  const returnFilteredData = (filteredData) => {
    setDisplayedInvoices(filteredData);
  };

  const viewInvoice = (invoice) => {
    navigate("/view-invoice", { state: invoice });
  };

  // Function to delete an invoice by ID
  const deleteInvoice = async (invoiceId) => {
    if (window.confirm("Are you sure you want to delete this invoice?")) {
      await db.collection("invoices").doc(invoiceId).delete();
      fetchData();
    }
  };

  return (
    <div>
      <FilterTable data={invoices} returnFilteredData={returnFilteredData} />
      <div className=" w-full h-[765px] rounded-lg p-4 pb-10 overflow-auto flex items-center justify-center">
        <table className=" bg-white rounded-lg mt-8 shadow-md table-auto">
          <thead>
            <tr className="text-left bg-gray-800 text-white">
              <th className="font-medium p-4">Complex Name</th>
              <th className="font-medium p-4">Invoice Date</th>
              <th className="font-medium p-4">Due Date</th>
              <th className="font-medium p-4">Split Cost</th>
              <th className="font-medium p-4">Status</th>
              <th className="font-medium p-4">Date Paid</th>
              <th className="font-medium p-4">Amount Paid</th>
              <th className="font-medium p-4"></th>
              <th className="font-medium p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayedInvoices.map((invoice) => (
              <tr key={invoice.id} className="hover:bg-gray-50 border">
                <td className="p-4 border">{invoice.complexName}</td>
                <td className="p-4 border">
                  {new Date(invoice.invoiceDate).toDateString()}
                </td>
                <td className="p-4 border">
                  {new Date(invoice.invoiceDueDate).toDateString()}
                </td>
                <td className="p-4 border">R{invoice.splitCost}</td>
                <td className="p-4 border">
                  <select
                    value={invoice.status}
                    onChange={(e) =>
                      handleStatusChange(
                        invoice.id,
                        e.target.value,
                        invoice.total
                      )
                    }
                    className="bg-gray-100 rounded p-2 outline-none"
                  >
                    <option value="Unpaid">Unpaid</option>
                    <option value="Paid">Paid</option>
                  </select>
                </td>

                <td className="p-4 border text-center">{invoice.datePaid}</td>
                <td className="p-4 border text-center">{invoice.paidAmount}</td>
                <td className="p-4 border ">
                  <div className=" text-white rounded-md cursor-pointer  w-fit flex items-center justify-center">
                    {generatePdfForInvoice === invoice.id ? (
                      <PDFDownloadLink
                        document={<InvoicePdf {...invoice} />}
                        fileName={`${invoice.complexName} - ${invoice.invoiceTitle}`}
                        onDocumentLoadSuccess={handleDocumentLoadSuccess}
                        className="bg-green-500 hover:bg-green-600 p-2 rounded text-white w-fit"
                      >
                        {({ loading }) =>
                          loading ? "Loading document..." : "Download now!"
                        }
                      </PDFDownloadLink>
                    ) : (
                      <button
                        onClick={() => setGeneratePdfForInvoice(invoice.id)}
                        className="bg-green-500 hover:bg-green-600 p-2 rounded w-fit"
                      >
                        Generate PDF
                      </button>
                    )}

                    <button
                      className="bg-green-500 hover:bg-green-600 rounded w-fit ml-8 px-4 py-2"
                      onClick={() => viewInvoice(invoice)}
                    >
                      View
                    </button>

                    {/* Button to delete the invoice */}
                    <button
                      className="bg-red-500 hover:bg-red-600 rounded w-fit ml-4 px-4 py-2"
                      onClick={() => deleteInvoice(invoice.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
                <td className="p-4 border text-center">
                  {invoice.status === "Paid" ? (
                    <div className="flex items-center justify-center">
                      <MdDownloadDone size={35} className="text-green-500" />
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <MdPending size={35} className="text-red-500" />
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvoiceTable;
