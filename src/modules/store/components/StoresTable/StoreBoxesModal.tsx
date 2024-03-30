import { useGetBoxes } from "@/modules/box/queries";
import { GetBoxResponse } from "@/modules/box/types";
import { DeleteOutlined } from "@ant-design/icons";
import { useQueryClient } from "@tanstack/react-query";
import {
    App,
    Button,
    Modal,
    Popconfirm,
    Select,
    Table,
    TableColumnsType,
} from "antd";
import { FC, useState } from "react";
import { removeBoxFromStore } from "../../api";
import { useBindBoxToStore } from "../../forms";

interface StoreBoxesModalProps {
    boxTypes: GetBoxResponse[];
    storeId: string;
}

export const StoreBoxesModal: FC<StoreBoxesModalProps> = ({
    boxTypes,
    storeId,
}) => {
    const columns: TableColumnsType<GetBoxResponse> = [
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
            render: (_, record) => (
                <DeleteBoxCell boxId={`${record.id}`} storeId={storeId} />
            ),
        },
    ];
    const { data: boxes, isPending } = useGetBoxes();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { formik, mutation } = useBindBoxToStore(storeId);
    return (
        <div>
            <Button
                onClick={() => {
                    setIsModalOpen(true);
                }}
            >
                Boxes
            </Button>
            <Modal
                open={isModalOpen}
                onCancel={() => {
                    setIsModalOpen(false);
                }}
                onOk={() => {
                    setIsModalOpen(false);
                }}
            >
                <div className="space-x-4">
                    <Select
                        placeholder={"Add a new box"}
                        className="w-80"
                        value={formik.values.boxId}
                        onChange={(value) => {
                            formik.setFieldValue("boxId", value);
                        }}
                        options={boxes?.map((box) => ({
                            label: box.name,
                            value: box.id,
                        }))}
                    />
                    <Button
                        loading={mutation.isPending}
                        onClick={() => {
                            formik.handleSubmit();
                        }}
                    >
                        Add
                    </Button>
                </div>
                <Table
                    className="mt-4"
                    rowKey={"id"}
                    dataSource={boxTypes}
                    loading={isPending}
                    columns={columns}
                    pagination={false}
                />
            </Modal>
        </div>
    );
};

const DeleteBoxCell: FC<{ boxId: string; storeId: string }> = ({
    boxId,
    storeId,
}) => {
    const queryClient = useQueryClient();
    const { message } = App.useApp();
    return (
        <Popconfirm
            title="Delete the box from store"
            description="Are you sure to delete this box?"
            onConfirm={async () => {
                try {
                    await removeBoxFromStore(storeId, boxId);
                    queryClient.invalidateQueries({
                        queryKey: ["stores-with-details"],
                    });
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
