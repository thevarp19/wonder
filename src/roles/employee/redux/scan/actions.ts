import * as types from "./types";

export const setBoxId = (boxId: number) => ({
    type: types.SET_BOX_ID,
    payload: boxId,
});

export const createScanningCell = (cellId: number) => ({
    type: types.CREATE_SCANNING_CELL,
    payload: cellId,
});

export const addProductToCell = (cellId: number, productId: number) => ({
    type: types.ADD_PRODUCT_TO_CELL,
    payload: { cellId, productId },
});

export const setCurrentCellId = (cellId: number) => ({
    type: types.SET_CURRENT_CELL_ID,
    payload: cellId,
});
