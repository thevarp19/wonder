import { ConfigProvider, Table, TableColumnsType } from "antd";
import { FC } from "react";
import { useMediaQuery } from "react-responsive";
import { useGetAllBoxes } from "../../queries";
import { GetBoxResponse } from "../../types";
import { DeleteBoxCell } from "./DeleteBoxCell";

interface BoxesTableProps {
    // id: number;
    searchValue: string;
}
const columns: TableColumnsType<GetBoxResponse> = [
    {
        title: "ID коробки",
        dataIndex: "id",
    },
    {
        title: "Название",
        dataIndex: "title",
    },
    {
        title: "Размеры",
        render: (_, record) =>
            `${record.length}x${record.width}x${record.height}`,
    },
    {
        title: "Удалить",
        render: (_, record) => <DeleteBoxCell id={record.id} />,
    },
];

export const BoxesTable: FC<BoxesTableProps> = ({ searchValue }) => {
    const { data: boxes, isPending } = useGetAllBoxes(searchValue);
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
                        // colorBgContainer: "#F7F9FB",
                        // borderColor: "#F7F9FB",
                    },
                },
            }}
        >
            <Table
                columns={columns}
                dataSource={boxes}
                rowKey={"id"}
                loading={isPending}
                locale={{
                    emptyText: "Нет данных",
                }}
                pagination={{
                    position: isSmallScreen ? ["bottomCenter"] : undefined,
                }}
                scroll={{ x: "max-content" }}
            />
        </ConfigProvider>
    );
};
