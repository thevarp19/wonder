import { orderStatusMutation } from "@/modules/order/mutations";
import { useGetPackageProduct } from "@/modules/order/queries";
import { GetOrderPackageDetails } from "@/modules/order/types";
import { LockOutlined, UnlockOutlined } from "@ant-design/icons";
import { App, Button, Input } from "antd";
import { FC, useEffect, useState } from "react";

export const EmployeeOrderPackageProductPage: FC = () => {
    const [barcode, setBarcode] = useState<string>("");
    const [isLocked, setIsLocked] = useState(true);
    const [isScanning, setIsScanning] = useState(true);
    const [isPacked, setIsPacked] = useState(false);
    const [productData, setProductData] = useState<GetOrderPackageDetails>();
    const { message } = App.useApp();

    const { refetch } = useGetPackageProduct(barcode, isPacked);
    const { mutateAsync: transferMutate } = orderStatusMutation();

    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            if (isScanning && isLocked) {
                if (event.key === "Enter") {
                    handleSearch();
                } else {
                    setBarcode((prevBarcode) => prevBarcode + event.key);
                }
            }
        };

        window.addEventListener("keypress", handleKeyPress);

        return () => {
            window.removeEventListener("keypress", handleKeyPress);
        };
    }, [isScanning, isLocked, barcode]);

    useEffect(() => {
        if (isPacked) {
            refetch().then((result) => {
                if (result.data) {
                    setProductData(result.data);
                }
            });
        }
    }, [isPacked, refetch]);

    const handleSearch = async () => {
        if (barcode) {
            try {
                const result = await refetch();
                if (result.data) {
                    setProductData(result.data);
                    if (result.data.product) {
                        await handleCompleteOrder(result.data.product);
                    }
                }
            } catch (error) {
                message.error("Не удалось получить данные о продукте");
            }
            setBarcode("");
        }
    };

    const handleCompleteOrder = async (product: any) => {
        try {
            await transferMutate([
                {
                    id: product.id,
                    order_entry: product.order_entry,
                    status: "TRANSFER",
                },
            ]);
            message.success("Продукт успешно упакован");
            // navigate("/employee/orders/package");
        } catch (error) {
            message.error("Не удалось упаковать продукт");
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

    const handleIsPacked = () => {
        setIsPacked(true);
    };

    return (
        <div className="p-5">
            <div className="flex items-center justify-between mb-5">
                <h1 className="text-2xl font-bold">Упаковка</h1>
                <Button
                    type="primary"
                    size="large"
                    href={productData?.product.waybill}
                >
                    Накладная
                </Button>
            </div>

            <div className="flex items-center gap-5 mb-8">
                <Input
                    placeholder="Поиск по баркоду"
                    style={{ width: 300 }}
                    value={barcode}
                    onChange={handleManualBarcodeChange}
                    readOnly={isLocked}
                />
                <Button type="primary" onClick={handleSearch}>
                    Найти
                </Button>
                <Button
                    icon={isLocked ? <LockOutlined /> : <UnlockOutlined />}
                    onClick={toggleLock}
                />
            </div>

            {productData && (
                <>
                    <div className="flex justify-between gap-10 p-8 border rounded-lg border-gray">
                        <div className="flex flex-col">
                            <div className="flex items-center justify-between mb-5">
                                <div className="flex gap-3">
                                    <span className="my-auto font-bold text-orange-500">
                                        Время отправки: -
                                    </span>
                                    <span className="px-3 py-1 text-green-800 bg-green-100 rounded">
                                        {productData.delivery_type === "express"
                                            ? "Экспресс"
                                            : productData.delivery_type ===
                                              "zammler"
                                            ? "Заммлер"
                                            : "Самовывоз"}
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-col gap-4 mb-5">
                                <div className="flex flex-col gap-3 p-4 border rounded-lg border-gray">
                                    <p>
                                        <span className="font-semibold">
                                            Номер заказа:
                                        </span>{" "}
                                        {productData.product.order_code}
                                    </p>
                                    <p>
                                        <span className="font-semibold">
                                            Магазин:
                                        </span>{" "}
                                        {productData.product.seller}
                                    </p>
                                    <p>
                                        <span className="font-semibold">
                                            Артикул:
                                        </span>{" "}
                                        {
                                            productData.product
                                                .product_vendor_code
                                        }
                                    </p>
                                    <p className="flex gap-1">
                                        <span className="font-semibold">
                                            Название:
                                        </span>{" "}
                                        <span className="truncate">
                                            {productData.product.product_title}
                                        </span>
                                    </p>
                                    <p>
                                        <span className="font-semibold">
                                            Штрих код:
                                        </span>{" "}
                                        {productData.product.barcode_number}
                                    </p>
                                </div>
                                <div>
                                    <ul className="pl-5 list-disc">
                                        {productData.courier_package && (
                                            <li>
                                                Курьер Пакет: Тип{" "}
                                                {
                                                    productData.courier_package_type
                                                }
                                            </li>
                                        )}
                                        {productData.label_caution_class && (
                                            <li>
                                                Этикетка: Осторожно! Стекло!
                                            </li>
                                        )}
                                        {productData.label_manipulation_sign && (
                                            <li>
                                                Этикетка: Манипуляционный знак
                                            </li>
                                        )}
                                        {productData.label_flammable && (
                                            <li>Этикетка: Огнеопасно!</li>
                                        )}
                                        {productData.label_careful_rechargeable_battery && (
                                            <li>
                                                Этикетка: Осторожно!
                                                Аккумуляторные батареи!
                                            </li>
                                        )}
                                        {productData.adhesive_tape_for_fragile_goods && (
                                            <li>
                                                Этикетка: Клейкая лента для
                                                хрупких товаров
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-8">
                            {productData.bubble_schema_base64 && (
                                <div className="relative p-4 border border-black rounded h-max">
                                    <h3 className="mb-2 text-lg font-bold">
                                        Пузырчатая
                                    </h3>
                                    <img
                                        src={`data:image/png;base64,${productData.bubble_schema_base64}`}
                                        alt="Bubble Wrap Schema"
                                        className="w-full h-[250px]"
                                    />
                                    <div className="absolute left-5 bottom-5 text-start text-[24px] font-bold">
                                        {
                                            productData.number_of_labels_of_bubble_wrap
                                        }
                                    </div>
                                </div>
                            )}
                            {productData.bubble_schema_base64 && (
                                <div className="relative p-4 border border-black rounded h-max">
                                    <h3 className="mb-2 text-lg font-bold">
                                        Стрейч
                                    </h3>
                                    <img
                                        src={`data:image/png;base64,${productData.bubble_schema_base64}`}
                                        alt="Stretch Wrap Schema"
                                        className="w-full h-[250px]"
                                    />
                                    <div className="absolute left-5 bottom-5 text-start text-[24px]">
                                        {
                                            productData.number_of_labels_of_stretch_film
                                        }
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center justify-between mt-5">
                        <Button danger>Отмена</Button>
                        <Button onClick={handleIsPacked} disabled={isPacked}>
                            Упакованный
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
};
