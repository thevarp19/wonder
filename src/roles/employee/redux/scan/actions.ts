import * as types from "./types";
export const updateBox = (boxId: number) => ({
    type: types.UPDATE_BOX,
    payload: boxId,
});
