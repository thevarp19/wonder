import { CustomTable } from "@/components/ui/CustomTable";
import { DateCell } from "@/components/ui/DateCell";
import { PriceCell } from "@/components/ui/PriceCell";
import { TableColumnsType, Tag } from "antd";
import { FC, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import { useGetOrdersEmployee } from "../../queries";
import { DeliveryMode, GetOrdersEmployeeContent } from "../../types";
import { mapDeliveryMode, mapWonderStatus } from "../../utils";

const columns: TableColumnsType<GetOrdersEmployeeContent> = [
    {
        title: "Номер заказа",
        render: (_, record) => (
            <Link to={`/employee/orders/${record.id}`}>{record.code}</Link>
        ),
    },

    {
        title: "Название магазина",
        dataIndex: "kaspi_store_name",
    },
    {
        title: "Тип доставки",
        dataIndex: "delivery_mode",
        render: (_, record) => {
            const { text, color } = mapDeliveryMode(record.delivery_mode);
            return (
                <div className="flex ">
                    <Tag
                        color={color}
                        style={{
                            borderRadius: "20px",
                            padding: "0 8px",
                            backgroundColor: color,
                            color: "black",
                            fontWeight: "500",
                            fontSize: 14,
                        }}
                        className="!flex !justify-center w-full max-w-max"
                    >
                        {text}
                    </Tag>
                </div>
            );
        },
        width: 120,
    },
    {
        title: "Время заказа",
        render: (_, record) => <DateCell timestamp={record?.creation_date} />,
    },
    {
        title: "Цена",
        render: (_, record) => <PriceCell price={record.total_price} />,
    },
    {
        title: "Статус",
        dataIndex: "wonder_status",
        render: (_, record) => {
            const { text, color } = mapWonderStatus(
                record?.wonder_status || "Неизвестно"
            );
            return (
                <div
                    style={{ color: color }}
                    className={`!rounded-full whitespace-nowrap`}
                >
                    <span
                        style={{
                            display: "inline-block",
                            width: "10px",
                            height: "10px",
                            backgroundColor: color,
                            borderRadius: "50%",
                            marginRight: "8px",
                        }}
                    ></span>
                    {text}
                </div>
            );
        },
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
    const [page, setPage] = useState(0);
    const { data: orders, isPending } = useGetOrdersEmployee(
        page,
        10,
        searchValue,
        deliveryMode
    );

    const isSmallScreen = useMediaQuery({ query: "(max-width: 768px)" });
    useEffect(() => {
        setPage(0);
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
