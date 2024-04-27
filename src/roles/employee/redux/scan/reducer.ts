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
    let newState = state;
    switch (action.type) {
        case actionTypes.SET_BOX_BARCODE:
            newState = {
                ...state,
                boxBarcode: action.payload,
            };
            break;
        case actionTypes.CREATE_SCANNING_CELL:
            if (state.cells.find((cell) => cell.barcode === action.payload)) {
                newState = state;
                break;
            }
            newState = {
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
            break;
        case actionTypes.ADD_PRODUCTS_TO_CELL:
            newState = {
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
            break;
        case actionTypes.SET_CURRENT_CELL_BARCODE:
            newState = {
                ...state,
                currentCellBarcode: action.payload,
            };
            break;
        default:
            newState = state;
    }
    saveState(newState);
    return newState;
};

function saveState(state: actionTypes.ScanState) {
    myLocalStorage?.set("scan-box-barcode", state.boxBarcode);
    myLocalStorage?.set("scan-cells", state.cells);
    myLocalStorage?.set("scan-current-cell-barcode", state.currentCellBarcode);
}
