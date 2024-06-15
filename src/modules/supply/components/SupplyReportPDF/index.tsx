// import { formatDate } from "@/utils/shared.util";
// import {
//     Document,
//     Font,
//     Page,
//     StyleSheet,
//     Text,
//     View,
// } from "@react-pdf/renderer";
// import JsBarcode from "jsbarcode";
// import { GetSupplyReport, SupplyBoxInfo } from "../../types";

// Font.register({
//     family: "Roboto",
//     src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf",
// });

// const styles = StyleSheet.create({
//     grid: {
//         flexDirection: "row",
//         display: "flex",
//         flexWrap: "wrap",
//         gap: 10,
//         marginTop: 40,
//         marginLeft: 40,
//     },
//     header: {
//         marginTop: 10,
//         marginLeft: 40,
//     },
//     root: {
//         display: "flex",
//         justifyContent: "center",
//     },
//     barcode: {
//         width: 100,
//     },
//     product: {
//         flexDirection: "column",
//         display: "flex",
//         gap: 3,
//         alignItems: "center",
//         fontSize: 8,
//         padding: 10,
//         border: 1,
//     },
//     pack: {
//         width: "30%",
//         fontSize: 10,
//         padding: 10,
//         border: 1,
//     },
//     anchor: {
//         fontFamily: "Roboto",
//     },
//     h1Text: {
//         fontSize: 28,
//         fontWeight: "bold",
//     },
// });

// const PackBlock = ({ supplyBox }: { supplyBox: SupplyBoxInfo }) => {
//     return (
//         <View style={styles.pack}>
//             <Text>Код коробки: {supplyBox.boxVendorCode}</Text>
//             <Text>Тип коробки: {supplyBox?.boxName}</Text>
//             <Text>Размер коробки: {supplyBox?.boxDescription}</Text>
//             <Text> </Text>
//             <Text>Продукты:</Text>
//             <View>
//                 {supplyBox.productInfo.map((product, index) => (
//                     <Text key={`${index + 1}-${supplyBox.boxVendorCode}`}>
//                         {index + 1}
//                         {" - "}
//                         {product.productName}, {product.productCount} шт.
//                     </Text>
//                 ))}
//             </View>
//         </View>
//     );
// };

// function padNumberToThirteenDigits(num: number) {
//     let numStr = num.toString();
//     while (numStr.length < 13) {
//         numStr = "0" + numStr;
//     }
//     return numStr;
// }

// export const SupplyPDFReport = ({ data }: { data: GetSupplyReport }) => {
//     return (
//         <Document>
//             <Page
//                 size="A4"
//                 orientation={"portrait"}
//                 wrap={true}
//                 style={styles.anchor}
//             >
//                 <View style={styles.header}>
//                     <Text style={styles.h1Text}>Отчёт о приемке</Text>
//                     <Text>
//                         Дата составления: {formatDate(data.supplyCreationDate)}
//                     </Text>
//                     <Text>
//                         Дата доставки:{" "}
//                         {data.supplyDeliveredDate
//                             ? formatDate(data.supplyDeliveredDate)
//                             : "-"}
//                     </Text>
//                     <Text>Адрес склада: {data.formattedAddress}</Text>
//                     <Text>
//                         Номер поставки:{" "}
//                         {padNumberToThirteenDigits(data.supplyId)}
//                     </Text>
//                 </View>
//                 <View style={styles.root}>
//                     <View style={styles.grid}>
//                         {data.supplyBoxInfo?.map((supplyBox, index) => (
//                             <PackBlock key={index} supplyBox={supplyBox} />
//                         ))}
//                     </View>
//                 </View>
//             </Page>
//         </Document>
//     );
// };

// export function generateBarcodeBase64(text: string, options = {}) {
//     const canvas = document.createElement("canvas");

//     JsBarcode(canvas, text, {
//         format: "CODE128",
//         lineColor: "#000",
//         width: 2,
//         height: 100,
//         displayValue: true,
//         ...options,
//     });

//     return canvas.toDataURL("image/png");
// }
