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
    street: string;
    apartment: string;
    dayOfWeekWorks: WorkDayOfWeekRequest[];
}

export interface GetStoreResponse {
    id: number;
    kaspiId: string;
    address: string;
    street: string;
    city: string;
    availableWorkTimes: WorkDayOfWeekResponse[];
    availableBoxTypes: GetBoxResponse[];
    enabled: boolean;
    userId: number;
}

export interface UpdateStoreRequest {
    kaspiId: string;
    enabled: boolean;
    cityId: number;
    street: string;
    apartment: string;
    dayOfWeekWorks: WorkDayOfWeekRequest[];
}
