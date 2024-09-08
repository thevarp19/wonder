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
export interface GetOwnOrdersPickup
    extends BasePaginationResponse<GetOwnOrdersSellerPickupContent> {}

export interface GetNewSignOrders
    extends BasePaginationResponse<GetNewSignOrdersSellerContent> {}

export interface GetAssembleOrdersEmployeeContent {
    id: number;
    product_vendor_code: string;
    product_title: string;
    cell_number: string;
    order_code: string;
    order_creation_date: string;
    order_entry: string;
}
export interface GetEmployeeRefunds {
    refundId: string;
    applicationNumber: string;
    tab: string;
    reason: string;
    plannedDate: string;
    order: string;
    productSku: string;
    customer: string;
    sum: number;
    quantity: number;
    unit: string;
    weight: number;
    description: string;
    seller?: string;
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
export interface GetNewSignOrdersSellerContent {
    id: string;
    code: string;
    customer: string;
    total_price: number;
    creation_date: bigint;
    delivery_mode: string;
    delivery_address: string;
    payment_mode: string;
    signature_required: boolean;
}
export interface GetOwnOrdersSellerPickupContent {
    id: string;
    code: string;
    customer: string;
    total_price: number;
    creation_date: bigint;
    status: string;
    warehouse_address: string;
    payment_mode: string;
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
    order_code: string;
    product_vendor_code: string;
    product_title: string;
    order_creation_date: string;
    waybill: string;
    order_entry: string;
}

export interface GetEmployeeOrderDetail {
    id: string;
    kaspi_store_name: string;
    delivery_mode: string;
    wonder_status: string;
    seller_cell_products: {
        id: number;
        order_entry: string;
        product_vendor_code: string;
        product_title: string;
        cell_number: string;
        services_cost: null;
    }[];
    customer: Customer;
    delivery_address: string | null;
    code: string;
    total_price: number;
    payment_mode: string;
    planned_delivery_date: bigint | null;
    creation_date: bigint;
    delivery_cost_for_seller: number;
    is_kaspi_delivery: boolean;
    credit_term: number | null;
    signature_required: boolean;
    pre_order: boolean;
    delivery_cost: number;
    state: string;
    assembled: boolean;
    packaged: boolean;
    status: string;
    approved_by_bank_date: bigint;
    cancellation_reason: string | null;
    cancellation_comment: string | null;
    transmission_date: string | null;
    receiving_date: bigint | null;
    seller: number;
    kaspi_delivery: number;
}
export interface GetAdminOrderDetail {
    id: string;
    delivery_mode: string;
    wonder_status: string;
    warehouse_address: string;
    seller_cell_products: {
        id: number;
        order_entry: string;
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
    }[];
    customer: Customer;
    delivery_address: string;
    code: string;
    total_price: number;
    payment_mode: string;
    planned_delivery_date: bigint | null;
    creation_date: bigint;
    delivery_cost_for_seller: number;
    is_kaspi_delivery: boolean;
    credit_term: number | null;
    signature_required: boolean;
    pre_order: boolean;
    delivery_cost: number;
    state: string;
    assembled: boolean;
    packaged: boolean;
    status: string;
    approved_by_bank_date: bigint;
    cancellation_reason: string | null;
    cancellation_comment: string | null;
    transmission_date: string | null;
    receiving_date: bigint | null;
    seller: number;
    kaspi_delivery: number;
}
export interface GetSellerOrderDetail {
    id: string;
    delivery_mode: string;
    wonder_status: string;
    warehouse: string;
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
        };
        order_entry: string;
    }[];
    customer: Customer;
    delivery_address: string;
    code: string;
    total_price: number;
    payment_mode: string;
    planned_delivery_date: bigint | null;
    creation_date: bigint;
    delivery_cost_for_seller: number;
    is_kaspi_delivery: boolean;
    credit_term: number | null;
    signature_required: boolean;
    pre_order: boolean;
    delivery_cost: number;
    state: string;
    assembled: boolean;
    packaged: boolean;
    status: string;
    approved_by_bank_date: bigint;
    cancellation_reason: string | null;
    cancellation_comment: string | null;
    transmission_date: string | null;
    receiving_date: bigint | null;
    seller: number;
    kaspi_delivery: number;
}

export interface Customer {
    id: string;
    name: string;
    cell_phone: string;
    first_name: string;
    last_name: string;
}

export type OrderEmployeeStatus = "ASSEMBLE" | "PACKAGING" | "TRANSFER" | "END";

export interface ProductStatusChangeRequest {
    id: number;
    order_entry: string;
    status: string;
}
export type DeliveryMode =
    | "ALL"
    | "EXPRESS"
    | "ZAMLER"
    | "PICKUP"
    | "ARCHIVE"
    | "";
export type RefundMode =
    | "NEW"
    | "ON_DELIVERY"
    | "WAITING_DECISION"
    | "DISPUTE"
    | "CLOSED"
    | "";
