import { ConfigProvider, Table, TableColumnsType } from "antd";
import { FC, useState } from "react";
import { useGetAdminLastOrders } from "../queries";
import { GetLastOrders } from "../types";

interface ProductsCountTableProps {
    searchValue?: string;
}

const columns: TableColumnsType<GetLastOrders> = [
    {
        title: "Order Code",
        dataIndex: "orderCode",
    },
    {
        title: "Shop Name",
        render: (_, record) => <span>{record.shopName}</span>,
    },

    {
        title: "Price",
        render: (_, record) => <span>{record.price}</span>,
    },
];

export const LastOrdersTable: FC<ProductsCountTableProps> = ({}) => {
    const [page, setPage] = useState(0);

    const { data: lastOrders, isPending } = useGetAdminLastOrders(
        page,
        undefined
    );
    // const content = [
    //     {
    //         article: "101",
    //         name: "Wireless Mouse",
    //         count: 150,
    //         storeId: 1,
    //         storeFormattedAddress: "123 Main St, Springfield, IL",
    //     },
    //     {
    //         article: "102",
    //         name: "Mechanical Keyboard",
    //         count: 85,
    //         storeId: 2,
    //         storeFormattedAddress: "456 Elm St, Springfield, IL",
    //     },
    //     {
    //         article: "103",
    //         name: "27-inch Monitor",
    //         count: 45,
    //         storeId: 3,
    //         storeFormattedAddress: "789 Maple St, Springfield, IL",
    //     },
    //     {
    //         article: "104",
    //         name: "USB-C Hub",
    //         count: 200,
    //         storeId: 4,
    //         storeFormattedAddress: "101 Oak St, Springfield, IL",
    //     },
    //     {
    //         article: "105",
    //         name: "External Hard Drive",
    //         count: 120,
    //         storeId: 5,
    //         storeFormattedAddress: "202 Pine St, Springfield, IL",
    //     },
    //     {
    //         article: "103",
    //         name: "27-inch Monitor",
    //         count: 45,
    //         storeId: 3,
    //         storeFormattedAddress: "789 Maple St, Springfield, IL",
    //     },
    //     {
    //         article: "104",
    //         name: "USB-C Hub",
    //         count: 200,
    //         storeId: 4,
    //         storeFormattedAddress: "101 Oak St, Springfield, IL",
    //     },
    //     {
    //         article: "105",
    //         name: "External Hard Drive",
    //         count: 120,
    //         storeId: 5,
    //         storeFormattedAddress: "202 Pine St, Springfield, IL",
    //     },
    //     {
    //         article: "103",
    //         name: "27-inch Monitor",
    //         count: 45,
    //         storeId: 3,
    //         storeFormattedAddress: "789 Maple St, Springfield, IL",
    //     },
    //     {
    //         article: "104",
    //         name: "USB-C Hub",
    //         count: 200,
    //         storeId: 4,
    //         storeFormattedAddress: "101 Oak St, Springfield, IL",
    //     },
    // ];

    return (
        <ConfigProvider
            theme={{
                components: {
                    Table: {
                        headerBg: "#EF7214",
                        headerColor: "#fff",
                    },
                },
            }}
        >
            <Table
                className="h-full"
                size="small"
                columns={columns}
                loading={isPending}
                dataSource={lastOrders?.content}
                rowKey={(record) => record.orderCode}
                pagination={{
                    pageSize: 4,
                    total: lastOrders?.totalElements,
                    showSizeChanger: false,
                    onChange(page) {
                        setPage(page - 1);
                    },
                    current: page + 1,
                }}
            />
        </ConfigProvider>
    );
};
