import { Loading } from "@/components/ui/Loading";
import { padNumbers } from "@/utils/shared.util";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { Modal } from "antd";
import { FC } from "react";
import { SupplyPDFReport } from ".";
import { useGetSupplyReport } from "../../queries";

interface SupplyPDFModalProps {
    isModalOpen?: boolean;
    setIsModalOpen: (value: boolean) => void;
    reportId: number | null;
}

export const SupplyPDFReportModal: FC<SupplyPDFModalProps> = ({
    isModalOpen,
    setIsModalOpen,
    reportId,
}) => {
    const { data, isSuccess, isPending } = useGetSupplyReport(reportId || -1);

    return (
        <Modal
            open={isModalOpen}
            onCancel={() => {
                setIsModalOpen(false);
            }}
            footer={(_, { CancelBtn }) => (
                <div className="flex items-center justify-end gap-4">
                    <CancelBtn />
                    {isSuccess && data && reportId && (
                        <PDFDownloadLink
                            document={<SupplyPDFReport data={data} />}
                            fileName={`Поставка-${padNumbers(
                                data.supplyId,
                                8
                            )}.pdf`}
                        >
                            {({ loading }) =>
                                loading
                                    ? "Загрузка документа..."
                                    : "Скачать сейчас!"
                            }
                        </PDFDownloadLink>
                    )}
                </div>
            )}
            title="Печать"
        >
            {isPending && <Loading />}
            {isSuccess && reportId && (
                <PDFViewer showToolbar={true} width={"100%"} height={"100%"}>
                    <SupplyPDFReport data={data} />
                </PDFViewer>
            )}
        </Modal>
    );
};
