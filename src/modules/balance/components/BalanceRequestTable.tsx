import { CustomTable } from "@/components/ui/CustomTable";
import { PriceCell } from "@/components/ui/PriceCell";
import { axiosAuthorized } from "@/lib/axios";
import { UploadOutlined } from "@ant-design/icons";
import { useQueryClient } from "@tanstack/react-query";
import { App, Button, Modal, Select, TableColumnsType } from "antd";
import { RcFile } from "antd/es/upload";
import { Upload } from "antd/lib";
import { FC, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { statusReplenishMutation } from "../mutations";
import {
    GetAdminReplenishmentContent,
    GetAdminReplenishmentResponse,
} from "../types";
const { Option } = Select;

const columns: TableColumnsType<GetAdminReplenishmentContent> = [
    {
        title: "Название магазина Kaspi",
        dataIndex: "seller.kaspi_store_name",
        render: (_, record) => <span>{record.seller.kaspi_store_name}</span>,
    },
    {
        title: "Продавец",
        dataIndex: "seller",
        render: (_, record) =>
            `${record.seller.first_name} ${record.seller.last_name}`,
    },
    {
        title: "Электронная почта",
        dataIndex: "seller.email",
        render: (_, record) => <span>{record.seller.email}</span>,
    },
    // {
    //     title: "Номер телефона",
    //     dataIndex: "seller.phone_number",
    //     render: (_, record) => <span>{record.seller.phone_number}</span>,
    // },

    {
        title: "Номер телефона",
        dataIndex: "iban",
    },
    {
        title: "Сумма",
        dataIndex: "amount",
        render: (_, record) => <PriceCell price={Number(record.amount)} />,
    },
    {
        title: "Статус",
        render: (_, record) => <ReplenishmentStatusChange record={record} />,
    },
    {
        title: "Чек",
        dataIndex: "check_url",
        render: (_, record) => {
            return (
                <UploadCheckModal
                    id={record.id}
                    initialFile={record?.check_url}
                    onUploadSuccess={() => (record.status = "PROCESSING")}
                />
            );
        },
    },
];

interface BalanceRequestTableProps {
    data: GetAdminReplenishmentResponse | undefined;
    isPending: boolean;
    setPage: (page: number) => void;
    page: number;
}

export const BalanceRequestTable: FC<BalanceRequestTableProps> = ({
    data,
    isPending,
    setPage,
    page,
}) => {
    const isSmallScreen = useMediaQuery({ query: "(max-width: 768px)" });

    return (
        <CustomTable
            columns={columns}
            dataSource={data?.content}
            rowKey={"id"}
            loading={isPending}
            pagination={{
                pageSize: 10,
                total: data?.totalElements,
                showSizeChanger: false,
                onChange(page) {
                    setPage(page - 1);
                },
                current: page + 1,
                position: isSmallScreen ? ["bottomCenter"] : undefined,
            }}
            scroll={{ x: "max-content" }}
        />
    );
};

interface ReplenishmentStatusChangeProps {
    record: GetAdminReplenishmentContent;
}
export const ReplenishmentStatusChange: FC<ReplenishmentStatusChangeProps> = ({
    record,
}) => {
    const { isPending, mutateAsync } = statusReplenishMutation(record.id);

    const handleChange = async (value: string) => {
        await mutateAsync(value);
        if (value === "PAID") {
            record.status = "PAID";
        }
    };

    const isPaid = record.status === "PAID";
    const isFileUploaded = Boolean(record.check_url);

    return (
        <div className="flex items-center gap-2">
            <Select
                placeholder="Статус"
                onChange={handleChange}
                value={record.status}
                disabled={isPending || isPaid}
            >
                <Option value="PROCESSING">Ожидание</Option>
                <Option value="PAID" disabled={!isFileUploaded || isPaid}>
                    Оплачено
                </Option>
            </Select>
        </div>
    );
};

interface UploadCheckModalProps {
    id: number | undefined;
    initialFile?: string;
    onUploadSuccess?: () => void;
}

export const UploadCheckModal: FC<UploadCheckModalProps> = ({
    id,
    initialFile,
    onUploadSuccess,
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [fileList, setFileList] = useState<any[]>([]);
    const { message } = App.useApp();
    const queryClient = useQueryClient();
    const handleUpload = async (file: RcFile) => {
        if (!id) return;

        const formData = new FormData();
        formData.append("check_file", file);

        try {
            await axiosAuthorized.patch(
                `/api/replenishment/admin/${id}/`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            message.success("Файл успешно загружен");
            queryClient.invalidateQueries({
                queryKey: [`admin-replenishment`],
            });
            setIsModalOpen(false);

            if (onUploadSuccess) {
                onUploadSuccess();
            }
        } catch (error) {
            message.error(`${(error as any)?.response?.data.error.message}`);
            message.error("Ошибка при загрузке файла");
        }
    };

    return (
        <>
            <Modal
                title="Загрузить чек"
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                cancelText="Назад"
                okButtonProps={{ style: { display: "none" } }}
                destroyOnClose
            >
                <Upload
                    accept=".jpg,.jpeg,.png,.pdf"
                    beforeUpload={(file) => {
                        handleUpload(file);
                        return false;
                    }}
                    fileList={fileList}
                    onChange={({ fileList }) => setFileList(fileList)}
                    listType="picture"
                    showUploadList={{
                        showRemoveIcon: true,
                        showPreviewIcon: true,
                    }}
                    defaultFileList={
                        initialFile
                            ? [
                                  {
                                      uid: "-1",
                                      name: initialFile.split("/").pop() || "",
                                      status: "done",
                                      url: initialFile,
                                  },
                              ]
                            : []
                    }
                >
                    <Button icon={<UploadOutlined />}>Загрузить чек</Button>
                </Upload>
                {initialFile && (
                    <div style={{ marginTop: 16 }}>
                        <a
                            href={initialFile}
                            target="_blank"
                            className="cursor-pointer"
                            rel="noopener noreferrer"
                        >
                            Посмотреть файл
                        </a>
                    </div>
                )}
            </Modal>
            <Button
                className={`${initialFile ? "!bg-[#cbffc0]" : ""}`}
                icon={<UploadOutlined />}
                onClick={() => setIsModalOpen(true)}
            ></Button>
        </>
    );
};
