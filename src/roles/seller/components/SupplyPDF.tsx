import { GetProductResponse } from "@/modules/product/types";
import { GetStoreResponse } from "@/modules/store/types";
import {
    Document,
    Font,
    Image,
    Page,
    StyleSheet,
    Text,
    View,
} from "@react-pdf/renderer";
import JsBarcode from "jsbarcode";
import { SupplyState } from "../redux/supply/reducer";
import { SupplyPack } from "../types/supply";

Font.register({
    family: "Roboto",
    src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf",
});

const styles = StyleSheet.create({
    grid: {
        flexDirection: "row",
        display: "flex",
        flexWrap: "wrap",
        gap: 10,
        marginTop: 40,
        marginLeft: 40,
    },
    header: {
        marginTop: 10,
        marginLeft: 40,
    },
    root: {
        display: "flex",
        justifyContent: "center",
    },
    barcode: {
        width: 100,
    },
    product: {
        flexDirection: "column",
        display: "flex",
        gap: 3,
        alignItems: "center",
        fontSize: 8,
        padding: 10,
        border: 1,
    },
    pack: {
        width: "30%",
        fontSize: 10,
        padding: 10,
        border: 1,
    },
    anchor: {
        fontFamily: "Roboto",
    },
});

const ProductBlock = ({
    product,
}: {
    product: GetProductResponse;
    pack: SupplyPack;
}) => {
    return (
        <View style={styles.product}>
            <Image
                style={styles.barcode}
                src={generateBarcodeBase64(product.vendorCode)}
            />
            <Text>Wonder</Text>
            <Text>101933090_801930</Text>
            <Text>{Date.now()}</Text>
        </View>
    );
};

const ProductsBlock = ({ pack }: { pack: SupplyPack }) => {
    return (
        <>
            {pack.products.map((product) => (
                <ProductBlock
                    key={`${product.id}-${pack.id}`}
                    product={product.product}
                    pack={pack}
                />
            ))}
        </>
    );
};

const PackBlock = ({ pack }: { pack: SupplyPack }) => {
    return (
        <View style={styles.pack}>
            <Text>Box barcode: {Date.now()}</Text>
            <Text>Box type: Monopolet</Text>
            <Text>Box size: 100x200x300</Text>
            <Text> </Text>
            <Text>Products:</Text>
            <View>
                {pack.products.map((product, index) => (
                    <Text key={`${product.id}-${pack.id}`}>
                        {index + 1}
                        {" - "}
                        Phone, {product.quantity} items
                    </Text>
                ))}
            </View>
        </View>
    );
};

export const SupplyPDF = ({
    supply,
}: {
    supply: SupplyState;
    store?: GetStoreResponse;
}) => {
    return (
        <Document>
            <Page
                size="A4"
                orientation={"portrait"}
                wrap={true}
                style={styles.anchor}
            >
                <View style={styles.header}>
                    <Text>
                        Creation date:{" "}
                        {new Date()
                            .toLocaleDateString("ru-RU")
                            .replace(".", "-")
                            .replace(".", "-")}
                    </Text>
                    <Text>Date: {supply.date}</Text>
                    <Text>Store: Алматы, Street, 2</Text>
                    <Text>Supply id: {Date.now()}</Text>
                </View>
                <View style={styles.root}>
                    <View style={styles.grid}>
                        {supply.packs.map((pack) => (
                            <PackBlock key={pack.id} pack={pack} />
                        ))}
                    </View>
                </View>
            </Page>
            <Page size="A4">
                <View style={styles.header}>
                    <Text>Boxes</Text>
                </View>
                <View style={styles.root}>
                    <View style={styles.grid}>
                        {supply.packs.map((pack) => (
                            <View style={styles.product} key={pack.id}>
                                <Image
                                    style={styles.barcode}
                                    src={generateBarcodeBase64(`${Date.now()}`)}
                                />
                                <Text>Wonder</Text>
                                <Text>Almaty</Text>
                                <Text>937491829384</Text>
                            </View>
                        ))}
                    </View>
                </View>
            </Page>
            <Page size="A4">
                <View style={styles.header}>
                    <Text>Products</Text>
                </View>
                <View style={styles.root}>
                    <View style={styles.grid}>
                        {supply.packs.map((pack) => (
                            <ProductsBlock key={pack.id} pack={pack} />
                        ))}
                    </View>
                </View>
            </Page>
        </Document>
    );
};

function generateBarcodeBase64(text: string, options = {}) {
    const canvas = document.createElement("canvas");

    JsBarcode(canvas, text, {
        format: "CODE128",
        lineColor: "#000",
        width: 2,
        height: 100,
        displayValue: true,
        ...options,
    });

    return canvas.toDataURL("image/png");
}
