import { DateCell } from "@/components/ui/DateCell";
import { Table, TableColumnsType, Tag } from "antd";
import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { useGetOrdersSeller } from "../../queries";
import { GetOrdersByDate } from "../../types";
import { deliveryTypeColorMap, deliveryTypeMap } from "../../utils";

const columns: TableColumnsType<GetOrdersByDate> = [
    {
        title: "Order number",
        render: (_, record) => (
            <Link to={`/seller/orders/${record.code}`}>{record.code}</Link>
        ),
    },
    {
        title: "Shop name",
        dataIndex: "code",
    },
    {
        title: "Store",
        dataIndex: "code",
    },
    {
        title: "Order time",
        render: (_, record) => <DateCell timestamp={record.creationDate} />,
    },
    {
        title: "Delivery type",
        dataIndex: "deliveryMode",
        render: (_, record) => (
            <Tag color={deliveryTypeColorMap(record.deliveryMode)}>
                {deliveryTypeMap(record.deliveryMode)}
            </Tag>
        ),
    },
    {
        title: "Send time",
        render: (_, record) => (
            <DateCell timestamp={record.plannedDeliveryDate} />
        ),
    },
    {
        title: "Status",
        dataIndex: "state",
        render: (_, record) => deliveryTypeMap(record.state),
    },
    {
        title: "Price",
        render: (_, record) => <div>{record.totalPrice} KZT</div>,
    },
    {
        title: "Trade price",
        render: (_, record) => <div>{record.tradePrice} KZT</div>,
    },
];

interface SellerOrdersTableProps {}

export const SellerOrdersTable: FC<SellerOrdersTableProps> = ({}) => {
    const [page, setPage] = useState(0);
    const { data: orders, isPending } = useGetOrdersSeller(
        "2000-12-02",
        "2040-12-02",
        page
    );
    return (
        <Table
            columns={columns}
            dataSource={orders?.content}
            rowKey={"id"}
            loading={isPending}
            pagination={{
                pageSize: 10,
                total: orders?.totalElements,
                showSizeChanger: false,
                onChange(page) {
                    setPage(page - 1);
                },
                current: page + 1,
            }}
        />
    );
};
