import { CustomTable } from "@/components/ui/CustomTable";
import { DateCell } from "@/components/ui/DateCell";
import { ConfigProvider, TableColumnsType, Tag } from "antd";
import { FC } from "react";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import { GetCancelledOrders, GetOrdersContent } from "../../types";

const columns: TableColumnsType<GetOrdersContent> = [
    {
        title: "Номер заказа",
        render: (_, record) => (
            <Link to={`/admin/orders/${record.id}`}>{record.code}</Link>
        ),
    },
    {
        title: "Артикул",
        dataIndex: "product_vendor_codes",
        render: (product_vendor_codes) =>
            product_vendor_codes.map((code: any, index: any) => (
                <Tag key={index}>{code}</Tag>
            )),
    },
    {
        title: "Название склада",
        dataIndex: "store_name",
        render: (_, record) => <span>{record?.store_name}</span>,
    },
    {
        title: "Название товара",
        dataIndex: "product_titles",
        render: (product_titles) =>
            product_titles.map((title: any, index: any) => (
                <Tag key={index}>{title}</Tag>
            )),
    },
    {
        title: "Время заказа",
        dataIndex: "creation_date",
        render: (_, record) => <DateCell timestamp={record.creation_date} />,
    },
    {
        title: "Дата передачи",
        dataIndex: "transmission_date",
        render: (_, record) => (
            <DateCell timestamp={record.transmission_date} />
        ),
    },
];

interface AdminCancelledTableProps {
    data: GetCancelledOrders | undefined;
    isPending: boolean;
    setPage: (page: number) => void;
    page: number;
}

export const AdminCancelledTable: FC<AdminCancelledTableProps> = ({
    data,
    isPending,
    setPage,
    page,
}) => {
    const isSmallScreen = useMediaQuery({ query: "(max-width: 768px)" });

    return (
        <ConfigProvider
            theme={{
                components: {
                    Table: {
                        headerBg: "#fff",
                        headerColor: "#1C1C1C66",
                        headerBorderRadius: 10,
                        headerSplitColor: "#fff",
                    },
                },
            }}
        >
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
        </ConfigProvider>
    );
};
