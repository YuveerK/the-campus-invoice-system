import { Font, Image, PDFViewer } from "@react-pdf/renderer";
import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { FaHome } from "react-icons/fa";
const InvoicePdf = ({
  complexName,
  invoiceNumber,
  invoiceDate,
  invoiceDueDate,
  list,
  description,
  quantity,
  amount,
}) => {
  Font.register({
    family: "ARIALBD",
    src: require("./fonts/arial/ARIALBD.TTF"),
  });
  Font.register({
    family: "ARIAL",
    src: require("./fonts/arial/ARIAL.TTF"),
  });

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
    return `R${price?.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ")}`;
  };
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 40,
          }}
        >
          <Image
            src={require("./assets/home.png")}
            style={{ width: 30, height: 30 }}
          />
          <Text style={[styles.heading1, { marginTop: 10, marginLeft: 10 }]}>
            The Campus Security Commitee
          </Text>
        </View>
        <View style={styles.row}>
          <View>
            <Text style={styles.text1}>THE CAMPUS ESTATE (ERF 530)</Text>
            <Text style={styles.text1}>152 VAN DALEN ROAD (S)</Text>
            <Text style={styles.text1}>SS SCHEME NR 180/2007</Text>
            <Text style={styles.text1}>WILLOWBROOK</Text>
            <Text style={styles.text1}>1724</Text>
          </View>
          <View>
            <Text
              style={[
                styles.text1Bold,
                { fontFamily: "ARIALBD", fontSize: 11 },
              ]}
            >
              Invoice Number:{" "}
              <Text style={{ fontFamily: "ARIAL", fontSize: 11 }}>
                {invoiceNumber}
              </Text>
            </Text>
            <Text
              style={[styles.text1, { fontFamily: "ARIALBD", fontSize: 11 }]}
            >
              Invoice Date:{" "}
              <Text style={{ fontFamily: "ARIAL", fontSize: 11 }}>
                {invoiceDate}
              </Text>
            </Text>
            <Text
              style={[styles.text1, { fontFamily: "ARIALBD", fontSize: 11 }]}
            >
              Due Date:{" "}
              <Text style={{ fontFamily: "ARIAL", fontSize: 11 }}>
                {invoiceDueDate}
              </Text>
            </Text>
          </View>
        </View>

        <Text style={[styles.heading1, { marginTop: 20, fontSize: 17 }]}>
          Attention
        </Text>
        <Text style={styles.heading1}>{complexName}</Text>
        <Text style={styles.text1}>THE CAMPUS ESTATE</Text>
        <Text style={styles.text1}>152 VAN DALEN ROAD SOUTH</Text>
        <Text style={styles.text1}>WILLOWBROOK</Text>
        <Text style={styles.text1}>1724</Text>
        <View style={styles.table}>
          <View
            style={[
              styles.tableRow,
              {
                backgroundColor: "#f1f1f2",
                borderWidth: 0.5,
                borderColor: "black",
              },
            ]}
          >
            <View
              style={[
                styles.th,
                {
                  width: "60%",
                },
              ]}
            >
              <Text style={[styles.heading1, { marginBottom: 0 }]}>
                Description
              </Text>
            </View>
            <View
              style={[
                styles.th,
                {
                  width: "20%",
                },
              ]}
            >
              <Text style={[styles.heading1, { marginBottom: 0 }]}>
                Quantity
              </Text>
            </View>
            <View
              style={[
                styles.th,
                {
                  width: "20%",
                },
              ]}
            >
              <Text style={[styles.heading1, { marginBottom: 0 }]}>Amount</Text>
            </View>
          </View>
          {list.map((item, index) => (
            <View style={[styles.tableRow, { height: "auto" }]} key={index}>
              <View
                style={[
                  styles.th,
                  {
                    width: "60%",
                    borderRightWidth: 0.5,
                    borderBottomWidth: 0.5,
                    borderLeftWidth: 0.5,
                    borderRightColor: "black",
                    padding: 16.8,
                    height: "auto",
                  },
                ]}
              >
                <Text style={styles.text1} wrap={true}>
                  {item.description}
                </Text>
              </View>
              <View
                style={[
                  styles.th,
                  {
                    width: "20%",
                    borderRightWidth: 0.5,
                    borderBottomWidth: 0.5,
                    borderRightColor: "black",
                  },
                ]}
              >
                <Text style={styles.text1}>{item.quantity}</Text>
              </View>
              <View
                style={[
                  styles.th,
                  {
                    width: "20%",
                    borderRightWidth: 0.5,
                    borderBottomWidth: 0.5,
                    borderRightColor: "black",
                  },
                ]}
              >
                <Text style={styles.text1}>
                  {formatPrice(parseFloat(item.amount))}
                </Text>
              </View>
            </View>
          ))}
          <View style={styles.tableRow}>
            <View
              style={[
                styles.th,
                {
                  width: "60%",
                  borderRightWidth: 0.5,
                  borderBottomWidth: 0.5,
                  borderLeftWidth: 0.5,
                  borderRightColor: "black",
                  padding: 16.8,
                },
              ]}
            >
              <Text style={styles.text1}></Text>
            </View>
            <View
              style={[
                styles.th,
                {
                  width: "20%",
                  borderRightWidth: 0.5,
                  borderBottomWidth: 0.5,
                  borderRightColor: "black",
                },
              ]}
            >
              <Text style={[styles.text1, { fontFamily: "ARIALBD" }]}>
                Subtotal
              </Text>
            </View>
            <View
              style={[
                styles.th,
                {
                  width: "20%",
                  borderRightWidth: 0.5,
                  borderBottomWidth: 0.5,
                  borderRightColor: "black",
                },
              ]}
            >
              <Text style={[styles.text1, { fontFamily: "ARIALBD" }]}>
                {formatPrice(calculate())}
              </Text>
            </View>
          </View>
        </View>
        <Text style={[styles.text1, { fontFamily: "ARIALBD", fontSize: 11 }]}>
          Bank:{" "}
          <Text style={{ fontFamily: "ARIAL", fontSize: 11 }}>
            First National Bank (FNB)
          </Text>
        </Text>
        <Text style={[styles.text1, { fontFamily: "ARIALBD", fontSize: 11 }]}>
          Account Holder:{" "}
          <Text style={{ fontFamily: "ARIAL", fontSize: 11 }}>
            The Campus Stokvel
          </Text>
        </Text>
        <Text style={[styles.text1, { fontFamily: "ARIALBD", fontSize: 11 }]}>
          Account Number:{" "}
          <Text style={{ fontFamily: "ARIAL", fontSize: 11 }}>
            63045834959 (Cheque)
          </Text>
        </Text>
        <Text style={[styles.text1, { fontFamily: "ARIALBD", fontSize: 11 }]}>
          Branch:{" "}
          <Text style={{ fontFamily: "ARIAL", fontSize: 11 }}>
            FEATHERBROOK (250741)
          </Text>
        </Text>
        <Text style={[styles.text1, { fontFamily: "ARIALBD", fontSize: 11 }]}>
          Reference:{" "}
          <Text style={{ fontFamily: "ARIAL", fontSize: 11 }}>
            BODY CORPORATE NAME
          </Text>
        </Text>
      </Page>
    </Document>
  );
};

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "white",
    padding: 32,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  heading1: {
    fontSize: 13,
    marginBottom: 10,
    color: "black",

    fontFamily: "ARIALBD",
  },
  row: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text1: {
    fontSize: 9,
    lineHeight: 1.5,
    fontFamily: "ARIAL",
  },
  table: {
    width: "100%",
    marginVertical: 30,
  },
  tableHeader: { display: "flex", flexDirection: "row", alignItems: "center" },
  tableRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  th: {
    display: "flex",
    justifyContent: "center",
    padding: 10,
    height: "100%",
  },
});

export default InvoicePdf;
