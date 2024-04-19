export interface ScanState {
    boxId: number | null;
    cells: {
        id: number;
        products: number[];
    }[];
    currentCellId: number | null;
}

export const SET_BOX_ID = "SCAN_SET_BOX_ID";
export const CREATE_SCANNING_CELL = "SCAN_CREATE_SCANNING_CELL";
export const ADD_PRODUCT_TO_CELL = "SCAN_ADD_PRODUCT_TO_CELL";
export const SET_CURRENT_CELL_ID = "SCAN_SET_CURRENT_CELL_ID";

export interface SetBoxId {
    type: typeof SET_BOX_ID;
    payload: number;
}

export interface CreateScanningCell {
    type: typeof CREATE_SCANNING_CELL;
    payload: number;
}

export interface AddProductToCell {
    type: typeof ADD_PRODUCT_TO_CELL;
    payload: {
        cellId: number;
        productId: number;
    };
}

export interface SetCurrentCellId {
    type: typeof SET_CURRENT_CELL_ID;
    payload: number;
}

export type ScanActions =
    | SetBoxId
    | CreateScanningCell
    | AddProductToCell
    | SetCurrentCellId;
