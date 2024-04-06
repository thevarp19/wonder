import { DeleteOutlined } from "@ant-design/icons";
import { Button, Popconfirm } from "antd";
import { FC } from "react";

interface DeleteButtonProps {
    onConfirm: (
        e?: React.MouseEvent<HTMLElement, MouseEvent> | undefined
    ) => void;
}

export const DeleteButton: FC<DeleteButtonProps> = ({ onConfirm }) => {
    return (
        <Popconfirm
            title="Delete this item"
            description="Are you sure to delete this item?"
            onConfirm={onConfirm}
        >
            <Button danger icon={<DeleteOutlined />}>
                Delete
            </Button>
        </Popconfirm>
    );
};
