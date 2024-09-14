import { CustomTable } from "@/components/ui/CustomTable";
import { padNumbers } from "@/utils/shared.util";
import { DownloadOutlined } from "@ant-design/icons";
import { Button, Select, TableColumnsType } from "antd";
import { FC } from "react";
import { Link } from "react-router-dom";
import { useGetEmployeeSupplies } from "../../queries";
import { GetEmployeeSupplies } from "../../types";

interface EmployeeSuppliesTableProps {}

export const EmployeeSuppliesTable: FC<EmployeeSuppliesTableProps> = ({}) => {
    const { data, isPending } = useGetEmployeeSupplies();

    const columns: TableColumnsType<GetEmployeeSupplies> = [
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
            dataIndex: "seller_cell_phone",
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
            dataSource={data}
            rowKey={"id"}
            scroll={{ x: "max-content" }}
        />
    );
};
