import { Table, TableColumnsType } from "antd";
import { FC } from "react";
import { useGetOrder } from "../../queries";
import { GetOrderById } from "../../types";

interface OrderDetailsTableProps {
    orderId: number;
}

const columns: TableColumnsType<GetOrderById> = [
    {
        title: "Product name",
        dataIndex: "productName",
    },
    {
        title: "Article",
        dataIndex: "productArticle",
    },
    {
        title: "Vendor code",
        dataIndex: "productVendorCode",
    },
    {
        title: "Cell number",
        dataIndex: "cellCode",
    },
    {
        title: "Trade price",
        dataIndex: "productTradePrice",
    },
    {
        title: "Sell price",
        dataIndex: "productSellPrice",
    },
    {
        title: "Income",
        dataIndex: "income",
    },
];

export const OrderDetailsTable: FC<OrderDetailsTableProps> = ({ orderId }) => {
    const { data, isPending } = useGetOrder(orderId);

    return (
        <Table
            columns={columns}
            dataSource={data}
            rowKey={"productVendorCode"}
            loading={isPending}
        />
    );
};
