import { ConfigProvider, Table, TableColumnsType } from "antd";
import { FC, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { GetLastOrders } from "../types";

interface ProductsCountTableProps {
    searchValue?: string;
}

const columns: TableColumnsType<GetLastOrders> = [
    {
        title: "Код заказа",
        dataIndex: "orderCode",
    },
    {
        title: "Название склада",
        render: (_, record) => <span>{record.shopName}</span>,
    },
    {
        title: "Цена",
        render: (_, record) => <span>{record.price}</span>,
    },
];

export const LastOrdersTable: FC<ProductsCountTableProps> = ({}) => {
    const isSmallScreen = useMediaQuery({ query: "(max-width: 640px" });

    const [page, setPage] = useState(1);
    const isPending = false;
    // const { data: lastOrders, isPending } = useGetAdminLastOrders(
    //     page,
    //     undefined
    // );
    const content = [
        {
            shopName: "Wireless Mouse",
            price: 150,
            orderCode: "1",
        },
        {
            shopName: "Mechanical Keyboard",
            price: 85,
            orderCode: "2",
        },
        {
            shopName: "27-inch Monitor",
            price: 45,
            orderCode: "3",
        },
        {
            shopName: "USB-C Hub",
            price: 200,
            orderCode: "4",
        },
        {
            shopName: "External Hard Drive",
            price: 120,
            orderCode: "5",
        },
        {
            shopName: "27-inch Monitor",
            price: 45,
            orderCode: "3",
        },
        {
            shopName: "USB-C Hub",
            price: 200,
            orderCode: "4",
        },
        {
            shopName: "External Hard Drive",
            price: 120,
            orderCode: "5",
        },
    ];

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
                dataSource={content}
                rowKey={(record) => record.orderCode}
                pagination={{
                    pageSize: 5,
                    total: 10,
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
