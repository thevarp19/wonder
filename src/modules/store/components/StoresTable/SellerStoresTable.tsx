import { Switch, Table, TableColumnsType } from "antd";
import { FC } from "react";
import { useGetStores } from "../../queries";
import { GetStoreResponse } from "../../types";
import { StoreAddressCell } from "./StoreAddressCell";
import { StoreWorkingTimeCell } from "./StoreWorkingTimeCell";

interface SellerStoresTableProps {}

const columns: TableColumnsType<GetStoreResponse> = [
    {
        title: "ID",
        dataIndex: "kaspiId",
    },
    {
        title: "Address",
        render: (_, record) => <StoreAddressCell {...record} />,
    },
    {
        title: "Working time",
        render: (_, record) => (
            <StoreWorkingTimeCell dayOfWeeks={record.availableWorkTimes} />
        ),
    },
    {
        title: "Status",
        render: (_, record) => (
            <div className="flex items-center gap-2">
                <Switch disabled checked={record.enabled} />
                <span>Active</span>
            </div>
        ),
    },
];

export const SellerStoresTable: FC<SellerStoresTableProps> = ({}) => {
    const { data: stores, isPending } = useGetStores();
    return (
        <Table
            columns={columns}
            dataSource={stores?.sort((a, b) => a.id - b.id)}
            rowKey={"id"}
            loading={isPending}
        />
    );
};
