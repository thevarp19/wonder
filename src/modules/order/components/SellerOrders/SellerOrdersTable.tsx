import { CustomTable } from "@/components/ui/CustomTable";
import { DateCell } from "@/components/ui/DateCell";
import { PriceCell } from "@/components/ui/PriceCell";
import { TableColumnsType, Tag } from "antd";
import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGetOrdersSeller } from "../../queries";
import { DeliveryMode, GetOrdersSellerContent } from "../../types";
import { mapDeliveryMode, mapWonderStatus } from "../../utils";

const columns: TableColumnsType<GetOrdersSellerContent> = [
    {
        title: "Номер заказа",
        render: (_, record) => (
            <Link to={`/orders/${record.id}`}>{record.code}</Link>
        ),
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
                    >
                        {text}
                    </Tag>
                </div>
            );
        },
    },
    {
        title: "Время заказа",
        render: (_, record) => <DateCell timestamp={record.creation_date} />,
    },

    {
        title: "Дата передачи",
        render: (_, record) => (
            <DateCell timestamp={record.transmission_date} />
        ),
    },
    {
        title: "Дата получения",
        render: (_, record) => <DateCell timestamp={record.receiving_date} />,
    },
    {
        title: "Сумма заказа",
        render: (_, record) => <PriceCell price={record.total_price} />,
    },
    {
        title: "Обслуживание",
        render: (_) => <div>-</div>,
    },
    {
        title: "Статус",
        dataIndex: "wonder_status",
        render: (_, record) => {
            const { text, color } = mapWonderStatus(record.wonder_status);
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
    {
        title: "Склад",
        dataIndex: "warehouse",
    },
];

interface SellerOrdersTableProps {
    searchValue: string;
    deliveryMode: DeliveryMode;
}

export const SellerOrdersTable: FC<SellerOrdersTableProps> = ({
    searchValue,
    deliveryMode,
}) => {
    const [page, setPage] = useState(0);
    const { data: orders, isPending } = useGetOrdersSeller(
        page,
        10,
        searchValue,
        deliveryMode
    );
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
            }}
        />
    );
};
