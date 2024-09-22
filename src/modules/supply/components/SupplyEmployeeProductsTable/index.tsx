import { CustomTable } from "@/components/ui/CustomTable";
import { TableColumnsType } from "antd";
import { FC } from "react";
import { GetSupplyProducts, SupplyEmployeeProduct } from "../../types";

const columns: TableColumnsType<SupplyEmployeeProduct> = [
    {
        title: "Название",
        dataIndex: "title",
    },
    {
        title: "Артикул поставщика",
        dataIndex: "vendor_code",
    },
    {
        title: "QR-код коробки",
        dataIndex: "supply_box",
    },
    {
        title: "Название типа коробки",
        dataIndex: "box_type_name",
    },
    {
        title: "Размер коробки",
        dataIndex: "box_type_size",
    },
    {
        title: "Статус",
        dataIndex: "status",
    },
];

interface SupplyEmployeeProductsTableProps {
    data: GetSupplyProducts[];
    isPending: boolean;
}

export const SupplyEmployeeProductsTable: FC<
    SupplyEmployeeProductsTableProps
> = ({ data, isPending }) => {
    return (
        <CustomTable
            columns={columns}
            dataSource={data}
            rowKey={"id"}
            loading={isPending}
            locale={{
                emptyText: "Нет данных",
            }}
        />
    );
};
