import { CustomTable } from "@/components/ui/CustomTable";
import { TableColumnsType } from "antd";
import { FC } from "react";
import { GetOrderDetail } from "../../types";

interface AdminOrderDetailsTableProps {
    data: GetOrderDetail | undefined;
    loading: boolean;
}
interface SellerCellProduct {
    id: number;
    product_vendor_code: string;
    product_title: string;
    cell_number: string;
    order_entry: string;
}
export const AdminOrderDetailsTable: FC<AdminOrderDetailsTableProps> = ({
    data,
    loading,
}) => {
    const columns: TableColumnsType<SellerCellProduct> = [
        {
            title: "Артикул продукта",
            dataIndex: "product_vendor_code",
            key: "product_vendor_code",
        },
        {
            title: "Бар код",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Название продукта",
            dataIndex: "product_title",
            key: "product_title",
        },
        {
            title: "Ячейка продукта",
            dataIndex: "cell_number",
            key: "cell_number",
        },
    ];

    return (
        <CustomTable
            columns={columns}
            dataSource={data?.seller_cell_products}
            rowKey={"id"}
            loading={loading}
            scroll={{ x: "max-content" }}
        />
    );
};
