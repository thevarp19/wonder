import { DateCell } from "@/components/ui/DateCell";
import { Table, TableColumnsType, Tag } from "antd";
import { FC, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import { useGetOrdersAdmin } from "../../queries";
import { DeliveryMode, GetOrdersAdminContent } from "../../types";

interface OrdersTableProps {
    searchValue: string;
    deliveryMode?: DeliveryMode;
}

const columns: TableColumnsType<GetOrdersAdminContent> = [
    {
        title: "Номер заказа",
        render: (_, record) => (
            <Link to={`/admin/orders/${record.code}`}>{record.code}</Link>
        ),
    },
    {
        title: "Склад",
        dataIndex: "warehouse_address",
    },
    {
        title: "Время заказа",
        render: (_, record) => <DateCell timestamp={record.creation_date} />,
    },
    {
        title: "Тип доставки",
        dataIndex: "deliveryMode",
        render: (_, record) => <Tag>{record.delivery_mode}</Tag>,
    },
    {
        title: "Дата передачи",
        render: (_, record) => (
            <DateCell timestamp={record.transmission_date} />
        ),
    },
    {
        title: "Дата получения",
        render: (_, record) => <DateCell timestamp={record.receiving_date} />,
    },
    {
        title: "Сумма заказа",
        render: (_, record) => <div>{record.total_price} KZT</div>,
    },
    {
        title: "Статус",
        dataIndex: "wonder_status",
        render: (_, record) => <Tag>{record.wonder_status}</Tag>,
    },
];

export const AdminArchiveOrdersTable: FC<OrdersTableProps> = ({
    searchValue,
}) => {
    const isSmallScreen = useMediaQuery({ query: "(max-width: 768px)" });

    const [page, setPage] = useState(1);
    const { data: orders, isPending } = useGetOrdersAdmin(
        page,
        10,
        searchValue,
        "ARCHIVE"
    );
    useEffect(() => {
        setPage(1);
    }, [searchValue]);
    return (
        <Table
            columns={columns}
            dataSource={orders?.content}
            rowKey={"code"}
            loading={isPending}
            pagination={{
                pageSize: 10,
                total: orders?.totalElements,
                showSizeChanger: false,
                onChange(page) {
                    setPage(page - 1);
                },
                current: page + 1,
                position: isSmallScreen ? ["bottomCenter"] : undefined,
            }}
            scroll={{ x: "max-content" }}
        />
    );
};
