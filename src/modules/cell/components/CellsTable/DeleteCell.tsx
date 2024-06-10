import { DeleteOutlined } from "@ant-design/icons";
import { Button, Popconfirm } from "antd";
import { FC } from "react";
import { deleteCellMutation } from "../../mutations";

export const DeleteCellCell: FC<{ id: number; storeId: number }> = ({
    id,
    storeId,
}) => {
    const { mutateAsync } = deleteCellMutation(id, storeId);
    return (
        <Popconfirm
            title="Удалить ячейку"
            description="Вы уверены, что хотите удалить эту ячейку?"
            onConfirm={async () => {
                await mutateAsync();
            }}
        >
            <Button danger icon={<DeleteOutlined />}>
                Удалить
            </Button>
        </Popconfirm>
    );
};
