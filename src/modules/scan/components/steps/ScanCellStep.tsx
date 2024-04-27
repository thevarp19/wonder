import { useAppDispatch } from "@/redux/utils";
import * as actions from "@/roles/employee/redux/scan/actions";
import { useBoxBarcode } from "@/roles/employee/redux/scan/selectors";
import { Button } from "antd";
import { FC, useEffect } from "react";
import { useScannerResults } from "../../hooks";
import { toScanCell } from "../../utils";

interface ScanCellStepProps {}

export const ScanCellStep: FC<ScanCellStepProps> = ({}) => {
    const boxBarcodeInUrlRaw = useScannerResults();
    const boxBarcodeInUrlParsed = Number(boxBarcodeInUrlRaw);
    const boxBarcodeInUrl = isNaN(boxBarcodeInUrlParsed)
        ? null
        : boxBarcodeInUrlParsed;
    const boxBarcode = useBoxBarcode();
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (!boxBarcode && boxBarcodeInUrl) {
            dispatch(actions.setBoxBarcode(boxBarcodeInUrl));
        }
    }, [boxBarcodeInUrl]);
    return (
        <div>
            <p>Box barcode: {boxBarcode}</p>
            <Button
                size="large"
                type="primary"
                className="my-4"
                onClick={toScanCell}
            >
                Scan cell
            </Button>
        </div>
    );
};
