import { DeleteOutlined } from "@ant-design/icons";
import { Button, Popconfirm } from "antd";
import { FC } from "react";
import { deleteCellMutation } from "../../mutations";

export const DeleteCellCell: FC<{ id: number }> = ({ id }) => {
    const { mutateAsync } = deleteCellMutation(id);
    return (
        <Popconfirm
            title="Delete the cell"
            description="Are you sure to delete this cell?"
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
