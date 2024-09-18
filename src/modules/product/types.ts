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

export interface GetProductCoverResponse
    extends BasePaginationResponse<GetProductCover> {}

export interface GetProductPricesResponse
    extends BasePaginationResponse<GetProductWithPrices> {}

export interface GetProductsWithSizesResponse
    extends BasePaginationResponse<GetProductsWithSizesContent> {}

export interface GetProductsByParamsResponse
    extends BasePaginationResponse<GetProductByParamsContent> {}

export interface GetProductsWithSizesContent {
    id: number;
    product_size: ProductSizes;
    vendor_code: string;
    title: string;
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

export interface ProductSizes {
    id: number;
    length: number;
    width: number;
    height: number;
    weight: number;
    comment: string;
    product: number;
}
export interface ProductStoreCity {
    id: number;
    name: string;
    code: string;
}
export interface ProductEnabledCount {
    enabled_count: number;
    not_enabled_count: number;
}

export interface ChangeProductPriceRequest {
    id: number;
    is_published?: boolean;
    main_city: number | null;
    city_prices: { id: number; price: string }[];
}

export interface GetProductContent {
    id: number;
    seller_warehouse_quantities?: {
        quantity: number;
        kaspi_warehouse_id: string;
        wonder: boolean;
    }[];
    vendor_code: string;
    title: string;
    price: string;
}
export interface GetProductCover {
    id: number;
    vendor_code: string;
    title: string;
    purchase_price: string;
}
