import { Switch, Table, TableColumnsType } from "antd";
import { FC } from "react";

interface ProductsTableProps {}

interface ProductsTableData {
    article: string;
    name: string;
    link: string;
    isPublished: boolean;
    priceAlmaty: number;
    priceAstana: number;
}

const columns: TableColumnsType<ProductsTableData> = [
    {
        title: "Article",
        dataIndex: "article",
    },
    {
        title: "Name",
        dataIndex: "name",
    },
    {
        title: "Link",
        dataIndex: "link",
        render: () => <a>Link</a>,
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
        dataIndex: "priceAlmaty",
    },
    {
        title: "Price in Astana",
        dataIndex: "priceAstana",
    },
];

const dataSource: ProductsTableData[] = [
    {
        article: "article",
        name: "name",
        link: "link",
        isPublished: true,
        priceAlmaty: 100,
        priceAstana: 200,
    },
];

export const ProductsTable: FC<ProductsTableProps> = ({}) => {
    return (
        <Table columns={columns} dataSource={dataSource} rowKey={"article"} />
    );
};
