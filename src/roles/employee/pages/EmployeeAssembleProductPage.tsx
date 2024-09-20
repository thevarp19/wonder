import { DateCell } from "@/components/ui/DateCell";
import { replacementOrderProductMutation } from "@/modules/order/mutations";
import { useGetAssembleOrderProductEmployee } from "@/modules/order/queries";
import {
    AssembleDeliveryMode,
    GetAssembleOrderProductEmployee,
} from "@/modules/order/types";
import { LockOutlined } from "@ant-design/icons";
import { Button, Input, Modal, Radio, Select, Spin } from "antd";
import { RadioChangeEvent } from "antd/lib/radio";
import React, { useEffect, useState } from "react";
export const EmployeeAssembleProductPage: React.FC = () => {
    const [deliveryMode, setDeliveryMode] =
        useState<AssembleDeliveryMode>("EXPRESS");
    const [page, setPage] = useState(1);
    const [assembleProduct, setAssembleProduct] =
        useState<GetAssembleOrderProductEmployee | null>(null);

    const { data, isPending } = useGetAssembleOrderProductEmployee(
        page - 1,
        deliveryMode
    );

    useEffect(() => {
        if (data) {
            setAssembleProduct(data);
        }
    }, [data]);

    const handleDeliveryModeChange = (e: RadioChangeEvent) => {
        setDeliveryMode(e.target.value as AssembleDeliveryMode);
    };

    const handleSkip = () => {
        setPage((prevPage) => prevPage + 1);
    };

    const handleProductReplaced = (
        newProduct: GetAssembleOrderProductEmployee
    ) => {
        setAssembleProduct(newProduct);
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

                    <div className="flex flex-col min-w-[500px] max-w-[500px] gap-5 p-6 border rounded-lg border-gray">
                        {isPending ? (
                            <div className="flex items-center justify-center w-full h-[200px]">
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
                                        Номер заказа:
                                    </span>
                                    <span className="font-semibold">
                                        {assembleProduct.order_code}
                                    </span>
                                </div>
                                <div className="flex justify-between gap-5">
                                    <span className="font-medium">
                                        Магазин:
                                    </span>
                                    <span className="font-semibold">
                                        {assembleProduct.store}
                                    </span>
                                </div>
                                <div className="flex justify-between gap-5">
                                    <span className="font-medium">
                                        Артикул:
                                    </span>
                                    <span className="font-semibold">
                                        {assembleProduct.vendor_code}
                                    </span>
                                </div>
                                <div className="flex justify-between gap-5">
                                    <span className="font-medium">
                                        Название:
                                    </span>
                                    <span className="font-semibold truncate">
                                        {assembleProduct.title}
                                    </span>
                                </div>
                                <div className="flex justify-between gap-5">
                                    <span className="font-medium">
                                        Штрих код:
                                    </span>
                                    <span className="font-semibold">
                                        {assembleProduct.barcode}
                                    </span>
                                </div>
                                <div className="flex justify-between gap-5">
                                    <span className="font-medium">Ячейка:</span>
                                    <span className="font-semibold">
                                        {assembleProduct.cell}
                                    </span>
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center justify-center w-full h-[250px]">
                                <div className="text-lg">Нет данных</div>
                            </div>
                        )}
                        <div className="w-full">
                            <Input readOnly onChange={() => {}} />
                        </div>
                        <div className="flex justify-between gap-5">
                            <Button onClick={handleSkip} loading={isPending}>
                                Пропустить
                            </Button>
                            <Button danger>Отмена</Button>
                            <ReplacementProductModal
                                loadingProduct={isPending}
                                productId={assembleProduct?.id}
                                onProductReplaced={handleProductReplaced}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
interface ReplacementProductModalProps {
    productId: number | undefined;
    loadingProduct: boolean;
    onProductReplaced: (newProduct: GetAssembleOrderProductEmployee) => void;
}

export const ReplacementProductModal: React.FC<
    ReplacementProductModalProps
> = ({ productId, loadingProduct, onProductReplaced }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [reason, setReason] = useState<"LOST" | "DEFECTIVE">("LOST");

    const mutation = replacementOrderProductMutation(productId || -1);

    const handleReplacement = () => {
        mutation.mutate(
            { reason },
            {
                onSuccess: (data) => {
                    onProductReplaced(data);
                    setIsModalOpen(false);
                },
                onError: () => {
                    setIsModalOpen(false);
                },
            }
        );
    };

    return (
        <>
            <Modal
                title="Замена продукта"
                open={isModalOpen}
                cancelButtonProps={{ style: { width: "100%" } }}
                onCancel={() => setIsModalOpen(false)}
                cancelText="Назад"
                okButtonProps={{ style: { display: "none" } }}
                destroyOnClose
            >
                <div className="flex flex-col items-center gap-10">
                    <div className="flex flex-col w-full gap-2">
                        <h2 className="text-sm font-semibold">
                            Причина замены
                        </h2>
                        <Select
                            value={reason}
                            onChange={(value: "LOST" | "DEFECTIVE") =>
                                setReason(value)
                            }
                            className="!w-full"
                            options={[
                                {
                                    value: "LOST",
                                    label: "Товар потерян",
                                },
                                {
                                    value: "DEFECTIVE",
                                    label: "Товар сломан",
                                },
                            ]}
                        />
                    </div>
                    <Button
                        type="primary"
                        loading={mutation.isPending}
                        className="w-full"
                        onClick={handleReplacement}
                    >
                        Замена
                    </Button>
                </div>
            </Modal>
            <Button
                loading={loadingProduct}
                onClick={() => setIsModalOpen(true)}
            >
                Замена товара
            </Button>
        </>
    );
};
