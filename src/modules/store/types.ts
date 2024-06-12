import { GetBoxResponse } from "../box/types";

export interface WorkDayOfWeekRequest {
    numericDayOfWeek: number;
    openTime: string;
    closeTime: string;
}

export interface WorkDayOfWeekResponse {
    id: number;
    dayOfWeek: number;
    openTime: string;
    closeTime: string;
}

export interface CreateStoreRequest {
    kaspiId: string;
    cityId: number;
    streetName: string;
    streetNumber: string;
    latitude: number;
    longitude: number;
    dayOfWeekWorks: WorkDayOfWeekRequest[];
}

export interface UpdateProductSizeRequest {
    weight: number;
    height: number;
    length: number;
    width: number;
    comment: string;
}

export interface GetStoreResponse {
    id: number;
    kaspiId: string;
    streetName: "string";
    streetNumber: "string";
    formattedAddress: "string";
    city: { id: number; name: string };
    availableWorkTimes: WorkDayOfWeekResponse[];
    availableBoxTypes: GetBoxResponse[];
    enabled: boolean;
    userId: number;
}

export interface UpdateStoreRequest {
    kaspiId: string;
    enabled: boolean;
    cityId: number;
    streetName: string;
    streetNumber: string;
    latitude: number;
    longitude: number;
    dayOfWeekWorks: WorkDayOfWeekRequest[];
}
