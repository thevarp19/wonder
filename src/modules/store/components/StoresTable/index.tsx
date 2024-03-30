import { EditOutlined } from "@ant-design/icons";
import { Table, TableColumnsType } from "antd";
import { FC } from "react";
import { Link } from "react-router-dom";
import { useGetStores } from "../../queries";
import { GetStoreResponse } from "../../types";
import { StoreAddressCell } from "./StoreAddressCell";
import { StoreBoxesModal } from "./StoreBoxesModal";
import { StoreSwitch } from "./StoreSwitch";
import { StoreWorkingTimeCell } from "./StoreWorkingTimeCell";

interface StoresTableProps {}

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

export const StoresTable: FC<StoresTableProps> = ({}) => {
    const { data: stores, isPending } = useGetStores();
    return (
        <Table
            columns={columns}
            dataSource={stores}
            rowKey={"id"}
            loading={isPending}
        />
    );
};
