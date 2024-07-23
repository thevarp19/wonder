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
    const { data: cells, isPending } = useGetCells(storeId);
    const { data: store, isPending: storePending } = useGetStore(storeId);

    return (
        <div className="h-full">
            <div className="flex flex-col mb-4">
                <h1 className="mb-4 text-[18px] font-semibold">
                    Склад {storeId}
                </h1>
                <div className="flex flex-col items-center w-full gap-4 md:flex-row md:max-w-sm">
                    <CreateCellModal storeId={storeId} />
                    {store && (
                        <PrintAllCellsButton cells={cells} store={store} />
                    )}
                </div>
            </div>
            <div className="overflow-x-auto w-full md:mb-0 mb-[70px]">
                <CellsTable
                    storeId={storeId}
                    isPending={isPending}
                    store={store}
                    isStorePending={storePending}
                    cells={cells}
                />
            </div>
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
                className="w-full md:min-w-[180px] !rounded-md text-xs "
                type="primary"
                onClick={() => setIsModalOpen(true)}
            >
                Создать ячейку
            </Button>
        </>
    );
};
