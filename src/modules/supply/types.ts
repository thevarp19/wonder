export interface GetSupplyById {
    article: string;
    name: string;
    vendorCode: string;
    boxBarCode: string;
    boxTypeName: string;
    storeAddress: string;
}

export interface GetSuppliesByDate {
    date: string;
    supplies: {
        supplyId: number;
        sellerName: string;
        sellerId: number;
        supplyState: string;
    }[];
}

export interface CreateSupplyRequest {
    storeId: number;
    selectedTime: string;
    selectedBoxes: {
        selectedBoxId: number;
        productId: number;
        quantity: number;
    }[];
}
