import { pencilIcon } from "@/assets";
import { CustomTable } from "@/components/ui/CustomTable";
import { DateCell } from "@/components/ui/DateCell";
import { Image } from "@/components/ui/Image";
import { cn } from "@/utils/shared.util";
import { DownloadOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, TableColumnsType } from "antd";
import { FC, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import { useGetEmployeeRefundReports } from "../queries";
import { GetReportsContent } from "../types";

const columns: TableColumnsType<GetReportsContent> = [
    {
        title: "Номер чека",
        render: (_, record) => <span>{record.id}</span>,
    },

    {
        title: "Название магазина",
        dataIndex: "",
        render: (_, record) => <span>{record.store_name}</span>,
    },

    {
        title: "Время заказа",
        render: (_, record) => <DateCell timestamp={record?.created_at} />,
    },

    {
        title: "Чек",
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
    {
        title: "Редактировать",
        render: (_, record) => (
            <Link
                to={`/employee/reports/update-refund-report/${record.id}`}
                className="cursor-pointer"
            >
                <Image
                    src={pencilIcon}
                    alt="pencilIcon"
                    className={cn("w-7 h-7")}
                />
            </Link>
        ),
    },
];

interface EmployeeRefundReportTableProps {
    searchValue: string;
    min_date?: string;
    max_date?: string;
}

export const EmployeeRefundReportTable: FC<EmployeeRefundReportTableProps> = ({
    searchValue,
    min_date,
    max_date,
}) => {
    const [page, setPage] = useState(0);
    const { data: reports, isPending } = useGetEmployeeRefundReports(
        page,
        10,
        searchValue,
        min_date,
        max_date
    );

    const isSmallScreen = useMediaQuery({ query: "(max-width: 768px)" });
    useEffect(() => {
        setPage(0);
    }, [searchValue]);
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
                dataSource={reports?.content}
                rowKey={"id"}
                loading={isPending}
                pagination={{
                    pageSize: 10,
                    total: reports?.totalElements,
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
