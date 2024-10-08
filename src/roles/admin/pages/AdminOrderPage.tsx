import { DateCell } from "@/components/ui/DateCell";
import { FormikInput } from "@/components/ui/FormikInput";
import { Loading } from "@/components/ui/Loading";
import { AdminOrderDetailsTable } from "@/modules/order/components/OrderDetailsTable/AdminOrderDetailsTable";
import { useCancelOrder } from "@/modules/order/forms";
import { useGetAdminOrder } from "@/modules/order/queries";
import { mapWonderStatus } from "@/modules/order/utils";
import { Button, Form, Modal } from "antd";
import { FC, useState } from "react";
import { useParams } from "react-router-dom";

interface AdminOrderPageProps {}

export const AdminOrderPage: FC<AdminOrderPageProps> = ({}) => {
    const { orderId: orderIdRaw } = useParams();

    const { data, isPending } = useGetAdminOrder(orderIdRaw ?? "");
    const orderCode = data?.code?.toString() ?? "";
    const { text, color } = mapWonderStatus(
        data?.wonder_status || "Неизвестно"
    );

    if (isPending) {
        return <Loading />;
    }

    return (
        <div className="pb-32 md:pb-0">
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
                <CancelOrderModal orderId={orderIdRaw || ""} role="admin" />
            </div>
            <AdminOrderDetailsTable data={data} loading={isPending} />

            {/* Render service cost details below the table */}
            <div className="grid grid-cols-2 gap-3">
                {data?.seller_cell_products.map((product) => (
                    <div
                        key={product.id}
                        className="flex flex-col gap-3 p-5 mt-4 rounded-lg bg-gray-50"
                    >
                        <h3 className="font-semibold">
                            Обслуживание - {product.product_title} ({product.id}
                            )
                        </h3>
                        <div className="flex justify-between">
                            <div>
                                <p>Сумма за Расходники</p>
                                <p>Работа</p>
                                <p>Прибыль</p>
                                <p>Хранение</p>
                                <p>Упаковка</p>
                                <p>Упаковано</p>
                                <p>Общая упаковка</p>
                                <p>Доставка</p>
                                <p>Выдача</p>
                                <p className="mt-2 font-bold">Конечная цена</p>
                                <p>Доп Оплата</p>
                            </div>
                            <div>
                                <p>
                                    {
                                        product?.services_cost
                                            ?.amount_for_consumables
                                    }{" "}
                                    ₸
                                </p>
                                <p>{product?.services_cost?.employee} ₸</p>
                                <p>{product?.services_cost?.profit} ₸</p>
                                <p>{product?.services_cost?.storage} ₸</p>
                                <p>{product?.services_cost?.package} ₸</p>
                                <p>{product?.services_cost?.packaged} ₸</p>
                                <p>
                                    {product?.services_cost?.general_package} ₸
                                </p>
                                <p>{product?.services_cost?.delivery} ₸</p>
                                <p>{product?.services_cost?.issuance} ₸</p>
                                <p className="mt-2 font-bold">
                                    {product?.services_cost?.final_price} ₸
                                </p>
                                <p>{product?.services_cost?.add_payment} ₸</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export const CancelOrderModal = ({
    orderId,
    role,
}: {
    orderId: string;
    role: "admin" | "seller";
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { formik, mutation } = useCancelOrder(orderId, role);
    return (
        <>
            <Modal
                title="Отмена продукта"
                open={isModalOpen}
                cancelButtonProps={{ style: { width: "100%" } }}
                onCancel={() => setIsModalOpen(false)}
                cancelText="Назад"
                okButtonProps={{ style: { display: "none" } }}
                destroyOnClose
            >
                <Form
                    layout="vertical"
                    className="flex flex-col w-full max-w-xl gap-2 px-10"
                >
                    <FormikInput
                        name="cancellation_reason"
                        formik={formik}
                        formItemProps={{
                            label: "Причина",
                            required: true,
                        }}
                        inputProps={{
                            size: "large",
                            style: { width: "100%" },
                        }}
                    />
                    <FormikInput
                        name="cancellation_comment"
                        formik={formik}
                        formItemProps={{
                            label: "Коментарий",
                            required: true,
                        }}
                        inputProps={{
                            size: "large",
                            style: { width: "100%" },
                        }}
                    />
                    <Button
                        type="primary"
                        loading={mutation.isPending}
                        className="w-full md:w-auto"
                        onClick={() => {
                            formik.handleSubmit();
                            setIsModalOpen(false);
                        }}
                    >
                        Отменить
                    </Button>
                </Form>
            </Modal>
            <Button
                type="primary"
                size="large"
                onClick={() => setIsModalOpen(true)}
            >
                Отменить заказ
            </Button>
        </>
    );
};
