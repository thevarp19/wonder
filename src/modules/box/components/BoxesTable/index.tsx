import { ConfigProvider, Table, TableColumnsType } from "antd";
import { FC } from "react";
import { useGetAllBoxes } from "../../queries";
import { GetBoxResponse } from "../../types";
import { DeleteBoxCell } from "./DeleteBoxCell";

interface BoxesTableProps {
    // id: number;
}
const columns: TableColumnsType<GetBoxResponse> = [
    {
        title: "ID коробки",
        dataIndex: "id",
    },
    {
        title: "Название",
        dataIndex: "name",
    },
    {
        title: "Размеры",
        dataIndex: "description",
    },
    {
        title: "Удалить",
        render: (_, record) => <DeleteBoxCell id={record.id} />,
    },
];

export const BoxesTable: FC<BoxesTableProps> = ({}) => {
    const { data: boxes, isPending } = useGetAllBoxes();

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
            />
        </ConfigProvider>
    );
};
