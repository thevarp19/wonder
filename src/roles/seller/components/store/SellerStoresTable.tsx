import { StoreAddressCell } from "@/components/store/StoreAddressCell";
import { StoreWorkingTimeCell } from "@/components/store/StoreWorkingTimeCell";
import { getStores } from "@/roles/admin/api/shared";
import { GetStoresResponse } from "@/roles/admin/types/api";
import { useQuery } from "@tanstack/react-query";
import { Switch, Table, TableColumnsType } from "antd";
import { FC } from "react";

interface SellerStoresTableProps {}

const columns: TableColumnsType<GetStoresResponse> = [
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
        render: () => (
            <div className="flex items-center gap-2">
                <Switch disabled />
                <span>Active</span>
            </div>
        ),
    },
];

export const SellerStoresTable: FC<SellerStoresTableProps> = ({}) => {
    const { data: stores, isPending } = useQuery<GetStoresResponse[]>({
        queryKey: ["stores"],
        queryFn: async () => {
            const { data } = await getStores();
            return data;
        },
    });
    return (
        <Table
            columns={columns}
            dataSource={stores}
            rowKey={"id"}
            loading={isPending}
        />
    );
};
