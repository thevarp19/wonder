import { placementProductsMutation } from "@/modules/scan/mutations";
import { useGetScanCellInfo } from "@/modules/scan/queries";
import { GetCellInfo } from "@/modules/scan/types";
import { App, Input } from "antd";
import { FC, useEffect, useState } from "react";

interface EmployeePlacementPageProps {}

export const EmployeePlacementPage: FC<EmployeePlacementPageProps> = ({}) => {
    const [barcode, setBarcode] = useState<string>("");
    const [cellBarcode, setCellBarcode] = useState<string>("");
    const [scanningCell, setScanningCell] = useState<boolean>(true);
    const [cellInfo, setCellInfo] = useState<GetCellInfo | null>(null);
    const { message } = App.useApp();
    const mutation = placementProductsMutation();

    const { refetch: fetchCellInfo } = useGetScanCellInfo(cellBarcode);

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
    useEffect(() => {
        const fetchInfo = async () => {
            if (cellBarcode) {
                const result = await fetchCellInfo();
                if (result?.data) {
                    setCellInfo(result.data);
                    setScanningCell(false);
                    message.success("Ячейка успешно отсканирована!");
                } else {
                    message.error("Ячейка не найдена!");
                }
            }
        };
        fetchInfo();
    }, [cellBarcode, fetchCellInfo]);

    const handleBarcodeScan = () => {
        if (isCellBarcode(barcode)) {
            setCellBarcode(barcode);
        } else if (!scanningCell && cellInfo) {
            mutation.mutate(
                { cellId: cellInfo.id, barcode },
                {
                    onSuccess: async () => {
                        const updatedCellInfo = await fetchCellInfo();
                        if (updatedCellInfo?.data) {
                            setCellInfo(updatedCellInfo.data);
                        }
                    },
                }
            );
        } else {
            message.error("Сначала отсканируйте ячейку!");
        }

        setBarcode("");
    };

    const isCellBarcode = (barcode: string) => {
        return barcode.startsWith("C");
    };

    return (
        <div className="min-h-full p-4 bg-white rounded-t-sm">
            <h2 className="pb-2 text-lg font-semibold">Сканирование</h2>

            {cellInfo ? (
                <div className="flex flex-col items-center gap-2">
                    <div className="grid grid-cols-2 gap-4 p-5 mb-4 text-base border border-black rounded-md w-max">
                        <div>
                            <p>
                                Номер ячейки: <strong>{cellInfo.id}</strong>
                            </p>
                            <p>
                                Ряд: <strong>{cellInfo.row}</strong>
                            </p>
                            <p>
                                Этаж: <strong>{cellInfo.line}</strong>
                            </p>
                            <p>
                                Колонна: <strong>{cellInfo.col}</strong>
                            </p>
                            <p>
                                Комментарии: <strong>{cellInfo.comment}</strong>
                            </p>
                        </div>
                        <div>
                            <p>
                                Ширина: <strong>{cellInfo.width} см</strong>
                            </p>
                            <p>
                                Глубина: <strong>{cellInfo.length} см</strong>
                            </p>
                            <p>
                                Высота: <strong>{cellInfo.height} см</strong>
                            </p>
                        </div>
                    </div>

                    <div className="p-1 border border-black rounded-md md:p-5 w-max">
                        {cellInfo.products.length > 0 ? (
                            <table>
                                <thead>
                                    <tr className="">
                                        <th>Номер товара</th>
                                        <th>Название</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cellInfo.products.map(
                                        (product: {
                                            id: number;
                                            title: string;
                                        }) => (
                                            <tr key={product.id}>
                                                <td>{product.id}</td>
                                                <td>{product.title}</td>
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            </table>
                        ) : (
                            <p>Пусто</p>
                        )}
                    </div>
                </div>
            ) : (
                <p>Отсканируйте ячейку для получения информации.</p>
            )}
            <div className="flex items-center justify-center w-full h-full mt-5">
                <div className="pb-10 w-96">
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
