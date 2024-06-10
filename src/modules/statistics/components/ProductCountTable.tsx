import { ConfigProvider, Table, TableColumnsType } from "antd";
import ruRU from "antd/lib/locale/ru_RU";
import { FC, useState } from "react";
import { useGetSellerProductCount } from "../queries";
import { GetProductCount } from "../types";

interface ProductsCountTableProps {
    searchValue?: string;
}

const columns: TableColumnsType<GetProductCount> = [
    {
        title: "Артикул",
        dataIndex: "article",
    },
    {
        title: "Название",
        render: (_, record) => <a href={record.article}>{record.name}</a>,
    },

    {
        title: "Количество",
        render: (_, record) => <span>{record.count}</span>,
    },

    {
        title: "Адрес магазина",
        render: (_, record) => <span>{record.storeFormattedAddress}</span>,
    },
];

export const ProductsCountTable: FC<ProductsCountTableProps> = ({}) => {
    const [page, setPage] = useState(0);

    const { data: products, isPending } = useGetSellerProductCount(
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
                dataSource={products?.content}
                rowKey={(record) => record.article}
                pagination={{
                    pageSize: 10,
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
