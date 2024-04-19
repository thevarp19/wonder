import { GetBoxResponse } from "@/modules/box/types";
import { GetStoreResponse } from "@/modules/store/types";
import { getStoreFullAddress } from "@/modules/store/utils";
import { SupplyState } from "@/roles/seller/redux/supply/reducer";
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
import { SupplyPack } from "../../../../roles/seller/types/supply";
import { GetSupplyById } from "../../types";

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

const ProductBlock = ({ pack }: { pack: GetSupplyById }) => {
    return (
        <View style={styles.product}>
            <Image
                style={styles.barcode}
                src={generateBarcodeBase64(pack.article)}
            />
            <Text>{pack.shopName}</Text>
            <Text>{pack.vendorCode}</Text>
            <Text>{pack.boxBarCode}</Text>
        </View>
    );
};

const PackBlock = ({
    pack,
    boxes,
}: {
    pack: SupplyPack;
    boxes: GetBoxResponse[] | undefined;
}) => {
    // @ts-ignore
    const box = boxes?.find((b) => b.id === pack.box);
    return (
        <View style={styles.pack}>
            <Text>Box barcode: {Date.now()}</Text>
            <Text>Box type: {box?.name}</Text>
            <Text>Box size: {box?.description}</Text>
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

function padNumberToThirteenDigits(num: number) {
    let numStr = num.toString();
    while (numStr.length < 13) {
        numStr = "0" + numStr;
    }
    return numStr;
}

function groupByBox(packs: GetSupplyById[]) {
    const grouped: { [key: string]: GetSupplyById[] } = {};
    packs.forEach((pack) => {
        if (grouped[pack.boxBarCode]) {
            grouped[pack.boxBarCode].push(pack);
        } else {
            grouped[pack.boxBarCode] = [pack];
        }
    });

    return grouped;
}

export const SupplyPDF = ({
    date,
    store,
    packs,
    supplyId,
    supply,
    boxes,
}: {
    supplyId: number;
    date: string;
    store: GetStoreResponse;
    packs: GetSupplyById[];
    supply: SupplyState;
    boxes: GetBoxResponse[] | undefined;
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
                        Дата составления:{" "}
                        {new Date()
                            .toLocaleDateString("ru-RU")
                            .replace(".", "-")
                            .replace(".", "-")}
                    </Text>
                    <Text>Дата доставки: {date}</Text>
                    <Text>Адрес склада: {getStoreFullAddress(store)}</Text>
                    <Text>
                        Номер поставки: {padNumberToThirteenDigits(supplyId)}
                    </Text>
                </View>
                <View style={styles.root}>
                    <View style={styles.grid}>
                        {supply.packs.map((pack) => (
                            <PackBlock
                                key={pack.id}
                                pack={pack}
                                boxes={boxes}
                            />
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
                        {Object.values(groupByBox(packs)).map((packs) => (
                            <View style={styles.product} key={packs[0].article}>
                                <Image
                                    style={styles.barcode}
                                    src={generateBarcodeBase64(
                                        `${packs[0].boxBarCode}`
                                    )}
                                />
                                <Text>{packs[0].article}</Text>
                                <Text>{packs[0].shopName}</Text>
                                <Text>
                                    {padNumberToThirteenDigits(supplyId)}
                                </Text>
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
                        {packs.map((pack, index) => (
                            <ProductBlock key={index} pack={pack} />
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
