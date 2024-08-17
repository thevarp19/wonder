import { CustomTable } from "@/components/ui/CustomTable";
import { myLocalStorage } from "@/lib/storage/browserStorage";
import { Button, ConfigProvider, Modal, TableColumnsType } from "antd";
import { FC, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useGetActiveCities, useGetProducts } from "../../queries";
import { GetProductContent } from "../../types";
import { StoreCheckboxes } from "../ProductPriceTable";

interface ProductsTableProps {
    searchValue?: string;
    isPublished: boolean | null;
}

const columns: TableColumnsType<GetProductContent> = [
    {
        title: "Артикул",
        dataIndex: "vendor_code",
    },
    {
        title: "Название",
        dataIndex: "title",
    },

    {
        title: "Количество в Алматы",
        render: (_, record) => (
            <span>{record?.warehouse_quantities[0]?.quantity}</span>
        ),
    },

    // {
    //     title: "Количество в Астане",
    //     render: (_, record) => <span>{record.counts[1].count}</span>,
    // },
];

export const ProductsTable: FC<ProductsTableProps> = ({ isPublished }) => {
    // const [page, setPage] = useState(0);
    const [activeStores, setActiveStores] = useState<string[]>(
        myLocalStorage?.get("activeStores") || ["алматы"]
    );
    const [isModalOpen, setIsModalOpen] = useState(false);

    // const { data: productsCount } = useGetProductsPrices(
    //     page,
    //     undefined,
    //     searchValue,
    //     isPublished
    // );
    // useEffect(() => {
    //     setPage(1);
    // }, [searchValue]);
    const { data: cities, isPending: cityPending } = useGetActiveCities();
    // const activeStoreIds =
    //     cities
    //         ?.filter((city) => activeStores.includes(city.name.toLowerCase()))
    //         .map((city) => city.id) || [];

    const { data: products, isPending } = useGetProducts(
        // page,
        // undefined,
        // searchValue,
        isPublished
    );
    useEffect(() => {
        myLocalStorage?.set("activeStores", activeStores);
    }, [activeStores]);
    const isSmallScreen = useMediaQuery({ query: "(max-width: 768px)" });

    return (
        <div className="overflow-x-auto w-full md:mb-0 mb-[70px]">
            <Modal
                title="Склады"
                open={isModalOpen}
                cancelText="Назад"
                onCancel={() => {
                    setIsModalOpen(false);
                }}
                onOk={() => {
                    setIsModalOpen(false);
                }}
            >
                <StoreCheckboxes
                    checked={activeStores}
                    setChecked={setActiveStores}
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
                    // size="small"
                    dataSource={products ?? []}
                    rowKey={(record) => record.vendor_code}
                    pagination={{
                        // pageSize: 10,
                        // total: products?.totalElements,
                        // showSizeChanger: false,
                        // onChange(page) {
                        //     setPage(page - 1);
                        // },
                        // current: page + 1,
                        position: isSmallScreen ? ["bottomCenter"] : undefined,
                    }}
                    scroll={{ x: "max-content" }}
                />
            </ConfigProvider>
        </div>
    );
};
