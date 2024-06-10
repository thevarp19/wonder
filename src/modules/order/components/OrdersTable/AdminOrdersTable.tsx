import { DateCell } from "@/components/ui/DateCell";
import { Table, TableColumnsType, Tag } from "antd";
import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { useGetOrdersAdmin } from "../../queries";
import { GetOrdersByDate } from "../../types";
import {
    deliveryTypeColorMap,
    deliveryTypeMap,
    orderStatusColorMap,
    orderStatusMap,
} from "../../utils";

interface OrdersTableProps {}

const columns: TableColumnsType<GetOrdersByDate> = [
    {
        title: "Номер заказа",
        render: (_, record) => (
            <Link to={`/admin/orders/${record.code}`}>{record.code}</Link>
        ),
    },
    {
        title: "Название магазина",
        dataIndex: "sellerName",
    },
    {
        title: "Склад",
        dataIndex: "sellerName",
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
        title: "Дата передачи",
        render: (_, record) => (
            <DateCell timestamp={record.courierTransmissionDate} />
        ),
    },
    {
        title: "Планируемая дата доставки",
        render: (_, record) => (
            <DateCell timestamp={record.plannedDeliveryDate} />
        ),
    },
    {
        title: "Статус",
        dataIndex: "state",
        render: (_, record) => (
            <Tag color={orderStatusColorMap(record.state)}>
                {orderStatusMap(record.state)}
            </Tag>
            // <Select
            //     className="w-full"
            //     value={orderStatusMap(record.state)}
            //     options={[
            //         { value: "1", label: "Упаковка" },
            //         { value: "2", label: "Готов к отправке" },
            //         { value: "3", label: "Передача" },
            //         { value: "4", label: "Доставлено" },
            //     ]}
            // />
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

export const AdminOrdersTable: FC<OrdersTableProps> = ({}) => {
    const [page, setPage] = useState(0);
    const { data: orders, isPending } = useGetOrdersAdmin(
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
