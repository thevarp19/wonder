import { CustomTable } from "@/components/ui/CustomTable";
import { DateCell } from "@/components/ui/DateCell";
import { PriceCell } from "@/components/ui/PriceCell";
import { TableColumnsType } from "antd";
import { FC } from "react";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import { GetAssembleOrders, GetOrdersContent } from "../../types";

const columns: TableColumnsType<GetOrdersContent> = [
    {
        title: "Номер заказа",
        render: (_, record) => (
            <Link to={`/orders/${record.id}`}>{record.code}</Link>
        ),
    },
    {
        title: "Артикул",
        dataIndex: "product_vendor_codes",
        render: (product_vendor_codes) =>
            product_vendor_codes.map((code: any, index: any) => (
                <div key={index}>{code}</div>
            )),
    },
    {
        title: "Название товара",
        dataIndex: "product_titles",
        render: (product_titles) =>
            product_titles.map((title: any, index: any) => (
                <div key={index}>{title}</div>
            )),
    },
    {
        title: "Количество ",
        dataIndex: "quantity_all",
        render: (_, record) => <span>{record?.quantity_all}</span>,
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
    {
        title: "Сумма заказа",
        render: (_, record) => <PriceCell price={record.total_price} />,
    },
];

interface SellerAssembleTableProps {
    data: GetAssembleOrders | undefined;
    isPending: boolean;
    setPage: (page: number) => void;
    page: number;
}

export const SellerAssembleTable: FC<SellerAssembleTableProps> = ({
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
