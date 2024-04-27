import { myLocalStorage } from "@/lib/storage/browserStorage";
import * as actionTypes from "./types";

const INITIAL_STATE: actionTypes.ScanState = {
    boxBarcode: myLocalStorage?.get("scan-box-barcode") || null,
    cells: myLocalStorage?.get("scan-cells") || [],
    currentCellBarcode:
        myLocalStorage?.get("scan-current-cell-barcode") || null,
};

export const scanReducer = (
    state = INITIAL_STATE,
    action: actionTypes.ScanActions
): typeof INITIAL_STATE => {
    try {
        switch (action.type) {
            case actionTypes.SET_BOX_BARCODE:
                return {
                    ...state,
                    boxBarcode: action.payload,
                };
            case actionTypes.CREATE_SCANNING_CELL:
                if (
                    state.cells.find((cell) => cell.barcode === action.payload)
                ) {
                    return state;
                }
                return {
                    ...state,
                    cells: [
                        ...state.cells,
                        {
                            barcode: action.payload,
                            products: [],
                        },
                    ],
                    currentCellBarcode: action.payload,
                };
            case actionTypes.ADD_PRODUCTS_TO_CELL:
                return {
                    ...state,
                    cells: state.cells.map((cell) => {
                        if (cell.barcode === action.payload.cellBarcode) {
                            const temp = action.payload.productBarcode.filter(
                                (barcode) => !cell.products.includes(barcode)
                            );
                            return {
                                ...cell,
                                products: [...cell.products, ...temp],
                            };
                        }
                        return cell;
                    }),
                };
            case actionTypes.SET_CURRENT_CELL_BARCODE:
                return {
                    ...state,
                    currentCellBarcode: action.payload,
                };
            default:
                return state;
        }
    } finally {
        myLocalStorage?.set("scan-box-barcode", state.boxBarcode);
        myLocalStorage?.set("scan-cells", state.cells);
        myLocalStorage?.set(
            "scan-current-cell-barcode",
            state.currentCellBarcode
        );
    }
};
