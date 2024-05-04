import { Table, TableColumnsType } from "antd";
import { FC } from "react";
import { GetSupplyProducts, SupplyEmployeeProduct } from "../../types";

const columns: TableColumnsType<SupplyEmployeeProduct> = [
    {
        title: "Article",
        dataIndex: "article",
    },
    {
        title: "Name",
        dataIndex: "name",
    },
    {
        title: "Vendor code",
        dataIndex: "vendorCode",
    },
    {
        title: "Box barcode",
        dataIndex: "vendorCodeOfBox",
    },
    {
        title: "Box type name",
        dataIndex: "typeOfBoxName",
    },
    {
        title: "Status",
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
        />
    );
};
