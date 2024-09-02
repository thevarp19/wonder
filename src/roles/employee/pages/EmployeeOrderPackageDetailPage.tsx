import { Image } from "@/components/ui/Image";
import { Loading } from "@/components/ui/Loading";
import { EmployeePackageDetailTable } from "@/modules/order/components/EmployeeOrders/EmployeePackageDetailTable";
import { orderStatusMutation } from "@/modules/order/mutations";
import { useGetPackageDetails } from "@/modules/order/queries";
import { App, Button, Checkbox } from "antd";
import { FC, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const EmployeeOrderPackageDetailPage: FC = () => {
    const { orderId: orderIdRaw } = useParams();
    const [isPacked, setIsPacked] = useState(false);
    const { data, isPending } = useGetPackageDetails(
        orderIdRaw || "",
        isPacked
    );
    const { message } = App.useApp();
    const navigate = useNavigate();
    const { mutateAsync: transferMutate } = orderStatusMutation();

    if (isPending || !data) {
        return <Loading />;
    }

    const handlePackedChange = (e: any) => {
        setIsPacked(e.target.checked);
    };

    const handleCompleteOrder = async () => {
        try {
            await transferMutate([
                {
                    id: data.product.id,
                    order_entry: data.product.order_entry,
                    status: "TRANSFER",
                },
            ]);
            navigate("/employee/orders/package");
        } catch (error: any) {
            message.error(`${error?.response?.data.error.message}`);
        }
    };

    return (
        <div className="flex flex-col h-full gap-5">
            <div>
                <h2 className="pb-5 text-xl font-semibold ">Упаковка</h2>
                <Button
                    type="primary"
                    size="large"
                    href={data?.product.waybill}
                    className="!flex !items-center !justify-center min-w-[200px] !gap-2 w-max"
                >
                    <h2 className="text-[14px] text-white uppercase">
                        Скачать накладную
                    </h2>
                </Button>
            </div>

            <div>
                <EmployeePackageDetailTable
                    data={data?.product}
                    isPending={isPending}
                />
            </div>

            <div className="flex flex-col gap-5">
                <div className="overflow-x-auto w-full md:mb-0 mb-[70px]">
                    <div className="flex justify-between gap-5">
                        {data?.bubble_schema_base64 && (
                            <div className="flex flex-col items-center p-5 border border-black rounded-[20px]">
                                <Image
                                    src={`data:image/png;base64,${data?.bubble_schema_base64}`}
                                    alt="Bubble Wrap Schema"
                                    className="w-full "
                                />
                                <h3>Пузырчатая Пленка</h3>
                            </div>
                        )}
                        {data?.stretch_schema_base64 && (
                            <div className="flex flex-col items-center p-5 border border-black  rounded-[20px]">
                                <Image
                                    src={`data:image/png;base64,${data?.stretch_schema_base64}`}
                                    alt="Stretch Wrap Schema"
                                    className="w-full "
                                />
                                <h3>Стретч Пленка</h3>
                            </div>
                        )}
                        {!isPacked && (
                            <div className="mt-5">
                                <ul className="flex flex-col gap-2 pl-5 list-disc">
                                    <li>
                                        Курьерский пакет:{" "}
                                        {data.courier_package ? "Да" : "Нет"}
                                    </li>
                                    <li>
                                        Этикетка: Осторожно! Стекло!:{" "}
                                        {data.label_caution_class
                                            ? "Да"
                                            : "Нет"}
                                    </li>
                                    <li>
                                        Этикетка: Манипуляционный знак:{" "}
                                        {data.label_manipulation_sign
                                            ? "Да"
                                            : "Нет"}
                                    </li>
                                    <li>
                                        Этикетка: Огнеопасно!:{" "}
                                        {data.label_flammable ? "Да" : "Нет"}
                                    </li>
                                    <li>
                                        Этикетка: Осторожно! Аккумуляторные
                                        батареи!:{" "}
                                        {data.label_careful_rechargeable_battery
                                            ? "Да"
                                            : "Нет"}
                                    </li>
                                    <li>
                                        Скотч для хрупких товаров:{" "}
                                        {data.adhesive_tape_for_fragile_goods
                                            ? "Да"
                                            : "Нет"}
                                    </li>
                                    <li>
                                        Количество этикеток пузырчатой пленки:{" "}
                                        {data.number_of_labels_of_bubble_wrap}
                                    </li>
                                    <li>
                                        Количество этикеток стретч-пленки:{" "}
                                        {data.number_of_labels_of_stretch_film}
                                    </li>
                                    <li>
                                        Тип курьерского пакета:{" "}
                                        {data.courier_package_type}
                                    </li>
                                    <li>Тип доставки: {data.delivery_type}</li>
                                    <li>
                                        Дополнительные упаковки:{" "}
                                        {data.additional_wraps}
                                    </li>
                                    <li>
                                        Тип самой дешевой упаковки:{" "}
                                        {data.cheapest_wrap_type}
                                    </li>
                                    <li>
                                        Количество сегментов самой дешевой
                                        упаковки:{" "}
                                        {data.cheapest_number_of_segments}
                                    </li>
                                    <li>
                                        Количество сегментов стретч-пленки самой
                                        дешевой упаковки:{" "}
                                        {
                                            data.cheapest_stretch_number_of_segments
                                        }
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>

                    <div className="flex items-start justify-between py-10">
                        <div className="flex flex-col">
                            <div className="bg-[#EF7214F7] p-2 rounded-lg  w-max">
                                <Checkbox
                                    checked={isPacked}
                                    onChange={handlePackedChange}
                                    className="!text-white"
                                >
                                    Упакованный
                                </Checkbox>
                            </div>
                            <p className="mt-2 text-sm">
                                * Товар прибыл в упакованном виде
                            </p>
                        </div>
                        <div className="flex justify-end">
                            <div className="mt-auto">
                                <Button
                                    type="primary"
                                    size="large"
                                    className="!flex !items-center !justify-center min-w-[200px] !gap-2 w-max"
                                    onClick={handleCompleteOrder}
                                >
                                    Завершить
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
