import { acceptProductsMutation } from "@/modules/scan/mutations";
import { useGetScanInfo } from "@/modules/scan/queries";
import { GetScanInfo } from "@/modules/scan/types";
import { Button, Checkbox, Input } from "antd";
import { FC, useState } from "react";

interface EmployeeAcceptancePageProps {}

export const EmployeeAcceptancePage: FC<EmployeeAcceptancePageProps> = ({}) => {
    const [barcode, setBarcode] = useState<string>("");
    const [defective, setDefective] = useState<boolean>(false);
    const [boxInfo, setBoxInfo] = useState<GetScanInfo | null>(null);

    const mutation = acceptProductsMutation();
    const { refetch } = useGetScanInfo(barcode);

    const handleBarcodeScan = async () => {
        if (barcode.startsWith("B") || (barcode.startsWith("P") && !boxInfo)) {
            const result = await refetch();
            if (result.data) {
                setBoxInfo(result.data);
            }
        } else if (barcode.startsWith("P") && boxInfo) {
            mutation.mutate({ barcode, defective, supplyId: boxInfo.supply });
        }

        setBarcode("");
    };

    return (
        <div className="min-h-full p-4 bg-white rounded-t-sm">
            <h2 className="pb-2 text-lg font-semibold">Сканирование</h2>

            {boxInfo ? (
                <div className="p-5 border border-black rounded-lg">
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

                    <div className="flex justify-center mb-4">
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

            <div className="flex flex-col items-center w-full h-full mt-10">
                <div className="flex gap-5 mb-4 w-96">
                    <Input
                        value={barcode}
                        onChange={(e) => setBarcode(e.target.value)}
                        placeholder="Введите штрих-код"
                    />
                    <Button type="primary" onClick={handleBarcodeScan}>
                        Ввод
                    </Button>
                </div>
            </div>
        </div>
    );
};
