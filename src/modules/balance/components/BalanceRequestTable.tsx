import { DownloadOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Select, Table, TableColumnsType } from "antd";
import { FC } from "react";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import { statusReplenishMutation } from "../mutations";
import {
    GetAdminReplenishmentContent,
    GetAdminReplenishmentResponse,
} from "../types";
const { Option } = Select;
const columns: TableColumnsType<GetAdminReplenishmentContent> = [
    // {
    //     title: "ID",
    //     dataIndex: "id",
    // },
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
        title: "Электронная почта",
        dataIndex: "seller.email",
        render: (_, record) => <span>{record.seller.email}</span>,
    },
    {
        title: "Номер телефона",
        dataIndex: "seller.phone_number",
        render: (_, record) => <span>{record.seller.phone_number}</span>,
    },

    {
        title: "IBAN",
        dataIndex: "iban",
    },

    {
        title: "Статус",
        render: (_, record) => <ReplenishmentStatusChange record={record} />,
    },
    {
        title: "Чек",
        dataIndex: "check_url",
        render: (_, record) => {
            return (
                <Link target="_blank" to={record.check_url}>
                    <Button
                        danger
                        loading={false}
                        icon={
                            <DownloadOutlined
                                color="#ef7214"
                                style={{ color: "#ef7214" }}
                            />
                        }
                    ></Button>
                </Link>
            );
        },
    },
];

interface BalanceRequestTableProps {
    data: GetAdminReplenishmentResponse | undefined;
    isPending: boolean;
    setPage: (page: number) => void;
    page: number;
}

export const BalanceRequestTable: FC<BalanceRequestTableProps> = ({
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

interface ReplenishmentStatusChangeProps {
    record: GetAdminReplenishmentContent;
}
// type ReplenishmentStatus = "PROCESSING" | "PAID";
export const ReplenishmentStatusChange: FC<ReplenishmentStatusChangeProps> = ({
    record,
}) => {
    const { isPending, mutateAsync } = statusReplenishMutation(record.id);
    const handleChange = async (value: string) => {
        await mutateAsync(value);
    };

    return (
        <div className="flex items-center gap-2">
            <Select
                // className="w-[200px]"
                placeholder="Статус"
                onChange={handleChange}
                value={record.status === "PROCESSING" ? "PROCESSING" : "PAID"}
                disabled={isPending}
            >
                <Option value="PROCESSING">Ожидание</Option>
                <Option value="PAID">Оплачено</Option>
            </Select>
        </div>
    );
};
