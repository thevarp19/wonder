import { Table, TableColumnsType } from "antd";
import { FC } from "react";
import { useGetOrdersByDate } from "../../queries";
import { GetOrdersByDate } from "../../types";
import { deliveryTypeMap } from "../../utils";

const columns: TableColumnsType<GetOrdersByDate> = [
    {
        title: "Order number",
        dataIndex: "code",
    },
    {
        title: "Time",
        render: (_, record) => (
            <div>
                <div>
                    {new Date(record.creationDate).toLocaleDateString("ru-RU")}{" "}
                </div>
                {new Date(record.creationDate)
                    .toLocaleTimeString("ru-RU")
                    .substring(0, 5)}
            </div>
        ),
    },
    {
        title: "Delivery type",
        dataIndex: "deliveryMode",
        render: (_, record) => deliveryTypeMap(record.deliveryMode),
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
                {new Date(record.plannedDeliveryDate)
                    .toLocaleTimeString("ru-RU")
                    .substring(0, 5)}
            </div>
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
    const { data: orders, isPending } = useGetOrdersByDate(
        "2000-12-02",
        "2040-12-02"
    );
    return (
        <Table
            columns={columns}
            dataSource={orders}
            rowKey={"id"}
            loading={isPending}
        />
    );
};
