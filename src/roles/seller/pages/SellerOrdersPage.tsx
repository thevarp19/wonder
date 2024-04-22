import { SellerOrdersTable } from "@/modules/order/components/OrdersTable/SellerOrdersTable";
import { FC } from "react";

interface SellerOrdersPageProps {}

export const SellerOrdersPage: FC<SellerOrdersPageProps> = ({}) => {
    return (
        <div>
            <h1 className="pb-4 text-2xl font-semibold">Orders</h1>
            <SellerOrdersTable />
        </div>
    );
};
