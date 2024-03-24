export interface CreateStoreRequest {
    kaspiId: string;
    name: string;
    cityId: number;
    street: string;
    apartment: string;
    dayOfWeekWorks: DayOfWeekWorkRequest[];
}

export interface UpdateStoreRequest {
    kaspiId?: string;
    name?: string;
    enabled?: boolean;
    cityId?: number;
    street?: string;
    apartment?: string;
    dayOfWeekWorks?: DayOfWeekWorkRequest[];
}

export interface GetStoresResponse {
    id: number;
    kaspiId: string;
    address: string;
    street: string;
    city: string;
    availableWorkTimes: [
        {
            id: number;
            dayOfWeek: number;
            openTime: string;
            closeTime: string;
        }
    ];
    enabled: boolean;
    userId: number;
}

export interface GetStoresWithDetailsResponse {
    id: number;
    kaspiId: string;
    address: string;
    street: string;
    city: string;
    availableWorkTimes: {
        id: number;
        dayOfWeek: number;
        openTime: string;
        closeTime: string;
    }[];
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
export interface DayOfWeekWorkRequest {
    numericDayOfWeek: number;
    openTime: string;
    closeTime: string;
}

export interface DayOfWeekWorkResponse {
    id: number;
    dayOfWeek: number;
    openTime: string;
    closeTime: string;
}

export interface GetBoxesResponse {
    id: string;
    name: string;
    description: string;
    imageUrls: string[];
}
