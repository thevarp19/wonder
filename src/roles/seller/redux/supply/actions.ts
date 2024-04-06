import { GetBoxResponse } from "@/modules/box/types";
import { GetProductResponse } from "@/modules/product/types";
import { GetStoreResponse } from "@/modules/store/types";
import { SupplyPack } from "../../types/supply";
import * as types from "./types";

export const addProduct = (product: GetProductResponse): types.AddProducts => {
    return {
        type: types.ADD_PRODUCTS,
        payload: [{ product, quantity: 0 }],
    };
};

export const setProducts = (
    products: GetProductResponse[]
): types.SetProducts => {
    return {
        type: types.SET_PRODUCTS,
        payload: products.map((product) => ({ product, quantity: 0 })),
    };
};

export const updateProductQuantity = (
    id: number,
    quantity: number
): types.UpdateProductQuantity => {
    return {
        type: types.UPDATE_PRODUCT_QUANTITY,
        payload: {
            id,
            quantity,
        },
    };
};

export const removeProduct = (id: number): types.RemoveProducts => {
    return {
        type: types.REMOVE_PRODUCT,
        payload: id,
    };
};

export const saveProducts = (): types.SaveProducts => {
    return {
        type: types.SAVE_PRODUCTS,
    };
};

export const addPack = (pack: SupplyPack, index: number): types.AddPack => {
    return {
        type: types.ADD_PACK,
        payload: {
            pack,
            index,
        },
    };
};

export const createPack = (box: GetBoxResponse): types.CreatePack => {
    return {
        type: types.CREATE_PACK,
        payload: {
            box,
        },
    };
};

export const removePack = (id: string): types.RemovePack => {
    return {
        type: types.REMOVE_PACK,
        payload: id,
    };
};

export const updatePack = (pack: SupplyPack): types.UpdatePack => {
    return {
        type: types.UPDATE_PACK,
        payload: pack,
    };
};

export const setPacks = (packs: SupplyPack[]): types.SetPacks => {
    return {
        type: types.SET_PACKS,
        payload: packs,
    };
};

// export const upgradePacks = (upgrade: (packs: SupplyPack[]) => SupplyPack[]) => {
//     return (dispatch, getState) => {
//         const currentState = getState();
//         const currentPacks = currentState.packs;
//         const modifiedPacks = upgrade(currentPacks);
//         dispatch(setPacks(modifiedPacks));
//     };
// };

export const savePacks = (): types.SavePacks => {
    return {
        type: types.SAVE_PACKS,
    };
};

export const saveDateAndStore = (): types.SaveDateAndStore => {
    return {
        type: types.SAVE_DATE_AND_STORE,
    };
};

export const setStore = (store: GetStoreResponse): types.SetStore => {
    return {
        type: types.SET_STORE,
        payload: store,
    };
};

export const setDate = (date: string): types.SetDate => {
    return {
        type: types.SET_DATE,
        payload: date,
    };
};
