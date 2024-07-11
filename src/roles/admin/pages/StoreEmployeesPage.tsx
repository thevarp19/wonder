import { CreateEmployeeForm } from "@/modules/employee/components/CreateEmployeeForm";
import { EmployeesTable } from "@/modules/employee/components/EmployeesTable";
import { Button, Modal } from "antd";
import { FC, useState } from "react";
import { useParams } from "react-router-dom";

interface StoreEmployeesPageProps {}

export const StoreEmployeesPage: FC<StoreEmployeesPageProps> = ({}) => {
    const { storeId: rawStoreId } = useParams();
    if (!rawStoreId) {
        return <div>Неверный идентификатор склада</div>;
    }
    const storeId = parseInt(rawStoreId);
    if (isNaN(storeId)) {
        return <div>Неверный идентификатор склада</div>;
    }

    return (
        <div className="h-full">
            <div className="flex flex-col mb-4">
                <h1 className="mb-4 text-[18px] font-semibold">
                    Склад: {storeId}
                </h1>

                <div className="flex flex-col w-full gap-4 md:flex-row md:max-w-sm">
                    <CreateEmployeeModal storeId={storeId} />
                </div>
            </div>
            <div className="overflow-x-auto w-full md:mb-0 mb-[70px]">
                <EmployeesTable storeId={storeId} />
            </div>
        </div>
    );
};

const CreateEmployeeModal = ({ storeId }: { storeId: number }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <>
            <Modal
                title="Создать сотрудника"
                open={isModalOpen}
                cancelButtonProps={{ style: { width: "100%" } }}
                onCancel={() => setIsModalOpen(false)}
                cancelText="Назад"
                okButtonProps={{ style: { display: "none" } }}
                destroyOnClose
            >
                <CreateEmployeeForm
                    storeId={storeId}
                    onSuccess={() => {
                        setIsModalOpen(false);
                    }}
                />
            </Modal>
            <Button
                type="primary"
                size="large"
                onClick={() => setIsModalOpen(true)}
            >
                Создать сотрудника
            </Button>
        </>
    );
};
