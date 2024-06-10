import { EditOutlined, TeamOutlined } from "@ant-design/icons";
import { Button, Table, TableColumnsType } from "antd";
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
        render: (_, record) => <StoreSwitch record={record} />,
    },
    {
        title: "Ячейки",
        render: (_, record) => (
            <Link
                to={`/admin/settings/cells/${record.id}`}
                className="cursor-pointer"
            >
                <Button>Ячейки</Button>
            </Link>
        ),
    },
    {
        title: "Редактировать",
        render: (_, record) => (
            <Link
                to={`/admin/settings/update-store/${record.id}`}
                className="cursor-pointer"
            >
                <EditOutlined style={{ fontSize: "24px" }} />
            </Link>
        ),
    },
    {
        title: "Сотрудники",
        render: (_, record) => (
            <Link
                to={`/admin/settings/employees/${record.id}`}
                className="cursor-pointer"
            >
                <TeamOutlined style={{ fontSize: "24px" }} />
            </Link>
        ),
    },
    {
        title: "Типы коробок",
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
            dataSource={stores?.sort((a, b) => a.id - b.id)}
            rowKey={"id"}
            loading={isPending}
        />
    );
};
