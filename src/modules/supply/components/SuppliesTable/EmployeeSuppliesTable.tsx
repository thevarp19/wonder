import { CustomTable } from "@/components/ui/CustomTable";
import { padNumbers } from "@/utils/shared.util";
import { DownloadOutlined } from "@ant-design/icons";
import { Button, TableColumnsType, Tag } from "antd";
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
                return <Tag>{status}</Tag>;
            },
        },
        {
            title: "Кол-во коробок",
            dataIndex: "box_total_quantity",
        },
        {
            title: "Кол-во товаров",
            dataIndex: "product_total_quantity",
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
            dataSource={data}
            rowKey={"id"}
            scroll={{ x: "max-content" }}
        />
    );
};
