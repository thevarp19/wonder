import { CustomTable } from "@/components/ui/CustomTable";
import { DateCell } from "@/components/ui/DateCell";
import { TableColumnsType } from "antd";
import { FC } from "react";
import { useMediaQuery } from "react-responsive";
import {
    GetAssembleOrdersEmployee,
    GetAssembleOrdersEmployeeContent,
} from "../../types";

const columns: TableColumnsType<GetAssembleOrdersEmployeeContent> = [
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
        title: "Номер ячейки",
        dataIndex: "deliveryMode",
        render: (_, record) => <div>{record.cell_number}</div>,
    },

    {
        title: "Время заказа",
        dataIndex: "order_creation_date",
        render: (_, record) => (
            <DateCell timestamp={record?.order_creation_date} />
        ),
    },
];

interface EmployeeAssembleTableProps {
    data: GetAssembleOrdersEmployee | undefined;
    isPending: boolean;
    setPage: (page: number) => void;
    page: number;
}

export const EmployeeAssembleTable: FC<EmployeeAssembleTableProps> = ({
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
