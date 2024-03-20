import { StoreAddressCell } from "@/components/store/StoreAddressCell";
import { StoreWorkingTimeCell } from "@/components/store/StoreWorkingTimeCell";
import { EditOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Switch, Table, TableColumnsType } from "antd";
import { FC } from "react";
import { Link } from "react-router-dom";
import { getStores } from "../../api/shared";
import { GetStoresResponse } from "../../types/api";

interface AdminStoresTableProps {}

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
                <Switch />
                <span>Active</span>
            </div>
        ),
    },
    {
        title: "Edit",
        render: (_, record) => (
            <Link
                to={`/admin/settings/edit-store/${record.id}`}
                className="cursor-pointer"
            >
                <EditOutlined style={{ fontSize: "24px" }} />
            </Link>
        ),
    },
];

export const AdminStoresTable: FC<AdminStoresTableProps> = ({}) => {
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
