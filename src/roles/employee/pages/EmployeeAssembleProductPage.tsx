import { DateCell } from "@/components/ui/DateCell";
import { useGetAssembleOrderProductEmployee } from "@/modules/order/queries";
import { AssembleDeliveryMode } from "@/modules/order/types";
import { LockOutlined } from "@ant-design/icons";
import { Button, Input, Radio, Spin } from "antd";
import React, { useState } from "react";

export const EmployeeAssembleProductPage: React.FC = () => {
    const [deliveryMode, setDeliveryMode] =
        useState<AssembleDeliveryMode>("EXPRESS");
    const [page, setPage] = useState(1);

    const { data: assembleProduct, isPending } =
        useGetAssembleOrderProductEmployee(page - 1, deliveryMode);

    const handleDeliveryModeChange = (e: any) => {
        setDeliveryMode(e.target.value);
    };

    const handleSkip = () => {
        setPage((prevPage) => prevPage + 1);
    };

    return (
        <div className="flex flex-col h-full gap-5 p-5">
            <h2 className="text-xl font-semibold">Сборка</h2>

            <div className="flex justify-center ">
                <div className="flex flex-col items-center w-full gap-10 p-8 border rounded-lg border-gray">
                    <Radio.Group
                        onChange={handleDeliveryModeChange}
                        value={deliveryMode}
                        className="mb-4"
                    >
                        <Radio.Button value="EXPRESS">Экспресс</Radio.Button>
                        <Radio.Button value="ZAMLER">Заммлер</Radio.Button>
                        <Radio.Button value="PICKUP">Самовывоз</Radio.Button>
                    </Radio.Group>

                    <div className="flex flex-col min-w-[500px] gap-5 p-6 border rounded-lg border-gray">
                        {isPending ? (
                            <div
                                className={
                                    "flex items-center justify-center w-full h-[200px]"
                                }
                            >
                                <Spin size="large" />
                            </div>
                        ) : assembleProduct ? (
                            <>
                                <div className="flex items-center justify-between mb-4">
                                    <span className="flex gap-2 text-[#EF7214] text-base">
                                        Время отправки:{" "}
                                        <DateCell
                                            timestamp={
                                                assembleProduct.courier_transmission_planning_date
                                            }
                                        />
                                    </span>
                                    <LockOutlined />
                                </div>

                                <div className="flex justify-between gap-5">
                                    <span className="font-medium">
                                        Номер заказа
                                    </span>
                                    <span className="font-semibold">
                                        {assembleProduct.order_code}
                                    </span>
                                </div>
                                <div className="flex justify-between gap-5">
                                    <span className="font-medium">Магазин</span>
                                    <span className="font-semibold">
                                        {assembleProduct.store}
                                    </span>
                                </div>
                                <div className="flex justify-between gap-5">
                                    <span className="font-medium">Артикул</span>
                                    <span className="font-semibold">
                                        {assembleProduct.vendor_code}
                                    </span>
                                </div>
                                <div className="flex justify-between gap-5">
                                    <span className="font-medium">
                                        Название
                                    </span>
                                    <span className="font-semibold">
                                        {assembleProduct.title}
                                    </span>
                                </div>
                                <div className="flex justify-between gap-5">
                                    <span className="font-medium">
                                        Штрих код
                                    </span>
                                    <span className="font-semibold">
                                        {assembleProduct.barcode}
                                    </span>
                                </div>
                                <div className="flex justify-between gap-5">
                                    <span className="font-medium">Ячейка</span>
                                    <span className="font-semibold">
                                        {assembleProduct.cell}
                                    </span>
                                </div>
                            </>
                        ) : (
                            <div
                                className={
                                    "flex items-center justify-center w-full h-[250px]"
                                }
                            >
                                <div className="text-lg">Нет данных</div>
                            </div>
                        )}
                        <div className="w-full">
                            <Input readOnly onChange={() => {}} />
                        </div>
                        <div className="flex justify-between gap-5">
                            <Button onClick={handleSkip}>Пропустить</Button>
                            <Button danger>Отмена</Button>
                            <Button>Замена товара</Button>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="flex justify-center">
                <Pagination
                    current={page}
                    onChange={handlePageChange}
                    total={50}
                    className="mt-4 text-center"
                />
            </div> */}
        </div>
    );
};
