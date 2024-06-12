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
        title: "Артикул",
        dataIndex: "vendorCode",
    },
    {
        title: "Название",
        render: (_, record) => <a href={record.vendorCode}>{record.name}</a>,
    },
    {
        title: "Опубликовано",
        dataIndex: "isPublished",
        render: (_, record) => <ProductEnableSwitch {...record} />,
    },

    {
        title: "Количество в Алматы",
        render: (_, record) => <span>{record.counts[0].count}</span>,
    },

    {
        title: "Количество в Астане",
        render: (_, record) => <span>{record.counts[1].count}</span>,
    },

    {
        title: "Количество в Шымкенте",
        render: (_, record) => <span>{record.counts[2].count}</span>,
    },
];

export const ProductsTable: FC<ProductsTableProps> = ({ searchValue }) => {
    const [page, setPage] = useState(0);
    const [isPublished, setIsPublished] = useState<boolean | null>(null);
    // const { data: productsCount } = useGetProductsPrices(
    //     page,
    //     undefined,
    //     searchValue,
    //     isPublished
    // );
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
                rowKey={(record) => record.vendorCode}
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
