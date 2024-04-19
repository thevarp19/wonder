export interface GetOrderById {
    article: string;
    name: string;
    vendorCode: string;
    boxBarCode: string;
    boxTypeName: string;
    storeAddress: string;
}

export interface GetOrdersByDate {
    date: string;
    orders: {
        orderId: number;
        sellerName: string;
        sellerId: number;
        orderState: string;
    }[];
}
