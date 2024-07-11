import { useGetAllBoxes } from "@/modules/box/queries";
import { GetBoxResponse } from "@/modules/box/types";
import { DeleteOutlined } from "@ant-design/icons";
import {
    Button,
    Modal,
    Popconfirm,
    Select,
    Table,
    TableColumnsType,
} from "antd";
import { FC, useState } from "react";
import { useBindBoxToStore } from "../../forms";
import { removeBoxFromStoreMutation } from "../../mutations";

interface StoreBoxesModalProps {
    boxTypes: GetBoxResponse[];
    storeId: string;
}

const DeleteBoxCell: FC<{ boxId: string; storeId: string }> = ({
    boxId,
    storeId,
}) => {
    const { mutateAsync } = removeBoxFromStoreMutation();
    return (
        <Popconfirm
            title="Удалить коробку из склада"
            description="Вы уверены, что хотите удалить эту коробку?"
            onConfirm={async () => {
                await mutateAsync({ storeId, boxId });
            }}
        >
            <Button
                className="!rounded-[16px]"
                danger
                icon={<DeleteOutlined />}
            >
                Удалить
            </Button>
        </Popconfirm>
    );
};

export const StoreBoxesModal: FC<StoreBoxesModalProps> = ({
    boxTypes,
    storeId,
}) => {
    const columns: TableColumnsType<GetBoxResponse> = [
        {
            title: "ID коробки",
            dataIndex: "id",
        },
        {
            title: "Название",
            dataIndex: "name",
        },
        {
            title: "Размеры",
            dataIndex: "description",
        },
        {
            title: "Удалить",
            render: (_, record) => (
                <DeleteBoxCell boxId={`${record.id}`} storeId={storeId} />
            ),
        },
    ];
    const { data: boxes, isPending } = useGetAllBoxes();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { formik, mutation } = useBindBoxToStore(storeId);
    return (
        <div>
            <Button
                className="!rounded-[16px]"
                onClick={() => {
                    setIsModalOpen(true);
                }}
            >
                Коробки
            </Button>
            <Modal
                open={isModalOpen}
                onCancel={() => {
                    setIsModalOpen(false);
                }}
                cancelButtonProps={{ style: { width: 100 } }}
                cancelText="Назад"
                // className="flex flex-col md:flex-row"
                okButtonProps={{ style: { width: 100 } }}
                onOk={() => {
                    setIsModalOpen(false);
                }}
            >
                <div className="flex flex-col items-start justify-center gap-4 md:gap-0 md:space-x-4 md:flex-row">
                    <Select
                        placeholder={"Добавить новую коробку"}
                        className="w-64 md:w-80"
                        notFoundContent={
                            <div className="flex items-center justify-center min-h-[85px] w-full md:w-auto">
                                Нет данных
                            </div>
                        }
                        value={formik.values.boxId}
                        onChange={(value) => {
                            formik.setFieldValue("boxId", value);
                        }}
                        options={boxes
                            ?.filter((box) => {
                                return !boxTypes.find(
                                    (type) => type.id === box.id
                                );
                            })
                            .map((box) => ({
                                label: box.name,
                                value: box.id,
                            }))}
                    />
                    <Button
                        type="primary"
                        loading={mutation.isPending}
                        className="w-full md:w-auto"
                        onClick={() => {
                            formik.handleSubmit();
                        }}
                    >
                        Добавить
                    </Button>
                </div>
                <Table
                    className="mt-14 md:mt-4"
                    size="small"
                    rowKey={(record) => `${record.id}`}
                    dataSource={boxTypes}
                    loading={isPending}
                    columns={columns}
                    pagination={false}
                    scroll={{ x: "max-content" }}
                />
            </Modal>
        </div>
    );
};
