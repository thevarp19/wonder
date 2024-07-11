import { GetStoreResponse } from "@/modules/store/types";
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
                setIsModalOpen={setIsModalOpen}
                store={store}
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
                        fileName={`Ячейка-${store.id}.pdf`}
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
