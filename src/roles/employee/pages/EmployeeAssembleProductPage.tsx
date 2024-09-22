import { DateCell } from "@/components/ui/DateCell";
import {
    cancelOrderProductMutation,
    orderStatusMutation,
    replacementOrderProductMutation,
} from "@/modules/order/mutations";
import { useGetAssembleOrderProductEmployee } from "@/modules/order/queries";
import {
    AssembleDeliveryMode,
    GetAssembleOrderProductEmployee,
    ProductStatusChangeRequest,
} from "@/modules/order/types";
import { LockOutlined, UnlockOutlined } from "@ant-design/icons";
import { App, Button, Input, Modal, Radio, Select, Spin } from "antd";
import { RadioChangeEvent } from "antd/lib/radio";
import React, { useEffect, useState } from "react";
export const EmployeeAssembleProductPage: React.FC = () => {
    const [deliveryMode, setDeliveryMode] =
        useState<AssembleDeliveryMode>("EXPRESS");
    const [page, setPage] = useState(1);
    const [barcode, setBarcode] = useState<string>("");
    const [assembleProduct, setAssembleProduct] =
        useState<GetAssembleOrderProductEmployee | null>(null);
    const [isScanning, setIsScanning] = useState(true);
    const [isLocked, setIsLocked] = useState(true);
    const { message } = App.useApp();
    const { mutateAsync: packageMutate } = orderStatusMutation();
    const { data, isPending, refetch } = useGetAssembleOrderProductEmployee(
        page - 1,
        deliveryMode
    );

    useEffect(() => {
        if (data) {
            setAssembleProduct(data);
            setIsScanning(true);
            setIsLocked(true);
            setBarcode("");
        }
    }, [data]);

    const assembleProductsHandler = async () => {
        if (assembleProduct) {
            const requests: ProductStatusChangeRequest[] = [
                {
                    id: assembleProduct.id,
                    order_entry: assembleProduct.order_entry,
                    status: "PACKAGING",
                },
            ];

            try {
                await packageMutate(requests);
                message.success("Продукт успешно собран.");
                refetch();
                setBarcode("");
                setIsScanning(true);
                setIsLocked(true);
            } catch (error) {
                message.error("Не удалось собрать продукт");
            }
        }
    };

    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            if (isScanning && isLocked) {
                if (event.key === "Enter") {
                    if (
                        assembleProduct &&
                        barcode === assembleProduct.barcode
                    ) {
                        assembleProductsHandler();
                    } else {
                        message.error(
                            "Отсканированный QR-код не соответствует QR-коду продукта"
                        );
                        setBarcode("");
                    }
                } else {
                    setBarcode((prevBarcode) => prevBarcode + event.key);
                }
            }
        };

        window.addEventListener("keypress", handleKeyPress);

        return () => {
            window.removeEventListener("keypress", handleKeyPress);
        };
    }, [barcode, assembleProduct, isScanning, isLocked]);

    const handleDeliveryModeChange = (e: RadioChangeEvent) => {
        setDeliveryMode(e.target.value as AssembleDeliveryMode);
    };

    const handleSkip = () => {
        setPage((prevPage) => prevPage + 1);
        setBarcode("");
        setIsScanning(true);
        setIsLocked(true);
    };

    const handleProductReplaced = (
        newProduct: GetAssembleOrderProductEmployee
    ) => {
        setAssembleProduct(newProduct);
        setIsScanning(true);
        setIsLocked(true);
        setBarcode("");
    };

    const handleManualSubmit = () => {
        if (assembleProduct && barcode === assembleProduct.barcode) {
            assembleProductsHandler();
        } else {
            message.error("Введенный QR-код не соответствует QR-коду продукта");
            setBarcode("");
        }
    };
    const toggleLock = () => {
        setIsLocked((prev) => !prev);
        if (isLocked) {
            setIsScanning(false);
        } else {
            setIsScanning(true);
            setBarcode("");
        }
    };

    const handleManualBarcodeChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (!isLocked) {
            setBarcode(e.target.value);
        }
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
                                    <Button
                                        icon={
                                            isLocked ? (
                                                <LockOutlined />
                                            ) : (
                                                <UnlockOutlined />
                                            )
                                        }
                                        onClick={toggleLock}
                                        // style={{ fontSize: 24 }}
                                    />
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
                                    <span className="font-medium">QR код:</span>
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
                        <div className="flex w-full gap-2">
                            <Input
                                value={barcode}
                                onChange={handleManualBarcodeChange}
                                readOnly={isLocked}
                                placeholder={
                                    isLocked
                                        ? isScanning
                                            ? "Сканирование..."
                                            : "Сканирование приостановлено"
                                        : "Введите QR-код вручную"
                                }
                            />
                            <Button
                                onClick={handleManualSubmit}
                                disabled={isLocked || barcode.length === 0}
                            >
                                Ввод
                            </Button>
                        </div>
                        <div className="flex justify-between gap-5">
                            <Button onClick={handleSkip} loading={isPending}>
                                Пропустить
                            </Button>
                            <CancelProductModal
                                loadingProduct={isPending}
                                productId={assembleProduct?.id}
                            />
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
interface CancelProductModalProps {
    productId: number | undefined;
    loadingProduct: boolean;
}
export const CancelProductModal: React.FC<CancelProductModalProps> = ({
    productId,
    loadingProduct,
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [reason, setReason] = useState<
        | "BUYER_CANCELLATION_BY_MERCHANT"
        | "BUYER_NOT_REACHABLE"
        | "MERCHANT_OUT_OF_STOCK"
    >("BUYER_CANCELLATION_BY_MERCHANT");
    const [comment, setComment] = useState("");

    const mutation = cancelOrderProductMutation(productId || -1);

    const handleReplacement = () => {
        mutation.mutate(
            { reason: reason, notes: comment },
            {
                onSuccess: () => {
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
                title="Отмена продукта"
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
                            Причина отмены
                        </h2>
                        <Select
                            value={reason}
                            onChange={(
                                value:
                                    | "BUYER_CANCELLATION_BY_MERCHANT"
                                    | "BUYER_NOT_REACHABLE"
                                    | "MERCHANT_OUT_OF_STOCK"
                            ) => setReason(value)}
                            className="!w-full"
                            options={[
                                {
                                    value: "BUYER_CANCELLATION_BY_MERCHANT",
                                    label: "Отмена покупателем через продавца",
                                },
                                {
                                    value: "BUYER_NOT_REACHABLE",
                                    label: "Покупатель недоступен",
                                },
                                {
                                    value: "MERCHANT_OUT_OF_STOCK",
                                    label: "Продавец не имеет в наличии",
                                },
                            ]}
                        />
                    </div>
                    <div className="flex flex-col w-full gap-2">
                        <h2 className="text-sm font-semibold">Комментарий</h2>
                        <Input
                            name="comment"
                            value={comment}
                            onChange={(e) => {
                                setComment(e.target.value);
                            }}
                            placeholder="Комментарий"
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
                danger
                onClick={() => setIsModalOpen(true)}
            >
                Отмена
            </Button>
        </>
    );
};
