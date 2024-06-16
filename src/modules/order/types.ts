import { BasePaginationResponse } from "@/types";

export interface GetOrderById {
    productArticle: string;
    productName: string;
    productVendorCode: string;
    cellCode: string;
    productTradePrice: number;
    productSellPrice: number;
    income: number;
}

export interface GetOrdersAdmin
    extends BasePaginationResponse<GetOrdersByDate> {}

export interface GetOrdersSeller
    extends BasePaginationResponse<GetOrdersByDate> {}

export interface GetOrdersEmployee
    extends BasePaginationResponse<GetOrdersEmployeeContent> {}

export interface GetOrdersByDate {
    id: number;
    kaspiId: string;
    code: string;
    totalPrice: number;
    paymentMode: string;
    plannedDeliveryDate: number;
    creationDate: number;
    deliveryCostForSeller: number;
    isKaspiDelivery: boolean;
    deliveryMode: string;
    tradePrice: number;
    state: string;
    waybill: string | null;
    courierTransmissionDate: number;
    courierTransmissionPlanningDate: number;
    waybillNumber: string;
    deliveryCost: number;
    sellerName: string;
    storeFormattedAddress: string;
}

export interface GetOrdersEmployeeContent {
    orderStatus: string;
    descriptionOfOrderStatus: string;
    orderAvailableAction: string;
    orderCode: string;
    shopName: string;
    formattedAddress: string;
    orderCreatedAt: string;
    orderToSendTime: string;
    deliveryType: string;
    price: number;
    productsCount: number;
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
    | "DELIVERY_LOCAL"
    | "DELIVERY_PICKUP"
    | "DELIVERY_REGIONAL_PICKUP"
    | "DELiVERY_POSTOMAT"
    | "DELIVERY_REGIONAL_TODOOR"
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
