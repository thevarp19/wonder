import { DateCell } from "@/components/ui/DateCell";
import { ConfigProvider, Table, TableColumnsType, Tag } from "antd";
import { FC, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useGetTransferOrderEmployee } from "../../queries";
import { DeliveryMode, GetTransferOrdersContent } from "../../types";

const columns: TableColumnsType<GetTransferOrdersContent> = [
    {
        title: "ID заказа",
        dataIndex: "order_code",
    },
    {
        title: "Название магазина",
        dataIndex: "kaspi_store_name",
    },
    {
        title: "Тип доставки",
        dataIndex: "delivery_mode",
        render: (_, record) => <Tag>{record.delivery_mode}</Tag>,
    },

    {
        title: "Время заказа",
        dataIndex: "creation_date",
        render: (_, record) => <DateCell timestamp={record?.creation_date} />,
    },
    {
        title: "Дата передачи",
        dataIndex: "courier_transmission_planning_date",
        render: (_, record) => (
            <DateCell timestamp={record?.courier_transmission_planning_date} />
        ),
    },
];

interface EmployeeTransferTableProps {
    searchValue: string;
    deliveryMode: DeliveryMode;
}

export const EmployeeTransferTable: FC<EmployeeTransferTableProps> = ({
    searchValue,
    deliveryMode,
}) => {
    const [page, setPage] = useState(1);
    const { data: orders, isPending } = useGetTransferOrderEmployee(
        page,
        10,
        searchValue,
        deliveryMode
    );

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
                dataSource={orders?.content}
                rowKey={"id"}
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
        </ConfigProvider>
    );
};
