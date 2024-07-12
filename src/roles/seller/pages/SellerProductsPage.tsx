import { ProductPriceTable } from "@/modules/product/components/ProductPriceTable";
import { ProductsTable } from "@/modules/product/components/ProductsTable";
import { ProductsUploadFromFile } from "@/modules/product/components/ProductsUploadFromFile";
import { useDebounce } from "@/utils/shared.util";
import { SearchOutlined } from "@ant-design/icons";
import { ConfigProvider, Input, Menu, MenuProps } from "antd";
import { FC, useCallback, useState } from "react";
import { useSearchParams } from "react-router-dom";

interface SellerProductsPageProps {}

const items: MenuProps["items"] = [
    {
        label: "Цены",
        key: "prices",
    },
    {
        label: "Товары",
        key: "products",
    },
    {
        label: "Импорт продукта",
        key: "upload",
    },
];

export const SellerProductsPage: FC<SellerProductsPageProps> = ({}) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const [current, setCurrent] = useState(
        searchParams.get("current") || "prices"
    );
    const onClick: MenuProps["onClick"] = useCallback((e: any) => {
        setCurrent(e.key);
        setSearchParams({ current: e.key });
    }, []);
    const [searchValue, setSearchValue] = useState("");
    const debouncedSearchValue = useDebounce(searchValue, 500);
    return (
        <div className="h-full bg-white rounded-t-lg">
            {/* <Button
                size="large"
                className="!rounded-md !w-full md:!hidden !block mb-8"
                type="primary"
                href="/seller/products/upload"
            >
                Импорт продукта
            </Button> */}
            <div className="flex flex-col gap-5">
                <div className="overflow-x-auto bg-[#F7F9FB] md:p-2 p-0 pt-2 rounded-lg">
                    <div className="min-w-[600px] flex justify-between">
                        <ConfigProvider
                            theme={{
                                components: {
                                    Menu: {
                                        itemBg: "#F7F9FB",
                                        colorSplit: "#F7F9FB",
                                    },
                                },
                            }}
                        >
                            <div className="flex items-center gap-6">
                                <Menu
                                    items={items}
                                    mode="horizontal"
                                    className="flex items-center"
                                    onClick={onClick}
                                    selectedKeys={[current]}
                                    style={{ fontWeight: 600 }}
                                />
                                {/* <Button
                                    className="!rounded-md md:!min-w-[200px] !hidden md:!block"
                                    type="primary"
                                    href="/seller/products/upload"
                                >
                                    Импорт продукта
                                </Button> */}
                            </div>
                            <div className="flex items-center gap-4 px-2 rounded-lg">
                                <Input
                                    prefix={<SearchOutlined />}
                                    placeholder="Поиск"
                                    value={searchValue}
                                    className="!min-w-[230px] lg:!min-w-[317px]"
                                    onChange={(e) => {
                                        setSearchValue(e.target.value);
                                    }}
                                />
                            </div>
                        </ConfigProvider>
                    </div>
                </div>

                {current === "products" && (
                    <div className="overflow-x-auto w-full md:mb-0 mb-[70px]">
                        <ProductsTable searchValue={debouncedSearchValue} />
                    </div>
                )}
                {current === "prices" && (
                    <ProductPriceTable
                        debouncedSearchValue={debouncedSearchValue}
                    />
                )}
                {current === "upload" && (
                    <div className="h-full bg-white rounded-t-lg">
                        <ProductsUploadFromFile />
                    </div>
                )}
            </div>
        </div>
    );
};
