import { useAppSelector } from "@/redux/utils";

export const useBoxBarcode = () => {
    return useAppSelector((state) => state.employee.scan.boxBarcode);
};

export const useCells = () => {
    const cells = useAppSelector((state) => state.employee.scan.cells);
    return cells;
};

export const useCurrentCell = () => {
    const cells = useCells();
    const currentCellBarcode = useAppSelector(
        (state) => state.employee.scan.currentCellBarcode
    );

    return cells.find((cell) => cell.barcode === currentCellBarcode) || null;
};
