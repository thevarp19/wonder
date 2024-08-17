import { CustomTable } from "@/components/ui/CustomTable";
import { GetDetailStoreResponse } from "@/modules/store/types";
import { TableColumnsType } from "antd";
import { FC } from "react";
import { useMediaQuery } from "react-responsive";
import { GetCellResponse } from "../../types";
import { UpdateCellButton } from "../UpdateCellForm/UpdateCellButton";
import { DeleteCellCell } from "./DeleteCell";
import { PrintCellButton } from "./PrintCellButton";

interface CellsTableProps {
    cells: GetCellResponse[] | undefined;
    isPending?: boolean;
    isStorePending?: boolean;
    store: GetDetailStoreResponse | undefined;
    storeId: number | undefined;
}

interface CellsTableColumn extends GetCellResponse {
    count?: number;
    store: GetDetailStoreResponse;
    storeId?: number | undefined;
}

const columns: TableColumnsType<CellsTableColumn> = [
    {
        title: "Строка",
        dataIndex: "row",
        key: "row",
    },
    {
        title: "Столбец",
        dataIndex: "col",
        key: "col",
    },
    {
        title: "Номер ячейки",
        dataIndex: "line",
        key: "line",
    },
    {
        title: "Печать",
        key: "print",
        render: (_, record) => (
            <PrintCellButton store={record.store} cell={{ ...record }} />
        ),
    },
    {
        title: "Комментарий",
        dataIndex: "comment",
        key: "comment",
        render: (_, record) => record.comment || "-",
    },
    {
        title: "Размер",
        key: "size",
        render: (_, record) =>
            record.width && record.height && record.length ? (
                <div>
                    {record.width}x{record.height}x{record.length}
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
        title: "Редактировать",
        key: "edit",
        render: (_, record) => (
            <UpdateCellButton
                storeId={record.storeId || -1}
                initialValues={{ ...record }}
            />
        ),
    },
    {
        title: "Удалить",
        key: "delete",
        render: (_, record) => (
            <DeleteCellCell id={record.id} storeId={record.storeId || -1} />
        ),
    },
];

export const CellsTable: FC<CellsTableProps> = ({
    isPending,
    isStorePending,
    storeId,
    store,
    cells,
}) => {
    const groupedCells = groupCellsBySize(cells || []);
    const isSmallScreen = useMediaQuery({ query: "(max-width: 768px)" });

    return (
        <CustomTable
            columns={columns}
            dataSource={cells?.map((cell) => ({
                ...cell,
                store: store!,
                storeId: storeId,
                count:
                    groupedCells[`${cell.width}x${cell.height}x${cell.length}`]
                        ?.length || 0,
            }))}
            pagination={{
                position: isSmallScreen ? ["bottomCenter"] : undefined,
            }}
            scroll={{ x: "max-content" }}
            rowKey={"id"}
            loading={isPending || isStorePending}
        />
    );
};

function groupCellsBySize(cells: GetCellResponse[]) {
    const groupedCells: Record<string, GetCellResponse[]> = {};
    cells.forEach((cell) => {
        const key = `${cell.width}x${cell.height}x${cell.length}`;
        if (groupedCells[key]) {
            groupedCells[key].push(cell);
        } else {
            groupedCells[key] = [cell];
        }
    });
    return groupedCells;
}
