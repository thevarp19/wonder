import { DeleteOutlined } from "@ant-design/icons";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { App, Button, Popconfirm, Table, TableColumnsType } from "antd";
import { FC } from "react";
import { deleteBox, getBoxes } from "../../api/shared";
import { GetBoxesResponse } from "../../types/api";

interface BoxesTableProps {}

const columns: TableColumnsType<GetBoxesResponse> = [
    {
        title: "Box ID",
        dataIndex: "id",
    },
    {
        title: "Name",
        dataIndex: "name",
    },
    {
        title: "Sizes",
        dataIndex: "description",
    },
    {
        title: "Delete",
        render: (_, record) => <DeleteBoxCell id={record.id} />,
    },
];

export const BoxesTable: FC<BoxesTableProps> = ({}) => {
    const { data: boxes, isPending } = useQuery<GetBoxesResponse[]>({
        queryKey: ["boxes"],
        queryFn: async () => {
            const { data } = await getBoxes();
            return data;
        },
    });
    return (
        <Table
            columns={columns}
            dataSource={boxes}
            rowKey={"id"}
            loading={isPending}
        />
    );
};

const DeleteBoxCell: FC<{ id: string }> = ({ id }) => {
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
                    console.log(error);
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
