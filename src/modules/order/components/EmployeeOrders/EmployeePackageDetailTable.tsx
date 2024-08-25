import { CustomTable } from "@/components/ui/CustomTable";
import { Button, TableColumnsType } from "antd";
import { FC } from "react";
import { GetPackageProduct } from "../../types";

const columns: TableColumnsType<GetPackageProduct> = [
    {
        title: "Номер заказа",
        render: (_, record) => <span>{record.order_code}</span>,
    },
    {
        title: "ID товара",
        dataIndex: "id",
        render: (_, record) => <span>{record.id}</span>,
    },
    {
        title: "Артикул",
        dataIndex: "product_vendor_code",
    },

    {
        title: "Название товара",
        dataIndex: "product_title",
    },
    {
        title: "",
        render: (_) => <Button type="primary">!</Button>,
    },
];

interface EmployeePackageDetailTableProps {
    data: GetPackageProduct | undefined;
    isPending: boolean;
}

export const EmployeePackageDetailTable: FC<
    EmployeePackageDetailTableProps
> = ({ data, isPending }) => {
    return (
        <CustomTable
            columns={columns}
            dataSource={data ? [data] : undefined}
            rowKey={"id"}
            loading={isPending}
            scroll={{ x: "max-content" }}
        />
    );
};
