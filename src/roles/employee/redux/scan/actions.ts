import * as types from "./types";

export const setBoxBarcode = (boxBarcode: number): types.SetBoxBarCode => ({
    type: types.SET_BOX_BARCODE,
    payload: boxBarcode,
});

export const setSupplyId = (SupplyId: number): types.SetSupplyId => ({
    type: types.SET_SUPPLY_ID,
    payload: SupplyId,
});

export const createScanningCell = (
    cellBarcode: string
): types.CreateScanningCell => ({
    type: types.CREATE_SCANNING_CELL,
    payload: cellBarcode,
});

export const addProductsToCell = (
    cellBarcode: string,
    productBarcode: number[]
): types.AddProductsToCell => ({
    type: types.ADD_PRODUCTS_TO_CELL,
    payload: { cellBarcode, productBarcode },
});

export const setCurrentCellBarcode = (
    cellBarcode: string
): types.SetCurrentCellBarCode => ({
    type: types.SET_CURRENT_CELL_BARCODE,
    payload: cellBarcode,
});
export const resetState = (): types.ResetState => ({
    type: types.RESET_STATE,
});
