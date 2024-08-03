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
export interface GetAssembleOrdersEmployee
    extends BasePaginationResponse<GetAssembleOrdersContent> {}
export interface GetPackageOrdersEmployee
    extends BasePaginationResponse<GetPackageOrdersContent> {}
export interface GetTransferOrdersEmployee
    extends BasePaginationResponse<GetTransferOrdersContent> {}

export interface GetAssembleOrdersContent {
    id: number;
    product_vendor_code: string;
    product_title: string;
    cell_number: string;
    order_code: string;
    order_creation_date: string;
    order_entry: string;
}
export interface GetTransferOrdersContent {
    id: string;
    code: string;
    kaspi_store_name: string;
    delivery_mode: string;
    creation_date: number;
    courier_transmission_planning_date: string;
}
export interface GetPackageOrdersContent {
    id: number;
    product_vendor_code: string;
    product_title: string;
    order_code: string;
    order_creation_date: string;
    waybill: string;
    order_entry: string;
}
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
export type OrderEmployeeStatus = "ASSEMBLE" | "PACKAGING" | "TRANSFER" | "END";

export interface ProductStatusChangeRequest {
    id: number;
    order_entry: string;
    status: string;
}
