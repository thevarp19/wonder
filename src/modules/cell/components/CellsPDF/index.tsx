// import { GetStoreResponse } from "@/modules/store/types";
// import { Document, Font, Page, StyleSheet, View } from "@react-pdf/renderer";
// import { FC } from "react";
// import { GetCellResponse } from "../../types";
// import { CellBlock } from "./CellBlock";

// Font.register({
//     family: "Roboto",
//     src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf",
// });

// const styles = StyleSheet.create({
//     anchor: {
//         fontFamily: "Roboto",
//     },
//     grid: {
//         flexDirection: "row",
//         display: "flex",
//         flexWrap: "wrap",
//         gap: 10,
//         marginTop: 40,
//         marginLeft: 40,
//     },
//     root: {
//         display: "flex",
//         justifyContent: "center",
//     },
// });

// export interface CellPDFProps {
//     cells: GetCellResponse[];
//     store: GetStoreResponse;
// }

// export const CellPDF: FC<CellPDFProps> = ({ cells, store }) => {
//     return (
//         <Document>
//             <Page
//                 size="A4"
//                 orientation={"portrait"}
//                 wrap={true}
//                 style={styles.anchor}
//             >
//                 <View style={styles.root}>
//                     <View style={styles.grid}>
//                         {cells.map((cell) => (
//                             <CellBlock
//                                 key={cell.id}
//                                 cell={cell}
//                                 store={store}
//                             />
//                         ))}
//                     </View>
//                 </View>
//             </Page>
//         </Document>
//     );
// };
