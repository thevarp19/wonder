import { useQuery } from "@tanstack/react-query";
import { Switch, Table, TableColumnsType } from "antd";
import { FC } from "react";
import { getSellerProducts } from "../../api/shared";
import { SellerProductsResponse } from "../../types/api";

interface ProductsTableProps {}

const columns: TableColumnsType<SellerProductsResponse> = [
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
        render: () => (
            <div className="flex items-center gap-2">
                <Switch />
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
];

export const ProductsTable: FC<ProductsTableProps> = ({}) => {
    const { data: products, isPending } = useQuery<SellerProductsResponse[]>({
        queryKey: ["products"],
        queryFn: async () => {
            const { data } = await getSellerProducts();
            return data;
        },
    });
    return (
        <Table
            columns={columns}
            loading={isPending}
            dataSource={products}
            rowKey={"article"}
        />
    );
};
