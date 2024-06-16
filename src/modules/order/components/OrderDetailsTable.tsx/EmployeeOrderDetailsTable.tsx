import { toScanProductsAssemble } from "@/modules/scan/utils";
import { Button, Popconfirm, Table, TableColumnsType } from "antd";
import { FC } from "react";
import { Link } from "react-router-dom";
import { GetOrderDetailEmployee, Product } from "../../types";

interface EmployeeOrderDetailsTableProps {
    data: GetOrderDetailEmployee | undefined;
    loading: boolean;
    orderId: number;
    selectedRowKeys: React.Key[];
    hasSelected: boolean;
    rowSelection: any;
    finishPackage: () => void;
}

export const EmployeeOrderDetailsTable: FC<EmployeeOrderDetailsTableProps> = ({
    data,
    orderId,
    loading,
    selectedRowKeys,
    hasSelected,
    rowSelection,
    finishPackage,
}) => {
    const columns: TableColumnsType<Product> = [
        {
            title: "Артикул продукта",
            dataIndex: "productArticle",
            key: "productArticle",
        },
        {
            title: "Название продукта",
            dataIndex: "productName",
            key: "productName",
        },
        {
            title: "Артикул поставщика",
            dataIndex: "productVendorCode",
            key: "productVendorCode",
        },
        {
            title: "Ячейка продукта",
            dataIndex: "productCell",
            key: "productCell",
        },
        {
            title: "Путь к штрих-коду продукта",
            dataIndex: "pathToProductBarcode",
            key: "pathToProductBarcode",
            render: (text: string) => (
                <Link target="_blank" className="flex justify-center" to={text}>
                    <Button danger>Скачать</Button>
                </Link>
            ),
        },
        {
            title: "Путь к штрих-коду коробки",
            dataIndex: "pathToBoxBarcode",
            key: "pathToBoxBarcode",
            render: (text: string) => (
                <Link target="_blank" className="flex justify-center" to={text}>
                    <Button danger>Скачать</Button>
                </Link>
            ),
        },
        {
            title: "Состояние продукта в магазине",
            dataIndex: "productStateInStore",
            key: "productStateInStore",
            render: (text: string) => (
                <div className="flex items-center gap-4">
                    {text === "WAITING_FOR_ASSEMBLY"
                        ? "Не сканировано"
                        : "Сканировано"}
                </div>
            ),
        },
    ];
    return (
        <div>
            <div style={{ marginBottom: 16 }}>
                <span style={{ marginRight: 8 }}>
                    {hasSelected
                        ? `Выбрано ${selectedRowKeys.length} продукт`
                        : ""}
                </span>
            </div>
            <Table
                columns={columns}
                rowSelection={
                    data?.orderStatus === "PACKAGING_IN_PROGRESS" &&
                    rowSelection
                }
                dataSource={data?.products}
                rowKey={"productArticle"}
                loading={loading}
                footer={() => (
                    <div className="flex justify-end gap-3">
                        {data?.orderStatus === "ASSEMBLY_IN_PROGRESS" && (
                            <Button
                                type="primary"
                                onClick={() => {
                                    toScanProductsAssemble(orderId);
                                }}
                            >
                                Сканировать продукты
                            </Button>
                        )}
                        {data?.orderStatus === "PACKAGING_IN_PROGRESS" && (
                            <Link
                                target="_blank"
                                className="flex justify-center"
                                to={data?.waybill}
                            >
                                <Button type="primary">
                                    Скачать накладную
                                </Button>
                            </Link>
                        )}
                        {data?.orderStatus === "READY_TO_FINISH_PACKAGING" && (
                            <Popconfirm
                                title="Упаковка продукта"
                                description="Вы уверены, что упаковали все продукты, и наклеили накладную?"
                                onConfirm={() => {
                                    finishPackage();
                                }}
                                okText="Да"
                                cancelText="Нет"
                            >
                                <Button type="primary">
                                    Завершить упаковку
                                </Button>
                            </Popconfirm>
                        )}
                    </div>
                )}
            />
        </div>
    );
};
