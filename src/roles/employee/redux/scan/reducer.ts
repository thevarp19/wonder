import * as actionTypes from "./types";

const INITIAL_STATE: actionTypes.ScanState = {
    boxId: null,
    cells: [],
    currentCellId: null,
};

export const scanReducer = (
    state = INITIAL_STATE,
    action: actionTypes.ScanActions
): typeof INITIAL_STATE => {
    switch (action.type) {
        case actionTypes.SET_BOX_ID:
            return {
                ...state,
                boxId: action.payload,
            };
        case actionTypes.CREATE_SCANNING_CELL:
            if (state.cells.find((cell) => cell.id === action.payload)) {
                return state;
            }
            return {
                ...state,
                cells: [
                    ...state.cells,
                    {
                        id: action.payload,
                        products: [],
                    },
                ],
            };
        case actionTypes.ADD_PRODUCT_TO_CELL:
            return {
                ...state,
                cells: state.cells.map((cell) => {
                    if (cell.id === action.payload.cellId) {
                        if (cell.products.includes(action.payload.productId)) {
                            return cell;
                        }
                        return {
                            ...cell,
                            products: [
                                ...cell.products,
                                action.payload.productId,
                            ],
                        };
                    }
                    return cell;
                }),
            };
        case actionTypes.SET_CURRENT_CELL_ID:
            return {
                ...state,
                currentCellId: action.payload,
            };
        default:
            return state;
    }
};
