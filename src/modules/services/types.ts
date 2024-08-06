import { BasePaginationResponse } from "@/types";

export interface GetServiceItemsResponse
    extends BasePaginationResponse<GetServiceItemsContent> {}

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
