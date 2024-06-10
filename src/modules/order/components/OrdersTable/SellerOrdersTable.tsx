import { DateCell } from "@/components/ui/DateCell";
import { Table, TableColumnsType, Tag } from "antd";
import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { useGetOrdersSeller } from "../../queries";
import { GetOrdersByDate } from "../../types";
import {
    deliveryTypeColorMap,
    deliveryTypeMap,
    orderStatusColorMap,
    orderStatusMap,
} from "../../utils";

const columns: TableColumnsType<GetOrdersByDate> = [
    {
        title: "Номер заказа",
        render: (_, record) => (
            <Link to={`/seller/orders/${record.code}`}>{record.code}</Link>
        ),
    },
    {
        title: "Название магазина",
        dataIndex: "sellerName",
    },
    {
        title: "Склад",
        dataIndex: "code",
    },
    {
        title: "Время заказа",
        render: (_, record) => <DateCell timestamp={record.creationDate} />,
    },
    {
        title: "Тип доставки",
        dataIndex: "deliveryMode",
        render: (_, record) => (
            <Tag color={deliveryTypeColorMap(record.deliveryMode)}>
                {deliveryTypeMap(record.deliveryMode)}
            </Tag>
        ),
    },
    {
        title: "Планируемая дата доставки",
        render: (_, record) => (
            <DateCell timestamp={record.plannedDeliveryDate} />
        ),
    },
    {
        title: "Дата передачи",
        render: (_, record) => (
            <DateCell timestamp={record.courierTransmissionDate} />
        ),
    },
    {
        title: "Статус",
        dataIndex: "state",
        render: (_, record) => (
            <Tag color={orderStatusColorMap(record.state)}>
                {orderStatusMap(record.state)}
            </Tag>
        ),
    },
    {
        title: "Цена",
        render: (_, record) => <div>{record.totalPrice} KZT</div>,
    },
    {
        title: "Торговая цена",
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
            }}
        />
    );
};
