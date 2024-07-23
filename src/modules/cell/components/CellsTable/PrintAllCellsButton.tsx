import { GetDetailStoreResponse } from "@/modules/store/types";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { Button, Modal } from "antd";
import { FC, useState } from "react";
import { GetCellResponse } from "../../types";
import { CellPDF } from "../CellsPDF";

interface PrintAllCellsButtonProps {
    cells: GetCellResponse[] | undefined;
    store: GetDetailStoreResponse;
}

export const PrintAllCellsButton: FC<PrintAllCellsButtonProps> = ({
    cells,
    store,
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    if (!cells) {
        return (
            <Button
                size="large"
                className="w-full md:min-w-[180px] !rounded-md text-xs"
                loading
                disabled
            >
                Печать всех ячеек
            </Button>
        );
    }
    return (
        <>
            <CellsPDFModal
                isModalOpen={isModalOpen}
                store={store}
                setIsModalOpen={setIsModalOpen}
                cells={cells}
            />
            <Button
                onClick={() => {
                    setIsModalOpen(true);
                }}
                size="large"
                className="w-full md:min-w-[180px] !rounded-md text-xs"
            >
                Печать всех ячеек
            </Button>
        </>
    );
};

interface CellsPDFModalProps {
    isModalOpen?: boolean;
    store: GetDetailStoreResponse;
    setIsModalOpen: (value: boolean) => void;
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
                        fileName={`Ячейка-${store.warehouse.id}.pdf`}
                    >
                        {({ loading }) =>
                            loading
                                ? "Загрузка документа..."
                                : "Скачать сейчас!"
                        }
                    </PDFDownloadLink>
                </div>
            )}
            title="Печать"
        >
            <PDFViewer showToolbar={true} width={"100%"} height={"100%"}>
                <CellPDF cells={cells} store={store} />
            </PDFViewer>
        </Modal>
    );
};
