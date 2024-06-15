import { BasePaginationResponse } from "@/types";

export interface ProductPrice {
    cityId: number;
    cityName: string;
    price: number;
    count: number;
}

export interface ProductWithPrices {
    id: number;
    count: number;
    name: string;
    published: boolean;
    vendorCode: string;
    mainPriceCityId: number | null;
    prices: ProductPrice[];
}

export interface GetProductResponse
    extends BasePaginationResponse<GetProductContent> {}

export interface GetProductPricesResponse
    extends BasePaginationResponse<GetProductPricesContent> {}

export interface GetProductsWithSizesResponse
    extends BasePaginationResponse<GetProductsWithSizesContent[]> {}

export interface GetProductsByParamsResponse
    extends BasePaginationResponse<GetProductByParamsContent[]> {}

export interface GetProductPricesContent {
    cities: ProductPriceCity[];
    products: ProductWithPrices[];
}
export interface GetProductsWithSizesContent {
    productName: string;
    productArticle: string;
    vendorCode: string;
    width: number;
    length: number;
    weight: number;
    height: number;
    comment: string;
    state: string;
}
export interface GetProductByParamsContent {
    productId: number;
    vendorCode: string;
    article: string;
    productName: string;
    shopName: string;
    cellCode: string;
    price: number;
}

export interface ProductPriceCity {
    id: number;
    name: string;
    code: string;
    enabled: true;
}

export interface ChangeProductPriceRequest {
    priceList: {
        price: number;
        cityId: number;
        productId: number;
    }[];
    mainPriceList: {
        productId: number;
        mainCityId: number;
    }[];
}

export interface GetProductContent {
    id: number;
    vendorCode: string;
    keycloakUserId: string;
    name: string;
    enabled: boolean;
    counts: ProductPrice[];
}
