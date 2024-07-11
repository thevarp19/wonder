import { Switch, Table, TableColumnsType } from "antd";
import { FC } from "react";
import { useMediaQuery } from "react-responsive";
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
        title: "Адрес",
        render: (_, record) => <StoreAddressCell {...record} />,
    },
    {
        title: "Рабочее время",
        render: (_, record) => (
            <StoreWorkingTimeCell dayOfWeeks={record.availableWorkTimes} />
        ),
    },
    {
        title: "Статус",
        render: (_, record) => (
            <div className="flex items-center gap-2">
                <Switch disabled checked={record.enabled} />
                <span>Активный</span>
            </div>
        ),
    },
];

export const SellerStoresTable: FC<SellerStoresTableProps> = ({}) => {
    const { data: stores, isPending } = useGetStores();
    const isSmallScreen = useMediaQuery({ query: "(max-width: 768px)" });

    return (
        <Table
            columns={columns}
            dataSource={stores?.sort((a, b) => a.id - b.id)}
            rowKey={"id"}
            loading={isPending}
            pagination={{
                position: isSmallScreen ? ["bottomCenter"] : undefined,
            }}
            scroll={{ x: "max-content" }}
        />
    );
};
