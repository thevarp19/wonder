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

export interface GetEmployeeSupplies {
    id: number;
    seller_store: string;
    seller_cell_phone: string;
    box_total_quantity: string;
    product_total_quantity: string;
    created_at: string;
    date: string;
    report_a4: string;
    report_row: string;
    status: string;
}

export interface CreateSupplyResponse {
    id: number;
    report_a4: string;
    report_row: string;
}
export interface CreateSupplyRequest {
    seller_warehouse: number;
    date: string;
    supply_boxes: {
        box: number;
        supplier_box_products: {
            seller_product: number;
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
    seller_warehouse: string;
    created_at: string;
    date: string;
    report_a4: string;
    report_row: string;
    status: string;
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

export interface AcceptSupplyProductRequest {
    supply_boxes: {
        id: number;
        supplier_box_products: {
            id: number;
            cell: number;
        }[];
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
