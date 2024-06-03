import { DateCell } from "@/components/ui/DateCell";
import { Select, Table, TableColumnsType, Tag } from "antd";
import { FC } from "react";
import { Link } from "react-router-dom";
import { useGetOrdersEmployee } from "../../queries";
import { GetOrdersEmployee } from "../../types";
import {
    deliveryTypeColorMap,
    deliveryTypeMap,
    orderStatusMap,
} from "../../utils";

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
        render: (_, record) => <DateCell timestamp={record?.orderCreatedAt} />,
    },
    {
        title: "Delivery type",
        dataIndex: "deliveryMode",
        render: (_, record) => (
            <Tag color={deliveryTypeColorMap(record.deliveryType)}>
                {deliveryTypeMap(record.deliveryType)}
            </Tag>
        ),
    },
    {
        title: "Send time",
        render: (_, record) => <DateCell timestamp={record.orderToSendTime} />,
    },
    {
        title: "Status",
        dataIndex: "state",
        render: (_, record) => (
            <Select
                className="w-full"
                value={orderStatusMap(record.orderStatus)}
                options={[
                    { value: "1", label: "Упаковка" },
                    { value: "2", label: "Готов к отправке" },
                    { value: "3", label: "Передача" },
                    { value: "4", label: "Доставлено" },
                ]}
            />
        ),
        width: 200,
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
