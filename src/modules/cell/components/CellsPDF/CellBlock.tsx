import { GetDetailStoreResponse } from "@/modules/store/types";
// import { generateBarcodeBase64 } from "@/modules/supply/components/SupplyPDF";
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
import { generateBarcodeBase64, getCellCode } from "../../utils";

Font.register({
    family: "Roboto",
    src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf",
});

const styles = StyleSheet.create({
    barcode: {
        width: "48mm",
        height: "24mm",
    },
    cell: {
        width: 164,
        height: 114,
        flexDirection: "column",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 6,
        // paddingVertical: 10,
        // borderBottom: 0.5,
        // marginBottom: "3mm",
    },
    anchor: {
        fontFamily: "Roboto",
    },
});

export interface CellBlockProps {
    cell: GetCellResponse;
    store: GetDetailStoreResponse;
}

export const CellBlock = ({ cell, store }: CellBlockProps) => {
    const code = getCellCode(cell, store.warehouse.id);
    return (
        <View style={styles.cell}>
            <Text>
                Адрес: {store.warehouse.city.name},{" "}
                {store.warehouse.street_name}, {store.warehouse.street_number}
            </Text>
            <Text>
                Размер: {cell.width}x{cell.height}x{cell.length}
            </Text>
            <Image style={styles.barcode} src={generateBarcodeBase64(code)} />
        </View>
    );
};

export const CellBlockPDF: FC<CellBlockProps> = ({ cell, store }) => {
    return (
        <Document>
            <Page
                size={[164, 150]}
                orientation={"portrait"}
                wrap={true}
                style={styles.anchor}
            >
                <CellBlock cell={cell} store={store} />
            </Page>
        </Document>
    );
};
