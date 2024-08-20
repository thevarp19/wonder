import { BasePaginationResponse } from "@/types";

export interface GetOrdersAdmin
    extends BasePaginationResponse<GetOrdersAdminContent> {}

export interface GetOrdersSeller
    extends BasePaginationResponse<GetOrdersSellerContent> {}

export interface GetOrdersEmployee
    extends BasePaginationResponse<GetOrdersEmployeeContent> {}

export interface GetAssembleOrdersEmployee
    extends BasePaginationResponse<GetAssembleOrdersEmployeeContent> {}

export interface GetPackageOrdersEmployee
    extends BasePaginationResponse<GetPackageOrdersEmployeeContent> {}

export interface GetTransferOrdersEmployee
    extends BasePaginationResponse<GetTransferOrdersEmployeeContent> {}

export interface GetAssembleOrders
    extends BasePaginationResponse<GetOrdersContent> {}

export interface GetPackageOrders
    extends BasePaginationResponse<GetOrdersContent> {}

export interface GetTransferOrders
    extends BasePaginationResponse<GetOrdersContent> {}

export interface GetShippedOrders
    extends BasePaginationResponse<GetOrdersContent> {}

export interface GetCancelledOrders
    extends BasePaginationResponse<GetOrdersContent> {}

export interface GetAssembleOrdersEmployeeContent {
    id: number;
    product_vendor_code: string;
    product_title: string;
    cell_number: string;
    order_code: string;
    order_creation_date: string;
    order_entry: string;
}
export interface GetPackageOrdersEmployeeContent {
    id: number;
    product_vendor_code: string;
    product_title: string;
    order_code: string;
    order_creation_date: string;
    waybill: string;
    order_entry: string;
}

export interface GetTransferOrdersEmployeeContent {
    id: string;
    code: string;
    kaspi_store_name: string;
    delivery_mode: string;
    creation_date: number;
    courier_transmission_planning_date: string;
}
export interface GetOrdersContent {
    id: string;
    code: string;
    product_vendor_codes: string[];
    product_titles: string[];
    creation_date: number;
    transmission_date: string;
    total_price: number;
    quantity_all?: number;
    store_name?: string;
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
    wonder_status?: string;
}

export interface GetOrderPackageDetails {
    courier_package: boolean;
    label_caution_class: boolean;
    label_manipulation_sign: boolean;
    label_flammable: boolean;
    label_careful_rechargeable_battery: boolean;
    adhesive_tape_for_fragile_goods: boolean;
    number_of_labels_of_bubble_wrap: number;
    number_of_labels_of_stretch_film: number;
    courier_package_type: number;
    delivery_type: string;
    additional_wraps: number;
    cheapest_wrap_type: string;
    cheapest_number_of_segments: number;
    cheapest_stretch_number_of_segments: number;
    bubble_schema_base64: string;
    stretch_schema_base64: string;
    product: GetPackageProduct;
}
export interface GetPackageProduct {
    id: number;
    product_vendor_code: string;
    product_title: string;
    order_code: string;
    order_creation_date: string;
    waybill: string;
    order_entry: string;
}

export interface GetOrderDetail {
    id: string;
    delivery_mode: string;
    wonder_status: string;
    warehouse_address: string;
    seller_cell_products: {
        id: number;
        product_vendor_code: string;
        product_title: string;
        cell_number: string;
        services_cost: {
            storage: number;
            delivery: number;
            general_package: number;
            issuance: number;
            final_price: number;
            amount_for_consumables: number;
            employee: number;
            profit: number;
            package: number;
            packaged: number;
            add_payment: number;
        };
        order_entry: string;
    }[];
    customer: {
        id: string;
        name: string;
        cell_phone: string;
        first_name: string;
        last_name: string;
    };
    delivery_address: string;
    code: string;
    total_price: number;
    payment_mode: string;
    planned_delivery_date: bigint;
    creation_date: bigint;
    delivery_cost_for_seller: number;
    is_kaspi_delivery: boolean;
    credit_term: number;
    signature_required: boolean;
    pre_order: boolean;
    delivery_cost: number;
    state: string;
    assembled: boolean;
    packaged: boolean;
    status: string;
    approved_by_bank_date: bigint;
    cancellation_reason: string;
    cancellation_comment: string;
    transmission_date: string;
    receiving_date: bigint;
    seller: number;
    kaspi_delivery: number;
}

export type DeliveryMode =
    | "ALL"
    | "EXPRESS"
    | "ZAMLER"
    | "PICKUP"
    | "ARCHIVE"
    | "";

export type OrderEmployeeStatus = "ASSEMBLE" | "PACKAGING" | "TRANSFER" | "END";

export interface ProductStatusChangeRequest {
    id: number;
    order_entry: string;
    status: string;
}
