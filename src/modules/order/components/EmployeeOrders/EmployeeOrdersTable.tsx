import { CustomTable } from "@/components/ui/CustomTable";
import { DateCell } from "@/components/ui/DateCell";
import { PriceCell } from "@/components/ui/PriceCell";
import { TableColumnsType, Tag } from "antd";
import { FC, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import { useGetOrdersEmployee } from "../../queries";
import { DeliveryMode, GetOrdersEmployeeContent } from "../../types";

const columns: TableColumnsType<GetOrdersEmployeeContent> = [
    {
        title: "Номер заказа",
        render: (_, record) => (
            <Link to={`/employee/orders/${record.id}`}>{record.code}</Link>
        ),
    },
    {
        title: "Время заказа",
        render: (_, record) => <DateCell timestamp={record?.creation_date} />,
    },
    {
        title: "Название магазина",
        dataIndex: "kaspi_store_name",
    },
    {
        title: "Тип доставки",
        dataIndex: "deliveryMode",
        render: (_, record) => <Tag>{record.delivery_mode}</Tag>,
    },

    {
        title: "Цена",
        render: (_, record) => <PriceCell price={record.total_price} />,
    },
    {
        title: "Статус",
        dataIndex: "state",
        render: (_, record) => <Tag>{record?.wonder_status}</Tag>,
    },
];

interface EmployeeOrdersTableProps {
    searchValue: string;
    deliveryMode: DeliveryMode;
}

export const EmployeeOrdersTable: FC<EmployeeOrdersTableProps> = ({
    searchValue,
    deliveryMode,
}) => {
    const [page, setPage] = useState(1);
    const { data: orders, isPending } = useGetOrdersEmployee(
        page,
        10,
        searchValue,
        deliveryMode
    );

    const isSmallScreen = useMediaQuery({ query: "(max-width: 768px)" });
    useEffect(() => {
        setPage(1);
    }, [deliveryMode, searchValue]);
    return (
        <CustomTable
            columns={columns}
            dataSource={orders?.content}
            rowKey={"code"}
            loading={isPending}
            pagination={{
                pageSize: 10,
                total: orders?.totalElements,
                showSizeChanger: false,
                onChange(page) {
                    setPage(page - 1);
                },
                current: page + 1,
                position: isSmallScreen ? ["bottomCenter"] : undefined,
            }}
            scroll={{ x: "max-content" }}
        />
    );
};
