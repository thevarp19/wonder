export interface GetSupplyById {
    article: string;
    name: string;
    vendorCode: string;
    boxBarCode: string;
    boxTypeName: string;
    storeAddress: string;
    shopName: string;
}

export interface GetSupplyProducts {
    products: SupplyEmployeeProduct[];
    supplyId: number;
    storeId: number;
    storeAddress: string;
}

export interface SupplyEmployeeProduct {
    article: string;
    name: string;
    vendorCode: string;
    vendorCodeOfBox: string;
    typeOfBoxName: string;
    productStateInStore: string;
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
        productQuantities: {
            productId: number;
            quantity: number;
        }[];
    }[];
}
