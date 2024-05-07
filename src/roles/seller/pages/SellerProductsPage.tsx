import { ProductPriceTable } from "@/modules/product/components/ProductPriceTable";
import { ProductsTable } from "@/modules/product/components/ProductsTable";
import { useDebounce } from "@/utils/shared.util";
import {
    MoneyCollectOutlined,
    SearchOutlined,
    ShopOutlined,
} from "@ant-design/icons";
import { Button, Input, Menu, MenuProps } from "antd";
import { FC, useCallback, useState } from "react";
import { useSearchParams } from "react-router-dom";

interface SellerProductsPageProps {}

const items: MenuProps["items"] = [
    {
        label: "Products",
        key: "products",
        icon: <ShopOutlined />,
    },
    {
        label: "Prices",
        key: "prices",
        icon: <MoneyCollectOutlined />,
    },
];

export const SellerProductsPage: FC<SellerProductsPageProps> = ({}) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const [current, setCurrent] = useState(
        searchParams.get("current") || "products"
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
                    <h1 className="pb-4 text-2xl font-semibold">Products</h1>
                    <Button
                        size="large"
                        type="primary"
                        className="mb-4"
                        href="/seller/products/upload"
                    >
                        Upload products
                    </Button>
                    <ProductsSearch
                        searchValue={searchValue}
                        setSearchValue={setSearchValue}
                    />
                    <ProductsTable searchValue={debouncedSearchValue} />
                </div>
            )}
            {current === "prices" && (
                <div className="p-4">
                    <h1 className="text-2xl font-semibold">Product prices</h1>
                    <ProductPriceTable />
                </div>
            )}
        </div>
    );
};

function ProductsSearch({
    searchValue,
    setSearchValue,
}: {
    searchValue: string;
    setSearchValue: (value: string) => void;
}) {
    return (
        <div className="my-2">
            <Input
                prefix={<SearchOutlined />}
                placeholder="Search"
                value={searchValue}
                onChange={(e) => {
                    setSearchValue(e.target.value);
                }}
            />
        </div>
    );
}
