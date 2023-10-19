import React, { useEffect, useState } from "react";
import Card from "../components/home/Card";
import { MdAttachMoney } from "react-icons/md";
import { GiTakeMyMoney, GiMoneyStack } from "react-icons/gi";
import Feed from "../components/home/Feed";
import InvoiceTable from "../components/InvoiceTable";
import { db } from "../firebase";
import { GrAddCircle } from "react-icons/gr";
import { Link } from "react-router-dom";

const Home = () => {
  const [latestBatchAmount, setLatestBatchAmount] = useState(0);
  const [batchCounters, setBatchCounters] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState("");
  const [unpaidInvoices, setUnpaidInvoices] = useState(0);
  const [paidInvoices, setPaidInvoices] = useState(0);
  const [invoiceTitle, setInvoiceTitle] = useState("");

  // Fetch batch counters
  useEffect(() => {
    fetchBatchCounters();
  }, []);

  // Calculate batch amount and fetch invoice title when the selected batch changes
  useEffect(() => {
    if (selectedBatch) {
      const batchNum = parseInt(selectedBatch);
      calculateBatchAmount(batchNum);
      fetchInvoiceTitleForBatch(batchNum);
    }
  }, [selectedBatch]);

  const fetchBatchCounters = async () => {
    try {
      const batchDoc = await db.collection("meta").doc("batchCounter").get();
      let counters = [];

      if (!batchDoc.exists) {
        console.error("No batchCounter document found");
        counters = [1];
      } else {
        const currentBatchNumber = batchDoc.data().currentBatchNumber || 1;
        counters = Array.from({ length: currentBatchNumber + 1 }, (_, i) => i);
      }

      setBatchCounters(counters);

      // Set the last batch as default if available
      if (counters.length) {
        setSelectedBatch(counters[counters.length - 1].toString());
      }
    } catch (error) {
      console.error("Error fetching batch counters:", error);
    }
  };

  const fetchInvoiceTitleForBatch = async (batchNumber) => {
    try {
      const batchSnapshot = await db
        .collection("batches")
        .where("batchNumber", "==", batchNumber)
        .limit(1) // assuming there's only one invoice title per batch
        .get();

      if (!batchSnapshot.empty) {
        const batchData = batchSnapshot.docs[0].data();
        setInvoiceTitle(batchData.invoiceTitle || ""); // set the invoice title or default to an empty string
      } else {
        setInvoiceTitle(""); // reset the title if no batches are found
      }
    } catch (error) {
      console.error("Error fetching invoice title:", error);
    }
  };

  const calculateBatchAmount = async (batchNumber) => {
    try {
      const querySnapshot = await db
        .collection("invoices")
        .where("batchNumber", "==", batchNumber)
        .get();

      let totalUnpaidSplit = 0;
      let unpaidCount = 0;
      let paidCount = 0;
      querySnapshot.forEach((doc) => {
        const invoiceData = doc.data();
        if (invoiceData.status === "Unpaid") {
          totalUnpaidSplit += invoiceData.splitCost;
          unpaidCount++;
        }
        if (invoiceData.status === "Paid") {
          paidCount++;
        }
      });

      setUnpaidInvoices(unpaidCount);
      setLatestBatchAmount(totalUnpaidSplit);
      setPaidInvoices(paidCount);
    } catch (error) {
      console.error("Error calculating batch amount:", error);
    }
  };

  const refreshBatchAmount = () => {
    if (selectedBatch) {
      calculateBatchAmount(parseInt(selectedBatch));
    }
  };

  console.log(invoiceTitle);
  return (
    <div className="flex flex-col md:flex-row w-full h-full bg-gray-100 p-4 md:p-8 rounded-lg overflow-auto">
      <div className="md:flex-[1] space-y-6 p-4 md:p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 text-gray-700">
          Dashboard - {invoiceTitle}
        </h1>
        <div className="flex items-center">
          <select
            className="w-full md:w-60 p-2 border border-gray-300 rounded-md bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition duration-150 ease-in-out"
            value={selectedBatch}
            onChange={(e) => setSelectedBatch(e.target.value)}
          >
            <option value="All">All</option>
            {batchCounters.map((batch, index) => (
              <option key={index} value={batch}>
                Batch {batch}
              </option>
            ))}
          </select>

          <Link to={"/create-invoices"} className="ml-8">
            <div className="flex items-center cursor-pointer ml-8">
              <GrAddCircle size={30} className="mr-2" />
              <p>Create Invoice</p>
            </div>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card
            icon={<MdAttachMoney size={30} color="#4a54d5" />}
            amount={`R${latestBatchAmount.toFixed(2)}`}
            title={"Amount Owing"}
          />
          <Card
            icon={<GiTakeMyMoney size={30} color="#4a54d5" />}
            amount={unpaidInvoices}
            title={"Unpaid Invoices"}
          />
          <Card
            icon={<GiMoneyStack size={30} color="#4a54d5" />}
            amount={paidInvoices}
            title={"Paid Invoices"}
          />
          <Card
            icon={<MdAttachMoney size={30} color="#4a54d5" />}
            amount={"R2 640"}
            title={"Overdue Amount"}
          />
        </div>

        <InvoiceTable
          batchNumber={parseInt(selectedBatch)}
          onStatusChange={refreshBatchAmount}
        />
      </div>

      {/* <div className="md:flex-[0.3] mt-6 md:mt-0 p-4 md:p-6 bg-white shadow-md rounded-lg overflow-y-auto">
        <Feed />
      </div> */}
    </div>
  );
};

export default Home;
