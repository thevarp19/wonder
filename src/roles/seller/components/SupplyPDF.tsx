import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";

const styles = StyleSheet.create({
    page: {
        flexDirection: "row",
        backgroundColor: "#E4E4E4",
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
    },
});

export const SupplyPDF = () => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.section}>
                <Text>Hello World!</Text>
            </View>
            <View style={styles.section}>
                <Text>We're generating this PDF with React!</Text>
            </View>
        </Page>
        <Page size="A4" style={styles.page}>
            <View style={styles.section}>
                <Text>Hello World!</Text>
            </View>
            <View style={styles.section}>
                <Text>We're generating this PDF with React!</Text>
            </View>
        </Page>
    </Document>
);
