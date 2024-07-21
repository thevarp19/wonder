import { myLocalStorage } from "@/lib/storage/browserStorage";
import { GetAvailableStoreResponse } from "@/modules/store/types";
import { v4 as uuidv4 } from "uuid";
import { ProductQuantity, SupplyPack } from "../../types/supply";
import * as types from "./types";

export interface SupplyState {
    sellerId: number | null;
    products: ProductQuantity[];
    packs: SupplyPack[];
    store: GetAvailableStoreResponse | null;
    date: string | null;
    supplyServerId: number | null;
    pathToReport?: string;
}

const INITIAL_STATE: SupplyState = {
    sellerId: myLocalStorage?.get("supply-seller-id") || null,
    products: myLocalStorage?.get("supply-products") || [],
    packs: myLocalStorage?.get("supply-packs") || [],
    store: myLocalStorage?.get("supply-store") || null,
    date: myLocalStorage?.get("supply-date") || null,
    supplyServerId: myLocalStorage?.get("supply-server-id") || null,
};

export const sellerSupplyReducer = (
    state: SupplyState = INITIAL_STATE,
    action: types.SupplyActions
): SupplyState => {
    switch (action.type) {
        case types.RESET:
            myLocalStorage?.remove("supply-products");
            myLocalStorage?.remove("supply-seller-id");
            myLocalStorage?.remove("supply-packs");
            myLocalStorage?.remove("supply-store");
            myLocalStorage?.remove("supply-date");
            myLocalStorage?.remove("supply-server-id");
            return {
                sellerId: 0,
                products: [],
                packs: [],
                store: null,
                date: null,
                supplyServerId: null,
            };
        case types.SET_SUPPLY_ID:
            myLocalStorage?.set("supply-server-id", action.payload);
            return { ...state, supplyServerId: action.payload };

        case types.ADD_PRODUCTS:
            return {
                ...state,
                products: [...state.products, ...action.payload],
            };
        case types.REMOVE_PRODUCT:
            return {
                ...state,
                products: state.products.filter(
                    (product) => product.product.id !== action.payload
                ),
            };
        case types.UPDATE_PRODUCT_QUANTITY:
            return {
                ...state,
                products: state.products.map((product) =>
                    product.product.id === action.payload.id
                        ? { ...product, quantity: action.payload.quantity }
                        : product
                ),
            };
        case types.SET_PRODUCTS:
            return { ...state, products: action.payload };
        case types.SET_REPORT_PATH:
            return { ...state, pathToReport: action.payload };
        case types.ADD_PACK:
            const newPacks = [
                ...state.packs.slice(0, action.payload.index),
                action.payload.pack,
                ...state.packs.slice(action.payload.index),
            ];
            return {
                ...state,
                packs: newPacks,
            };
        case types.CREATE_PACK:
            return {
                ...state,
                packs: [
                    ...state.packs,
                    { ...action.payload, products: [], id: uuidv4() },
                ],
            };
        case types.REMOVE_PACK:
            return {
                ...state,
                packs: state.packs.filter((pack) => pack.id !== action.payload),
            };
        case types.UPDATE_PACK:
            return {
                ...state,
                packs: state.packs.map((pack) =>
                    pack.id === action.payload.id ? action.payload : pack
                ),
            };
        case types.SAVE_PRODUCTS:
            myLocalStorage?.set("supply-products", state.products);
            return state;
        case types.SAVE_PACKS:
            myLocalStorage?.set("supply-packs", state.packs);
            return state;
        case types.SAVE_DATE_AND_STORE:
            myLocalStorage?.set("supply-store", state.store);
            myLocalStorage?.set("supply-date", state.date);
            return state;
        case types.SET_STORE:
            console.log("SET_STORE", state);

            return { ...state, store: action.payload };
        case types.SET_DATE:
            return { ...state, date: action.payload };
        default:
            return state;
    }
};
