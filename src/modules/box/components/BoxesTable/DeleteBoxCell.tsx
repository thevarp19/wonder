import { DeleteOutlined } from "@ant-design/icons";
import { useQueryClient } from "@tanstack/react-query";
import { App, Button, Popconfirm } from "antd";
import { FC } from "react";
import { deleteBox } from "../../api";

export const DeleteBoxCell: FC<{ id: number }> = ({ id }) => {
    const queryClient = useQueryClient();
    const { message } = App.useApp();
    return (
        <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            onConfirm={async () => {
                try {
                    await deleteBox(id);
                    queryClient.invalidateQueries({ queryKey: ["boxes"] });
                    message.success("Box deleted successfully");
                } catch (error) {
                    message.error("Failed to delete box");
                }
            }}
        >
            <Button danger icon={<DeleteOutlined />}>
                Delete
            </Button>
        </Popconfirm>
    );
};
