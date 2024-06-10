import { ConfigProvider, Table, TableColumnsType } from "antd";
import ruRU from "antd/lib/locale/ru_RU";
import { FC, useState } from "react";
import { useGetAdminLastOrders } from "../queries";
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
        title: "Название магазина",
        render: (_, record) => <span>{record.shopName}</span>,
    },
    {
        title: "Цена",
        render: (_, record) => <span>{record.price}</span>,
    },
];

export const LastOrdersTable: FC<ProductsCountTableProps> = ({}) => {
    const [page, setPage] = useState(0);

    const { data: lastOrders, isPending } = useGetAdminLastOrders(
        page,
        undefined
    );

    return (
        <ConfigProvider locale={ruRU}>
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
