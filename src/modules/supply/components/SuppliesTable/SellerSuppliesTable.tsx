import { padNumbers } from "@/utils/shared.util";
import { DownloadOutlined } from "@ant-design/icons";
import { Button, Table, TableColumnsType, Tag } from "antd";
import { FC } from "react";
import { useGetSellerSupplies } from "../../queries";
import { GetSellerSupply, SupplyState } from "../../types";

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
    // const [isModalOpen, setIsModalOpen] = useState(false);
    // const [reportId, setReportId] = useState<number | null>(null);
    const { data, isPending } = useGetSellerSupplies();
    const columns: TableColumnsType<GetSellerSupply> = [
        {
            title: "Номер поставки",
            dataIndex: "id",
            render: (id) => padNumbers(id, 8),
        },
        {
            title: "Адрес",
            dataIndex: "formattedAddress",
        },
        {
            title: "Дата отправки",
            render: (_, record) => record.supplyCreatedTime?.substring(0, 10),
        },
        {
            title: "Дата приема",
            dataIndex: "receivingDate",
            render: (_, record) => record.supplyAcceptTime?.substring(0, 10),
        },
        {
            title: "Статус",
            dataIndex: "supplyState",
            render: (status) => {
                return <Tag color={getColor(status)}>{status}</Tag>;
            },
        },
        {
            title: "Отчет",
            render: (_, record) => {
                return (
                    <Button
                        danger
                        loading={isPending}
                        onClick={() => {
                            // setIsModalOpen(true);
                            // setReportId(record.id);
                        }}
                        icon={
                            <DownloadOutlined
                                color="#ef7214"
                                style={{ color: "#ef7214" }}
                            />
                        }
                    ></Button>
                );
            },
        },
    ];

    return (
        <div>
            <Table loading={isPending} columns={columns} dataSource={data} />
            {/* {isModalOpen && reportId && (
                <SupplyPDFReportModal
                    reportId={reportId || null}
                    setIsModalOpen={setIsModalOpen}
                    isModalOpen={isModalOpen}
                />
            )} */}
        </div>
    );
};
