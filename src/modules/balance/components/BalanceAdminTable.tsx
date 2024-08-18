import { CustomTable } from "@/components/ui/CustomTable";
import { PriceCell } from "@/components/ui/PriceCell";
import { TableColumnsType } from "antd";
import { FC } from "react";
import { useMediaQuery } from "react-responsive";
import {
    GetAdminReplenishmentContent,
    GetAdminReplenishmentResponse,
} from "../types";

const columns: TableColumnsType<GetAdminReplenishmentContent> = [
    {
        title: "Название магазина Kaspi",
        dataIndex: "seller.kaspi_store_name",
        render: (_, record) => <span>{record.seller.kaspi_store_name}</span>,
    },
    {
        title: "Продавец",
        dataIndex: "seller",
        render: (_, record) =>
            `${record.seller.first_name} ${record.seller.last_name}`,
    },
    {
        title: "Номер телефона",
        dataIndex: "iban",
    },
    {
        title: "Баланс",
        dataIndex: "balance",

        render: (_, record) => (
            <PriceCell price={Number(record.seller.balance)} />
        ),
    },
];

interface BalanceAdminTableProps {
    data: GetAdminReplenishmentResponse | undefined;
    isPending: boolean;
    setPage: (page: number) => void;
    page: number;
}

export const BalanceAdminTable: FC<BalanceAdminTableProps> = ({
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
