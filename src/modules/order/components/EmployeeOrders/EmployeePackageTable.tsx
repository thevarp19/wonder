import { CustomTable } from "@/components/ui/CustomTable";
import { DateCell } from "@/components/ui/DateCell";
import { DownloadOutlined } from "@ant-design/icons";
import { Button, TableColumnsType } from "antd";
import { FC } from "react";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import {
    GetPackageOrdersEmployee,
    GetPackageOrdersEmployeeContent,
} from "../../types";

const columns: TableColumnsType<GetPackageOrdersEmployeeContent> = [
    {
        title: "ID заказа",
        dataIndex: "order_code",
    },
    {
        title: "ID товара",
        dataIndex: "id",
    },
    {
        title: "Артикул",
        dataIndex: "product_vendor_code",
    },

    {
        title: "Название товара",
        dataIndex: "product_title",
    },

    {
        title: "Время заказа",
        dataIndex: "order_creation_date",
        render: (_, record) => (
            <DateCell timestamp={record?.order_creation_date} />
        ),
    },
    {
        title: "Накладная",
        dataIndex: "waybill",
        render: (_, record) =>
            record?.waybill ? (
                <Link target="_blank" to={record?.waybill}>
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
                "-"
            ),
    },
];

interface EmployeePackageTableProps {
    data: GetPackageOrdersEmployee | undefined;
    isPending: boolean;
    setPage: (page: number) => void;
    page: number;
}

export const EmployeePackageTable: FC<EmployeePackageTableProps> = ({
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
