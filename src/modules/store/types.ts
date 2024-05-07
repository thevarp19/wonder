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
    town: string;
    district: string;
    building: string;
    apartment: string;
    latitude: number;
    longitude: number;
    dayOfWeekWorks: WorkDayOfWeekRequest[];
}

export interface GetStoreResponse {
    id: number;
    kaspiId: string;
    streetName: "string";
    streetNumber: "string";
    town: "string";
    district: "string";
    building: "string";
    apartment: "string";
    address: "string";
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
    town: string;
    district: string;
    building: string;
    latitude: number;
    longitude: number;
    apartment: string;
    dayOfWeekWorks: WorkDayOfWeekRequest[];
}
