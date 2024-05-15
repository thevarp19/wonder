import { Switch, Table, TableColumnsType } from "antd";
import { FC, useState } from "react";
import { changeProductsVisibilityMutation } from "../../mutations";
import { useGetProducts } from "../../queries";
import { GetProductContent } from "../../types";
import { ProductPublishedFilter } from "../ProductsFilter/ProductPublishedFilter";

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
        render: (_, record) => <ProductEnableSwitch {...record} />,
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
    const [isPublished, setIsPublished] = useState<boolean | null>(null);
    const { data: products, isPending } = useGetProducts(
        page,
        undefined,
        searchValue,
        isPublished
    );

    return (
        <div>
            <ProductPublishedFilter
                setIsPublished={setIsPublished}
                isPublished={isPublished}
            />
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
        </div>
    );
};

export function ProductEnableSwitch({
    id,
    enabled,
}: {
    id: number;
    enabled: boolean;
}) {
    const { isPending, mutateAsync } = changeProductsVisibilityMutation();
    return (
        <div className="flex items-center gap-2">
            <Switch
                checked={enabled}
                loading={isPending}
                onChange={async (checked) => {
                    mutateAsync({ id: id, isPublished: checked });
                }}
            />
        </div>
    );
}
