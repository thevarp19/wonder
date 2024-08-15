import { BasePaginationResponse } from "@/types";

export interface GetServiceItemsResponse
    extends BasePaginationResponse<GetServiceItemsContent> {}
export interface GetSellerProductsSizes
    extends BasePaginationResponse<GetProductsSizesContent> {}

export interface GetServiceParamsItems {
    box: boolean;
    courier_package: boolean;
    label_caution_class: boolean;
    label_manipulation_sign: boolean;
    label_flammable: boolean;
    label_careful_rechargeable_battery: boolean;
    adhesive_tape_for_fragile_goods: boolean;
    number_of_labels_of_bubble_wrap: number;
    number_of_labels_of_stretch_film: number;
    need_super_safe: boolean;
}
export interface GetServiceItemsContent {
    id: number;
    vendor_code: string;
    title: string;
    purchase_price: string;
    service_parameters: GetServiceParamsItems;
    packaging_price: string;
    storage_price: string;
}
export interface GetProductsSizesContent {
    id: number;
    product_size: {
        id: number;
        length: number;
        width: number;
        height: number;
        weight: number;
    };
    vendor_code: string;
    title: string;
    created_at: string;
}

export interface UpdateServiceParamsRequest {
    box: boolean;
    courier_package: boolean;
    label_caution_class: boolean;
    label_manipulation_sign: boolean;
    label_flammable: boolean;
    label_careful_rechargeable_battery: boolean;
    adhesive_tape_for_fragile_goods: boolean;
    number_of_labels_of_bubble_wrap: number;
    number_of_labels_of_stretch_film: number;
    need_super_safe: boolean;
}
export interface CalculatorResponse {
    cost: {
        thermal_label: number;
        cost_of_scotch_tape: number;
        cost_of_bubble_wrap: number;
        cost_of_stretch_wrap: number;
        manipulation_sign: number;
        care_glass: number;
        care_batteries: number;
        flammable: number;
        mandatory_courier_package: number;
        courier_package: number;
        amount_for_consumables: number;
        storage: number;
        delivery: number;
        employee: number;
        profit: number;
        final_price: number;
    };
    total_cost: number;
}
export interface CalculatorRequest {
    parameters: {
        box: boolean;
        courier_package: boolean;
        label_caution_class: boolean;
        label_manipulation_sign: boolean;
        label_flammable: boolean;
        label_careful_rechargeable_battery: boolean;
        adhesive_tape_for_fragile_goods: boolean;
        number_of_labels_of_bubble_wrap: number;
        number_of_labels_of_stretch_film: number;
        need_super_safe: boolean;
    };
    sizes: ProductSize;
    days: number;
    quantity: number;
}

export interface ProductSize {
    length: number;
    width: number;
    height: number;
    weight: number;
}
