import { CustomTable } from "@/components/ui/CustomTable";
import { DateCell } from "@/components/ui/DateCell";
import { PriceCell } from "@/components/ui/PriceCell";
import { TableColumnsType } from "antd";
import { FC } from "react";
import { useMediaQuery } from "react-responsive";
import { GetOrdersContent, GetTransferOrders } from "../../types";

const columns: TableColumnsType<GetOrdersContent> = [
    {
        title: "ID заказа",
        dataIndex: "code",
    },
    {
        title: "Тип доставки",
        dataIndex: "delivery_mode",
        render: (_) => <span>-</span>,
    },
    // {
    //     title: "ID товара",
    //     dataIndex: "id",
    // },
    // {
    //     title: "Артикул",
    //     dataIndex: "product_vendor_codes",
    //     render: (product_vendor_codes) =>
    //         product_vendor_codes.map((code: any, index: any) => (
    //             <Tag key={index}>{code}</Tag>
    //         )),
    // },
    // {
    //     title: "Название товара",
    //     dataIndex: "product_titles",
    //     render: (product_titles) =>
    //         product_titles.map((title: any, index: any) => (
    //             <Tag key={index}>{title}</Tag>
    //         )),
    // },
    {
        title: "Количество",
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
    {
        title: "Обслуживание",
        dataIndex: "quantity_all",
        render: (_) => <span>-</span>,
    },
];

interface SellerTransferTableProps {
    data: GetTransferOrders | undefined;
    isPending: boolean;
    setPage: (page: number) => void;
    page: number;
}

export const SellerTransferTable: FC<SellerTransferTableProps> = ({
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
