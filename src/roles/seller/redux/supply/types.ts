import { GetBoxResponse } from "@/modules/box/types";
import { GetStoreResponse } from "@/modules/store/types";
import { ProductQuantity, SupplyPack } from "../../types/supply";

export const ADD_PRODUCTS = "SUPPLY_ADD_PRODUCTS";
export const SET_PRODUCTS = "SUPPLY_SET_PRODUCTS";
export const REMOVE_PRODUCT = "SUPPLY_REMOVE_PRODUCT";
export const UPDATE_PRODUCT_QUANTITY = "SUPPLY_UPDATE_PRODUCT_QUANTITY";
export const SAVE_PRODUCTS = "SUPPLY_SAVE_PRODUCTS";

export const ADD_PACK = "SUPPLY_ADD_PACK";
export const REMOVE_PACK = "SUPPLY_REMOVE_PACK";
export const UPDATE_PACK = "SUPPLY_UPDATE_PACK";
export const SAVE_PACK = "SUPPLY_SAVE_PACK";

export interface SetProducts {
    type: typeof SET_PRODUCTS;
    payload: ProductQuantity[];
}

export interface AddProducts {
    type: typeof ADD_PRODUCTS;
    payload: ProductQuantity[];
}

export interface UpdateProductQuantity {
    type: typeof UPDATE_PRODUCT_QUANTITY;
    payload: {
        id: number;
        quantity: number;
    };
}

export interface RemoveProducts {
    type: typeof REMOVE_PRODUCT;
    payload: number;
}

export interface SaveProducts {
    type: typeof SAVE_PRODUCTS;
}

export interface AddPack {
    type: typeof ADD_PACK;
    payload: {
        products: ProductQuantity[];
        store: GetStoreResponse;
        box: GetBoxResponse;
        data: string;
    };
}

export interface RemovePack {
    type: typeof REMOVE_PACK;
    payload: string;
}

export interface UpdatePack {
    type: typeof UPDATE_PACK;
    payload: SupplyPack;
}

export interface SavePack {
    type: typeof SAVE_PACK;
}

export type SupplyActions =
    | AddProducts
    | UpdateProductQuantity
    | RemoveProducts
    | SetProducts
    | AddPack
    | RemovePack
    | UpdatePack
    | SaveProducts
    | SavePack;
