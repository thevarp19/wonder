import { StoreAddressCell } from "@/components/store/StoreAddressCell";
import { StoreWorkingTimeCell } from "@/components/store/StoreWorkingTimeCell";
import { EditOutlined } from "@ant-design/icons";
import { Table, TableColumnsType } from "antd";
import { FC } from "react";
import { Link } from "react-router-dom";
import { useGetStoresWithDetails } from "../../hooks/useGetStoresWithDetails";
import { GetStoresWithDetailsResponse } from "../../types/api";
import { StoreBoxesModal } from "./StoreBoxesModal";
import { StoreSwitch } from "./StoreSwitch";

interface AdminStoresTableProps {}

const columns: TableColumnsType<GetStoresWithDetailsResponse> = [
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
        render: (_, record) => <StoreSwitch record={record} />,
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
    {
        title: "Box types",
        render: (_, record) => (
            <StoreBoxesModal
                storeId={`${record.id}`}
                boxTypes={record.availableBoxTypes}
            />
        ),
    },
];

export const AdminStoresTable: FC<AdminStoresTableProps> = ({}) => {
    const { data: stores, isPending } = useGetStoresWithDetails();
    return (
        <Table
            columns={columns}
            dataSource={stores}
            rowKey={"id"}
            loading={isPending}
        />
    );
};
