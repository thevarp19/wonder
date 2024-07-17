import { DeleteOutlined } from "@ant-design/icons";
import { Button, Popconfirm } from "antd";
import { FC } from "react";
import { deleteBoxMutation } from "../../mutations";

export const DeleteBoxCell: FC<{ id: number }> = ({ id }) => {
    const { mutateAsync } = deleteBoxMutation(id);
    return (
        <Popconfirm
            title="Удалить коробку"
            cancelText="Отмена"
            description="Вы уверены, что хотите удалить эту коробку?"
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
