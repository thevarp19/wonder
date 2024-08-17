// import { AdminOrderDetailsTable } from "@/modules/order/components/OrderDetailsTable.tsx/EmployeeOrderTable";

import { DateCell } from "@/components/ui/DateCell";
import { Loading } from "@/components/ui/Loading";
import { EmployeeOrderDetailsTable } from "@/modules/order/components/OrderDetailsTable/EmployeeOrderDetailsTable";
import {} from "@/modules/order/mutations";
import { useGetEmployeeOrder } from "@/modules/order/queries";
import { mapWonderStatus } from "@/modules/order/utils";
import { FC } from "react";
import { useParams } from "react-router-dom";

interface EmployeeOrderPageProps {}

export const EmployeeOrderPage: FC<EmployeeOrderPageProps> = ({}) => {
    const { orderId: orderIdRaw } = useParams();

    const { data, isPending } = useGetEmployeeOrder(orderIdRaw ?? "");
    const orderCode = data?.code?.toString() ?? "";
    const { text, color } = mapWonderStatus(
        data?.wonder_status || "Неизвестно"
    );
    if (isPending) {
        return <Loading />;
    }
    return (
        <div>
            <h2 className="pb-4 text-2xl font-semibold">
                Заказ- <span className="underline">{orderCode}</span>
            </h2>
            <div className="flex justify-between mt-5 space-x-4">
                <div className="flex flex-col w-1/2 gap-3 p-5 rounded-lg bg-gray-50">
                    <h3 className="font-bold">Информация о заказе</h3>
                    <div className="flex flex-col gap-1">
                        <div className="flex gap-3">
                            <strong>Статус:</strong>{" "}
                            <div
                                style={{ color: color }}
                                className={`!rounded-full`}
                            >
                                <span
                                    style={{
                                        display: "inline-block",
                                        width: "10px",
                                        height: "10px",
                                        backgroundColor: color,
                                        borderRadius: "50%",
                                        marginRight: "8px",
                                    }}
                                ></span>
                                {text}
                            </div>
                        </div>
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

            <EmployeeOrderDetailsTable data={data} loading={isPending} />
        </div>
    );
};
