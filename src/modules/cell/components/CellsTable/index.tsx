import { ConfigProvider, Table, TableColumnsType } from "antd";
import { FC } from "react";
import { useMediaQuery } from "react-responsive";
import { GetCellResponse } from "../../types";
import { UpdateCellButton } from "../UpdateCellForm/UpdateCellButton";
import { DeleteCellCell } from "./DeleteCell";

interface CellsTableProps {
    cells: GetCellResponse[] | undefined;
    isPending?: boolean;
    isStorePending?: boolean;
    storeId: number | undefined;
}

interface CellsTableColumn extends GetCellResponse {
    count: number;
    storeId: number | undefined;
}

const columns: TableColumnsType<CellsTableColumn> = [
    {
        title: "Строка",
        dataIndex: "row",
    },
    {
        title: "Столбец",
        dataIndex: "col",
    },
    {
        title: "Номер ячейки",
        dataIndex: "line",
    },
    {
        title: "Печать",
        render: (_) => <div>Печать</div>,
    },
    {
        title: "Комментарий",
        dataIndex: "comment",
        render: (_, record) => record.comment || "-",
    },
    {
        title: "Размер",
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
        render: (_, record) => (
            <UpdateCellButton
                storeId={record.storeId || -1}
                initialValues={{ ...record }}
            />
        ),
    },
    {
        title: "Удалить",
        render: (_, record) => (
            <DeleteCellCell id={record.id} storeId={record.storeId || -1} />
        ),
    },
];

export const CellsTable: FC<CellsTableProps> = ({
    isPending,
    isStorePending,
    storeId,
    cells,
}) => {
    const groupedCells = groupCellsBySize(cells || []);
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
                dataSource={cells?.map((cell) => ({
                    ...cell,
                    storeId: storeId,
                    count:
                        groupedCells[
                            `${cell.width}x${cell.height}x${cell.length}`
                        ]?.length || 0,
                }))}
                pagination={{
                    position: isSmallScreen ? ["bottomCenter"] : undefined,
                }}
                scroll={{ x: "max-content" }}
                rowKey={"id"}
                loading={isPending || isStorePending}
            />
        </ConfigProvider>
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
