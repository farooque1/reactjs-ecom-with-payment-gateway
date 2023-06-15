import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  pdf,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";
import { useSelector } from "react-redux";
import axios from "axios";

// Define styles using StyleSheet
const styles = StyleSheet.create({

    page: {
    flexDirection: "row",
    height:"100%",
    backgroundColor: "#fff",
    marginTop: 10,
  },
  container: {
    margin: 10,
    marginTop:10,
    fontSize:15,
  },
  image: {
    width: "100%",
    marginBottom: 10,
  },
  table: {
    width: "100%",
    marginBottom: 10,
  },
  tableHeader: {
    backgroundColor: "#333",
    color: "#FFF",
    padding: 5,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomColor: "#CCC",
    borderBottomWidth: 1,
    alignItems: "center",
    height: 24,
    fontStyle: "bold",
  },
  tableCell: {
    width: "25%",
    borderRightColor: "#CCC",
    borderRightWidth: 1,
    paddingLeft: 5,
  },
  tableCellHeader: {
    width: "25%",
    borderRightColor: "#CCC",
    borderRightWidth: 1,
    paddingLeft: 5,
    fontWeight: "bold",
  },
});

const Invoice = () => {
  const [address, setAddress] = React.useState(null);

  const data = useSelector((state) => state.ProductReducer);
  
  const user = JSON.parse(localStorage.getItem('user'));
  console.log(user);
  const addressx=user.address;
  console.log(addressx);


  let amount2 =
    data.cart.length &&
    data.cart.map((item) => item.price).reduce((a, b) => a + b);

    let date=new Date().toLocaleString().replace(',','');
    console.log(date);

  const handleDownload = async () => {
    const doc = (
      <Document>

        <Page size="A4" >
        <View>
            <Text >{date}</Text>
        </View>
        <View style={styles.container}> 
              <Text>User Details</Text>
              
              <Text>Name    :- {user.name.firstname}</Text>,
              <Text>Email ID:- {user.emailid}</Text>,
              <Text>Mobile  :- {user.phone}</Text>,
              <Text>Address :- {addressx.street},{addressx.number} </Text>,
              <Text>{addressx.city},{addressx.zipcode}</Text>,
          </View>
          
          <View style={styles.page}>
            <Text>{data.cart.length === 0 ? "No data found." : ""}</Text>
            {data.cart.length > 0 && (
              <View style={styles.table}>
                <View style={styles.tableRow}>
                  <Text style={styles.tableCellHeader}>Image</Text>
                  <Text style={styles.tableCellHeader}>Title</Text>
                  <Text style={styles.tableCellHeader}>Category</Text>
                  <Text style={styles.tableCellHeader}>Price</Text>
                </View>
                {data.cart.map((item) => (
                  <View style={styles.tableRow} key={item.id}>
                    <Image src={item.image} style={styles.tableCell} />
                    <Text style={styles.tableCell}>{item.title}</Text>
                    <Text style={styles.tableCell}>{item.category}</Text>
                    <Text style={styles.tableCell}>${item.price}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
          <Text style={styles.price}>Total Amount ${amount2}</Text>
        </Page>
      </Document>
    );

    const pdfBlob = await pdf(doc).toBlob();
    const blobUrl = URL.createObjectURL(pdfBlob);
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = "example.pdf";
    link.click();
  };

  return (
    <div>
      <button onClick={handleDownload}>Download PDF</button>
    </div>
  );
};

export default Invoice;
