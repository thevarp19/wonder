import { PriceCell } from "@/components/ui/PriceCell";
import { Button, Table, TableColumnsType } from "antd";
import { FC } from "react";
import { Link } from "react-router-dom";
import { useGetOrder } from "../../queries";
import { GetOrderById } from "../../types";

interface AdminOrderDetailsTableProps {
    orderId: number;
}

const columns: TableColumnsType<GetOrderById> = [
    {
        title: "ID",
        render: (_, record) => (
            <Link to={`/product/${record.productVendorCode}`}>
                {record.productVendorCode}
            </Link>
        ),
    },
    {
        title: "Article",
        dataIndex: "productArticle",
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
        title: "Sell price",
        dataIndex: "productSellPrice",
        render: (text) => <PriceCell price={text} />,
    },
    {
        title: "Status",
        render: (_) => <OrderStatusCell status={"Не сканировано"} />,
    },
];

export const OrderStatusCell: FC<{ status: string }> = ({ status }) => {
    return (
        <div className="flex items-center gap-4">
            {status}
            {status === "Не сканировано" && (
                <Button type="primary" size="small">
                    Скан
                </Button>
            )}
        </div>
    );
};

export const AdminOrderDetailsTable: FC<AdminOrderDetailsTableProps> = ({
    orderId,
}) => {
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
