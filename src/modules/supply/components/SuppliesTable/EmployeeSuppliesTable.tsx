import { CustomTable } from "@/components/ui/CustomTable";
import { padNumbers } from "@/utils/shared.util";
import { DownloadOutlined } from "@ant-design/icons";
import { Button, Select, TableColumnsType, Tooltip } from "antd";
import { FC, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import { useGetEmployeeSupplies } from "../../queries";
import { GetEmployeeSuppliesContent } from "../../types";

interface EmployeeSuppliesTableProps {}

export const EmployeeSuppliesTable: FC<EmployeeSuppliesTableProps> = ({}) => {
    const [page, setPage] = useState(0);
    const isSmallScreen = useMediaQuery({ query: "(max-width: 768px)" });

    const { data, isPending } = useGetEmployeeSupplies(page, 10);

    const columns: TableColumnsType<GetEmployeeSuppliesContent> = [
        {
            title: "ID заявки",
            dataIndex: "id",
            render: (_, record) => (
                <Link to={`/employee/supplies/${record.id}`}>
                    {padNumbers(record.id, 8)}
                </Link>
            ),
        },

        {
            title: "Номер продавца",
            dataIndex: "seller_phone",
        },
        {
            title: "Название магазина",
            dataIndex: "seller_store",
        },

        {
            title: "Дата отправки",
            render: (_, record) => record.created_at?.substring(0, 10),
        },
        {
            title: "Дата приема",
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
                return record.power_of_attorney ? (
                    <Link target="_blank" to={record.power_of_attorney}>
                        <Button
                            danger
                            icon={
                                <DownloadOutlined
                                    color="#ef7214"
                                    style={{ color: "#ef7214" }}
                                />
                            }
                        ></Button>
                    </Link>
                ) : (
                    <Tooltip title="Доверенность отсутствует">
                        <Button
                            danger
                            icon={
                                <DownloadOutlined
                                    color="#000000"
                                    style={{ color: "#000000" }}
                                />
                            }
                            disabled
                        ></Button>
                    </Tooltip>
                );
            },
        },
        {
            title: "Штрихкоды в А4",
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
