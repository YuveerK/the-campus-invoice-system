import React from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { viewInvoiceState } from "./atoms/viewInvoiceAtom";
import { FaDownload, FaEdit } from "react-icons/fa";
import InvoicePdf from "./InvoicePdf";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useNavigate } from "react-router-dom";
import { db } from "./firebase";
import { v4 as uuidv4 } from "uuid";
import { doc, setDoc } from "firebase/firestore";

const Invoice = ({
  complexName,
  invoiceNumber,
  invoiceDate,
  invoiceDueDate,
  description,
  quantity,
  amount,
  list,
}) => {
  const [viewInvoice, setViewInvoice] = useRecoilState(viewInvoiceState);

  console.log(viewInvoice);

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

  const navigate = useNavigate();
  const confirmDownload = async () => {
    // Add a new document in collection "cities"
    await setDoc(doc(db, "invoices", `${complexName}-${uuidv4()}`), {
      complexName,
      invoiceNumber,
      invoiceDate,
      invoiceDueDate,
      list,
      subtotal: calculate(),
    });
  };
  return (
    <InvoiceContainer>
      <button
        className="download_invoice_button"
        style={{ marginTop: "3rem" }}
        onClick={confirmDownload}
      >
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
      </button>
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

      <table width={"100%"} cellSpacing={0}>
        <thead>
          <tr>
            <th>Descrition</th>
            <th>Quantity</th>
            <th>Amount</th>
          </tr>
        </thead>

        <tbody>
          {list.map((item, index) => (
            <tr key={index}>
              <td width={"60%"} style={{ borderRight: "1px solid black" }}>
                {item.description}
              </td>
              <td width={"20%"} style={{ borderRight: "1px solid black" }}>
                {item.quantity}
              </td>
              <td width={"20%"}> {formatPrice(parseFloat(item.amount))}</td>
            </tr>
          ))}
          <tr>
            <td width={"60%"}></td>
            <td
              width={"20%"}
              style={{ fontWeight: "bold", fontSize: "1.2rem" }}
            >
              Subtotal
            </td>
            <td
              width={"20%"}
              style={{ fontWeight: "bold", fontSize: "1.2rem" }}
            >
              {formatPrice(parseFloat(calculate().toFixed(2)))}
            </td>
          </tr>
        </tbody>
      </table>
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
      <button
        className="download_invoice_button"
        style={{ marginTop: "3rem" }}
        onClick={() => setViewInvoice(false)}
      >
        <FaEdit /> Edit Invoice
      </button>
    </InvoiceContainer>
  );
};
const InvoiceContainer = styled.div`
  width: 1000px;
  height: 1200px;
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
  table {
    width: 100%;
    margin-top: 2rem;
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
        /* :nth-child(even) {
          background-color: #dadada;
        } */
        td {
          padding: 1rem;
          border-bottom: 1px solid black;

          .icons {
            font-size: 1.5rem;
            cursor: pointer;
          }
        }
      }
    }
  }
`;
export default Invoice;
