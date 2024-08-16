import { ConfigProvider, Table, TableProps } from "antd";
import { FC } from "react";

export const CustomTable: FC<TableProps> = ({ ...props }) => {
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
            <Table {...props} />
        </ConfigProvider>
    );
};
