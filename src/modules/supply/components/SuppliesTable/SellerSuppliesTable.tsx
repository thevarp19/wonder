import { DownloadOutlined } from "@ant-design/icons";
import { Button, Table, TableColumnsType, Tag } from "antd";
import { FC } from "react";
import { useGetSellerSupplies } from "../../queries";
import { GetSellerSupply, SupplyState } from "../../types";

// interface Supply {}

interface SellerSuppliesTableProps {}

// const supplies: Supply[] = [
//     {
//         id: 54859621,
//         address: "Almaty, Masanchi 23/1",
//         sendDate: "15.03.24",
//         receivingDate: "20.03.24",
//         status: "В пути",
//     },
//     {
//         id: 85452563,
//         address: "Astana, Abai 124",
//         sendDate: "15.03.24",
//         receivingDate: "20.03.24",
//         status: "Идет приемка",
//     },
//     {
//         id: 84759623,
//         address: "Astana, Abai 124",
//         sendDate: "14.03.24",
//         receivingDate: "21.03.24",
//         status: "Принято",
//     },
//     {
//         id: 25634785,
//         address: "Almaty, Абылай хана 34",
//         sendDate: "13.03.24",
//         receivingDate: "21.03.24",
//         status: "Принято",
//     },
//     {
//         id: 56232547,
//         address: "Shymkent, Domalak Ana 4",
//         sendDate: "13.03.24",
//         receivingDate: "22.03.24",
//         status: "В пути",
//     },
//     {
//         id: 58965412,
//         address: "Shymkent, Respublika 54",
//         sendDate: "12.03.24",
//         receivingDate: "22.03.24",
//         status: "Идет приемка",
//     },
//     {
//         id: 36587545,
//         address: "Almaty, Masanchi 23/1",
//         sendDate: "12.03.24",
//         receivingDate: "23.03.24",
//         status: "Идет приемка",
//     },
//     {
//         id: 45785623,
//         address: "Astana, Aget Baba 54",
//         sendDate: "12.03.24",
//         receivingDate: "23.03.24",
//         status: "Принято",
//     },
//     {
//         id: 25452365,
//         address: "Shymkent, Respublika 54",
//         sendDate: "12.03.24",
//         receivingDate: "23.03.24",
//         status: "Принято",
//     },
//     {
//         id: 78456255,
//         address: "Astana, Abai 124",
//         sendDate: "11.03.24",
//         receivingDate: "23.03.24",
//         status: "Идет приемка",
//     },
// ];

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

const columns: TableColumnsType<GetSellerSupply> = [
    {
        title: "Supply ID",
        dataIndex: "id",
    },
    {
        title: "Address",
        dataIndex: "address",
    },
    {
        title: "Send date",
        render: (_, record) => record.supplyCreatedTime?.substring(0, 10),
    },
    {
        title: "Receiving date",
        dataIndex: "receivingDate",
        render: (_, record) => record.supplyAcceptTime?.substring(0, 10),
    },
    {
        title: "Status",
        dataIndex: "supplyState",
        render: (status) => {
            return <Tag color={getColor(status)}>{status}</Tag>;
        },
    },
    {
        title: "Report",
        render: () => {
            return (
                <Button
                    danger
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

export const SellerSuppliesTable: FC<SellerSuppliesTableProps> = ({}) => {
    const { data, isPending } = useGetSellerSupplies();
    return (
        <div>
            <Table loading={isPending} columns={columns} dataSource={data} />
        </div>
    );
};
