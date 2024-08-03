import {
    toScanProductsAssemble,
    toScanProductsPackage,
} from "@/modules/scan/utils";
import { Button, Table, TableColumnsType, Tag } from "antd";
import { FC } from "react";
import { Link } from "react-router-dom";
import { GetOrderDetailEmployee, Product } from "../../types";

interface EmployeeOrderDetailsTableProps {
    data: GetOrderDetailEmployee | undefined;
    loading: boolean;
    orderId: number;

    // finishPackage: () => void;
}

export const EmployeeOrderDetailsTable: FC<EmployeeOrderDetailsTableProps> = ({
    data,
    orderId,
    loading,

    // finishPackage,
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
        // {
        //     title: "Путь к штрих-коду коробки",
        //     dataIndex: "pathToBoxBarcode",
        //     key: "pathToBoxBarcode",
        //     render: (text: string) => (
        //         <Link target="_blank" className="flex justify-center" to={text}>
        //             <Button danger>Скачать</Button>
        //         </Link>
        //     ),
        // },
        {
            title: "Состояние продукта в складе",
            dataIndex: "productStateInStore",
            key: "productStateInStore",
            render: (text: string) => (
                <div className="flex items-center gap-4">
                    {data?.orderStatus === "PACKAGING_NOT_STARTED" ||
                    data?.orderStatus === "PACKAGING_IN_PROGRESS" ||
                    data?.orderStatus === "READY_TO_FINISH_PACKAGING" ? (
                        text === "READY_FOR_PACKAGE" ? (
                            <Button
                                type="primary"
                                size="small"
                                onClick={() => {
                                    toScanProductsPackage(orderId);
                                }}
                            >
                                Сканировать
                            </Button>
                        ) : text === "PACKED" ? (
                            <Button
                                className="!bg-green-500 !text-white !border-white"
                                onClick={() => {}}
                            >
                                Завершено
                            </Button>
                        ) : (
                            <Button
                                type="text"
                                onClick={() => {
                                    // toScanProductsPackage(orderId);
                                }}
                            >
                                Завершить
                            </Button>
                        )
                    ) : text === "WAITING_FOR_ASSEMBLY" ? (
                        <Tag>Не сканировано</Tag>
                    ) : (
                        <Tag>Сканировано</Tag>
                    )}
                </div>
            ),
        },
    ];
    return (
        <Table
            columns={columns}
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
                    {/* {data?.orderStatus === "READY_TO_FINISH_PACKAGING" && (
                        <Popconfirm
                            title="Упаковка продукта"
                            description="Вы уверены, что упаковали все продукты, и наклеили накладную?"
                            onConfirm={() => {
                                finishPackage();
                            }}
                            okText="Да"
                            cancelText="Нет"
                        >
                            <Button type="primary">Завершить упаковку</Button>
                        </Popconfirm>
                    )} */}
                </div>
            )}
        />
    );
};
