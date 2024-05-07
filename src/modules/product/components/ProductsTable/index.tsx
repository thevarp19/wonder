import { Switch, Table, TableColumnsType } from "antd";
import { FC, useState } from "react";
import { changeProductsVisibilityMutation } from "../../mutations";
import { useGetProducts } from "../../queries";
import { GetProductContent } from "../../types";

interface ProductsTableProps {
    searchValue?: string;
}

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
        render: (_, record) => <ProductEnableSwitch record={record} />,
        filters: [
            {
                text: "Published",
                value: true,
            },
            {
                text: "Unpublished",
                value: false,
            },
        ],
        onFilter: (value, record) => record.enabled === value,
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

export const ProductsTable: FC<ProductsTableProps> = ({ searchValue }) => {
    const [page, setPage] = useState(0);
    const { data: products, isPending } = useGetProducts(
        page,
        undefined,
        searchValue
    );
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

function ProductEnableSwitch({ record }: { record: GetProductContent }) {
    const { isPending, mutateAsync } = changeProductsVisibilityMutation();
    return (
        <div className="flex items-center gap-2">
            <Switch
                checked={record.enabled}
                loading={isPending}
                onChange={async (checked) => {
                    mutateAsync({ id: record.id, isPublished: checked });
                }}
            />
        </div>
    );
}
