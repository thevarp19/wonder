import { CustomTable } from "@/components/ui/CustomTable";
import { DateCell } from "@/components/ui/DateCell";
import { PriceCell } from "@/components/ui/PriceCell";
import { TableColumnsType } from "antd";
import { FC } from "react";
import { useMediaQuery } from "react-responsive";
import {
    GetSellerBalanceStatementContent,
    GetSellerBalanceStatementResponse,
} from "../types";

const columns: TableColumnsType<GetSellerBalanceStatementContent> = [
    {
        title: "ID",
        dataIndex: "id",
        key: "id",
    },
    {
        title: "Сумма",
        dataIndex: "amount",
        key: "amount",
        render: (amount: number) => <PriceCell price={amount} />,
    },
    {
        title: "Комментарий",
        dataIndex: "comment",
        key: "comment",
    },
    {
        title: "Дата создания",
        dataIndex: "created_at",
        key: "created_at",
        render: (createdAt: string) => <DateCell timestamp={createdAt} />,
    },
    {
        title: "Продавец",
        dataIndex: "seller",
        key: "seller",
    },
];

interface BalanceHistoryStatementTableProps {
    data: GetSellerBalanceStatementResponse | undefined;
    isPending: boolean;
    setPage: (page: number) => void;
    page: number;
}

export const BalanceHistoryStatementTable: FC<
    BalanceHistoryStatementTableProps
> = ({ data, isPending, setPage, page }) => {
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
