import { ConfigProvider, Table, TableColumnsType } from "antd";
import { FC } from "react";
import { GetOrderDetailEmployee } from "../../types";

interface EmployeeOrderDetailsTableProps {
    data: GetOrderDetailEmployee | undefined;
    loading: boolean;
}
interface SellerCellProduct {
    id: number;
    product_vendor_code: string;
    product_title: string;
    cell_number: string;
    order_entry: string;
}
export const EmployeeOrderDetailsTable: FC<EmployeeOrderDetailsTableProps> = ({
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
        <ConfigProvider
            theme={{
                components: {
                    Table: {
                        headerBg: "#fff",
                        headerColor: "#1C1C1C66",
                        headerBorderRadius: 10,
                        headerSplitColor: "#fff",
                    },
                },
            }}
        >
            <Table
                columns={columns}
                dataSource={data?.seller_cell_products}
                rowKey={"id"}
                loading={loading}
                scroll={{ x: "max-content" }}
            />
        </ConfigProvider>
    );
};
