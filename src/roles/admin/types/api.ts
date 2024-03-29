export interface WorkDaysOfWeekRequest {
    numericDayOfWeek: number;
    openTime: string;
    closeTime: string;
}

export interface WorkDaysOfWeekResponse {
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
    dayOfWeekWorks: WorkDaysOfWeekRequest[];
}

export interface UpdateStoreRequest {
    kaspiId: string;
    enabled: boolean;
    cityId: number;
    street: string;
    apartment: string;
    dayOfWeekWorks: WorkDaysOfWeekRequest[];
}

export interface GetStoresResponse {
    id: number;
    kaspiId: string;
    address: string;
    street: string;
    city: string;
    availableWorkTimes: WorkDaysOfWeekResponse[];
    availableBoxTypes: AvailableBoxTypes[];
    enabled: boolean;
    userId: number;
}

export interface AvailableBoxTypes {
    id: number;
    name: string;
    description: string;
    imageUrls: string[];
}

export interface GetBoxesResponse {
    id: string;
    name: string;
    description: string;
    imageUrls: string[];
}

export interface CityResponse {
    id: number;
    createdAt: string;
    updatedAt: string;
    name: string;
    code: string;
    enabled: boolean;
}
