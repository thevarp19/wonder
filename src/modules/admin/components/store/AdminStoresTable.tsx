import { StoreAddressCell } from "@/components/store/StoreAddressCell";
import { StoreWorkingTimeCell } from "@/components/store/StoreWorkingTimeCell";
import { EditOutlined } from "@ant-design/icons";
import { Switch, Table, TableColumnsType } from "antd";
import { FC } from "react";
import { Link } from "react-router-dom";

interface AdminStoresTableProps {}

interface AdminStoresTableData {
    id: number;
    address: string;
    working_time: string;
    status: string;
}

const columns: TableColumnsType<AdminStoresTableData> = [
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

const dataSource: AdminStoresTableData[] = [
    {
        id: 1,
        address: "address",
        working_time: "working_time",
        status: "status",
    },
];

export const AdminStoresTable: FC<AdminStoresTableProps> = ({}) => {
    return <Table columns={columns} dataSource={dataSource} />;
};
