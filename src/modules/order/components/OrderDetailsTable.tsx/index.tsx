import { Table, TableColumnsType } from "antd";
import { FC } from "react";
import { useGetOrder } from "../../queries";
import { GetOrderById } from "../../types";

interface OrderDetailsTableProps {
    orderId: number;
}

const columns: TableColumnsType<GetOrderById> = [
    {
        title: "Store address",
        dataIndex: "storeAddress",
    },
    {
        title: "Article",
        dataIndex: "article",
    },
    {
        title: "Vendor code",
        dataIndex: "vendorCode",
    },
    {
        title: "Box",
        dataIndex: "boxTypeName",
    },
    {
        title: "Box barcode",
        dataIndex: "boxBarCode",
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
