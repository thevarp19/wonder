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

export interface GetOrdersEmployee {
    orderCode: string;
    orderCreatedAt: string;
    deliveryType: string;
    orderToSendTime: string;
    orderStatus: string;
}

export interface GetOrderDetailEmployee {
    orderName: string;
    orderArticle: string;
    orderVendorCode: string;
    orderCell: string;
}
