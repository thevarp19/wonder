import { formatPrice } from "@/utils/shared.util";
import { useFormik } from "formik";
import { useEffect, useReducer } from "react";
import { UpdateProductSizeRequest } from "../store/types";
import {
    autoUploadDataMutation,
    createProductSizeMutation,
    updateProductSizeMutation,
} from "./mutations";

import { LoginRequest } from "../auth/types";
import { ChangeProductPriceRequest, ProductSizes } from "./types";

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
    | { type: "ADD_MAIN_PRICE_CHANGE"; payload: ProductMainPriceChangeState }
    | { type: "RESET_CHANGES" };

export function getPriceChangeRequest(
    state: ProductPriceChangeState
): ChangeProductPriceRequest[] {
    const mainPriceMap = new Map<number, ProductMainPriceChangeState>();
    state.mainPrices.forEach((mainPrice) => {
        mainPriceMap.set(mainPrice.productId, mainPrice);
    });

    const processedProductIds = new Set<number>();

    const cityPriceRequests = state.cityPrices.map((cityPrice) => {
        processedProductIds.add(cityPrice.productId);
        const mainCity =
            mainPriceMap.get(cityPrice.productId)?.mainCityId || null;

        return {
            id: cityPrice.productId,
            main_city: mainCity,
            city_prices: [
                {
                    id: cityPrice.cityId,
                    price: cityPrice.newPrice.toString(),
                },
            ],
        };
    });

    const mainPriceRequests = state.mainPrices
        .filter((mainPrice) => !processedProductIds.has(mainPrice.productId))
        .map((mainPrice) => ({
            id: mainPrice.productId,
            main_city: mainPrice.mainCityId === 0 ? null : mainPrice.mainCityId,
            city_prices: [],
        }));

    return [...cityPriceRequests, ...mainPriceRequests];
}

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
                    } ${formatPrice(cityPrice.prevPrice)} ₸ -> ${formatPrice(
                        cityPrice.newPrice
                    )} ₸`
            )
            .join("; ");
        cityPriceChanges.push(priceChanges);
    }

    const mainPriceChanges: string[] = state.mainPrices.map(
        (mainPrice) =>
            `${mainPrice.productName}: Основной город -> ${mainPrice.mainCityName}`
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
        case "RESET_CHANGES":
            return initialState;
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

    function clearChanges() {
        dispatch({ type: "RESET_CHANGES" });
    }

    return {
        state,
        dispatch,
        addCityPriceChange,
        addMainPriceChange,
        clearChanges,
    };
};

export const useUpdateProductSize = (
    productId: number,
    initialValues?: ProductSizes | null
) => {
    const updateMutation = updateProductSizeMutation(productId);
    const createMutation = createProductSizeMutation(productId);

    const formik = useFormik<UpdateProductSizeRequest>({
        initialValues: {
            weight: 0,
            height: 0,
            length: 0,
            width: 0,
            comment: "",
        },
        // validationSchema: createStoreSchema,
        // validateOnBlur: true,
        // validateOnChange: true,
        onSubmit: handleSubmit,
    });
    useEffect(() => {
        if (initialValues) {
            formik.resetForm({
                values: initialValues,
            });
        }
    }, [initialValues]);
    async function handleSubmit() {
        if (initialValues) {
            await updateMutation.mutateAsync(formik.values);
        } else {
            await createMutation.mutateAsync(formik.values);
        }
    }

    return { formik };
};
// const loginSchema = Yup.object().shape({
//     // email: emailSchema().required("Это обязательное поле"),
//     // password: passwordSchemas("password").self.required(
//     //     "Это обязательное поле"
//     // ),
// });
export const useAutoUploadForm = () => {
    const mutation = autoUploadDataMutation();

    const formik = useFormik<LoginRequest>({
        initialValues: {
            username: "",
            password: "",
        },
        // validationSchema: loginSchema,
        // validateOnChange: true,
        onSubmit: handleSubmit,
    });

    async function handleSubmit() {
        await mutation.mutateAsync(formik.values);
    }

    return { formik, mutation };
};
