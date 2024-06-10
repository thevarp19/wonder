import { useAppDispatch } from "@/redux/utils";
import * as actions from "@/roles/employee/redux/scan/actions";
import { useCurrentCell } from "@/roles/employee/redux/scan/selectors";
import { Button } from "antd";
import { FC, useEffect } from "react";
import { useScannerResults } from "../../hooks";
import { toScanProducts } from "../../utils";

interface ScanProductsStepProps {}

export const ScanProductsStep: FC<ScanProductsStepProps> = ({}) => {
    const cellBarcodeInUrl = useScannerResults();

    const cellBarcode = useCurrentCell()?.barcode;
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (cellBarcodeInUrl) {
            dispatch(actions.createScanningCell(cellBarcodeInUrl));
        }
    }, [cellBarcodeInUrl]);
    return (
        <div>
            <p>Текущий штрих-код ячейки: {cellBarcode}</p>
            <Button
                size="large"
                type="primary"
                className="my-4"
                onClick={toScanProducts}
            >
                Сканировать товары
            </Button>
        </div>
    );
};
