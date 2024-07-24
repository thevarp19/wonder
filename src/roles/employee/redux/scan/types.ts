export interface ScanCell {
    barcode: string;
    products: number[];
}

export interface ScanState {
    boxBarcode: number;
    cells: ScanCell[];
    currentCellBarcode: string | null;
    supplyId: number | null;
}

export const SET_BOX_BARCODE = "SCAN_SET_BOX_BARCODE";
export const SET_SUPPLY_ID = "SCAN_SET_SUPPLY_ID";
export const CREATE_SCANNING_CELL = "SCAN_CREATE_SCANNING_CELL";
export const ADD_PRODUCTS_TO_CELL = "SCAN_ADD_PRODUCTS_TO_CELL";
export const SET_CURRENT_CELL_BARCODE = "SCAN_SET_CURRENT_CELL_BARCODE";
export const RESET_STATE = "RESET_STATE";

export interface SetSupplyId {
    type: typeof SET_SUPPLY_ID;
    payload: number;
}

export interface SetBoxBarCode {
    type: typeof SET_BOX_BARCODE;
    payload: number;
}

export interface CreateScanningCell {
    type: typeof CREATE_SCANNING_CELL;
    payload: string;
}

export interface AddProductsToCell {
    type: typeof ADD_PRODUCTS_TO_CELL;
    payload: {
        cellBarcode: string;
        productBarcode: number[];
    };
}

export interface SetCurrentCellBarCode {
    type: typeof SET_CURRENT_CELL_BARCODE;
    payload: string;
}

export interface ResetState {
    type: typeof RESET_STATE;
}
export type ScanActions =
    | SetBoxBarCode
    | SetSupplyId
    | ResetState
    | CreateScanningCell
    | AddProductsToCell
    | SetCurrentCellBarCode;
