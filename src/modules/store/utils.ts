import { GetStoreResponse, UpdateStoreRequest } from "./types";

export function mapGetStoreToUpdate(
    response: GetStoreResponse
): UpdateStoreRequest {
    return {
        kaspiId: response.kaspiId,
        cityId: response.city.id,
        streetName: response.street,
        streetNumber: response.street,
        town: response.city.name,
        district: response.city.name,
        building: response.city.name,
        latitude: 0,
        longitude: 0,
        apartment: response.address,
        enabled: response.enabled,
        dayOfWeekWorks: response.availableWorkTimes.map((item) => ({
            numericDayOfWeek: item.dayOfWeek,
            openTime: item.openTime,
            closeTime: item.closeTime,
        })),
    };
}

export function getStoreFullAddress(store: GetStoreResponse): string {
    return `${store.address}`;
}
