import React, { useState } from "react";
import { db } from "../firebase/index";
import { useLocation } from "react-router-dom";

const InvoicePage = () => {
  const location = useLocation();
  const invoice = location.state;
  const [editedData, setEditedData] = useState(invoice);

  const updateInvoice = async () => {
    const invoiceRef = db.collection("invoices").doc(editedData.id);
    await invoiceRef.update(editedData);
  };

  return (
    <div className="p-10 max-w-3xl mx-auto bg-white shadow-md">
      <h1 className="text-2xl mb-6 font-semibold">{editedData.invoiceTitle}</h1>

      <div className="mb-4">
        Complex Name:{" "}
        <input
          className="border p-2 w-full"
          value={editedData.complexName}
          onChange={(e) =>
            setEditedData({ ...editedData, complexName: e.target.value })
          }
        />
      </div>
      <div className="mb-4">
        Invoice Number:{" "}
        <input
          className="border p-2 w-full"
          value={editedData.invoiceNumber}
          onChange={(e) =>
            setEditedData({ ...editedData, invoiceNumber: e.target.value })
          }
        />
      </div>
      <div className="mb-4">
        Batch Number:{" "}
        <input
          className="border p-2 w-full"
          value={editedData.batchNumber}
          onChange={(e) =>
            setEditedData({ ...editedData, batchNumber: e.target.value })
          }
        />
      </div>
      <div className="mb-4">
        Status:{" "}
        <input
          className="border p-2 w-full"
          value={editedData.status}
          onChange={(e) =>
            setEditedData({ ...editedData, status: e.target.value })
          }
        />
      </div>

      {/* Mapping through the list items for editing */}
      {editedData.list &&
        editedData.list.map((item, idx) => (
          <div key={idx} className="mb-4 border p-4 rounded">
            <div className="mb-2">
              Description:{" "}
              <input
                className="border p-2 w-full"
                value={item.description}
                onChange={(e) => {
                  const newList = [...editedData.list];
                  newList[idx].description = e.target.value;
                  setEditedData({ ...editedData, list: newList });
                }}
              />
            </div>
            <div className="mb-2">
              Amount:{" "}
              <input
                className="border p-2 w-full"
                value={item.amount}
                onChange={(e) => {
                  const newList = [...editedData.list];
                  newList[idx].amount = e.target.value;
                  setEditedData({ ...editedData, list: newList });
                }}
              />
            </div>
            <div className="mb-2">
              Quantity:{" "}
              <input
                className="border p-2 w-full"
                value={item.quantity}
                onChange={(e) => {
                  const newList = [...editedData.list];
                  newList[idx].quantity = e.target.value;
                  setEditedData({ ...editedData, list: newList });
                }}
              />
            </div>
          </div>
        ))}

      <div className="mb-4">
        Invoice Due Date:{" "}
        <input
          className="border p-2 w-full"
          type="date"
          value={editedData.invoiceDueDate}
          onChange={(e) =>
            setEditedData({ ...editedData, invoiceDueDate: e.target.value })
          }
        />
      </div>
      <div className="mb-4">
        Paid Amount:{" "}
        <input
          className="border p-2 w-full"
          type="number"
          value={editedData.paidAmount || ""}
          onChange={(e) =>
            setEditedData({
              ...editedData,
              paidAmount: parseFloat(e.target.value),
            })
          }
        />
      </div>
      <div className="mb-4">
        Date Paid:{" "}
        <input
          className="border p-2 w-full"
          type="date"
          value={editedData.datePaid || ""}
          onChange={(e) =>
            setEditedData({ ...editedData, datePaid: e.target.value })
          }
        />
      </div>
      <button
        className="mt-4 px-6 py-2 bg-blue-600 text-white hover:bg-blue-700"
        onClick={updateInvoice}
      >
        Update Invoice
      </button>
    </div>
  );
};

export default InvoicePage;
