import { CustomTable } from "@/components/ui/CustomTable";
import { DateCell } from "@/components/ui/DateCell";
import { PriceCell } from "@/components/ui/PriceCell";
import { TableColumnsType } from "antd";
import { FC } from "react";
import { useMediaQuery } from "react-responsive";
import { useGetEmployeeRefunds } from "../../queries";
import { GetEmployeeRefunds, RefundMode } from "../../types";

interface RefundsOrdersTableProps {
    refundMode: RefundMode;
}

export const RefundsOrdersTable: FC<RefundsOrdersTableProps> = ({
    refundMode,
}) => {
    const { data, isPending } = useGetEmployeeRefunds(refundMode);

    const isSmallScreen = useMediaQuery({ query: "(max-width: 768px)" });

    const getColumns = (): TableColumnsType<GetEmployeeRefunds> => {
        switch (refundMode) {
            case "NEW":
                return [
                    {
                        title: "Номер заявки",
                        render: (_, record) => (
                            <span>{record.applicationNumber}</span>
                        ),
                    },
                    {
                        title: "Название магазина",
                        render: (_, record) => (
                            <span>{record.seller ? record.seller : "-"}</span>
                        ),
                    },
                    {
                        title: "Срок рассмотрения",
                        dataIndex: "plannedDate",
                    },
                    {
                        title: "Сумма заказа",
                        render: (_, record) => <PriceCell price={record.sum} />,
                    },
                    {
                        title: "Название товара",
                        render: (_, record) => <span>{record.productSku}</span>,
                    },
                    {
                        title: "Причина возврата",
                        render: (_, record) => <span>{record?.reason}</span>,
                    },
                ];
            case "ON_DELIVERY":
                return [
                    {
                        title: "Номер заявки",
                        render: (_, record) => (
                            <span>{record.applicationNumber}</span>
                        ),
                    },
                    {
                        title: "Название магазина",
                        render: (_, record) => (
                            <span>{record.seller ? record.seller : "-"}</span>
                        ),
                    },
                    {
                        title: "Сумма заказа",
                        render: (_, record) => <PriceCell price={record.sum} />,
                    },
                    {
                        title: "Дата доставки",
                        render: (_, record) => (
                            <DateCell timestamp={record?.plannedDate} />
                        ),
                    },
                    {
                        title: "Название товара",
                        render: (_, record) => <span>{record.productSku}</span>,
                    },
                    {
                        title: "Причина возврата",
                        render: (_, record) => <span>{record?.reason}</span>,
                    },
                ];
            case "CLOSED":
                return [
                    {
                        title: "Номер заявки",
                        render: (_, record) => (
                            <span>{record.applicationNumber}</span>
                        ),
                    },
                    {
                        title: "Название магазина",
                        render: (_, record) => (
                            <span>{record.seller ? record.seller : "-"}</span>
                        ),
                    },
                    {
                        title: "Статус",
                        render: (_, record) => (
                            <span>{record.description}</span>
                        ),
                        width: 300,
                    },
                    {
                        title: "Сумма заказа",
                        render: (_, record) => <PriceCell price={record.sum} />,
                    },
                    {
                        title: "Название товара",
                        render: (_, record) => <span>{record.productSku}</span>,
                    },
                    {
                        title: "Причина возврата",
                        render: (_, record) => <span>{record?.reason}</span>,
                    },
                ];
            case "WAITING_DECISION":
                return [
                    {
                        title: "Номер заявки",
                        render: (_, record) => (
                            <span>{record.applicationNumber}</span>
                        ),
                    },
                    {
                        title: "Название магазина",
                        render: (_, record) => (
                            <span>{record.seller ? record.seller : "-"}</span>
                        ),
                    },
                    {
                        title: "Срок рассмотрения",
                        dataIndex: "plannedDate",
                    },
                    {
                        title: "Сумма заказа",
                        render: (_, record) => <PriceCell price={record.sum} />,
                    },
                    {
                        title: "Название товара",
                        render: (_, record) => <span>{record.productSku}</span>,
                    },
                    {
                        title: "Причина возврата",
                        render: (_, record) => <span>{record?.reason}</span>,
                    },
                ];
            case "DISPUTE":
                return [
                    {
                        title: "Номер заявки",
                        render: (_, record) => (
                            <span>{record.applicationNumber}</span>
                        ),
                    },
                    {
                        title: "Название магазина",
                        render: (_, record) => (
                            <span>{record.seller ? record.seller : "-"}</span>
                        ),
                    },
                    {
                        title: "Сумма заказа",
                        render: (_, record) => <PriceCell price={record.sum} />,
                    },
                    {
                        title: "Название товара",
                        render: (_, record) => <span>{record.productSku}</span>,
                    },
                    {
                        title: "Причина возврата",
                        render: (_, record) => <span>{record?.reason}</span>,
                    },
                ];

            default:
                return [];
        }
    };

    const columns = getColumns();

    return (
        <CustomTable
            columns={columns}
            dataSource={data}
            rowKey={"applicationNumber"}
            loading={isPending}
            pagination={{
                pageSize: 10,
                showSizeChanger: false,
                position: isSmallScreen ? ["bottomCenter"] : undefined,
            }}
            scroll={{ x: "max-content" }}
        />
    );
};
