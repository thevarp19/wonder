import { Table, TableColumnsType } from "antd";
import { FC } from "react";
import { useGetOrder } from "../../queries";
import { GetOrderById } from "../../types";

interface OrderDetailsTableProps {
    orderId: number;
}

const columns: TableColumnsType<GetOrderById> = [
    {
        title: "ID",
        dataIndex: "id",
    },
];

export const OrderDetailsTable: FC<OrderDetailsTableProps> = ({ orderId }) => {
    const { data, isPending } = useGetOrder(orderId);
    console.log(data);
    return (
        <Table
            columns={columns}
            dataSource={data}
            rowKey={"id"}
            loading={isPending}
        />
    );
};
