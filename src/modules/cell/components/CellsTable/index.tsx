import { Table, TableColumnsType } from "antd";
import { FC } from "react";
import { useGetCells } from "../../queries";
import { GetCellResponse } from "../../types";
import { DeleteCellCell } from "./DeleteCell";
import { PrintCellButton } from "./PrintCellButton";

interface CellsTableProps {
    storeId: number;
}

const columns: TableColumnsType<GetCellResponse> = [
    {
        title: "Cell number",
        dataIndex: "number",
    },
    {
        title: "Row",
        dataIndex: "row",
    },
    {
        title: "Column",
        dataIndex: "column",
    },
    {
        title: "Print",
        render: () => <PrintCellButton />,
    },
    {
        title: "Delete",
        render: (_, record) => <DeleteCellCell id={record.id} />,
    },
];

export const CellsTable: FC<CellsTableProps> = ({ storeId }) => {
    const { data: cells, isPending } = useGetCells(storeId);
    return (
        <Table
            columns={columns}
            dataSource={cells}
            rowKey={"id"}
            loading={isPending}
        />
    );
};
