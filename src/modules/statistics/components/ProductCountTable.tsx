import { ConfigProvider, Table, TableColumnsType } from "antd";
import { FC, useState } from "react";
import { useGetSellerProductCount } from "../queries";
import { GetProductCount } from "../types";

interface ProductsCountTableProps {
    searchValue?: string;
}

const columns: TableColumnsType<GetProductCount> = [
    {
        title: "Article",
        dataIndex: "article",
    },
    {
        title: "Name",
        render: (_, record) => <a href={record.article}>{record.name}</a>,
    },

    {
        title: "Quantity",
        render: (_, record) => <span>{record.count}</span>,
    },

    {
        title: "Store Address",
        render: (_, record) => <span>{record.storeFormattedAddress}</span>,
    },
];

export const ProductsCountTable: FC<ProductsCountTableProps> = ({}) => {
    const [page, setPage] = useState(0);

    const { data: products, isPending } = useGetSellerProductCount(
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
                dataSource={products?.content}
                rowKey={(record) => record.article}
                pagination={{
                    pageSize: 4,
                    total: products?.totalElements,
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
