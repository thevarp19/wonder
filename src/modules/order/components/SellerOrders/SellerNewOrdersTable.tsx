import { CustomTable } from "@/components/ui/CustomTable";
import { DateCell } from "@/components/ui/DateCell";
import { TableColumnsType, Tag } from "antd";
import { FC } from "react";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import { GetNewSignOrders, GetNewSignOrdersSellerContent } from "../../types";
import { mapDeliveryMode } from "../../utils";

const columns: TableColumnsType<GetNewSignOrdersSellerContent> = [
    {
        title: "Номер заказа",
        render: (_, record) => (
            <Link to={`/orders/${record.id}`}>{record.code}</Link>
        ),
    },
    {
        title: "Покупатель",
        dataIndex: "customer",
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
    { title: "Адрес доставки", dataIndex: "delivery_mode" },
    {
        title: "Время заказа",
        dataIndex: "creation_date",
        render: (_, record) => <DateCell timestamp={record.creation_date} />,
    },
    {
        title: "Способ оплаты",
        dataIndex: "payment_mode",
    },
    {
        title: "Требуется подпись",
        render: (_, record) => (
            <span>{record.signature_required ? "Да" : "Нет"}</span>
        ),
    },
];

interface SellerNewOrdersTableProps {
    data: GetNewSignOrders | undefined;
    isPending: boolean;
    setPage: (page: number) => void;
    page: number;
}

export const SellerNewOrdersTable: FC<SellerNewOrdersTableProps> = ({
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
            rowKey={"id"}
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
