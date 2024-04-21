import { GetStoreResponse } from "@/modules/store/types";
import { PrinterOutlined } from "@ant-design/icons";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { Button, Modal } from "antd";
import { FC, useState } from "react";
import { GetCellResponse } from "../../types";
import { CellPDF } from "../CellsPDF";

interface PrintAllCellsButtonProps {
    store: GetStoreResponse | undefined;
    cells: GetCellResponse[] | undefined;
}

export const PrintAllCellsButton: FC<PrintAllCellsButtonProps> = ({
    store,
    cells,
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    if (!store || !cells) {
        return (
            <Button icon={<PrinterOutlined />} loading disabled>
                Print all cells
            </Button>
        );
    }
    return (
        <>
            <CellsPDFModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                store={store}
                cells={cells}
            />
            <Button
                onClick={() => {
                    setIsModalOpen(true);
                }}
                icon={<PrinterOutlined />}
            >
                {" "}
                Print all cells
            </Button>
        </>
    );
};

interface CellsPDFModalProps {
    isModalOpen?: boolean;
    setIsModalOpen: (value: boolean) => void;
    store: GetStoreResponse;
    cells: GetCellResponse[];
}

export const CellsPDFModal: FC<CellsPDFModalProps> = ({
    isModalOpen,
    setIsModalOpen,
    store,
    cells,
}) => {
    return (
        <Modal
            open={isModalOpen}
            onCancel={() => {
                setIsModalOpen(false);
            }}
            footer={(_, { CancelBtn }) => (
                <div className="flex items-center justify-end gap-4">
                    <CancelBtn />
                    <PDFDownloadLink
                        document={<CellPDF cells={cells} store={store} />}
                        fileName={`Cell-${store.id}.pdf`}
                    >
                        {({ loading }) =>
                            loading ? "Loading document..." : "Download now!"
                        }
                    </PDFDownloadLink>
                </div>
            )}
            title="Print"
        >
            <PDFViewer showToolbar={true} width={"100%"} height={"100%"}>
                <CellPDF cells={cells} store={store} />
            </PDFViewer>
        </Modal>
    );
};
