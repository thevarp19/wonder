// import { GetStoreResponse } from "@/modules/store/types";
// import { PrinterOutlined } from "@ant-design/icons";
// import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
// import { Button, Modal } from "antd";
// import { FC, useState } from "react";
// import { GetCellResponse } from "../../types";
// import { getCellCode } from "../../utils";
// import { CellBlockPDF } from "../CellsPDF/CellBlock";

// interface PrintCellButtonProps {
//     store: GetStoreResponse | undefined;
//     cell: GetCellResponse;
// }

// export const PrintCellButton: FC<PrintCellButtonProps> = ({ store, cell }) => {
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     if (!store) {
//         return (
//             <Button icon={<PrinterOutlined />} loading disabled>
//                 Печать
//             </Button>
//         );
//     }
//     return (
//         <>
//             <CellPDFModal
//                 isModalOpen={isModalOpen}
//                 setIsModalOpen={setIsModalOpen}
//                 store={store}
//                 cell={cell}
//             />
//             <Button
//                 icon={<PrinterOutlined />}
//                 onClick={() => {
//                     setIsModalOpen(true);
//                 }}
//             >
//                 Печать
//             </Button>
//         </>
//     );
// };

// interface CellPDFModalProps {
//     isModalOpen?: boolean;
//     setIsModalOpen: (value: boolean) => void;
//     store: GetStoreResponse;
//     cell: GetCellResponse;
// }

// export const CellPDFModal: FC<CellPDFModalProps> = ({
//     isModalOpen,
//     setIsModalOpen,
//     store,
//     cell,
// }) => {
//     return (
//         <Modal
//             open={isModalOpen}
//             onCancel={() => {
//                 setIsModalOpen(false);
//             }}
//             footer={(_, { CancelBtn }) => (
//                 <div className="flex items-center justify-end gap-4">
//                     <CancelBtn />
//                     <PDFDownloadLink
//                         document={<CellBlockPDF cell={cell} store={store} />}
//                         fileName={`Cell-${getCellCode(
//                             cell,
//                             store.kaspiId
//                         )}.pdf`}
//                     >
//                         {({ loading }) =>
//                             loading
//                                 ? "Загрузка документа..."
//                                 : "Скачать сейчас!"
//                         }
//                     </PDFDownloadLink>
//                 </div>
//             )}
//             title="Печать"
//         >
//             <PDFViewer showToolbar={true} width={"100%"} height={"100%"}>
//                 <CellBlockPDF cell={cell} store={store} />
//             </PDFViewer>
//         </Modal>
//     );
// };
