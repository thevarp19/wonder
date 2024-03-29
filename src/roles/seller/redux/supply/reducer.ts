import { myLocalStorage } from "@/lib/storage/browserStorage";
import { ProductQuantity, SupplyPack } from "../../types/supply";
import * as types from "./types";

interface SupplyState {
    products: ProductQuantity[];
    packs: SupplyPack[];
}

const INITIAL_STATE: SupplyState = {
    products: myLocalStorage?.get("supply-products") || [],
    packs: myLocalStorage?.get("supply-packs") || [],
};

export const sellerSupplyReducer = (
    state: SupplyState = INITIAL_STATE,
    action: types.SupplyActions
): SupplyState => {
    switch (action.type) {
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
        case types.ADD_PACK:
            return {
                ...state,
                packs: [
                    ...state.packs,
                    { ...action.payload, id: `${state.packs.length}` },
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
        case types.SAVE_PACK:
            myLocalStorage?.set("supply-packs", state.packs);
            return state;
        default:
            return state;
    }
};
