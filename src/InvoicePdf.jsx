import React from "react";
import styled from "styled-components";
import { FaDownload, FaEdit } from "react-icons/fa";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 32,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    alignItems: "center",
  },
  heading1: {
    fontSize: 18,
    marginBottom: 10,
  },
  text1: {
    fontSize: 12,
    lineHeight: 1.5,
  },
  table: {
    display: "table",
    width: "100%",
    marginTop: 20,
  },
  tableHeader: {
    backgroundColor: "#f1f1f1",
    display: "table-header-group",
    textAlign: "left",
  },
  tableRow: {
    display: "table-row",
  },
  tableCell: {
    display: "table-cell",
    padding: 10,
    borderRight: "1px solid black",
  },
  tableCellRight: {
    display: "table-cell",
    padding: 10,
  },
  tableTotal: {
    fontWeight: "bold",
    fontSize: 16,
  },
  downloadButton: {
    padding: 10,
    backgroundColor: "#60a0ff",
    border: "none",
    color: "white",
    borderRadius: 5,
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#3b89ff",
    },
  },
  editButton: {
    marginTop: "3rem",
  },
});

const InvoicePdf = ({
  complexName,
  invoiceNumber,
  invoiceDate,
  invoiceDueDate,
  description,
  quantity,
  amount,
  list,
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

  return (
    <>
      <button className="download_invoice_button">
        <FaDownload /> Download Invoice
      </button>
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text style={styles.heading1}>The Campus Security Commitee</Text>
            <Text style={styles.text1}>THE CAMPUS ESTATE (ERF 530)</Text>
            <Text style={styles.text1}>152 VAN DALEN ROAD (S)</Text>
            <Text style={styles.text1}>SS SCHEME NR 180/2007</Text>
            <Text style={styles.text1}>WILLOWBROOK</Text>
            <Text style={styles.text1}>1724</Text>
          </View>
          {/* <View style={styles.section}>
            <Text style={[styles.text1, styles.table]}>
              <Text>Invoice Number: </Text>

              <Text style={{ fontWeight: "300" }}>{invoiceNumber}</Text>
            </Text>
          </View>
          <View style={styles.invoiceInfo}>
            <Text style={[styles.text, { fontWeight: "bold" }]}>
              Invoice Date:
            </Text>
            <Text style={styles.text}>{invoiceDate}</Text>
          </View>
          <View style={styles.invoiceInfo}>
            <Text style={[styles.text, { fontWeight: "bold" }]}>Due Date:</Text>
            <Text style={styles.text}>{invoiceDueDate}</Text>
          </View>

          <View style={styles.informationLeft}>
            <View style={styles.informationContent}>
              <Text
                style={[styles.text, styles.heading1, { marginBottom: 10 }]}
              >
                Attention
              </Text>
              <Text style={[styles.text, styles.heading1]}>{complexName}</Text>
              <Text style={[styles.text, { fontSize: 12 }]}>
                THE CAMPUS ESTATE{" "}
              </Text>
              <Text style={[styles.text, { fontSize: 12 }]}>
                152 VAN DALEN ROAD SOUTH
              </Text>
              <Text style={[styles.text, { fontSize: 12 }]}>WILLOWBROOK</Text>
              <Text style={[styles.text, { fontSize: 12 }]}>1724</Text>
            </View>
          </View>

          <View style={styles.tableContainer}>
            <View>
              <View>
                <View>
                  <View style={styles.cell}>Descrition</View>
                  <View style={styles.cell}>Quantity</View>
                  <View style={styles.cell}>Amount</View>
                </View>
              </View>

              <View>
                {list.map((item, index) => (
                  <View key={index}>
                    <View
                      style={[styles.cell, { borderRight: "1px solid black" }]}
                    >
                      {item.description}
                    </View>
                    <View
                      style={[styles.cell, { borderRight: "1px solid black" }]}
                    >
                      {item.quantity}
                    </View>
                    <View style={styles.cell}>R{item.amount}</View>
                  </View>
                ))}
                <View>
                  <View
                    style={[styles.cell, { fontWeight: "bold", fontSize: 16 }]}
                  >
                    Subtotal
                  </View>
                  <View
                    style={[styles.cell, { fontWeight: "bold", fontSize: 16 }]}
                  />
                  <View
                    style={[styles.cell, { fontWeight: "bold", fontSize: 16 }]}
                  >
                    R{calculate().toFixed(2)}
                  </View>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.footer}>
            <View style={styles.bankInfo}>
              <Text style={[styles.text, { fontWeight: "bold", fontSize: 16 }]}>
                Bank:
              </Text>
              <Text style={[styles.text, { fontWeight: "300", fontSize: 16 }]}>
                First National Bank (FNB)
              </Text>
            </View>
            <View style={styles.bankInfo}>
              <Text style={[styles.text, { fontWeight: "bold", fontSize: 16 }]}>
                Account Holder:
              </Text>
              <Text style={[styles.text, { fontWeight: "300", fontSize: 16 }]}>
                The Campus Stokvel
              </Text>
            </View>
            <View style={styles.bankInfo}>
              <Text style={[styles.text, { fontWeight: "bold", fontSize: 16 }]}>
                Account Number:
              </Text>
              <Text style={[styles.text, { fontWeight: "300", fontSize: 16 }]}>
                63045834959 (Cheque)
              </Text>
            </View> 
            <View style={styles.bankInfo}>
            <Text style={[styles.text
          </View>
          */}
        </Page>
      </Document>
    </>
  );
};
export default InvoicePdf;
