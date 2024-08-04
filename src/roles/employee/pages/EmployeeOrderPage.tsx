// import { AdminOrderDetailsTable } from "@/modules/order/components/OrderDetailsTable.tsx/EmployeeOrderTable";

import { DateCell } from "@/components/ui/DateCell";
import { EmployeeOrderDetailsTable } from "@/modules/order/components/EmployeeOrders/EmployeeOrderDetailsTable";
import {} from "@/modules/order/mutations";
import { useGetEmployeeOrder } from "@/modules/order/queries";
import { Tag } from "antd";
import { FC } from "react";
import { useParams } from "react-router-dom";

interface EmployeeOrderPageProps {}

export const EmployeeOrderPage: FC<EmployeeOrderPageProps> = ({}) => {
    const { orderId: orderIdRaw } = useParams();

    const { data, isPending } = useGetEmployeeOrder(orderIdRaw ?? "");
    const orderCode = data?.code?.toString() ?? "";
    return (
        <div>
            <h2 className="pb-4 text-2xl font-semibold">
                Заказ- <span className="underline">{orderCode}</span>
            </h2>
            <div className="flex justify-between mt-5 space-x-4">
                <div className="flex flex-col w-1/2 gap-3 p-5 rounded-lg bg-gray-50">
                    <h3 className="font-bold">Информация о заказе</h3>
                    <div className="flex flex-col gap-1">
                        <p>
                            <strong>Статус:</strong>{" "}
                            <Tag> {data?.wonder_status}</Tag>
                        </p>
                        <p>
                            <strong>Название магазина:</strong>{" "}
                            {data?.kaspi_store_name}
                        </p>
                        <p>
                            <strong>Тип доставки:</strong> {data?.delivery_mode}
                        </p>
                        <p className="flex gap-1">
                            <strong>Время заказа: </strong>{" "}
                            <DateCell timestamp={data?.creation_date ?? ""} />
                        </p>
                        <p className="flex">
                            <strong>Дата передачи:</strong>{" "}
                            <DateCell
                                timestamp={data?.transmission_date ?? ""}
                            />
                        </p>
                        <p className="flex">
                            <strong>Дата получения:</strong>{" "}
                            <DateCell timestamp={data?.receiving_date ?? ""} />
                        </p>
                    </div>
                </div>
                <div className="flex flex-col w-1/2 gap-3 p-5 rounded-lg bg-gray-50">
                    <h3 className="font-semibold">Получатель</h3>
                    <div>
                        <p>
                            <strong>Имя:</strong>{" "}
                            {`${data?.customer.first_name} ${data?.customer.last_name}`}
                        </p>
                        <p>
                            <strong>Номер телефона:</strong>{" "}
                            {data?.customer.cell_phone}
                        </p>
                        <p>
                            <strong>Адрес доставки:</strong>{" "}
                            {data?.delivery_address}
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex justify-end gap-5 my-4">
                {/* {isPending ? <Spin /> : renderButton(orderStatus)} */}
            </div>
            <EmployeeOrderDetailsTable data={data} loading={isPending} />
        </div>
    );
};
