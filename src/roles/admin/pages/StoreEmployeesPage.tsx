import { CreateEmployeeForm } from "@/modules/employee/components/CreateEmployeeForm";
import { EmployeesTable } from "@/modules/employee/components/EmployeesTable";
import { Button, Modal } from "antd";
import { FC, useState } from "react";
import { useParams } from "react-router-dom";

interface StoreEmployeesPageProps {}

export const StoreEmployeesPage: FC<StoreEmployeesPageProps> = ({}) => {
    const { storeId: rawStoreId } = useParams();
    if (!rawStoreId) {
        return <div>Неверный идентификатор магазина</div>;
    }
    const storeId = parseInt(rawStoreId);
    if (isNaN(storeId)) {
        return <div>Неверный идентификатор магазина</div>;
    }

    return (
        <div>
            <h1 className="mb-4 text-2xl font-semibold">Магазин: {storeId}</h1>
            <div className="flex gap-4 mb-4">
                <CreateEmployeeModal storeId={storeId} />
            </div>
            <EmployeesTable storeId={storeId} />
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
                onCancel={() => setIsModalOpen(false)}
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
            <Button type="primary" onClick={() => setIsModalOpen(true)}>
                Создать сотрудника
            </Button>
        </>
    );
};
