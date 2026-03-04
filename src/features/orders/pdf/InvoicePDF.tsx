import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    Image,
  } from "@react-pdf/renderer";
  
  type FabricItem = {
    fabric: string;
    qty: number;
    price: number;
    total: number;
  };
  
  type GarmentItem = {
    garment: string;
    qty: number;
    stitchingCost: number;
  };
  
  type InvoiceData = {
    customer: string;
    takenBy: string;
    contact: string;
  
    orderId: number;
    receivedDate: string;
    deliveryDate: string;
  
    garments: GarmentItem[];
    fabrics: FabricItem[];
  
    stitchingTotal: number;
    fabricTotal: number;
    grandTotal: number;
  
    qr?: string;
    logo?: string;
  };
  
  const styles = StyleSheet.create({
    page: {
      padding: 30,
      fontSize: 11,
    },
  
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      borderBottom: "1px solid black",
      paddingBottom: 10,
      marginBottom: 20,
    },
  
    logo: {
      width: 70,
      height: 70,
    },
  
    sectionRow: {
      flexDirection: "row",
      gap: 20,
    },
  
    table: {
      flex: 1,
      border: "1px solid black",
    },
  
    tableHeader: {
      flexDirection: "row",
      backgroundColor: "#e5e5e5",
      borderBottom: "1px solid black",
    },
  
    row: {
      flexDirection: "row",
      borderBottom: "1px solid black",
    },
  
    cell: {
      flex: 1,
      padding: 6,
    },
  
    totalBox: {
      marginTop: 20,
      padding: 10,
      backgroundColor: "#e5e5e5",
      textAlign: "center",
    },
  
    transactions: {
      marginTop: 30,
    },
  
    footer: {
      marginTop: 30,
      flexDirection: "row",
      justifyContent: "space-between",
    },
  
    qr: {
      width: 80,
      height: 80,
    },
  });
  
  const InvoicePDF = ({ data }: { data: InvoiceData }) => {
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          {/* HEADER */}
  
          <View style={styles.header}>
            <View>
              <Text>To: {data.customer}</Text>
              <Text>Taken by: {data.takenBy}</Text>
              <Text>Contact: {data.contact}</Text>
            </View>
  
            {data.logo && <Image style={styles.logo} src={data.logo} />}
  
            <View>
              <Text>Order Id : {data.orderId}</Text>
              <Text>Order Received : {data.receivedDate}</Text>
              <Text>Delivery Date : {data.deliveryDate}</Text>
            </View>
          </View>
  
          {/* TABLE SECTION */}
  
          <View style={styles.sectionRow}>
            {/* Garments */}
  
            <View style={styles.table}>
              <View style={styles.tableHeader}>
                <Text style={styles.cell}>Garment</Text>
                <Text style={styles.cell}>Qty</Text>
                <Text style={styles.cell}>Stitching</Text>
              </View>
  
              {data.garments.map((g, i) => (
                <View key={i} style={styles.row}>
                  <Text style={styles.cell}>{g.garment}</Text>
                  <Text style={styles.cell}>{g.qty}</Text>
                  <Text style={styles.cell}>₹{g.stitchingCost}</Text>
                </View>
              ))}
            </View>
  
            {/* Fabric */}
  
            <View style={styles.table}>
              <View style={styles.tableHeader}>
                <Text style={styles.cell}>Fabric</Text>
                <Text style={styles.cell}>Qty</Text>
                <Text style={styles.cell}>Price</Text>
                <Text style={styles.cell}>Total</Text>
              </View>
  
              {data.fabrics.map((f, i) => (
                <View key={i} style={styles.row}>
                  <Text style={styles.cell}>{f.fabric}</Text>
                  <Text style={styles.cell}>{f.qty}</Text>
                  <Text style={styles.cell}>₹{f.price}</Text>
                  <Text style={styles.cell}>₹{f.total}</Text>
                </View>
              ))}
            </View>
          </View>
  
          {/* TOTAL */}
  
          <View style={styles.totalBox}>
            <Text>
              ₹{data.stitchingTotal} + ₹{data.fabricTotal} = ₹{data.grandTotal}
            </Text>
          </View>
  
          {/* TRANSACTIONS */}
  
          <View style={styles.transactions}>
            <Text>Transactions</Text>
            <Text>16th Dec 2025, 5:12 PM ₹0 received via Cash</Text>
            <Text>Due : ₹33,000</Text>
          </View>
  
          {/* FOOTER */}
  
          <View style={styles.footer}>
            <View>
              <Text>Thank you for your business</Text>
              <Text>Terms and conditions</Text>
              <Text>*Once confirmed advance cannot be refunded.</Text>
              <Text>*Goods once sold will not be taken back.</Text>
            </View>
  
            {data.qr && <Image src={data.qr} style={styles.qr} />}
          </View>
        </Page>
      </Document>
    );
  };
  
  export default InvoicePDF;