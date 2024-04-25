import { Table, TableColumnsType } from "antd";
import { FC } from "react";
import { Link } from "react-router-dom";
import { useGetOrdersEmployee } from "../../queries";
import { GetOrdersEmployee } from "../../types";
import { deliveryTypeMap, orderStatusMap } from "../../utils";

const columns: TableColumnsType<GetOrdersEmployee> = [
    {
        title: "Order number",
        render: (_, record) => (
            <Link to={`/employee/orders/${record.orderCode}`}>
                {record.orderCode}
            </Link>
        ),
    },
    {
        title: "Time",
        render: (_, record) => (
            <div>
                <div>
                    {new Date(record.orderCreatedAt).toLocaleDateString(
                        "ru-RU"
                    )}{" "}
                </div>
                {new Date(record.orderCreatedAt)
                    .toLocaleTimeString("ru-RU")
                    .substring(0, 5)}
            </div>
        ),
    },
    {
        title: "Delivery type",
        dataIndex: "deliveryMode",
        render: (_, record) => deliveryTypeMap(record.deliveryType),
    },
    {
        title: "Send time",
        render: (_, record) => (
            <div>
                <div>
                    {new Date(record.orderToSendTime).toLocaleDateString(
                        "ru-RU"
                    )}{" "}
                </div>
                {new Date(record.orderToSendTime)
                    .toLocaleTimeString("ru-RU")
                    .substring(0, 5)}
            </div>
        ),
    },
    {
        title: "Status",
        dataIndex: "state",
        render: (_, record) => orderStatusMap(record.orderStatus),
    },
];

interface EmployeeOrdersTableProps {}

export const EmployeeOrdersTable: FC<EmployeeOrdersTableProps> = ({}) => {
    const { data: orders, isPending } = useGetOrdersEmployee(
        "2000-12-02",
        "2040-12-02"
    );
    return (
        <Table
            columns={columns}
            dataSource={orders}
            rowKey={"orderCode"}
            loading={isPending}
        />
    );
};
