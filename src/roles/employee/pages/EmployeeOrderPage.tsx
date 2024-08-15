// import { AdminOrderDetailsTable } from "@/modules/order/components/OrderDetailsTable.tsx/EmployeeOrderTable";

import { DateCell } from "@/components/ui/DateCell";
import { FormikInput } from "@/components/ui/FormikInput";
import { EmployeeOrderDetailsTable } from "@/modules/order/components/OrderDetailsTable/EmployeeOrderDetailsTable";
import { useCancelOrder } from "@/modules/order/forms";
import {} from "@/modules/order/mutations";
import { useGetEmployeeOrder } from "@/modules/order/queries";
import { Button, Form, Modal, Tag } from "antd";
import { FC, useState } from "react";
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
                <CancelOrderModal orderId={orderIdRaw || ""} />
            </div>
            <EmployeeOrderDetailsTable data={data} loading={isPending} />
        </div>
    );
};
const CancelOrderModal = ({ orderId }: { orderId: string }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { formik, mutation } = useCancelOrder(orderId);
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
