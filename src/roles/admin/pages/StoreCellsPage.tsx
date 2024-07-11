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
        return <div>Неверный идентификатор скалада</div>;
    }
    const storeId = parseInt(rawStoreId);
    if (isNaN(storeId)) {
        return <div>Неверный идентификатор склада</div>;
    }
    const { data: store, isPending: isStorePending } = useGetStore(storeId);

    const { data: cells, isPending } = useGetCells(storeId);
    return (
        <div className="flex flex-col h-full">
            <h1 className="mb-4 text-[18px] font-semibold">Склад {storeId}</h1>
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
                title="Создать ячейку"
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                width={473}
                cancelText="Назад"
                cancelButtonProps={{ style: { width: "100%", height: "100%" } }}
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
            <Button
                size="large"
                className="min-w-[180px] text-xs"
                type="primary"
                onClick={() => setIsModalOpen(true)}
            >
                Создать ячейку
            </Button>
        </>
    );
};
