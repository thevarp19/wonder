import { GetStoreResponse } from "@/modules/store/types";
// import { generateBarcodeBase64 } from "@/modules/supply/components/SupplyPDF";
import { generateBarcodeBase64 } from "@/modules/supply/components/SupplyPDF";
import {
    Document,
    Font,
    Image,
    Page,
    StyleSheet,
    Text,
    View,
} from "@react-pdf/renderer";
import { FC } from "react";
import { GetCellResponse } from "../../types";
import { getCellCode } from "../../utils";

Font.register({
    family: "Roboto",
    src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf",
});

const styles = StyleSheet.create({
    barcode: {
        width: 100,
    },
    cell: {
        flexDirection: "column",
        display: "flex",
        gap: 3,
        alignItems: "center",
        fontSize: 8,
        padding: 10,
        border: 1,
    },
    anchor: {
        fontFamily: "Roboto",
    },
});

export interface CellBlockProps {
    cell: GetCellResponse;
    store: GetStoreResponse;
}

export const CellBlock = ({ cell, store }: CellBlockProps) => {
    const code = getCellCode(cell, store.kaspiId);
    return (
        <View style={styles.cell}>
            <Text style={{ maxWidth: "150px", width: "100%" }}>
                Адрес: {store.formattedAddress}
            </Text>
            <Text>
                Размер: {cell.width}x{cell.height}x{cell.depth}
            </Text>
            <Image style={styles.barcode} src={generateBarcodeBase64(code)} />
        </View>
    );
};

export const CellBlockPDF: FC<CellBlockProps> = ({ cell, store }) => {
    return (
        <Document>
            <Page
                size="A4"
                orientation={"portrait"}
                wrap={true}
                style={styles.anchor}
            >
                <CellBlock cell={cell} store={store} />
            </Page>
        </Document>
    );
};
