import { Table, TableColumnsType } from "antd";
import { FC } from "react";
import { useGetEmployeeOrder } from "../../queries";

interface EmployeeOrderDetailsTableProps {
    orderId: number;
}

interface Product {
    id: string;
    article: string;
    name: string;
    cellCode: string;
}

const columns: TableColumnsType<Product> = [
    {
        title: "ID",
        render: (_, record) => <span> {record.id}</span>,
    },
    {
        title: "Артикул",
        dataIndex: "article",
    },
    {
        title: "Название продукта",
        dataIndex: "name",
    },
    {
        title: "Номер ячейки",
        dataIndex: "cellCode",
    },
    // {
    //     title: "Артикул поставщика",
    //     dataIndex: "productVendorCode",
    // },
    // {
    //     title: "Цена продажи",
    //     dataIndex: "productSellPrice",
    //     render: (text) => <PriceCell price={text} />,
    // },
    // {
    //     title: "Статус",
    //     render: (_) => <OrderStatusCell status={"Не сканировано"} />,
    // },
];

export const EmployeeOrderDetailsTable: FC<EmployeeOrderDetailsTableProps> = ({
    orderId,
}) => {
    const { data, isPending } = useGetEmployeeOrder(orderId);

    const transformedData = data?.products.map(
        (product: any, index: number) => ({
            id: index.toString(),
            article: product.productArticle,
            name: product.productName,
            cellCode: product.productCell,
        })
    );

    return (
        <Table
            columns={columns}
            dataSource={transformedData}
            rowKey={"id"}
            loading={isPending}
        />
    );
};
