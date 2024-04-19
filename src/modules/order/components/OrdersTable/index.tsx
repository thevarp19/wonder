import { Table, TableColumnsType } from "antd";
import { FC } from "react";
import { useGetOrdersByDate } from "../../queries";
import { GetOrdersByDate } from "../../types";

interface OrdersTableProps {}

const columns: TableColumnsType<GetOrdersByDate> = [
    {
        title: "Order number",
        dataIndex: "code",
    },
    {
        title: "Shop",
        dataIndex: "sellerName",
    },
    {
        title: "Time",
        render: (_, record) => (
            <div>
                <div>
                    {new Date(record.creationDate).toLocaleDateString("ru-RU")}{" "}
                </div>
                {new Date(record.creationDate).toLocaleTimeString("ru-RU")}
            </div>
        ),
    },
    {
        title: "Delivery type",
        dataIndex: "deliveryMode",
    },
    {
        title: "Send time",
        render: (_, record) => (
            <div>
                <div>
                    {new Date(record.plannedDeliveryDate).toLocaleDateString(
                        "ru-RU"
                    )}{" "}
                </div>
                {new Date(record.plannedDeliveryDate).toLocaleTimeString(
                    "ru-RU"
                )}
            </div>
        ),
    },
    {
        title: "Status",
        dataIndex: "state",
    },
    {
        title: "Price",
        render: (_, record) => <div>{record.totalPrice} KZT</div>,
    },
];

export const OrdersTable: FC<OrdersTableProps> = ({}) => {
    const { data: orders, isPending } = useGetOrdersByDate("", "");
    return (
        <Table
            columns={columns}
            dataSource={orders}
            rowKey={"id"}
            loading={isPending}
        />
    );
};
