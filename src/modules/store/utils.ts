import {
    GetDetailSellerStoreResponse,
    GetDetailStoreResponse,
    GetStoreResponse,
    UpdateStoreRequest,
    UpdateStoreSellerRequest,
} from "./types";

export function mapGetStoreToUpdate(
    response: GetDetailStoreResponse
): UpdateStoreRequest {
    return {
        volume: response.volume,
        rental_price: response.rental_price,
        enabled: response.enabled,
        warehouse: {
            operating_modes: response.warehouse.operating_modes,
            street_name: response.warehouse.street_name,
            street_number: response.warehouse.street_number,
            is_warehouse: response.warehouse.is_warehouse,
            additional_information: response.warehouse.additional_information,
            city: response.warehouse.city.id,
        },
    };
}
export function mapGetSellerStoreToUpdate(
    response: GetDetailSellerStoreResponse
): UpdateStoreSellerRequest {
    return {
        kaspi_warehouse_id: response.kaspi_warehouse_id,
        enabled: response.enabled,
        warehouse: {
            operating_modes: response.warehouse.operating_modes,
            street_name: response.warehouse.street_name,
            street_number: response.warehouse.street_number,
            is_warehouse: response.warehouse.is_warehouse,
            additional_information: response.warehouse.additional_information,
            city: response.warehouse.city.id,
        },
    };
}

export function getStoreFullAddress(store: GetStoreResponse): string {
    return `${store.warehouse.formatted_address}`;
}
