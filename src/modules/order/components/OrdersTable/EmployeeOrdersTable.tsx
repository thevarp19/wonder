import { DateCell } from "@/components/ui/DateCell";
import { PriceCell } from "@/components/ui/PriceCell";
import { Select, Table, TableColumnsType, Tag } from "antd";
import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { useGetOrdersEmployee } from "../../queries";
import { DeliveryMode, GetOrdersEmployeeContent } from "../../types";

const columns: TableColumnsType<GetOrdersEmployeeContent> = [
    {
        title: "Номер заказа",
        render: (_, record) => (
            <Link to={`/employee/orders/${record.orderCode}`}>
                {record.orderCode}
            </Link>
        ),
    },
    {
        title: "Время",
        render: (_, record) => <DateCell timestamp={record?.orderCreatedAt} />,
    },
    {
        title: "Склад",
        dataIndex: "shopName",
    },
    {
        title: "Адрес",
        dataIndex: "formattedAddress",
    },
    {
        title: "Тип доставки",
        dataIndex: "deliveryMode",
        render: (_, record) => <Tag>{record.deliveryType}</Tag>,
    },
    {
        title: "Время отправки",
        render: (_, record) => <DateCell timestamp={record.orderToSendTime} />,
    },
    {
        title: "Цена",
        render: (_, record) => <PriceCell price={record.price} />,
    },
    {
        title: "Статус",
        dataIndex: "state",
        render: (_, record) => (
            <Select
                className="w-full"
                disabled
                value={record.descriptionOfOrderStatus}
                options={[
                    { value: "1", label: "Упаковка" },
                    { value: "2", label: "Готов к отправке" },
                    { value: "3", label: "Передача" },
                    { value: "4", label: "Доставлено" },
                ]}
            />
        ),
    },
];

interface EmployeeOrdersTableProps {
    searchValue: string;
    deliveryMode: DeliveryMode;
    byOrderCode: boolean;
    byShopName: boolean;
    byStoreAddress: boolean;
    byProductName: boolean;
    byProductArticle: boolean;
    byProductVendorCode: boolean;
}

export const EmployeeOrdersTable: FC<EmployeeOrdersTableProps> = ({
    searchValue,
    deliveryMode,
    byOrderCode,
    byShopName,
    byStoreAddress,
    byProductName,
    byProductArticle,
    byProductVendorCode,
}) => {
    const [page, setPage] = useState(0);
    const { data: orders, isPending } = useGetOrdersEmployee(
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
    return (
        <Table
            columns={columns}
            dataSource={orders?.content}
            rowKey={"orderCode"}
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
