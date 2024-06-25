import { ConfigProvider, Table, TableColumnsType } from "antd";
import { FC } from "react";
import { DeleteBoxCell } from "./DeleteBoxCell";

interface BoxesTableProps {
    // id: number;
}
const columns: TableColumnsType<any> = [
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
    // const { data: boxes, isPending } = useGetAllBoxes();
    const mockData = [
        {
            id: 1,
            name: "Box 1",
            description: "10x10x10",
        },
        {
            id: 2,
            name: "Box 2",
            description: "20x20x20",
        },
        {
            id: 3,
            name: "Box 3",
            description: "30x30x30",
        },
    ];

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
                dataSource={mockData}
                rowKey={"id"}
                loading={false}
                locale={{
                    emptyText: "Нет данных",
                }}
            />
        </ConfigProvider>
    );
};
