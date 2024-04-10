import { Loading } from "@/components/ui/Loading";
import { GetStoreResponse } from "@/modules/store/types";
import { useSupply } from "@/roles/seller/redux/supply/selectors";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { Modal } from "antd";
import { FC } from "react";
import { SupplyPDF } from ".";
import { useGetSupply } from "../../queries";

interface SupplyPDFModalProps {
    isModalOpen?: boolean;
    setIsModalOpen: (value: boolean) => void;
    store: GetStoreResponse;
}

export const SupplyPDFModal: FC<SupplyPDFModalProps> = ({
    isModalOpen,
    setIsModalOpen,
    store,
}) => {
    const supply = useSupply();
    const { data, isSuccess, isPending } = useGetSupply(
        Number(supply.supplyServerId)
    );
    return (
        <Modal
            open={isModalOpen}
            onCancel={() => {
                setIsModalOpen(false);
            }}
            footer={(_, { CancelBtn }) => (
                <div className="flex items-center justify-end gap-4">
                    <CancelBtn />
                    {isSuccess && data && supply.supplyServerId && (
                        <PDFDownloadLink
                            document={
                                <SupplyPDF
                                    date={`${supply.date}`}
                                    store={store}
                                    packs={data}
                                    supplyId={supply.supplyServerId}
                                    supply={supply}
                                />
                            }
                            fileName={`Supply-${Date.now()}.pdf`}
                        >
                            {({ loading }) =>
                                loading
                                    ? "Loading document..."
                                    : "Download now!"
                            }
                        </PDFDownloadLink>
                    )}
                </div>
            )}
            title="Print"
        >
            {isPending && <Loading />}
            {isSuccess && store && supply.supplyServerId && (
                <PDFViewer showToolbar={true} width={"100%"} height={"100%"}>
                    <SupplyPDF
                        supplyId={supply.supplyServerId}
                        date={`${supply.date}`}
                        store={store}
                        packs={data}
                        supply={supply}
                    />
                </PDFViewer>
            )}
        </Modal>
    );
};
