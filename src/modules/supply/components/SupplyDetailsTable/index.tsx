import { DropboxOutlined, ProductOutlined } from "@ant-design/icons";
import { Button, Table, TableColumnsType } from "antd";
import { FC } from "react";
import { Link } from "react-router-dom";
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
    {
        title: "Баркоды коробки",
        render: (_, record) => {
            return (
                <Link target="_blank" to={record.pathToBoxBarcode}>
                    <Button
                        danger
                        icon={
                            <DropboxOutlined
                                color="#ef7214"
                                style={{ color: "#ef7214" }}
                            />
                        }
                    ></Button>
                </Link>
            );
        },
    },
    {
        title: "Баркоды продуктов",
        render: (_, record) => {
            return (
                <Link target="_blank" to={record.pathToProductBarcode}>
                    <Button
                        danger
                        icon={
                            <ProductOutlined
                                color="#ef7214"
                                style={{ color: "#ef7214" }}
                            />
                        }
                    ></Button>
                </Link>
            );
        },
    },
];

interface SupplyDetailsTableProps {
    supplyId: number;
}

export const SupplyDetailsTable: FC<SupplyDetailsTableProps> = ({
    supplyId,
}) => {
    const { data, isPending } = useGetSupply(supplyId);
    return (
        <Table
            columns={columns}
            dataSource={data}
            rowKey={"article"}
            loading={isPending}
            locale={{
                emptyText: "Нет данных",
            }}
        />
    );
};
