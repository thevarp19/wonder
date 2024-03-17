import { Button } from "antd";
import { FC } from "react";
import { ProductsTable } from "../components/products/ProductsTable";

interface SellerProductsPageProps {}

export const SellerProductsPage: FC<SellerProductsPageProps> = ({}) => {
    return (
        <div className="h-full bg-white rounded-t-lg">
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
        </div>
    );
};
