import { DateCell } from "@/components/ui/DateCell";
import { Loading } from "@/components/ui/Loading";
import { SellerOrderDetailsTable } from "@/modules/order/components/OrderDetailsTable/SellerOrderDetailsTable";
import { useGetSellerOrder } from "@/modules/order/queries";
import { mapWonderStatus } from "@/modules/order/utils";
import { CancelOrderModal } from "@/roles/admin/pages/AdminOrderPage";
import { FC } from "react";
import { useParams } from "react-router-dom";

interface SellerOrderPageProps {}

export const SellerOrderPage: FC<SellerOrderPageProps> = ({}) => {
    const { orderId: orderIdRaw } = useParams();

    const { data, isPending } = useGetSellerOrder(orderIdRaw ?? "");
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
                            <strong>Название магазина:</strong> {data?.seller}
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
                <CancelOrderModal orderId={orderIdRaw || ""} role="seller" />
            </div>
            <SellerOrderDetailsTable data={data} loading={isPending} />
            <div className="grid grid-cols-2 gap-3">
                {data?.seller_cell_products.map((product) => (
                    <div
                        key={product.id}
                        className="flex flex-col gap-3 p-5 mt-4 rounded-lg bg-gray-50"
                    >
                        <h3 className="font-semibold">
                            Обслуживание - {product.product_title} (
                            {product.product_vendor_code})
                        </h3>
                        <div className="flex justify-between">
                            <div>
                                <p>Хранение</p>
                                <p>Упаковка</p>
                                <p>Доставка</p>
                                <p>Выдача</p>
                                <p className="mt-2 font-bold">Общая сумма</p>
                            </div>
                            <div>
                                <p>{product?.services_cost?.storage} ₸</p>
                                <p>{product?.services_cost?.package} ₸</p>
                                <p>{product?.services_cost?.delivery} ₸</p>
                                <p>{product?.services_cost?.issuance} ₸</p>
                                <p className="mt-2 font-bold">
                                    {product?.services_cost?.final_price} ₸
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
