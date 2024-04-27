import { ProductPriceTable } from "@/modules/product/components/ProductPriceTable";
import { ProductsTable } from "@/modules/product/components/ProductsTable";
import { MoneyCollectOutlined, ShopOutlined } from "@ant-design/icons";
import { Button, Menu, MenuProps } from "antd";
import { FC, useState } from "react";
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
    const onClick: MenuProps["onClick"] = (e) => {
        setCurrent(e.key);
        setSearchParams({ current: e.key });
    };

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
                    <ProductsTable />
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
