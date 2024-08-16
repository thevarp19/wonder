import { CustomTable } from "@/components/ui/CustomTable";
import { DateCell } from "@/components/ui/DateCell";
import { DownloadOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, TableColumnsType, Tag, Tooltip } from "antd";
import { FC } from "react";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import {
    GetSellerReplenishmentContent,
    GetSellerReplenishmentResponse,
} from "../types";

const columns: TableColumnsType<GetSellerReplenishmentContent> = [
    // {
    //     title: "ID",
    //     dataIndex: "id",
    // },
    {
        title: "Статус",
        dataIndex: "status",
        render: (_, record) => (
            <Tag color={record.status === "PROCESSING" ? "blue" : "green"}>
                {record.status === "PROCESSING" ? "Ожидание" : "Оплачено"}
            </Tag>
        ),
    },
    {
        title: "Дата создания",
        dataIndex: "created_at",
        render: (_, record) => <DateCell timestamp={record.created_at} />,
    },
    {
        title: "Дата завершения",
        dataIndex: "completed_at",
        render: (_, record) => <DateCell timestamp={record.completed_at} />,
    },
    {
        title: "IBAN",
        dataIndex: "iban",
    },
    {
        title: "Сумма",
        dataIndex: "amount",
    },
    {
        title: "Чек",
        dataIndex: "check_url",
        render: (_, record) => {
            return record.check_url ? (
                <Link target="_blank" to={record.check_url}>
                    <Button
                        danger
                        icon={
                            <DownloadOutlined
                                color="#ef7214"
                                style={{ color: "#ef7214" }}
                            />
                        }
                    ></Button>
                </Link>
            ) : (
                <Tooltip title="Чек отсутствует">
                    <Button
                        danger
                        icon={
                            <DownloadOutlined
                                color="#000000"
                                style={{ color: "#000000" }}
                            />
                        }
                        disabled
                    ></Button>
                </Tooltip>
            );
        },
    },
];

interface BalanceHistoryTableProps {
    data: GetSellerReplenishmentResponse | undefined;
    isPending: boolean;
    setPage: (page: number) => void;
    page: number;
}

export const BalanceHistoryTable: FC<BalanceHistoryTableProps> = ({
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
                title={() => "История пополнений"}
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
