import { useAppDispatch } from "@/redux/utils";
import * as actions from "@/roles/employee/redux/scan/actions";
import {
    useCells,
    useCurrentCell,
} from "@/roles/employee/redux/scan/selectors";
import { ScanCell } from "@/roles/employee/redux/scan/types";
import { FC, useEffect } from "react";
import { useScannerMultipleResults } from "../../hooks";

interface SubmitStepProps {}

export const SubmitStep: FC<SubmitStepProps> = ({}) => {
    const productBarcodeList = useScannerMultipleResults();
    const currentCell = useCurrentCell();
    const cells = useCells();
    const dispatch = useAppDispatch();

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
            <h1>Scanned products</h1>
            <ul>
                {productBarcodeList.map((barcode) => (
                    <li key={barcode}>{barcode}</li>
                ))}
            </ul>
            <h1>Cells</h1>
            <div className="flex flex-wrap gap-4">
                {cells.map((cell) => (
                    <ProductsInCell key={cell.barcode} cell={cell} />
                ))}
            </div>
        </div>
    );
};

function ProductsInCell({ cell }: { cell: ScanCell }) {
    return (
        <div className="w-full max-w-sm p-4 border border-black">
            <p>Cell barcode: {cell.barcode}</p>
            <p>Products:</p>
            <ul>
                {cell.products.map((product) => (
                    <li key={product}>{product}</li>
                ))}
            </ul>
        </div>
    );
}
