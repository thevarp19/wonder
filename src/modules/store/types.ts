export interface CreateStoreRequest {
    warehouse: {
        operating_modes: WorkDayOfWeekRequest[];
        street_name: string;
        street_number: string;
        is_warehouse: boolean;
        additional_information: string;
        city: number;
    };
    volume: string;
    rental_price: string;
    enabled?: boolean;
}
export interface ActivateStoreSellerRequest {
    kaspi_warehouse_id: string;
    enabled: boolean;
}
export interface CreateStoreSellerRequest {
    warehouse: {
        operating_modes: WorkDayOfWeekRequest[];
        street_name: string;
        street_number: string;
        is_warehouse: boolean;
        additional_information: string;
        city: number;
    };
    kaspi_warehouse_id: string;
    enabled: boolean;
}
export interface GetStoreResponse {
    warehouse: {
        id: number;
        formatted_address: string;
        operating_modes: WorkDayOfWeekResponse[];
        is_warehouse: boolean;
    };
    enabled: boolean;
}
export interface GetAvailableStoreResponse {
    id: number;
    kaspi_warehouse_id: string;
    warehouse: {
        id: number;
        operating_modes: WorkDayOfWeekRequest[];
        formatted_address: string;
        is_warehouse: boolean;
    };
}
export interface GetStoreSellerResponse {
    seller_warehouse: SellerWarehouse;
    wonder_warehouse: WonderWarehouse;
    warehouse: {
        id: number;
        operating_modes: WorkDayOfWeekResponse[];
        formatted_address: string;
        is_warehouse: boolean;
    };
}

export interface UpdateStoreRequest {
    volume: string;
    rental_price: string;
    enabled: boolean;
    warehouse: {
        operating_modes: WorkDayOfWeekRequest[];
        street_name: string;
        street_number: string;
        is_warehouse: boolean;
        additional_information: string;
        city: number;
    };
}
export interface UpdateStoreSellerRequest {
    kaspi_warehouse_id: string;
    enabled: boolean;
    warehouse: {
        operating_modes: WorkDayOfWeekRequest[];
        street_name: string;
        street_number: string;
        is_warehouse: boolean;
        additional_information: string;
        city: number;
    };
}
export interface GetDetailSellerOwnStoreResponse {
    id: number;
    city: string;
    street_name: string;
    street_number: string;
    is_warehouse: boolean;
    additional_information: string;
}
export interface GetDetailSellerStoreResponse {
    id: number;
    enabled: boolean;
    kaspi_warehouse_id: string;
    warehouse: {
        id: number;
        operating_modes: WorkDayOfWeekResponse[];
        street_name: string;
        street_number: string;
        is_warehouse: boolean;
        additional_information: string;
        city: {
            id: number;
            name: string;
            code: string;
        };
    };
}
export interface GetDetailStoreResponse {
    volume: string;
    rental_price: string;
    enabled: boolean;
    warehouse: {
        id: number;
        operating_modes: WorkDayOfWeekResponse[];
        street_name: string;
        street_number: string;
        is_warehouse: boolean;
        additional_information: string;
        city: {
            id: number;
            name: string;
            code: string;
        };
    };
}

export interface WorkDayOfWeekResponse {
    id: number;
    day: number;
    opened_at: string;
    closed_at: string;
}

export interface WorkDayOfWeekRequest {
    day: number;
    opened_at: string;
    closed_at: string;
}

// export interface GetWarehouseDetails {
//     id: number;
//     operating_modes: WorkDayOfWeekResponse[];
//     street_name: string;
//     street_number: string;
//     is_warehouse: boolean;
//     additional_information: string;
//     city: {
//         id: number;
//         name: string;
//         code: string;
//     };
// }
// export interface WarehouseDetails {
//     id: number;
//     operating_modes: WorkDayOfWeekResponse[];
//     formatted_address: string;
//     is_warehouse: boolean;
// }

export interface UpdateProductSizeRequest {
    weight: number;
    height: number;
    length: number;
    width: number;
    comment: string;
}
export interface SellerWarehouse {
    id: number;
    kaspi_warehouse_id: string;
    enabled: boolean;
}

export interface WonderWarehouse {
    id: number;
    volume: string;
    rental_price: string;
    enabled: boolean;
}

// export interface GetStoreResponse {
//     id: number;
//     kaspiId: string;
//     streetName: "string";
//     streetNumber: "string";
//     formattedAddress: "string";
//     city: { id: number; name: string };
//     availableWorkTimes: WorkDayOfWeekResponse[];
//     availableBoxTypes: GetBoxResponse[];
//     enabled: boolean;
//     userId: number;
// }
