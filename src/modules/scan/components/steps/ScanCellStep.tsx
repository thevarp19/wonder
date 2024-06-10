import { useGetSupplyBox } from "@/modules/supply/queries";
import { SupplyBoxProduct } from "@/modules/supply/types";
import { useAppDispatch } from "@/redux/utils";
import * as actions from "@/roles/employee/redux/scan/actions";
import { useBoxBarcode } from "@/roles/employee/redux/scan/selectors";
import { App, Button } from "antd";
import { FC, useEffect } from "react";
import { useScannerResults } from "../../hooks";
import { toScanCell } from "../../utils";

interface ScanCellStepProps {}

function groupBoxProducts(
    products: SupplyBoxProduct[]
): { product: SupplyBoxProduct; count: number }[] {
    const result: { product: SupplyBoxProduct; count: number }[] = [];
    products.forEach((product) => {
        const existingProduct = result.find(
            (item) => item.product.vendorCode === product.vendorCode
        );
        if (existingProduct) {
            existingProduct.count++;
        } else {
            result.push({ product, count: 1 });
        }
    });
    return result;
}

export const ScanCellStep: FC<ScanCellStepProps> = ({}) => {
    const boxBarcodeInUrlRaw = useScannerResults();
    const boxBarcodeInUrlParsed = Number(boxBarcodeInUrlRaw);
    const boxBarcodeInUrl = isNaN(boxBarcodeInUrlParsed)
        ? null
        : boxBarcodeInUrlParsed;
    const boxBarcode = useBoxBarcode();
    const dispatch = useAppDispatch();
    const { data, isError } = useGetSupplyBox(boxBarcode as number);
    useEffect(() => {
        if (boxBarcodeInUrl) {
            dispatch(actions.setBoxBarcode(boxBarcodeInUrl));
        }
    }, [boxBarcodeInUrl]);
    const { message } = App.useApp();
    useEffect(() => {
        if (isError) {
            message.error("Неверный идентификатор коробки", 3);
        }
    }, [isError]);
    return (
        <div>
            <p>Штрих-код коробки: {boxBarcode}</p>
            {data && (
                <div className="p-4 border-2 border-black w-max">
                    <p>Продукты в коробке:</p>
                    <ul>
                        {groupBoxProducts(data.products).map((product) => (
                            <li key={product.product.article}>
                                {product.product.name}, {product.count} шт.
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <Button
                size="large"
                type="primary"
                className="my-4"
                onClick={toScanCell}
            >
                Сканировать ячейку
            </Button>
        </div>
    );
};
