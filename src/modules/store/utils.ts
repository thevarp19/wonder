import { GetStoreResponse, UpdateStoreRequest } from "./types";

export function mapGetStoreToUpdate(
    response: GetStoreResponse
): UpdateStoreRequest {
    return {
        kaspiId: response.kaspiId,
        cityId: response.city.id,
        streetName: response.streetName,
        streetNumber: response.streetNumber,
        town: response.town,
        district: response.district,
        building: response.building,
        latitude: 0,
        longitude: 0,
        apartment: response.apartment,
        enabled: response.enabled,
        dayOfWeekWorks: response.availableWorkTimes.map((item) => ({
            numericDayOfWeek: item.dayOfWeek,
            openTime: item.openTime,
            closeTime: item.closeTime,
        })),
    };
}

export function getStoreFullAddress(store: GetStoreResponse): string {
    return `${store.formattedAddress}`;
}
