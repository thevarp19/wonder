import { ConfigProvider, Table, TableColumnsType } from "antd";
import ruRU from "antd/lib/locale/ru_RU";
import { FC, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useGetSellerProductCount } from "../queries";
import { GetProductCountContent } from "../types";

interface ProductsCountTableProps {
    searchValue?: string;
}

const columns: TableColumnsType<GetProductCountContent> = [
    {
        title: "Артикул",
        dataIndex: "vendor_code",
        key: "vendor_code",
    },
    {
        title: "Название",
        dataIndex: "title",
        key: "title",
    },
    {
        title: "Количество",
        dataIndex: "quantity",
        key: "quantity",
    },
    {
        title: "ID склада",
        dataIndex: "seller_warehouse_id",
        key: "seller_warehouse_id",
    },
    {
        title: "Город",
        dataIndex: "city_name",
        key: "city_name",
    },
];
export const ProductsCountTable: FC<ProductsCountTableProps> = ({}) => {
    const [page, setPage] = useState(0);
    const isSmallScreen = useMediaQuery({ query: "(max-width: 640px" });

    const { data: products, isPending } = useGetSellerProductCount(page, 5);

    return (
        <ConfigProvider
            locale={ruRU}
            theme={{
                components: {
                    Table: {
                        headerBg: "#F78936",
                        headerColor: "#fff",
                        headerBorderRadius: 10,
                        headerSplitColor: "#F78936",
                        colorBgContainer: "#F7F9FB",
                        borderColor: "#F7F9FB",
                        cellPaddingBlock: isSmallScreen ? 10 : 20,
                    },
                },
            }}
        >
            <Table
                className="h-full"
                columns={columns}
                loading={isPending}
                dataSource={products?.content}
                rowKey={(record) => record.vendor_code}
                pagination={{
                    pageSize: 5,
                    total: products?.totalElements,
                    showSizeChanger: false,
                    onChange(page) {
                        setPage(page - 1);
                    },
                    current: page + 1,
                    position: isSmallScreen ? ["bottomCenter"] : undefined,
                }}
                scroll={{ x: "max-content" }}
            />
        </ConfigProvider>
    );
};
