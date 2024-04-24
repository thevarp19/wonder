import { OrderDetailsTable } from "@/modules/order/components/OrderDetailsTable.tsx";
import { useGetOrderData } from "@/modules/order/queries";
import { FC } from "react";
import { useParams } from "react-router-dom";

interface AdminOrderPageProps {}

export const AdminOrderPage: FC<AdminOrderPageProps> = ({}) => {
    const { orderId: orderIdRaw } = useParams();
    const orderId = parseInt(orderIdRaw || "");
    const { data } = useGetOrderData(orderId);
    const orderData = [
        { label: "Order number", value: data?.code },
        {
            label: "Shop",
            value: data?.sellerName,
        },
        {
            label: "Time",
            value: data?.creationDate,
        },
        {
            label: "Delivery type",
            value: data?.deliveryMode,
        },
        {
            label: "Send time",
            value: data?.plannedDeliveryDate,
        },
    ];
    return (
        <div>
            <h1 className="pb-4 text-2xl font-semibold">Order: {orderId}</h1>
            <div className="flex">
                {orderData.map((item) => (
                    <div key={item.label} className="mr-4">
                        <div className="text-gray-500">{item.label}</div>
                        <div>{item.value}</div>
                    </div>
                ))}
            </div>
            <OrderDetailsTable orderId={orderId} />
        </div>
    );
};
