import { GetStoreResponse } from "@/modules/store/types";
import { Table, TableColumnsType } from "antd";
import { FC } from "react";
import { GetCellResponse } from "../../types";
import { DeleteCellCell } from "./DeleteCell";
import { PrintCellButton } from "./PrintCellButton";

interface CellsTableProps {
    cells: GetCellResponse[] | undefined;
    isPending?: boolean;
    store: GetStoreResponse | undefined;
    isStorePending?: boolean;
}

interface CellsTableColumn extends GetCellResponse {
    store: GetStoreResponse | undefined;
}

const columns: TableColumnsType<CellsTableColumn> = [
    {
        title: "Cell number",
        dataIndex: "cell",
    },
    {
        title: "Row",
        dataIndex: "row",
    },
    {
        title: "Column",
        dataIndex: "col",
    },
    {
        title: "Print",
        render: (_, record) => (
            <PrintCellButton store={record.store} cell={{ ...record }} />
        ),
    },
    {
        title: "Delete",
        render: (_, record) => <DeleteCellCell id={record.id} />,
    },
];

export const CellsTable: FC<CellsTableProps> = ({
    store,
    isPending,
    isStorePending,
    cells,
}) => {
    return (
        <Table
            columns={columns}
            dataSource={cells?.map((cell) => ({ ...cell, store }))}
            rowKey={"id"}
            loading={isPending || isStorePending}
        />
    );
};
