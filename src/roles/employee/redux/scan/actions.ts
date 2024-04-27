import * as types from "./types";

export const setBoxBarcode = (boxBarcode: number) => ({
    type: types.SET_BOX_BARCODE,
    payload: boxBarcode,
});

export const createScanningCell = (cellBarcode: number) => ({
    type: types.CREATE_SCANNING_CELL,
    payload: cellBarcode,
});

export const addProductsToCell = (
    cellBarcode: number,
    productBarcode: number
) => ({
    type: types.ADD_PRODUCTS_TO_CELL,
    payload: { cellBarcode, productBarcode },
});

export const setCurrentCellBarcode = (cellBarcode: number) => ({
    type: types.SET_CURRENT_CELL_BARCODE,
    payload: cellBarcode,
});
