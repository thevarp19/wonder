import { acceptProductsMutation } from "@/modules/scan/mutations";
import { useGetScanInfo } from "@/modules/scan/queries";
import { GetScanInfo } from "@/modules/scan/types";
import { App, Checkbox, Input } from "antd";
import { FC, useEffect, useState } from "react";

interface ScanPageProps {}

export const ScanPage: FC<ScanPageProps> = ({}) => {
    const [barcode, setBarcode] = useState<string>("");
    const [defective, setDefective] = useState<boolean>(false);
    const [boxInfo, setBoxInfo] = useState<GetScanInfo | null>(null);
    const { message } = App.useApp();
    const mutation = acceptProductsMutation();
    const { refetch } = useGetScanInfo(barcode);

    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            if (event.key === "Enter") {
                handleBarcodeScan();
            } else {
                setBarcode((prevBarcode) => prevBarcode + event.key);
            }
        };

        window.addEventListener("keypress", handleKeyPress);

        return () => {
            window.removeEventListener("keypress", handleKeyPress);
        };
    }, [barcode]);

    const handleBarcodeScan = async () => {
        if (barcode.startsWith("B") || (barcode.startsWith("P") && !boxInfo)) {
            const result = await refetch();
            if (result.data) {
                setBoxInfo(result.data);
            }
        } else if (barcode.startsWith("P") && boxInfo) {
            console.log("Attempting to accept product:", {
                barcode,
                defective,
            });

            mutation.mutate(
                { barcode, defective: defective ? 1 : 0 },
                {
                    onSuccess: () => {
                        console.log("Product accepted successfully.");
                    },
                    onError: (error) => {
                        console.error("Error accepting product:", error);
                        message.error(
                            "Ошибка при принятии продукта. Пожалуйста, попробуйте снова."
                        );
                    },
                }
            );
        }

        setBarcode("");
    };

    return (
        <div className="min-h-full p-4 bg-white rounded-t-sm">
            <h2 className="pb-2 text-lg font-semibold">Сканирование</h2>

            {boxInfo ? (
                <div>
                    <div className="grid grid-cols-2 gap-4 mb-4 text-base">
                        <div>
                            <p>
                                Номер поставки:{" "}
                                <strong>{boxInfo.supply}</strong>
                            </p>
                            <p>
                                Название магазина:{" "}
                                <strong>{boxInfo.store_name}</strong>
                            </p>
                            <p>
                                Кол-во продуктов:{" "}
                                <strong>{boxInfo.product_count}</strong>
                            </p>
                            <p>
                                Кол-во артикулов:{" "}
                                <strong>{boxInfo.vendor_code_count}</strong>
                            </p>
                            <p>
                                Кол-во коробок:{" "}
                                <strong>{boxInfo.supply_box_count}</strong>
                            </p>
                        </div>
                        <div>
                            <p>
                                Номер коробки:{" "}
                                <strong>{boxInfo.supply_box_id}</strong>
                            </p>
                            <p>Продукты:</p>
                            <ul>
                                {boxInfo.products.map((product, index) => (
                                    <li key={index}>
                                        {product.product_name}:{" "}
                                        <strong>{product.count}</strong>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="mb-4">
                        <Checkbox
                            checked={defective}
                            onChange={(e) => setDefective(e.target.checked)}
                        >
                            Бракованный
                        </Checkbox>
                    </div>
                </div>
            ) : (
                <p>Отсканируйте коробку для получения информации.</p>
            )}

            <div className="flex items-center justify-center w-full h-full">
                <div className="w-96 h-96">
                    <Input
                        disabled
                        value={barcode}
                        readOnly
                        onChange={() => {}}
                        placeholder="Сканируйте штрих-код"
                    />
                </div>
            </div>
        </div>
    );
};
