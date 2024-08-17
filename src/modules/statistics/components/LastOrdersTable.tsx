import { ConfigProvider, Table, TableColumnsType } from "antd";
import { FC, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useGetAdminLastOrders } from "../queries";
import { GetLastOrdersContent } from "../types";

interface ProductsCountTableProps {
    searchValue?: string;
}

const columns: TableColumnsType<GetLastOrdersContent> = [
    {
        title: "Код заказа",
        dataIndex: "order_code",
        key: "order_code",
    },
    {
        title: "Название продукта",
        dataIndex: "product_title",
        key: "product_title",
    },

    {
        title: "Название магазина",
        dataIndex: "store_name",
        key: "store_name",
    },
    {
        title: "Цена",
        dataIndex: "price",
        key: "price",
    },
];

export const LastOrdersTable: FC<ProductsCountTableProps> = ({}) => {
    const isSmallScreen = useMediaQuery({ query: "(max-width: 640px" });

    const [page, setPage] = useState(0);
    const { data: lastOrders, isPending } = useGetAdminLastOrders(page, 5);

    return (
        <ConfigProvider
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
                size={isSmallScreen ? "small" : "large"}
                columns={columns}
                loading={isPending}
                dataSource={lastOrders?.content}
                rowKey={(record) => record.id}
                pagination={{
                    pageSize: 5,
                    total: lastOrders?.totalElements,
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
