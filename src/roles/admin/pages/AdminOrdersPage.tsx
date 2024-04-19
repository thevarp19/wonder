import { OrdersTable } from "@/modules/order/components/OrdersTable";
import { FC } from "react";

interface AdminOrdersPageProps {}

export const AdminOrdersPage: FC<AdminOrdersPageProps> = ({}) => {
    return (
        <div>
            <h1 className="pb-4 text-2xl font-semibold">Orders</h1>
            <OrdersTable />
        </div>
    );
};
