import { GetProductResponse } from "@/modules/product/types";
import {
    Document,
    Image,
    Page,
    StyleSheet,
    Text,
    View,
} from "@react-pdf/renderer";
import JsBarcode from "jsbarcode";
import Barcode from "react-barcode";
import { SupplyState } from "../redux/supply/reducer";
import { SupplyPack } from "../types/supply";

const styles = StyleSheet.create({
    page: {
        flexDirection: "row",
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
    },
});

const ProductBlock = ({ product }: { product: GetProductResponse }) => {
    return (
        <View>
            <Text>{product.name}</Text>
            <Text>{product.id}</Text>
            <Image src={generateBarcodeBase64(product.vendorCode)} />
        </View>
    );
};

const PackBlock = ({ pack }: { pack: SupplyPack }) => {
    return (
        <View>
            <Text>{pack.id}</Text>
            <Text>{pack.box.description}</Text>
            {pack.products.map((product) => (
                <ProductBlock
                    key={`${product.id}-${pack.id}`}
                    product={product.product}
                />
            ))}
        </View>
    );
};

export const SupplyPDF = ({ supply }: { supply: SupplyState }) => {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text>{supply.date}</Text>
                    <Text>{supply.store?.address}</Text>
                </View>
                <View style={styles.section}>
                    {supply.packs.map((pack) => (
                        <PackBlock key={pack.id} pack={pack} />
                    ))}
                </View>
                <Barcode value="123456789" />
            </Page>
        </Document>
    );
};

function generateBarcodeBase64(text: string, options = {}) {
    // Create a canvas element
    const canvas = document.createElement("canvas");

    // Generate the barcode
    JsBarcode(canvas, text, {
        format: "CODE128", // Default barcode format
        lineColor: "#000", // Color of the bars
        width: 2, // Width of a single bar
        height: 100, // Height of the barcode
        displayValue: true, // Whether to display the text value below the barcode
        ...options, // Merge any custom options
    });

    // Convert the canvas to a Base64 string
    return canvas.toDataURL("image/png");
}
