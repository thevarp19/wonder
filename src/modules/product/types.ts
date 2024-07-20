import { BasePaginationResponse } from "@/types";

export interface CityPrices {
    id: number;
    city: {
        id: number;
        name: string;
        code: string;
    };
    price: number;
    color: string;
}

export interface GetProductWithPrices {
    id: number;
    vendor_code: string;
    title: string;
    total_quantity: number;
    main_city: {
        id: number;
        name: string;
        code: string;
    };
    city_prices: CityPrices[];
    is_published: boolean;
}

export interface GetProductResponse
    extends BasePaginationResponse<GetProductContent> {}

export interface GetProductPricesResponse
    extends BasePaginationResponse<GetProductWithPrices> {}

export interface GetProductsWithSizesResponse
    extends BasePaginationResponse<GetProductsWithSizesContent[]> {}

export interface GetProductsByParamsResponse
    extends BasePaginationResponse<GetProductByParamsContent[]> {}

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

export interface ProductStoreCity {
    id: number;
    name: string;
    code: string;
}

export interface ChangeProductPriceRequest {
    id: number;
    is_published?: boolean;
    main_city: number | null;
    city_prices: { id: number; price: string }[];
}

export interface GetProductContent {
    id: number;
    warehouse_quantities: string;
    vendor_code: string;
    title: string;
    price: string;
}
