import { DeleteOutlined } from "@ant-design/icons";
import { Button, Popconfirm } from "antd";
import { FC } from "react";
import { deleteBoxMutation } from "../../mutations";

export const DeleteBoxCell: FC<{ id: number }> = ({ id }) => {
    const { mutateAsync } = deleteBoxMutation(id);
    return (
        <Popconfirm
            title="Delete the box"
            description="Are you sure to delete this box?"
            onConfirm={async () => {
                await mutateAsync();
            }}
        >
            <Button danger icon={<DeleteOutlined />}>
                Delete
            </Button>
        </Popconfirm>
    );
};
