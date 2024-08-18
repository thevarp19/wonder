import { CustomTable } from "@/components/ui/CustomTable";
import { Loading } from "@/components/ui/Loading";
import { Button, ConfigProvider, Modal, Select, TableColumnsType } from "antd";
import {
    Dispatch,
    FC,
    SetStateAction,
    useEffect,
    useMemo,
    useState,
} from "react";
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
        refetch,
    } = useGetProducts(selectedCity ?? 0, isPublished);

    const isSmallScreen = useMediaQuery({ query: "(max-width: 768px)" });

    useEffect(() => {
        if (selectedCity !== null) {
            refetch();
        }
    }, [selectedCity, refetch]);

    if (isPending) {
        <Loading />;
    }
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
                title: "Price",
                dataIndex: "price",
                key: "price",
            },
        ];

        const warehouseColumns =
            selectedCity && products?.length
                ? products[0].warehouse_quantities.map((warehouse) => ({
                      title: warehouse.kaspi_warehouse_id,
                      dataIndex: `warehouse_${warehouse.kaspi_warehouse_id}`,
                      key: `warehouse_${warehouse.kaspi_warehouse_id}`,
                      render: (_: unknown, record: GetProductContent) => {
                          const quantity = record.warehouse_quantities.find(
                              (wq) =>
                                  wq.kaspi_warehouse_id ===
                                  warehouse.kaspi_warehouse_id
                          )?.quantity;
                          return quantity ?? "-";
                      },
                  }))
                : [];

        return [...baseColumns, ...warehouseColumns];
    }, [products, selectedCity]);

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
                    loading={isPending || cityPending}
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
