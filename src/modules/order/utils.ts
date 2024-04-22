export function deliveryTypeMap(type: string) {
    switch (type) {
        case "DELIVERY_PICKUP":
            return "Самовывоз";
        case "DELIVERY_REGIONAL_TODOOR":
            return "Kaspi доставка";
        case "DELIVERY_LOCAL":
            return "Моя доставка";
        default:
            return "Доставка";
    }
}

export function orderStatusMap(status: string) {
    switch (status) {
        case "CANCELLING":
            return "Отменены при доставке";
        case "ACCEPTED_BY_MERCHANT":
            return "Принят магазином";
        default:
            return "Статус";
    }
}
