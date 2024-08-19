import { CustomTable } from "@/components/ui/CustomTable";
import { Loading } from "@/components/ui/Loading";
import { Button, ConfigProvider, Modal, Select, TableColumnsType } from "antd";
import { Dispatch, FC, SetStateAction, useMemo, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useGetActiveCities, useGetProducts } from "../../queries";
import { GetProductContent, ProductStoreCity } from "../../types";

interface ProductsTableProps {
    searchValue?: string;
    isPublished: boolean | null;
}

export const ProductsTable: FC<ProductsTableProps> = ({ isPublished }) => {
    const [selectedCity, setSelectedCity] = useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data: cities, isPending: cityPending } = useGetActiveCities();

    const {
        data: products,
        isPending,
        isLoading,
    } = useGetProducts(selectedCity ?? 0, isPublished);
    // const products = [
    //     {
    //         id: 393223,
    //         warehouse_quantities: [
    //             { quantity: 10, kaspi_warehouse_id: "PP2" },
    //             { quantity: 14, kaspi_warehouse_id: "PP3" },
    //             { quantity: 9, kaspi_warehouse_id: "PP5" },
    //         ],
    //         vendor_code: "121216142_668012306",
    //         title: "Super Crest SCT-8050 черный",
    //         price: "18490",
    //     },
    //     {
    //         id: 393233,
    //         warehouse_quantities: [
    //             { quantity: 11, kaspi_warehouse_id: "PP1" },
    //             { quantity: 4, kaspi_warehouse_id: "PP2" },
    //             { quantity: 5, kaspi_warehouse_id: "PP9" },
    //         ],
    //         vendor_code: "121216142_668012306",
    //         title: "Super Crest SCT-8050 черный",
    //         price: "18490",
    //     },
    // ];
    const isSmallScreen = useMediaQuery({ query: "(max-width: 768px)" });

    const columns: TableColumnsType<GetProductContent> = useMemo(() => {
        const baseColumns: TableColumnsType<GetProductContent> = [
            {
                title: "Артикул",
                dataIndex: "vendor_code",
                key: "vendor_code",
            },
            {
                title: "Название",
                dataIndex: "title",
                key: "title",
            },
            {
                title: "Цена",
                dataIndex: "price",
                key: "price",
            },
        ];

        const warehouseIds = new Set<string>();
        products?.forEach((product) => {
            product.warehouse_quantities.forEach((warehouse) => {
                warehouseIds.add(warehouse.kaspi_warehouse_id);
            });
        });

        const warehouseColumns = Array.from(warehouseIds).map(
            (warehouseId) => ({
                title: warehouseId,
                dataIndex: `warehouse_${warehouseId}`,
                key: `warehouse_${warehouseId}`,
                render: (_: unknown, record: GetProductContent) => {
                    const quantity = record.warehouse_quantities.find(
                        (wq) => wq.kaspi_warehouse_id === warehouseId
                    )?.quantity;
                    return quantity ?? "-";
                },
            })
        );

        return [...baseColumns, ...warehouseColumns];
    }, [products, selectedCity]);

    if (isPending) {
        return <Loading />;
    }
    return (
        <div className="overflow-x-auto w-full md:mb-0 mb-[70px]">
            <Modal
                title="Склады"
                open={isModalOpen}
                cancelText="Назад"
                onCancel={() => setIsModalOpen(false)}
                onOk={() => setIsModalOpen(false)}
            >
                <StoreSelect
                    selectedCity={selectedCity}
                    setSelectedCity={setSelectedCity}
                    cities={cities || []}
                />
            </Modal>
            <div className="flex items-center justify-between px-2 mb-4 md:px-4">
                <div className="flex items-center w-full gap-4"></div>
                <Button
                    onClick={() => {
                        setIsModalOpen(true);
                    }}
                    type="primary"
                >
                    Склады
                </Button>
            </div>
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
                <CustomTable
                    columns={columns}
                    loading={cityPending}
                    dataSource={products ?? []}
                    rowKey={(record) => record.vendor_code}
                    pagination={{
                        position: isSmallScreen ? ["bottomCenter"] : undefined,
                    }}
                    scroll={{ x: "max-content" }}
                />
            </ConfigProvider>
        </div>
    );
};

interface StoreSelectProps {
    selectedCity: number | null;
    setSelectedCity: Dispatch<SetStateAction<number | null>>;
    cities: ProductStoreCity[];
}

export const StoreSelect: FC<StoreSelectProps> = ({
    selectedCity,
    setSelectedCity,
    cities,
}) => {
    return (
        <Select
            value={selectedCity}
            onChange={(value) => setSelectedCity(value)}
            style={{ width: "100%" }}
        >
            {cities.map((city) => (
                <Select.Option key={city.id} value={city.id}>
                    {city.name}
                </Select.Option>
            ))}
        </Select>
    );
};
