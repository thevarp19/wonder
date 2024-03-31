import { GetBoxResponse } from "@/modules/box/types";
import { GetProductResponse } from "@/modules/product/types";
import { GetStoreResponse } from "@/modules/store/types";
import { ProductQuantity, SupplyPack } from "../../types/supply";
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

export const addPack = (
    products: ProductQuantity[],
    store: GetStoreResponse,
    box: GetBoxResponse
): types.AddPack => {
    return {
        type: types.ADD_PACK,
        payload: {
            products,
            store,
            box,
            data: "",
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

export const savePack = (): types.SavePack => {
    return {
        type: types.SAVE_PACK,
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
