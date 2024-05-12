export interface ScanCell {
    barcode: number;
    products: number[];
}

export interface ScanState {
    boxBarcode: number | null;
    cells: ScanCell[];
    currentCellBarcode: number | null;
    supplyId: number | null;
}

export const SET_BOX_BARCODE = "SCAN_SET_BOX_BARCODE";
export const SET_SUPPLY_ID = "SCAN_SET_SUPPLY_ID";
export const CREATE_SCANNING_CELL = "SCAN_CREATE_SCANNING_CELL";
export const ADD_PRODUCTS_TO_CELL = "SCAN_ADD_PRODUCTS_TO_CELL";
export const SET_CURRENT_CELL_BARCODE = "SCAN_SET_CURRENT_CELL_BARCODE";

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
    payload: number;
}

export interface AddProductsToCell {
    type: typeof ADD_PRODUCTS_TO_CELL;
    payload: {
        cellBarcode: number;
        productBarcode: number[];
    };
}

export interface SetCurrentCellBarCode {
    type: typeof SET_CURRENT_CELL_BARCODE;
    payload: number;
}

export type ScanActions =
    | SetBoxBarCode
    | SetSupplyId
    | CreateScanningCell
    | AddProductsToCell
    | SetCurrentCellBarCode;
