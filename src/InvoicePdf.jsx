import { Font, Image } from "@react-pdf/renderer";
import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
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
    family: "Manrope-Bold",
    src: require("./fonts/manrope/Manrope-Bold.ttf"),
  });
  Font.register({
    family: "Manrope-ExtraBold",
    src: require("./fonts/manrope/Manrope-ExtraBold.ttf"),
  });
  Font.register({
    family: "Manrope-Light",
    src: require("./fonts/manrope/Manrope-Light.ttf"),
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

  const generateName = () => {
    let name = {};
    if (complexName === "All Complexes") {
      return (name = { name: "The Campus Estate", email: "" });
    }
    if (complexName === "Princeton") {
      return (name = { name: "Yuveer", email: "yuveerkal@hotmail.com" });
    }
    if (complexName === "UCLA") {
      return (name = { name: "Tokelo", email: "tokelon@gmail.com" });
    }
    if (complexName === "Cambridge") {
      return (name = { name: "Elzhervaen", email: "elzhervaenl@gmail.com" });
    }
    if (complexName === "Stanford") {
      return (name = { name: "Thembi", email: "zkkhumalo@gmail.com" });
    }
    if (complexName === "Yale") {
      return (name = { name: "Shy", email: "shykutlwano@gmail.com" });
    }
    if (complexName === "NYU") {
      return (name = { name: "Jackie", email: "jackie.krog@gmail.com" });
    }
    if (complexName === "Harvard") {
      return (name = { name: "Wynand", email: "pm7@remax-tac.co.za" });
    }
    if (complexName === "Oxford") {
      return (name = { name: "Warren", email: "warrengst@gmail.com" });
    }
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
            <Text style={[styles.text1, { fontFamily: "Manrope-Light" }]}>
              THE CAMPUS ESTATE (ERF 530)
            </Text>
            <Text style={[styles.text1, { fontFamily: "Manrope-Light" }]}>
              152 VAN DALEN ROAD (S)
            </Text>
            <Text style={[styles.text1, { fontFamily: "Manrope-Light" }]}>
              SS SCHEME NR 180/2007
            </Text>
            <Text style={[styles.text1, { fontFamily: "Manrope-Light" }]}>
              WILLOWBROOK
            </Text>
            <Text style={[styles.text1, { fontFamily: "Manrope-Light" }]}>
              1724
            </Text>
          </View>
          <View>
            <Text
              style={[
                styles.text1Bold,
                { fontFamily: "Manrope-Bold", fontSize: 11 },
              ]}
            >
              Invoice Number:{" "}
              <Text style={{ fontFamily: "Manrope-Light", fontSize: 11 }}>
                {invoiceNumber}
              </Text>
            </Text>
            <Text
              style={[
                styles.text1,
                { fontFamily: "Manrope-Bold", fontSize: 11 },
              ]}
            >
              Invoice Date:{" "}
              <Text style={{ fontFamily: "Manrope-Light", fontSize: 11 }}>
                {invoiceDate}
              </Text>
            </Text>
            <Text
              style={[
                styles.text1,
                { fontFamily: "Manrope-Bold", fontSize: 11 },
              ]}
            >
              Due Date:{" "}
              <Text style={{ fontFamily: "Manrope-Light", fontSize: 11 }}>
                {invoiceDueDate}
              </Text>
            </Text>
          </View>
        </View>
        <View style={styles.row}>
          <View>
            <Text style={[styles.heading1, { marginTop: 20, fontSize: 17 }]}>
              Attention
            </Text>
            <Text style={styles.heading1}>
              {complexName === "All Complexes"
                ? generateName().name
                : `${complexName} - ${generateName().name}`}
            </Text>

            <Text style={[styles.text1, { fontFamily: "Manrope-Light" }]}>
              Email: {generateName().email}
            </Text>
            <Text style={[styles.text1, { fontFamily: "Manrope-Light" }]}>
              THE CAMPUS ESTATE
            </Text>
            <Text style={[styles.text1, { fontFamily: "Manrope-Light" }]}>
              152 VAN DALEN ROAD SOUTH
            </Text>
            <Text style={[styles.text1, { fontFamily: "Manrope-Light" }]}>
              WILLOWBROOK
            </Text>
            <Text style={[styles.text1, { fontFamily: "Manrope-Light" }]}>
              1724
            </Text>
          </View>
        </View>
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
                    padding: 13.8,
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
                  padding: 13.8,
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
              <Text style={[styles.text1, { fontFamily: "Manrope-Bold" }]}>
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
              <Text style={[styles.text1, { fontFamily: "Manrope-Bold" }]}>
                {formatPrice(calculate())}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            marginBottom: 12,
          }}
        >
          <Image
            src={require("./assets/Bank.png")}
            style={{ width: 18, height: 18 }}
          />
          <Text
            style={[
              styles.text1,
              {
                fontFamily: "Manrope-Bold",
                fontSize: 11,
                marginTop: 10,
                marginLeft: 12,
              },
            ]}
          >
            Banking Details
          </Text>
        </View>
        <Text
          style={[styles.text1, { fontFamily: "Manrope-Bold", fontSize: 11 }]}
        >
          Bank:{" "}
          <Text style={{ fontFamily: "Manrope-Light", fontSize: 11 }}>
            First National Bank (FNB)
          </Text>
        </Text>
        <Text
          style={[styles.text1, { fontFamily: "Manrope-Bold", fontSize: 11 }]}
        >
          Account Holder:{" "}
          <Text style={{ fontFamily: "Manrope-Light", fontSize: 11 }}>
            The Campus Stokvel
          </Text>
        </Text>
        <Text
          style={[styles.text1, { fontFamily: "Manrope-Bold", fontSize: 11 }]}
        >
          Account Number:{" "}
          <Text style={{ fontFamily: "Manrope-Light", fontSize: 11 }}>
            63045834959 (Cheque)
          </Text>
        </Text>
        <Text
          style={[styles.text1, { fontFamily: "Manrope-Bold", fontSize: 11 }]}
        >
          Branch:{" "}
          <Text style={{ fontFamily: "Manrope-Light", fontSize: 11 }}>
            FEATHERBROOK (250741)
          </Text>
        </Text>
        <Text
          style={[styles.text1, { fontFamily: "Manrope-Bold", fontSize: 11 }]}
        >
          Reference:{" "}
          <Text style={{ fontFamily: "Manrope-Light", fontSize: 11 }}>
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

    fontFamily: "Manrope-Bold",
  },
  row: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text1: {
    fontSize: 9,
    lineHeight: 2,
    fontFamily: "Manrope-Bold",
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
