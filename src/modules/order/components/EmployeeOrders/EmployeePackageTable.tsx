import { scan } from "@/assets";
import { CustomTable } from "@/components/ui/CustomTable";
import { DateCell } from "@/components/ui/DateCell";
import { Image } from "@/components/ui/Image";
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
        title: "Номер заказа",
        render: (_, record) => (
            <Link to={`/employee/orders/${record.order_entry}`}>
                {record.order_code}
            </Link>
        ),
    },
    {
        title: "ID товара",
        dataIndex: "id",
        render: (_, record) => (
            <Link to={`/employee/orders/package/product`}>{record.id}</Link>
        ),
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
    {
        title: "",
        render: (_) => (
            <Button
                type="primary"
                size="small"
                className="max-w-[40px] min-h-[30px]"
            >
                <Image src={scan} alt="scan" className={"min-w-5 h-5"} />
            </Button>
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
