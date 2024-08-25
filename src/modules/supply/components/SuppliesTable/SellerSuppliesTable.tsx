import { CustomTable } from "@/components/ui/CustomTable";
import { padNumbers } from "@/utils/shared.util";
import { DownloadOutlined } from "@ant-design/icons";
import { Button, TableColumnsType, Tag } from "antd";
import { FC } from "react";
import { Link } from "react-router-dom";
import { useGetSellerSupplies } from "../../queries";
import { GetSellerSupply, SupplyState } from "../../types";
// import { SupplyPDFReportModal } from "../SupplyReportPDF/SupplyPDFReportModal";

// interface Supply {}

interface SellerSuppliesTableProps {}

function getColor(status: SupplyState) {
    switch (status) {
        case "START":
            return "blue";
        case "ACCEPTED":
            return "green";
        case "IN_PROGRESS":
            return "orange";
        case "IN_DELIVERY":
            return "purple";
        case "REJECTED":
            return "red";
        default:
            return "blue";
    }
}

export const SellerSuppliesTable: FC<SellerSuppliesTableProps> = ({}) => {
    const { data, isPending } = useGetSellerSupplies();

    const columns: TableColumnsType<GetSellerSupply> = [
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
                return <Tag color={getColor(status)}>{status}</Tag>;
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
        <div>
            <CustomTable
                loading={isPending}
                columns={columns}
                dataSource={data}
            />
        </div>
    );
};
