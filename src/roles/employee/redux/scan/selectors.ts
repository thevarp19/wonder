import { useAppSelector } from "@/redux/utils";

export const useBoxId = () => {
    return useAppSelector((state) => state.employee.scan.boxId);
};

export const useCells = () => {
    const cells = useAppSelector((state) => state.employee.scan.cells);
    return cells;
};

export const useCurrentCell = () => {
    const cells = useCells();
    const currentCellId = useAppSelector(
        (state) => state.employee.scan.currentCellId
    );

    return cells.find((cell) => cell.id === currentCellId) || null;
};
