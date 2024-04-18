import { CellsTable } from "@/modules/cell/components/CellsTable";
import { CreateCellForm } from "@/modules/cell/components/CreateCellForm";
import { Button, Modal } from "antd";
import { FC, useState } from "react";
import { useParams } from "react-router-dom";

interface StoreCellsPageProps {}

export const StoreCellsPage: FC<StoreCellsPageProps> = ({}) => {
    const { storeId } = useParams();
    if (!storeId) {
        return <div>Invalid store id</div>;
    }

    return (
        <div>
            <h1 className="mb-4 text-2xl font-semibold">Store: {storeId}</h1>
            <div className="flex gap-4 mb-4">
                <CreateCellModal storeId={parseInt(storeId)} />
                <Button>Print all barcode</Button>
            </div>
            <CellsTable storeId={parseInt(storeId)} />
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
                <CreateCellForm storeId={storeId} />
            </Modal>
            <Button type="primary" onClick={() => setIsModalOpen(true)}>
                Create Cell
            </Button>
        </>
    );
};
