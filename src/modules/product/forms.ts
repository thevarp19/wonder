import { formatPrice } from "@/utils/shared.util";
import { useReducer } from "react";

export interface ProductCityPriceChangeState {
    productId: number;
    productName: string;
    cityId: number;
    cityName: string;
    newPrice: number;
    prevPrice: number;
}

export interface ProductMainPriceChangeState {
    productId: number;
    productName: string;
    mainCityId: number;
    mainCityName: string;
}

export interface ProductPriceChangeState {
    cityPrices: ProductCityPriceChangeState[];
    mainPrices: ProductMainPriceChangeState[];
}

const initialState: ProductPriceChangeState = {
    cityPrices: [],
    mainPrices: [],
};

type ProductPriceChangeAction =
    | { type: "ADD_CITY_PRICE_CHANGE"; payload: ProductCityPriceChangeState }
    | { type: "ADD_MAIN_PRICE_CHANGE"; payload: ProductMainPriceChangeState };

export function getPriceChanges(state: ProductPriceChangeState): string[] {
    const productCityPriceMap = new Map<
        number,
        ProductCityPriceChangeState[]
    >();
    state.cityPrices.forEach((cityPrice) => {
        if (!productCityPriceMap.has(cityPrice.productId)) {
            productCityPriceMap.set(cityPrice.productId, []);
        }
        productCityPriceMap.get(cityPrice.productId)?.push(cityPrice);
    });
    console.log(productCityPriceMap);

    const cityPriceChanges: string[] = [];
    for (const [_, cityPrices] of productCityPriceMap) {
        const priceChanges = cityPrices
            .map(
                (cityPrice) =>
                    `${cityPrice.productName}: ${
                        cityPrice.cityName
                    } ${formatPrice(cityPrice.prevPrice)} KZT -> ${formatPrice(
                        cityPrice.newPrice
                    )} KZT`
            )
            .join("; ");
        cityPriceChanges.push(priceChanges);
    }

    const mainPriceChanges: string[] = state.mainPrices.map(
        (mainPrice) =>
            `${mainPrice.productName}:  Main city price -> ${mainPrice.mainCityName}`
    );

    return [...cityPriceChanges, ...mainPriceChanges];
}

function reducer(
    state: ProductPriceChangeState,
    action: ProductPriceChangeAction
): ProductPriceChangeState {
    switch (action.type) {
        case "ADD_CITY_PRICE_CHANGE":
            const prevRecord = state.cityPrices.find(
                (cityPrice) =>
                    cityPrice.productId == action.payload.productId &&
                    cityPrice.cityId == action.payload.cityId
            );
            const prevCityPrices = state.cityPrices.filter(
                (cityPrice) =>
                    !(
                        cityPrice.productId === action.payload.productId &&
                        cityPrice.cityId === action.payload.cityId
                    )
            );
            return {
                ...state,
                cityPrices: [
                    ...prevCityPrices,
                    {
                        ...action.payload,
                        prevPrice:
                            prevRecord?.prevPrice || action.payload.prevPrice,
                    },
                ],
            };
        case "ADD_MAIN_PRICE_CHANGE":
            const prevMainPrices = state.mainPrices.filter(
                (mainPrice) => mainPrice.productId !== action.payload.productId
            );
            return {
                ...state,
                mainPrices: [
                    ...prevMainPrices,
                    {
                        ...action.payload,
                    },
                ],
            };
        default:
            return state;
    }
}

export const useProductPricesChange = () => {
    const [state, dispatch] = useReducer<
        (
            prev: ProductPriceChangeState,
            action: ProductPriceChangeAction
        ) => ProductPriceChangeState
    >(reducer, initialState);

    function addCityPriceChange(cityPrice: ProductCityPriceChangeState) {
        dispatch({ type: "ADD_CITY_PRICE_CHANGE", payload: cityPrice });
    }

    function addMainPriceChange(mainPrice: ProductMainPriceChangeState) {
        dispatch({ type: "ADD_MAIN_PRICE_CHANGE", payload: mainPrice });
    }

    return { state, dispatch, addCityPriceChange, addMainPriceChange };
};
