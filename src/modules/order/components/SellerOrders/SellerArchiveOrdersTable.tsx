import { CustomTable } from "@/components/ui/CustomTable";
import { DateCell } from "@/components/ui/DateCell";
import { TableColumnsType, Tag } from "antd";
import { FC, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import { useGetOrdersSeller } from "../../queries";
import { DeliveryMode, GetOrdersSellerContent } from "../../types";
import { mapWonderStatus } from "../../utils";

const columns: TableColumnsType<GetOrdersSellerContent> = [
    {
        title: "Номер заказа",
        render: (_, record) => (
            <Link to={`/seller/orders/${record.id}`}>{record.code}</Link>
        ),
    },
    // {
    //     title: "Название Склада",
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
        dataIndex: "deliveryMode",
        render: (_, record) => <Tag>{record.delivery_mode}</Tag>,
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
        render: (_, record) => <div>{record.total_price} KZT</div>,
    },
    {
        title: "Статус",
        dataIndex: "wonder_status",
        render: (_, record) => {
            const { text, color } = mapWonderStatus(record.wonder_status);
            return (
                <div style={{ color: color }} className={`!rounded-full`}>
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
    // {
    //     title: "Торговая цена",
    //     render: (_, record) => <div>{record.} KZT</div>,
    // },
];

interface SellerArchiveOrdersTableProps {
    searchValue: string;
    deliveryMode?: DeliveryMode;
}

export const SellerArchiveOrdersTable: FC<SellerArchiveOrdersTableProps> = ({
    searchValue,
    // deliveryMode,
}) => {
    const [page, setPage] = useState(1);
    const { data: orders, isPending } = useGetOrdersSeller(
        page,
        10,
        searchValue,
        "ARCHIVE"
    );
    const isSmallScreen = useMediaQuery({ query: "(max-width: 768px)" });

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
