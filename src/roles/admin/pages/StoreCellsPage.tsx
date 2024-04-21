import { CellsTable } from "@/modules/cell/components/CellsTable";
import { PrintAllCellsButton } from "@/modules/cell/components/CellsTable/PrintAllCellsButton";
import { CreateCellForm } from "@/modules/cell/components/CreateCellForm";
import { useGetCells } from "@/modules/cell/queries";
import { useGetStore } from "@/modules/store/queries";
import { Button, Modal } from "antd";
import { FC, useState } from "react";
import { useParams } from "react-router-dom";

interface StoreCellsPageProps {}

export const StoreCellsPage: FC<StoreCellsPageProps> = ({}) => {
    const { storeId: rawStoreId } = useParams();
    if (!rawStoreId) {
        return <div>Invalid store id</div>;
    }
    const storeId = parseInt(rawStoreId);
    if (isNaN(storeId)) {
        return <div>Invalid store id</div>;
    }
    const { data: cells, isPending } = useGetCells(storeId);
    const { data: store, isPending: isStorePending } = useGetStore(storeId);
    return (
        <div>
            <h1 className="mb-4 text-2xl font-semibold">Store: {storeId}</h1>
            <div className="flex gap-4 mb-4">
                <CreateCellModal storeId={storeId} />
                <PrintAllCellsButton store={store} cells={cells} />
            </div>
            <CellsTable
                store={store}
                isPending={isPending}
                isStorePending={isStorePending}
                cells={cells}
            />
        </div>
    );
};

const CreateCellModal = ({ storeId }: { storeId: number }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <>
            <Modal
                title="Create Cell"
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                okButtonProps={{ style: { display: "none" } }}
                destroyOnClose
            >
                <CreateCellForm
                    storeId={storeId}
                    onSuccess={() => {
                        setIsModalOpen(false);
                    }}
                />
            </Modal>
            <Button type="primary" onClick={() => setIsModalOpen(true)}>
                Create Cell
            </Button>
        </>
    );
};
