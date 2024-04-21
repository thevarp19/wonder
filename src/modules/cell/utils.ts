import { padNumbers } from "@/utils/shared.util";
import { GetCellResponse } from "./types";

export function getCellCode(cell: GetCellResponse, storeNumber: string) {
    const row = padNumbers(cell.row, 3),
        col = padNumbers(cell.col, 3),
        cellNum = padNumbers(cell.cell, 3);
    return `${storeNumber}${row}${col}${cellNum}`;
}
