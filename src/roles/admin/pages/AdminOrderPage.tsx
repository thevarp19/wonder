import { OrderDetailsTable } from "@/modules/order/components/OrderDetailsTable.tsx";
import { FC } from "react";
import { useParams } from "react-router-dom";

interface AdminOrderPageProps {}

export const AdminOrderPage: FC<AdminOrderPageProps> = ({}) => {
    const { orderId: orderIdRaw } = useParams();
    const orderId = parseInt(orderIdRaw || "");

    return (
        <div>
            <h1 className="pb-4 text-2xl font-semibold">Order: {orderId}</h1>
            <OrderDetailsTable orderId={orderId} />
        </div>
    );
};
