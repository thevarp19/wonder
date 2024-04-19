import { Table, TableColumnsType } from "antd";
import { FC } from "react";
import { useGetOrder } from "../../queries";
import { GetOrderById } from "../../types";

interface OrderDetailsTableProps {
    orderId: number;
}

const columns: TableColumnsType<GetOrderById> = [
    {
        title: "Order number",
        dataIndex: "code",
    },
];

export const OrderDetailsTable: FC<OrderDetailsTableProps> = ({ orderId }) => {
    const { data, isPending } = useGetOrder(orderId);

    return (
        <Table
            columns={columns}
            dataSource={data}
            rowKey={"id"}
            loading={isPending}
        />
    );
};
