import { SellerSuppliesTable } from "@/modules/supply/components/SuppliesTable/SellerSuppliesTable";
import { cn } from "@/utils/shared.util";
import { Button } from "antd";
import { FC } from "react";

interface SellerSupplyPageProps {}

export const SellerSupplyPage: FC<SellerSupplyPageProps> = ({}) => {
    return (
        <div className="min-h-full bg-white rounded-t-lg">
            <div className="p-4">
                <h1 className="pb-4 text-2xl font-semibold">Supply</h1>
                <Button
                    className={cn("mb-4")}
                    href="/seller/supply/create"
                    type="primary"
                >
                    Create a new supply
                </Button>
                <SellerSuppliesTable />
            </div>
        </div>
    );
};
