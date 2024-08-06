import { DateCell } from "@/components/ui/DateCell";
import { ConfigProvider, Table, TableColumnsType, Tag } from "antd";
import { FC } from "react";
import { useMediaQuery } from "react-responsive";
import { GetAssembleOrders, GetOrdersContent } from "../../types";

const columns: TableColumnsType<GetOrdersContent> = [
    {
        title: "ID заказа",
        dataIndex: "code",
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
    {
        title: "Все количество",
        dataIndex: "quantity_all",
        render: (_, record) => <span>{record?.quantity_all}</span>,
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
            <Table
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
