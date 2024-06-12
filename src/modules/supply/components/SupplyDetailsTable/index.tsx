import { Table, TableColumnsType } from "antd";
import { FC } from "react";
import { useGetSupply } from "../../queries";
import { GetSupplyById } from "../../types";

const columns: TableColumnsType<GetSupplyById> = [
    {
        title: "Артикул",
        dataIndex: "article",
    },
    {
        title: "Название",
        dataIndex: "name",
    },
    {
        title: "Артикул поставщика",
        dataIndex: "vendorCode",
    },
    {
        title: "Штрих-код коробки",
        dataIndex: "boxBarCode",
    },
    {
        title: "Название типа коробки",
        dataIndex: "boxTypeName",
    },
    {
        title: "Название склада",
        dataIndex: "shopName",
    },
];

interface SupplyDetailsTableProps {
    supplyId: number;
}

export const SupplyDetailsTable: FC<SupplyDetailsTableProps> = ({
    supplyId,
}) => {
    const { isPending } = useGetSupply(supplyId);
    return (
        <Table
            columns={columns}
            dataSource={[]}
            rowKey={"id"}
            loading={!isPending}
            locale={{
                emptyText: "Нет данных",
            }}
        />
    );
};
