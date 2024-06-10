import { EditOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import { FC, useState } from "react";
import { UpdateCellForm } from ".";
import { GetCellResponse } from "../../types";

interface UpdateCellButtonProps {
    storeId: number | undefined;
    initialValues: GetCellResponse;
    onSuccess?: () => void;
}

export const UpdateCellButton: FC<UpdateCellButtonProps> = ({
    storeId,
    initialValues,
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    if (!storeId)
        return (
            <Button
                loading
                disabled
                icon={<EditOutlined />}
                onClick={() => setIsModalOpen(true)}
            >
                Редактировать
            </Button>
        );
    return (
        <>
            <Modal
                title="Обновить ячейку"
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                okButtonProps={{ style: { display: "none" } }}
                destroyOnClose
            >
                <UpdateCellForm
                    id={initialValues.id}
                    storeId={storeId}
                    initialValues={initialValues}
                    onSuccess={() => {
                        setIsModalOpen(false);
                    }}
                />
            </Modal>
            <Button
                icon={<EditOutlined />}
                onClick={() => setIsModalOpen(true)}
            >
                Редактировать
            </Button>
        </>
    );
};
