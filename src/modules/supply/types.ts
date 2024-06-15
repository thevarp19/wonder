export interface GetSupplyById {
    article: string;
    name: string;
    vendorCode: string;
    boxBarCode: string;
    boxTypeName: string;
    storeAddress: string;
    shopName: string;
    pathToBoxBarcode: string;
    pathToProductBarcode: string;
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

export interface CreateSupplyResponse {
    id: number;
    supplyCreatedTime: string;
    supplyAcceptTime: string;
    supplyState: string;
    pathToReport: string;
    formattedAddress: string;
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

export interface GetSupplyBox {
    products: SupplyBoxProduct[];
    supplyId: 0;
    storeId: 0;
    storeAddress: "string";
}

export interface SupplyBoxProduct {
    article: string;
    name: string;
    vendorCode: string;
    vendorCodeOfBox: string;
    typeOfBoxName: string;
    productStateInStore: string;
}

export interface GetSellerSupply {
    id: number;
    formattedAddress: string;
    supplyCreatedTime: string;
    supplyAcceptTime: string;
    pathToReport: string;
    supplyState: SupplyState;
}
export type SupplyState =
    | "START"
    | "ACCEPTED"
    | "IN_PROGRESS"
    | "IN_DELIVERY"
    | "REJECTED";

export interface AcceptSupplyProductRequest {
    supplyId: number;
    productCells: {
        cellCode: string;
        productArticles: string[];
    }[];
}
interface ProductInfo {
    productName: string;
    productCount: number;
}

export interface SupplyBoxInfo {
    boxVendorCode: string;
    boxDescription: string;
    boxName: string;
    productInfo: ProductInfo[];
}

export interface GetSupplyReport {
    supplyId: number;
    supplyCreationDate: string;
    supplySelectedDate: string;
    supplyDeliveredDate: string;
    supplyAcceptanceDate: string;
    formattedAddress: string;
    supplyBoxInfo: SupplyBoxInfo[];
}
