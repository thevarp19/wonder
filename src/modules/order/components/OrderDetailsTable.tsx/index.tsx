import { PriceCell } from "@/components/ui/PriceCell";
import { Table, TableColumnsType } from "antd";
import { FC } from "react";
import { Link } from "react-router-dom";
import { useGetOrder } from "../../queries";
import { GetOrderById } from "../../types";

interface OrderDetailsTableProps {
    orderId: number;
}

const columns: TableColumnsType<GetOrderById> = [
    {
        title: "Article",
        dataIndex: "productArticle",
        render: (text, record) => (
            <Link to={`/product/${record.productVendorCode}`}>{text}</Link>
        ),
    },
    {
        title: "Product name",
        dataIndex: "productName",
    },
    {
        title: "Cell number",
        dataIndex: "cellCode",
    },
    {
        title: "Vendor code",
        dataIndex: "productVendorCode",
    },
    {
        title: "Trade price",
        dataIndex: "productTradePrice",
        render: (text) => <PriceCell price={text} />,
    },
    {
        title: "Sell price",
        dataIndex: "productSellPrice",
        render: (text) => <PriceCell price={text} />,
    },
    {
        title: "Income",
        dataIndex: "income",
        render: (text) => <PriceCell price={text} />,
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
