import { Table, TableColumnsType } from "antd";
import { FC } from "react";
import { useGetOrderDetailEmployee } from "../../queries";
import { GetOrderDetailEmployee } from "../../types";

interface OrderDetailsTableProps {
    orderId: number;
}

const columns: TableColumnsType<GetOrderDetailEmployee> = [
    {
        title: "Product name",
        dataIndex: "orderName",
    },
    {
        title: "Article",
        dataIndex: "orderArticle",
    },
    {
        title: "Vendor code",
        dataIndex: "orderVendorCode",
    },
    {
        title: "Cell number",
        dataIndex: "orderCell",
    },
];

export const EmployeeOrderDetailsTable: FC<OrderDetailsTableProps> = ({
    orderId,
}) => {
    const { data, isPending } = useGetOrderDetailEmployee(orderId);

    return (
        <Table
            columns={columns}
            dataSource={data}
            rowKey={"orderVendorCode"}
            loading={isPending}
        />
    );
};
