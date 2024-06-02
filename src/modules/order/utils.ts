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

export function deliveryTypeColorMap(type: string) {
    switch (type) {
        case "DELIVERY_PICKUP":
            return "blue";
        case "DELIVERY_REGIONAL_TODOOR":
            return "green";
        case "DELIVERY_LOCAL":
            return "red";
        default:
            return "";
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
