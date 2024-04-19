export interface GetOrderById {
    article: string;
    name: string;
    vendorCode: string;
    boxBarCode: string;
    boxTypeName: string;
    storeAddress: string;
}

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
    waybill: string | null;
    courierTransmissionDate: number;
    courierTransmissionPlanningDate: number;
    waybillNumber: string;
    deliveryCost: number;
    sellerName: string;
}
