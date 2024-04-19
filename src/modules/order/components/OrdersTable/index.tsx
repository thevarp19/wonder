import { Table, TableColumnsType } from "antd";
import { FC } from "react";
import { useGetOrdersByDate } from "../../queries";
import { GetOrdersByDate } from "../../types";

interface OrdersTableProps {}

const columns: TableColumnsType<GetOrdersByDate> = [
    {
        title: "ID",
        dataIndex: "id",
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
