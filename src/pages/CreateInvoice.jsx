import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { AiFillEdit } from "react-icons/ai";
import { BsFillCalendarCheckFill, BsFillHouseDoorFill } from "react-icons/bs";
import { TbCalendarDue, TbFileInvoice } from "react-icons/tb";
import Invoice from "../Invoice";
import ListTable from "../components/create-invoice/ListTable";

const CreateInvoice = () => {
  const [complexName, setComplexName] = useState("Princeton");
  const [batchCounter, setBatchCounter] = useState(0);
  const [invoiceTitle, setInvoiceTitle] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");
  const [invoiceDueDate, setInvoiceDueDate] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [amount, setAmount] = useState("");
  const [list, setList] = useState([]);

  const addItem = () => {
    let data = {
      description,
      quantity,
      amount,
    };

    setList([...list, data]);
  };

  useEffect(() => {
    getBatchCount();
  }, []);
  console.log(batchCounter);
  const getBatchCount = async () => {
    const batchRef = db.collection("meta").doc("batchCounter");
    let batchDoc = await batchRef.get();
    let currentBatchNumber = batchDoc.exists
      ? batchDoc.data().currentBatchNumber
      : 0;

    setBatchCounter(currentBatchNumber);
  };
  const startNewBatch = async () => {
    const batchRef = db.collection("meta").doc("batchCounter");
    let batchDoc = await batchRef.get();
    let currentBatchNumber = batchDoc.exists
      ? batchDoc.data().currentBatchNumber
      : 0;

    // Increment the batch number
    await batchRef.set({
      currentBatchNumber: currentBatchNumber + 1,
    });
    setBatchCounter((batchCounter) => batchCounter + 1);
  };

  const handleListUpdate = (payload) => {
    setList(payload);
  };

  const complexOptions = [
    "Princeton",
    "UCLA",
    "Oxford",
    "Harvard",
    "NYU",
    "Stanford",
    "Cambridge",
    "Yale",
  ];

  return (
    <div className="flex p-6 space-x-6 rounded-md bg-gray-50 w-full h-full">
      <div className="w-1/2 rounded-lg p-6 bg-white shadow-md overflow-y-scroll">
        <h1 className="text-2xl font-bold mb-4 text-gray-700">
          Client Information
        </h1>
        <div className="flex items-center mb-4">
          <h2 className="text-xl text-gray-600">Current Batches:</h2>
          <span className="ml-2 text-blue-600">{batchCounter}</span>
        </div>

        <button
          onClick={startNewBatch}
          className="bg-blue-400 px-4 py-2 rounded-md text-white hover:bg-blue-500 transition duration-150"
        >
          Start New Batch
        </button>

        <div className="mt-4">
          <label htmlFor="complexName" className="block text-gray-600 mb-2">
            Complex Name
          </label>
          <select
            id="complexName"
            className="form-input mt-1 block w-full border rounded-md p-2"
            onChange={(e) => setComplexName(e.target.value)}
          >
            {complexOptions.map((complex) => (
              <option key={complex} value={complex}>
                {complex}
              </option>
            ))}
          </select>
        </div>

        {/* Here's how you can use tailwind to style your input groups */}
        <div className="mt-4">
          <label
            htmlFor="invoiceTitle"
            className="block text-gray-600 mb-2 flex items-center"
          >
            <TbFileInvoice className="mr-2" size={24} /> Invoice Title
          </label>
          <input
            id="invoiceTitle"
            value={invoiceTitle}
            onChange={(e) => setInvoiceTitle(e.target.value)}
            className="form-input mt-1 block w-full border rounded-md p-2"
          />
        </div>

        {/* Following the same styling pattern */}
        <div className="mt-4">
          <label
            htmlFor="invoiceNumber"
            className="block text-gray-600 mb-2 flex items-center"
          >
            <TbFileInvoice className="mr-2" size={24} /> Invoice Number
          </label>
          <input
            id="invoiceNumber"
            value={invoiceNumber}
            onChange={(e) => setInvoiceNumber(e.target.value)}
            className="form-input mt-1 block w-full border rounded-md p-2"
          />
        </div>

        <div className="mt-4">
          <label
            htmlFor="invoiceDate"
            className="block text-gray-600 mb-2 flex items-center"
          >
            <TbCalendarDue className="mr-2" size={24} /> Invoice Date
          </label>
          <input
            id="invoiceDate"
            type="date"
            value={invoiceDate}
            onChange={(e) => setInvoiceDate(e.target.value)}
            className="form-input mt-1 block w-full border rounded-md p-2"
          />
        </div>

        <div className="mt-4">
          <label
            htmlFor="invoiceDueDate"
            className="block text-gray-600 mb-2 flex items-center"
          >
            <BsFillCalendarCheckFill className="mr-2" size={24} /> Invoice Due
            Date
          </label>
          <input
            id="invoiceDueDate"
            type="date"
            value={invoiceDueDate}
            onChange={(e) => setInvoiceDueDate(e.target.value)}
            className="form-input mt-1 block w-full border rounded-md p-2"
          />
        </div>

        <h1 className="text-2xl font-bold mt-8 mb-4 text-gray-700">
          Item Description
        </h1>

        <div className="mt-4">
          <label
            htmlFor="description"
            className="block text-gray-600 mb-2 flex items-center"
          >
            <AiFillEdit className="mr-2" size={24} /> Description
          </label>
          <input
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-input mt-1 block w-full border rounded-md p-2"
          />
        </div>

        <div className="mt-4">
          <label
            htmlFor="quantity"
            className="block text-gray-600 mb-2 flex items-center"
          >
            <AiFillEdit className="mr-2" size={24} /> Quantity
          </label>
          <input
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="form-input mt-1 block w-full border rounded-md p-2"
          />
        </div>

        <div className="mt-4">
          <label
            htmlFor="amount"
            className="block text-gray-600 mb-2 flex items-center"
          >
            <AiFillEdit className="mr-2" size={24} /> Amount
          </label>
          <input
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="form-input mt-1 block w-full border rounded-md p-2"
          />
        </div>

        <button
          className="mt-6 bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600 transition duration-150"
          onClick={addItem}
        >
          Add Item
        </button>

        <div className="mt-6">
          <ListTable data={list} handleListUpdate={handleListUpdate} />
        </div>
      </div>

      <div className="w-1/2 p-6 bg-white shadow-md">
        <h1 className="text-2xl font-bold mb-8 text-gray-700">Live Preview</h1>
        <Invoice
          complexName={complexName}
          invoiceNumber={invoiceNumber}
          invoiceDate={invoiceDate}
          invoiceDueDate={invoiceDueDate}
          description={description}
          quantity={quantity}
          amount={amount}
          list={list}
          invoiceTitle={invoiceTitle}
          batchNumber={batchCounter}
        />
      </div>
    </div>
  );
};

export default CreateInvoice;
