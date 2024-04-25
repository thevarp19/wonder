import { EmployeeOrdersTable } from "@/modules/order/components/OrdersTable/EmployeeOrdersTable";
import { FC } from "react";

interface EmployeeOrdersPageProps {}

export const EmployeeOrdersPage: FC<EmployeeOrdersPageProps> = ({}) => {
    return (
        <div>
            <h1 className="pb-4 text-2xl font-semibold">Orders</h1>
            <EmployeeOrdersTable />
        </div>
    );
};
