import { Table, TableColumnsType } from "antd";
import { FC } from "react";
import { GetSupplyProducts, SupplyEmployeeProduct } from "../../types";

const columns: TableColumnsType<SupplyEmployeeProduct> = [
    {
        title: "Артикул",
        dataIndex: "article",
    },
    {
        title: "Название",
        dataIndex: "name",
    },
    {
        title: "Артикул поставщика",
        dataIndex: "vendorCode",
    },
    {
        title: "Штрих-код коробки",
        dataIndex: "vendorCodeOfBox",
    },
    {
        title: "Название типа коробки",
        dataIndex: "typeOfBoxName",
    },
    {
        title: "Статус",
        dataIndex: "productStateInStore",
    },
];

interface SupplyEmployeeProductsTableProps {
    data?: GetSupplyProducts;
    isPending: boolean;
}

export const SupplyEmployeeProductsTable: FC<
    SupplyEmployeeProductsTableProps
> = ({ data, isPending }) => {
    return (
        <Table
            columns={columns}
            dataSource={data?.products}
            rowKey={"id"}
            loading={isPending}
            locale={{
                emptyText: "Нет данных",
            }}
        />
    );
};
