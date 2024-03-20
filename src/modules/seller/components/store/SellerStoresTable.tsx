import { StoreAddressCell } from "@/components/store/StoreAddressCell";
import { StoreWorkingTimeCell } from "@/components/store/StoreWorkingTimeCell";
import { Switch, Table, TableColumnsType } from "antd";
import { FC } from "react";

interface SellerStoresTableProps {}

interface SellerStoresTableData {
    id: number;
    address: string;
    working_time: string;
    status: string;
}

const columns: TableColumnsType<SellerStoresTableData> = [
    {
        title: "ID",
        dataIndex: "id",
    },
    {
        title: "Address",
        dataIndex: "address",
        render: () => <StoreAddressCell />,
    },
    {
        title: "Working time",
        dataIndex: "working_time",
        render: () => <StoreWorkingTimeCell />,
    },
    {
        title: "Status",
        dataIndex: "status",
        render: () => (
            <div className="flex items-center gap-2">
                <Switch disabled />
                <span className="text-gray-400">Active</span>
            </div>
        ),
    },
];

const dataSource: SellerStoresTableData[] = [
    {
        id: 1,
        address: "address",
        working_time: "working_time",
        status: "status",
    },
];

export const SellerStoresTable: FC<SellerStoresTableProps> = ({}) => {
    return <Table columns={columns} dataSource={dataSource} rowKey={"id"} />;
};
