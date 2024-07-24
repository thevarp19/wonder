import { useGetSupplyBox } from "@/modules/supply/queries";
import { GetSupplyProducts } from "@/modules/supply/types";
import { useAppDispatch } from "@/redux/utils";
import * as actions from "@/roles/employee/redux/scan/actions";
import {
    useBoxBarcode,
    useCells,
    useCurrentCell,
} from "@/roles/employee/redux/scan/selectors";
import { ScanCell } from "@/roles/employee/redux/scan/types";
import { Button } from "antd";
import { FC, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useScannerMultipleResults } from "../../hooks";

interface SubmitStepProps {}

function nonScannedProducts(
    supplyProducts: GetSupplyProducts[],
    cells: ScanCell[]
) {
    const scannedProducts: number[] = [];
    cells.forEach((cell) => {
        cell.products.forEach((product) => {
            scannedProducts.push(product);
        });
    });
    return supplyProducts.filter(
        (product) => !scannedProducts.includes(Number(product.id))
    );
}

export const SubmitStep: FC<SubmitStepProps> = ({}) => {
    const productBarcodeList = useScannerMultipleResults();
    const currentCell = useCurrentCell();
    const cells = useCells();
    const boxBarcode = useBoxBarcode();
    const dispatch = useAppDispatch();
    const [_, setSearchParams] = useSearchParams();

    const { data } = useGetSupplyBox(boxBarcode as number);

    useEffect(() => {
        const temp = productBarcodeList
            .map((e) => Number(e))
            .filter((e) => !isNaN(e));

        if (currentCell?.barcode && temp.length) {
            dispatch(actions.addProductsToCell(currentCell.barcode, temp));
        }
    }, []);

    return (
        <div>
            <h2 className="my-2 text-xl font-semibold">Ячейки</h2>
            <div className="flex flex-wrap gap-4">
                {cells.map((cell) => (
                    <ProductsInCell key={cell.barcode} cell={cell} />
                ))}
            </div>
            {data && (
                <div className="flex gap-8">
                    <div>
                        <h2 className="my-2 text-xl font-semibold">
                            Продукты, которые не были отсканированы:{" "}
                            {nonScannedProducts(data, cells).length}
                        </h2>
                        <div className="p-4 mb-4 border-2 border-black w-max">
                            <ul>
                                {nonScannedProducts(data, cells).map(
                                    (product) => (
                                        <li key={product.vendor_code}>
                                            {product.title},{" "}
                                            {product.vendor_code}
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>
                    </div>
                    <a href={`/employee/scan?step=1`} className="mt-10">
                        <Button
                            type="primary"
                            size="large"
                            onClick={() => {
                                setSearchParams({ step: "0" });
                            }}
                        >
                            Начать сканирование
                        </Button>
                    </a>
                </div>
            )}
        </div>
    );
};

function ProductsInCell({ cell }: { cell: ScanCell }) {
    return (
        <div className="w-full max-w-sm p-4 border border-black">
            <p>Штрих-код ячейки: {cell.barcode}</p>
            <p>Продукты:</p>
            <ul>
                {cell.products.map((product) => (
                    <li key={product}>{product}</li>
                ))}
            </ul>
        </div>
    );
}
