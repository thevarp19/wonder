// import { AdminOrderDetailsTable } from "@/modules/order/components/OrderDetailsTable.tsx/EmployeeOrderTable";
import { Button } from "antd";
import { FC } from "react";
import { useParams } from "react-router-dom";

interface EmployeeOrderPageProps {}

export const EmployeeOrderPage: FC<EmployeeOrderPageProps> = ({}) => {
    const { orderId: orderIdRaw } = useParams();
    const orderId = parseInt(orderIdRaw || "");

    return (
        <div>
            <h1 className="pb-4 text-2xl font-semibold">
                Заказ- <span className="underline">{orderId}</span>
            </h1>

            <Button type="primary" size="large" className="my-4">
                Начать упаковку
            </Button>
            {/* <AdminOrderDetailsTable orderId={orderId} /> */}
        </div>
    );
};
