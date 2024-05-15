import { DownloadOutlined } from "@ant-design/icons";
import { Button, Table, TableColumnsType, Tag } from "antd";
import { FC } from "react";

interface Supply {}

interface SellerSuppliesTableProps {}

const supplies: Supply[] = [
    {
        id: 54859621,
        address: "Almaty, Masanchi 23/1",
        sendDate: "15.03.24",
        receivingDate: "20.03.24",
        status: "В пути",
    },
    {
        id: 85452563,
        address: "Astana, Abai 124",
        sendDate: "15.03.24",
        receivingDate: "20.03.24",
        status: "Идет приемка",
    },
    {
        id: 84759623,
        address: "Astana, Abai 124",
        sendDate: "14.03.24",
        receivingDate: "21.03.24",
        status: "Принято",
    },
    {
        id: 25634785,
        address: "Almaty, Абылай хана 34",
        sendDate: "13.03.24",
        receivingDate: "21.03.24",
        status: "Принято",
    },
    {
        id: 56232547,
        address: "Shymkent, Domalak Ana 4",
        sendDate: "13.03.24",
        receivingDate: "22.03.24",
        status: "В пути",
    },
    {
        id: 58965412,
        address: "Shymkent, Respublika 54",
        sendDate: "12.03.24",
        receivingDate: "22.03.24",
        status: "Идет приемка",
    },
    {
        id: 36587545,
        address: "Almaty, Masanchi 23/1",
        sendDate: "12.03.24",
        receivingDate: "23.03.24",
        status: "Идет приемка",
    },
    {
        id: 45785623,
        address: "Astana, Aget Baba 54",
        sendDate: "12.03.24",
        receivingDate: "23.03.24",
        status: "Принято",
    },
    {
        id: 25452365,
        address: "Shymkent, Respublika 54",
        sendDate: "12.03.24",
        receivingDate: "23.03.24",
        status: "Принято",
    },
    {
        id: 78456255,
        address: "Astana, Abai 124",
        sendDate: "11.03.24",
        receivingDate: "23.03.24",
        status: "Идет приемка",
    },
];

function getColor(status: string) {
    switch (status) {
        case "Принято":
            return "green";
        case "Идет приемка":
            return "orange";
        case "В пути":
            return "blue";
        default:
            return "red";
    }
}

const columns: TableColumnsType<Supply> = [
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
        dataIndex: "sendDate",
    },
    {
        title: "Receiving date",
        dataIndex: "receivingDate",
    },
    {
        title: "Status",
        dataIndex: "status",
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
    return (
        <div>
            <Table columns={columns} dataSource={supplies} />
        </div>
    );
};
