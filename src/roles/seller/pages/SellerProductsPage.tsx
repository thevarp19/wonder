import { ProductPriceTable } from "@/modules/product/components/ProductPriceTable";
import { ProductsSearch } from "@/modules/product/components/ProductSearch";
import { ProductsTable } from "@/modules/product/components/ProductsTable";
import { useDebounce } from "@/utils/shared.util";
import { MoneyCollectOutlined, ShopOutlined } from "@ant-design/icons";
import { Button, Menu, MenuProps } from "antd";
import { FC, useCallback, useState } from "react";
import { useSearchParams } from "react-router-dom";

interface SellerProductsPageProps {}

const items: MenuProps["items"] = [
    {
        label: "Цены",
        key: "prices",
        icon: <MoneyCollectOutlined />,
    },
    {
        label: "Товары",
        key: "products",
        icon: <ShopOutlined />,
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
            <Menu
                items={items}
                mode="horizontal"
                onClick={onClick}
                selectedKeys={[current]}
            />
            {current === "products" && (
                <div className="p-4">
                    <h1 className="pb-4 text-2xl font-semibold">Товары</h1>
                    <ProductsSearch
                        searchValue={searchValue}
                        setSearchValue={setSearchValue}
                    />
                    <ProductsTable searchValue={debouncedSearchValue} />
                </div>
            )}
            {current === "prices" && (
                <div className="p-4 space-y-4">
                    <h1 className="text-2xl font-semibold">Цены на товары</h1>
                    <Button
                        size="large"
                        type="primary"
                        className="mb-4"
                        href="/seller/products/upload"
                    >
                        Загрузить товары
                    </Button>
                    <ProductPriceTable />
                </div>
            )}
        </div>
    );
};
