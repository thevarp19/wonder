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
