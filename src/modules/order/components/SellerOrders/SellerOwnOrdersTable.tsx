import { CustomTable } from "@/components/ui/CustomTable";
import { DateCell } from "@/components/ui/DateCell";
import { PriceCell } from "@/components/ui/PriceCell";
import { TableColumnsType, Tag } from "antd";
import { FC } from "react";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import { GetOrdersSeller, GetOrdersSellerContent } from "../../types";
import { mapDeliveryMode, mapOrderStatus } from "../../utils";

const columns: TableColumnsType<GetOrdersSellerContent> = [
    {
        title: "Номер заказа",
        render: (_, record) => (
            <Link to={`/orders/${record.id}`}>{record.code}</Link>
        ),
    },
    // {
    //     title: "Название магазина",
    //     dataIndex: "sellerName",
    // },
    {
        title: "Склад",
        dataIndex: "warehouse",
    },
    {
        title: "Время заказа",
        render: (_, record) => <DateCell timestamp={record.creation_date} />,
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
        title: "Статус",
        dataIndex: "wonder_status",
        render: (_, record) => {
            const { text, color } = mapOrderStatus(record.wonder_status);
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

interface SellerOwnOrdersTableProps {
    data: GetOrdersSeller | undefined;
    isPending: boolean;
    setPage: (page: number) => void;
    page: number;
}

export const SellerOwnOrdersTable: FC<SellerOwnOrdersTableProps> = ({
    data,
    isPending,
    setPage,
    page,
}) => {
    const isSmallScreen = useMediaQuery({ query: "(max-width: 768px)" });

    return (
        <CustomTable
            columns={columns}
            dataSource={data?.content}
            rowKey={"code"}
            loading={isPending}
            pagination={{
                pageSize: 10,
                total: data?.totalElements,
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
