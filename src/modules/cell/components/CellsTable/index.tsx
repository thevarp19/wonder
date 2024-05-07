import { GetStoreResponse } from "@/modules/store/types";
import { Table, TableColumnsType } from "antd";
import { FC } from "react";
import { GetCellResponse } from "../../types";
import { UpdateCellButton } from "../UpdateCellForm/UpdateCellButton";
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
    count: number;
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
        title: "Comment",
        dataIndex: "comment",
        render: (_, record) => record.comment || "-",
    },
    {
        title: "Size",
        render: (_, record) =>
            record.width && record.height && record.depth ? (
                <div>
                    {record.width}x{record.height}x{record.depth}
                    <br />
                    {record.count} ячеек
                </div>
            ) : record.width && record.height ? (
                <div>
                    {record.width}x{record.height}
                </div>
            ) : (
                "-"
            ),
    },
    {
        title: "Edit",
        render: (_, record) => (
            <UpdateCellButton
                storeId={record.store?.id}
                initialValues={{ ...record }}
            />
        ),
    },
    {
        title: "Delete",
        render: (_, record) => (
            <DeleteCellCell id={record.id} storeId={record.store?.id || -1} />
        ),
    },
];

export const CellsTable: FC<CellsTableProps> = ({
    store,
    isPending,
    isStorePending,
    cells,
}) => {
    const groupedCells = groupCellsBySize(cells || []);
    return (
        <Table
            columns={columns}
            dataSource={cells?.map((cell) => ({
                ...cell,
                store,
                count:
                    groupedCells[`${cell.width}x${cell.height}x${cell.depth}`]
                        ?.length || 0,
            }))}
            rowKey={"id"}
            loading={isPending || isStorePending}
        />
    );
};

function groupCellsBySize(cells: GetCellResponse[]) {
    const groupedCells: Record<string, GetCellResponse[]> = {};
    cells.forEach((cell) => {
        const key = `${cell.width}x${cell.height}x${cell.depth}`;
        if (groupedCells[key]) {
            groupedCells[key].push(cell);
        } else {
            groupedCells[key] = [cell];
        }
    });
    return groupedCells;
}
