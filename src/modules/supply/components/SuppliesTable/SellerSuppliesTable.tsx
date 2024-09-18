import { CustomTable } from "@/components/ui/CustomTable";
import { axiosAuthorized } from "@/lib/axios";
import { padNumbers } from "@/utils/shared.util";
import { DownloadOutlined, UploadOutlined } from "@ant-design/icons";
import { useQueryClient } from "@tanstack/react-query";
import { App, Button, Modal, Select, TableColumnsType } from "antd";
import { RcFile } from "antd/es/upload";
import { Upload } from "antd/lib";
import { FC, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import { useGetSellerSupplies } from "../../queries";
import { GetSellerSuppliesContent } from "../../types";
// import { SupplyPDFReportModal } from "../SupplyReportPDF/SupplyPDFReportModal";

// interface Supply {}

interface SellerSuppliesTableProps {}

export const SellerSuppliesTable: FC<SellerSuppliesTableProps> = ({}) => {
    const [page, setPage] = useState(0);
    const isSmallScreen = useMediaQuery({ query: "(max-width: 768px)" });

    const { data, isPending } = useGetSellerSupplies(page, 10);
    const columns: TableColumnsType<GetSellerSuppliesContent> = [
        {
            title: "Номер поставки",
            dataIndex: "id",
            render: (_, record) => (
                <Link to={`/supply/${record.id}`}>
                    {padNumbers(record.id, 8)}
                </Link>
            ),
        },

        {
            title: "Адрес",
            dataIndex: "seller_warehouse",
        },
        {
            title: "Дата отправки",
            render: (_, record) => record.created_at?.substring(0, 10),
        },
        {
            title: "Дата приема",
            dataIndex: "receivingDate",
            render: (_, record) => record.date?.substring(0, 10),
        },
        {
            title: "Статус",
            dataIndex: "status",
            render: (status) => {
                return (
                    <Select
                        defaultValue={status}
                        onChange={(_, option) => console.log("status", option)}
                        options={[
                            { value: null, label: "Не выбрано" },
                            { value: 1, label: "Принято" },
                            { value: 2, label: "Брак" },
                            { value: 3, label: "Отправлено" },
                            { value: 4, label: "В процессе" },
                            { value: 5, label: "Ошибка" },
                            { value: 6, label: "Принято" },
                        ]}
                    ></Select>
                );
            },
        },
        {
            title: "Заявлено",
            dataIndex: "declared_products",
        },
        {
            title: "Принято",
            dataIndex: "accepted_products",
        },

        {
            title: "Ошибка",
            dataIndex: "fallacy_products",
        },
        {
            title: "Брак",
            dataIndex: "defective_products",
        },
        {
            title: "Доверенность",
            dataIndex: "power_of_attorney",
            render: (_, record) => {
                return (
                    <UploadAttorneyModal
                        id={record.id}
                        initialFile={record?.power_of_attorney}
                        // onUploadSuccess={() => (record.status = "PROCESSING")}
                    />
                );
            },
        },

        {
            title: "Штрихкоды А4",
            render: (_, record) => {
                return (
                    <Link target="_blank" to={record.report_a4}>
                        <Button
                            danger
                            loading={false}
                            icon={
                                <DownloadOutlined
                                    color="#ef7214"
                                    style={{ color: "#ef7214" }}
                                />
                            }
                        ></Button>
                    </Link>
                );
            },
        },
        {
            title: "Штрихкоды в ряд",
            render: (_, record) => {
                return (
                    <Link target="_blank" to={record.report_row}>
                        <Button
                            danger
                            loading={false}
                            icon={
                                <DownloadOutlined
                                    color="#ef7214"
                                    style={{ color: "#ef7214" }}
                                />
                            }
                        ></Button>
                    </Link>
                );
            },
        },
        // {
        //     title: "Отчет",
        //     render: (_, record) => {
        //         return (
        //             <Link target="_blank" to={record.report_a4}>
        //                 <Button
        //                     danger
        //                     loading={false}
        //                     icon={
        //                         <DownloadOutlined
        //                             color="#ef7214"
        //                             style={{ color: "#ef7214" }}
        //                         />
        //                     }
        //                 ></Button>
        //             </Link>
        //         );
        //     },
        // },
    ];

    return (
        <CustomTable
            loading={isPending}
            columns={columns}
            dataSource={data?.content}
            rowKey={(record) => record.id}
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
interface UploadAttorneyModalProps {
    id: number | undefined;
    initialFile?: string;
}
export const UploadAttorneyModal: FC<UploadAttorneyModalProps> = ({
    id,
    initialFile,
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [fileList, setFileList] = useState<any[]>([]);
    const { message } = App.useApp();
    const queryClient = useQueryClient();
    const handleUpload = async (file: RcFile) => {
        if (!id) return;

        const formData = new FormData();
        formData.append("file", file);

        try {
            await axiosAuthorized.patch(
                `/api/supply/seller/power-of-attorney/${id}/`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            message.success("Файл успешно загружен");
            queryClient.invalidateQueries({
                queryKey: [`seller-supplies`],
            });
            setIsModalOpen(false);
        } catch (error) {
            message.error(`${(error as any)?.response?.data.error.message}`);
            message.error("Ошибка при загрузке файла");
        }
    };

    return (
        <>
            <Modal
                title="Загрузить доверенность"
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
                    <Button icon={<UploadOutlined />}>
                        Загрузить доверенность
                    </Button>
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
