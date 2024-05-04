import { Switch, Table, TableColumnsType } from "antd";
import { FC, useState } from "react";
import { useGetProducts } from "../../queries";
import { GetProductContent } from "../../types";

interface ProductsTableProps {}

const columns: TableColumnsType<GetProductContent> = [
    {
        title: "Article",
        dataIndex: "vendorCode",
    },
    {
        title: "Name",
        render: (_, record) => <a href={record.vendorCode}>{record.name}</a>,
    },
    {
        title: "Published",
        dataIndex: "isPublished",
        render: (_, record) => (
            <div className="flex items-center gap-2">
                <Switch checked={record.enabled} />
            </div>
        ),
    },
    {
        title: "Price in Almaty",
        render: (_, record) => <span>{record.prices[0].price}</span>,
    },
    {
        title: "Price in Astana",
        render: (_, record) => <span>{record.prices[1].price}</span>,
    },
    {
        title: "Price in Shymkent",
        render: (_, record) => <span>{record.prices[2]?.price}</span>,
    },
];

export const ProductsTable: FC<ProductsTableProps> = ({}) => {
    const [page, setPage] = useState(0);
    const { data: products, isPending } = useGetProducts(page);
    return (
        <Table
            columns={columns}
            loading={isPending}
            dataSource={products?.content}
            rowKey={"article"}
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
    );
};
