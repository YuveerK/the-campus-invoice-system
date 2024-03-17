import React from "react";
import styled from "styled-components";
import { db } from "./firebase";
import YuveerInvoice from "./YuveerInvoice";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import InvoicePdf from "./InvoicePdf";

const Invoice = ({
  complexName,
  invoiceNumber,
  invoiceDate,
  invoiceDueDate,
  list,
  invoiceTitle,
  batchNumber,
}) => {
  const calculate = () => {
    let subtotal = 0;

    for (let i = 0; i < list.length; i++) {
      const quantity = list[i].quantity;
      const amount = list[i].amount;
      subtotal += quantity * amount;
    }
    return subtotal;
  };

  const formatPrice = (price) => {
    return `R${parseFloat(price)
      .toFixed(2)
      .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}`;
  };
  console.log(complexName);
  const confirmDownload = async () => {
    // Add a new document in collection "invoices"
    let invoiceRef = await db.collection("invoices").add({
      invoiceTitle,
      complexName,
      invoiceNumber,
      invoiceDate,
      invoiceDueDate,
      list,
      total: calculate() * 8,
      splitCost: calculate(),
      status: "Unpaid",
      batchNumber: batchNumber, // Store the current batch number
    });

    if (invoiceRef.id) {
      // Once the invoice is added, add a document in "batches"
      await db.collection("batches").add({
        invoiceId: invoiceRef.id, // Reference to the added invoice
        batchNumber: batchNumber, // Current batch number
        timeStamp: new Date(), // Current timestamp
        invoiceTitle: invoiceTitle, //Title for the invoice to pull what invoices the batch relates to
      });
    }

    console.log("Done");
  };

  return (
    <InvoiceContainer>
      <button
        className="download_invoice_button"
        style={{ marginTop: "1rem" }}
        onClick={() => confirmDownload()}
      >
        {/* Download Now! */}
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
          fileName={`INV${invoiceNumber} - ${complexName} - ${invoiceTitle}`}
        >
          {({ blob, url, loading, error }) =>
            loading ? "Loading document..." : "Download now!"
          }
        </PDFDownloadLink>
      </button>

      {/*  
        <div className="absolute w-full h-screen z-20 bg-black/50 flex items-center justify-center top-0 left-0">
          <div onClick={() => setViewInvoice(false)}>
            <p className="absolute top-8 right-20 font-bold text-2xl cursor-pointer z-10 text-white">
              Close
            </p>
          </div>

          <PreviewPdf
            complexName={complexName}
            invoiceNumber={invoiceNumber}
            invoiceDate={invoiceDate}
            invoiceDueDate={invoiceDueDate}
            list={list}
          />
        </div> */}

      {/* <PDFViewer width={"100%"} height={"1600px"}>
        <YuveerInvoice
          complexName={complexName}
          invoiceNumber={invoiceNumber}
          invoiceDate={invoiceDate}
          invoiceDueDate={invoiceDueDate}
          list={list}
        />
      </PDFViewer> */}
      <div className="information">
        <div className="information_content">
          <h1 className="heading1">The Campus Security Commitee</h1>
          <p className="text1">THE CAMPUS ESTATE (ERF 530)</p>
          <p className="text1">152 VAN DALEN ROAD (S)</p>
          <p className="text1">SS SCHEME NR 180/2007</p>
          <p className="text1">WILLOWBROOK</p>
          <p className="text1">1724</p>
        </div>
        <div className="information_content">
          <p
            className="text1"
            style={{ fontWeight: "bolder", fontSize: "16px" }}
          >
            Invoice Number:{" "}
            <span style={{ fontWeight: "300" }}>{invoiceNumber}</span>
          </p>
          <p
            className="text1"
            style={{ fontWeight: "bolder", fontSize: "16px" }}
          >
            Invoice Date:{" "}
            <span style={{ fontWeight: "300" }}>{invoiceDate}</span>
          </p>
          <p
            className="text1"
            style={{ fontWeight: "bolder", fontSize: "16px" }}
          >
            Due Date:{" "}
            <span style={{ fontWeight: "300" }}>{invoiceDueDate}</span>
          </p>
        </div>
      </div>

      <div className="information_left">
        <div className="information_content">
          <h1 className="heading1 main">Attention</h1>
          <h1 className="heading1">{complexName}</h1>
          <p className="text1">THE CAMPUS ESTATE </p>
          <p className="text1">152 VAN DALEN ROAD SOUTH</p>
          <p className="text1">WILLOWBROOK</p>
          <p className="text1">1724</p>
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th colSpan="3" className="text-center">
                {invoiceTitle}
              </th>
            </tr>
            <tr>
              <th>Description</th>
              <th>Quantity</th>
              <th>Amount</th>
            </tr>
          </thead>

          <tbody>
            {list.map((item, index) => (
              <tr key={index}>
                <td>{item.description}</td>
                <td>{item.quantity}</td>
                <td>{formatPrice(parseFloat(item.amount))}</td>
              </tr>
            ))}
            <tr>
              <td colSpan="3" className="subtotal">
                Total: {formatPrice(parseFloat(calculate().toFixed(2)))}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <br />
      <br />
      <p
        className="text1"
        style={{ fontWeight: "bolder", fontSize: "16px", lineHeight: "25px" }}
      >
        Bank:
        <span style={{ fontWeight: "300" }}>First National Bank (FNB)</span>
      </p>
      <p
        className="text1"
        style={{ fontWeight: "bolder", fontSize: "16px", lineHeight: "25px" }}
      >
        Account Holder:
        <span style={{ fontWeight: "300" }}>The Campus Stokvel</span>
      </p>
      <p
        className="text1"
        style={{ fontWeight: "bolder", fontSize: "16px", lineHeight: "25px" }}
      >
        Account Number:
        <span style={{ fontWeight: "300" }}>63045834959 (Cheque)</span>
      </p>
      <p
        className="text1"
        style={{ fontWeight: "bolder", fontSize: "16px", lineHeight: "25px" }}
      >
        Branch:
        <span style={{ fontWeight: "300" }}>FEATHERBROOK (250741)</span>
      </p>
      <p
        className="text1"
        style={{ fontWeight: "bolder", fontSize: "16px", lineHeight: "25px" }}
      >
        Reference:
        <span style={{ fontWeight: "300" }}>BODY CORPORATE NAME</span>
      </p>
    </InvoiceContainer>
  );
};

const InvoiceContainer = styled.div`
  width: 100%;
  height: 90%;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  border-radius: 5px;
  background-color: white;
  padding: 2rem;
  overflow-y: scroll;
  .download_invoice_button {
    padding: 10px;
    background-color: #60a0ff;
    border: none;
    color: white;
    border-radius: 5px;
    cursor: pointer;

    :hover {
      background-color: #3b89ff;
    }
  }

  .information {
    display: flex;
    justify-content: space-between;
    margin: 2rem 0;

    .information_content {
      .heading1 {
        font-size: 1rem;
        margin-bottom: 10px;
      }

      .text1 {
        font-size: 12px;
        line-height: 18px;
      }
    }
  }

  .information_left {
    display: flex;
    align-items: center;
    justify-content: flex-start;

    .information_content {
      .heading1 {
        font-size: 1rem;
        margin-bottom: 10px;
      }

      .heading1.main {
        font-size: 1.5rem;
        margin-bottom: 10px;
      }

      .text1 {
        font-size: 12px;
        line-height: 18px;
      }
    }
  }

  .table-container {
    overflow-x: auto;
    margin-top: 2rem;
  }

  table {
    width: 100%;
    border: 1px solid black;

    thead {
      tr {
        text-align: left;
        background-color: #f1f1f1;

        th {
          padding: 1rem;
          border-bottom: 1px solid black;
        }
      }
    }

    tbody {
      tr {
        td {
          padding: 1rem;
          border-bottom: 1px solid black;

          .icons {
            font-size: 1.5rem;
            cursor: pointer;
          }
        }
      }

      .subtotal {
        font-weight: bold;
        font-size: 1.2rem;
        text-align: right;
        padding-right: 1rem;
      }
    }
  }
`;

export default Invoice;
