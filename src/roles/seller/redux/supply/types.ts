import { GetBoxResponse } from "@/modules/box/types";
import { GetAvailableStoreResponse } from "@/modules/store/types";
import { ProductQuantity, SupplyPack } from "../../types/supply";

export const ADD_PRODUCTS = "SUPPLY_ADD_PRODUCTS";
export const SET_PRODUCTS = "SUPPLY_SET_PRODUCTS";
export const REMOVE_PRODUCT = "SUPPLY_REMOVE_PRODUCT";
export const UPDATE_PRODUCT_QUANTITY = "SUPPLY_UPDATE_PRODUCT_QUANTITY";
export const SAVE_PRODUCTS = "SUPPLY_SAVE_PRODUCTS";

export const CREATE_PACK = "SUPPLY_CREATE_PACK";
export const ADD_PACK = "SUPPLY_ADD_PACK";
export const REMOVE_PACK = "SUPPLY_REMOVE_PACK";
export const UPDATE_PACK = "SUPPLY_UPDATE_PACK";
export const SAVE_PACKS = "SUPPLY_SAVE_PACKS";
export const SET_PACKS = "SUPPLY_SET_PACKS";

export const SET_STORE = "SUPPLY_SET_STORE";
export const SET_DATE = "SUPPLY_SET_DATE";
export const SAVE_DATE_AND_STORE = "SUPPLY_SAVE_DATE_AND_STORE";

export const RESET = "SUPPLY_RESET";
export const SET_SUPPLY_ID = "SUPPLY_SET_SUPPLY_ID";
export const SET_REPORT_PATH = "SUPPLY_SET_REPORT_PATH";

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
    payload: { index: number; pack: SupplyPack };
}

export interface CreatePack {
    type: typeof CREATE_PACK;
    payload: {
        box: GetBoxResponse;
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

export interface SavePacks {
    type: typeof SAVE_PACKS;
}

export interface SetPacks {
    type: typeof SET_PACKS;
    payload: SupplyPack[];
}

export interface SetStore {
    type: typeof SET_STORE;
    payload: GetAvailableStoreResponse;
}

export interface SetDate {
    type: typeof SET_DATE;
    payload: string;
}

export interface SaveDateAndStore {
    type: typeof SAVE_DATE_AND_STORE;
}

export interface Reset {
    type: typeof RESET;
}

export interface SetSupplyId {
    type: typeof SET_SUPPLY_ID;
    payload: number;
}

export interface SetReportPath {
    type: typeof SET_REPORT_PATH;
    payload: string;
}

export type SupplyActions =
    | AddProducts
    | UpdateProductQuantity
    | RemoveProducts
    | SetProducts
    | AddPack
    | CreatePack
    | RemovePack
    | UpdatePack
    | SaveProducts
    | SavePacks
    | SetStore
    | SetDate
    | SaveDateAndStore
    | Reset
    | SetSupplyId
    | SetReportPath;
