import { CustomTable } from "@/components/ui/CustomTable";
import { DateCell } from "@/components/ui/DateCell";
import { ConfigProvider, TableColumnsType, Tag } from "antd";
import { FC, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import { useGetTransferOrderEmployee } from "../../queries";
import { DeliveryMode, GetTransferOrdersEmployeeContent } from "../../types";
import { mapDeliveryMode } from "../../utils";

const columns: TableColumnsType<GetTransferOrdersEmployeeContent> = [
    {
        title: "ID заказа",
        dataIndex: "code",
        render: (_, record) => (
            <Link to={`/employee/orders/${record.id}`}>{record.code}</Link>
        ),
    },
    {
        title: "Название магазина",
        dataIndex: "kaspi_store_name",
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
                        className="!flex !justify-center w-full max-w-max"
                    >
                        {text}
                    </Tag>
                </div>
            );
        },
        width: 120,
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
    const [page, setPage] = useState(0);
    const { data: orders, isPending } = useGetTransferOrderEmployee(
        page,
        10,
        searchValue,
        deliveryMode
    );
    useEffect(() => {
        setPage(0);
    }, [deliveryMode, searchValue]);
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
