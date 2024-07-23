import { padNumbers } from "@/utils/shared.util";
import JsBarcode from "jsbarcode";
import { GetCellResponse } from "./types";

export function getCellCode(cell: GetCellResponse, storeNumber: number) {
    const row = padNumbers(cell.row, 3),
        storeId = padNumbers(storeNumber, 3),
        col = padNumbers(cell.col, 3),
        cellNum = padNumbers(cell.line, 3);
    return `${storeId}${row}${col}${cellNum}`;
}

export function mapCreateCellToUpdate(cell: GetCellResponse) {
    return {
        ...cell,
    };
}
export function generateBarcodeBase64(text: string, options = {}) {
    const canvas = document.createElement("canvas");

    JsBarcode(canvas, text, {
        format: "CODE128",
        lineColor: "#000",
        width: 2,
        height: 100,
        displayValue: true,
        ...options,
    });

    return canvas.toDataURL("image/png");
}
