import { GetStoreResponse, UpdateStoreRequest } from "./types";

export function mapGetStoreToUpdate(
    response: GetStoreResponse
): UpdateStoreRequest {
    return {
        kaspiId: response.kaspiId,
        cityId: response.city.id,
        street: response.street,
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
    return `${store.city.name}, ${store.street}, ${store.address}`;
}
