import { PriceCell } from "@/components/ui/PriceCell";
import { Table, TableColumnsType } from "antd";
import { FC } from "react";
import { Link } from "react-router-dom";
// import { useGetOrder } from "../../queries";

interface AdminOrderDetailsTableProps {
    orderId: number;
}

const columns: TableColumnsType<any> = [
    {
        title: "ID",
        render: (_, record) => (
            <Link to={`/product/${record.productVendorCode}`}>
                {record.productVendorCode}
            </Link>
        ),
    },
    {
        title: "Артикул",
        dataIndex: "productArticle",
    },
    {
        title: "Название продукта",
        dataIndex: "productName",
    },
    {
        title: "Номер ячейки",
        dataIndex: "cellCode",
    },
    {
        title: "Артикул поставщика",
        dataIndex: "productVendorCode",
    },
    {
        title: "Цена продажи",
        dataIndex: "productSellPrice",
        render: (text) => <PriceCell price={text} />,
    },
];

export const AdminOrderDetailsTable: FC<AdminOrderDetailsTableProps> = ({}) => {
    // const { data, isPending } = useGetAdminOrder(orderId);

    return (
        <Table
            columns={columns}
            dataSource={[]}
            rowKey={"productVendorCode"}
            loading={false}
        />
    );
};
