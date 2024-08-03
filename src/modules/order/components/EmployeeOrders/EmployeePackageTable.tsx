import { DateCell } from "@/components/ui/DateCell";
import { DownloadOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Table, TableColumnsType } from "antd";
import { FC, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import { useGetPackageOrderEmployee } from "../../queries";
import { DeliveryMode, GetPackageOrdersContent } from "../../types";

const columns: TableColumnsType<GetPackageOrdersContent> = [
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
        title: "Накладная",
        dataIndex: "waybill",
        render: (_, record) =>
            record?.waybill ? (
                <Link to={record?.waybill}>
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

    {
        title: "Время заказа",
        dataIndex: "order_creation_date",
        render: (_, record) => (
            <DateCell timestamp={record?.order_creation_date} />
        ),
    },
];

interface EmployeePackageTableProps {
    searchValue: string;
    deliveryMode: DeliveryMode;
}

export const EmployeePackageTable: FC<EmployeePackageTableProps> = ({
    searchValue,
    deliveryMode,
}) => {
    const [page, setPage] = useState(1);
    const { data: orders, isPending } = useGetPackageOrderEmployee(
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
