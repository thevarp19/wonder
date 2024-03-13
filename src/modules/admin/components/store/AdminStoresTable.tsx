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
    },
    {
        title: "Working time",
        dataIndex: "working_time",
    },
    {
        title: "Status",
        dataIndex: "status",
        render: (value, record) => (
            <div className="flex items-center gap-2">
                <Switch />
                <span>Active</span>
            </div>
        ),
    },
    {
        title: "Edit",
        render: (value, record) => (
            <Link to="edit" className="cursor-pointer">
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
