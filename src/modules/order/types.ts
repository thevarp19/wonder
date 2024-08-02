import { BasePaginationResponse } from "@/types";

export interface GetOrderById {
    productArticle: string;
    productName: string;
    productVendorCode: string;
    cellCode: string;
    productTradePrice: number;
    productSellPrice: number;
    income: number;
    pathToProductBarcode: string;
    pathToBoxBarcode: string;
}

export interface GetOrdersAdmin
    extends BasePaginationResponse<GetOrdersAdminContent> {}

export interface GetOrdersSeller
    extends BasePaginationResponse<GetOrdersSellerContent> {}

export interface GetOrdersEmployee
    extends BasePaginationResponse<GetOrdersEmployeeContent> {}

export interface GetOrdersSellerContent {
    id: string;
    code: string;
    delivery_mode: string;
    creation_date: number;
    transmission_date: number;
    receiving_date: number;
    total_price: number;
    wonder_status: string;
    warehouse: string;
}
export interface GetOrdersAdminContent {
    id: string;
    code: string;
    delivery_mode: string;
    creation_date: number;
    transmission_date: number;
    receiving_date: number;
    total_price: number;
    wonder_status: string;
    warehouse_address: string;
}

export interface GetOrdersEmployeeContent {
    id: string;
    code: string;
    kaspi_store_name: string;
    creation_date: number;
    delivery_mode: string;
    total_price: number;
    wonder_status: string;
}

export interface GetOrderDetailEmployee {
    orderStatus: string;
    descriptionOfOrderStatus: string;
    orderAvailableAction: string;
    products: Product[];
    deliveryMode: string;
    waybill: string;
    orderCode: string;
    deliveryTime: string | null;
}

export interface Product {
    productName: string;
    productArticle: string;
    productVendorCode: string;
    pathToProductBarcode: string;
    pathToBoxBarcode: string;
    productStateInStore: string;
    productCell: string;
}

export type DeliveryMode =
    | "ALL"
    | "EXPRESS"
    | "ZAMLER"
    | "PICKUP"
    | "ARCHIVE"
    | "";

export interface ProductAssemble {
    id: number;
    article: string;
    name: string;
    cellCode: string;
}

export interface ProcessedProduct extends ProductAssemble {
    processedEmployeeName: string;
    processedDate: string;
}

export interface AssembleOrderResponse {
    productsToProcess: ProductAssemble[];
    processedProducts: ProcessedProduct[];
    deliveryMode: string;
    deadline: string;
    sellerName: string;
    startedEmployeeName: string;
    orderCode: string;
    assembleState: string;
}
