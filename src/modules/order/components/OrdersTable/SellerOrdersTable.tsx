import { DateCell } from "@/components/ui/DateCell";
import { Table, TableColumnsType, Tag } from "antd";
import { FC, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import { useGetOrdersSeller } from "../../queries";
import { DeliveryMode, GetOrdersByDate } from "../../types";
import { orderStatusColorMap, orderStatusMap } from "../../utils";

const columns: TableColumnsType<GetOrdersByDate> = [
    {
        title: "Номер заказа",
        render: (_, record) => (
            <Link to={`/seller/orders/${record.code}`}>{record.code}</Link>
        ),
    },
    {
        title: "Название Склада",
        dataIndex: "sellerName",
    },
    {
        title: "Склад",
        dataIndex: "storeFormattedAddress",
    },
    {
        title: "Время заказа",
        render: (_, record) => <DateCell timestamp={record.creationDate} />,
    },
    {
        title: "Тип доставки",
        dataIndex: "deliveryMode",
        render: (_, record) => <Tag>{record.deliveryMode}</Tag>,
    },
    {
        title: "Дата передачи",
        render: (_, record) => (
            <DateCell timestamp={record.courierTransmissionDate} />
        ),
    },
    {
        title: "Планируемая дата доставки",
        render: (_, record) => (
            <DateCell timestamp={record.plannedDeliveryDate} />
        ),
    },
    {
        title: "Статус",
        dataIndex: "state",
        render: (_, record) => (
            <Tag color={orderStatusColorMap(record.state)}>
                {orderStatusMap(record.state)}
            </Tag>
        ),
    },
    {
        title: "Цена",
        render: (_, record) => <div>{record.totalPrice} KZT</div>,
    },
    {
        title: "Торговая цена",
        render: (_, record) => <div>{record.tradePrice} KZT</div>,
    },
];

interface SellerOrdersTableProps {
    searchValue: string;
    deliveryMode: DeliveryMode;
    byOrderCode: boolean;
    byShopName: boolean;
    byStoreAddress: boolean;
    byProductName: boolean;
    byProductArticle: boolean;
    byProductVendorCode: boolean;
}

export const SellerOrdersTable: FC<SellerOrdersTableProps> = ({
    searchValue,
    deliveryMode,
    byOrderCode,
    byShopName,
    byStoreAddress,
    byProductName,
    byProductArticle,
    byProductVendorCode,
}) => {
    const [page, setPage] = useState(1);
    const { data: orders, isPending } = useGetOrdersSeller(
        "2000-12-02",
        "2040-12-02",
        page,
        10,
        searchValue,
        deliveryMode,
        byOrderCode,
        byShopName,
        byStoreAddress,
        byProductName,
        byProductArticle,
        byProductVendorCode
    );
    const isSmallScreen = useMediaQuery({ query: "(max-width: 768px)" });

    return (
        <Table
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
