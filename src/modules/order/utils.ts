export function deliveryTypeMap(type: string) {
    switch (type) {
        case "DELIVERY_LOCAL":
            return "Express доставка";
        case "DELIVERY_PICKUP":
            return "Самовывоз";
        case "DELIVERY_REGIONAL_TODOOR":
            return "Kaspi доставка";
        case "DELiVERY_POSTOMAT":
            return "Kaspi Postomat";
        case "DELIVERY_REGIONAL_PICKUP":
            return "Самовывоз";
        default:
            return "Доставка";
    }
}

export function deliveryTypeColorMap(type: string) {
    switch (type) {
        case "DELIVERY_LOCAL":
            return "orange";
        case "DELIVERY_REGIONAL_PICKUP":
            return "gray";
        case "DELIVERY_REGIONAL_TODOOR":
            return "red";
        case "DELiVERY_POSTOMAT":
            return "red";
        case "DELIVERY_PICKUP":
            return "gray";
        default:
            return "";
    }
}
export function orderStatusColorMap(status: string) {
    switch (status) {
        case "APPROVED_BY_BANK":
            return "yellow";
        case "ACCEPTED_BY_MERCHANT":
            return "blue";
        case "COMPLETED":
            return "green";
        case "CANCELLED":
            return "red";
        case "CANCELLING":
            return "orange";
        case "KASPI_DELIVERY_RETURN_REQUESTED":
            return "purple";
        case "RETURNED":
            return "gray";
        default:
            return "";
    }
}

export function orderStatusMap(status: string) {
    switch (status) {
        case "APPROVED_BY_BANK":
            return "Продавец должен его принять";
        case "ACCEPTED_BY_MERCHANT":
            return "Принят";
        case "COMPLETED":
            return "Завершен";
        case "CANCELLED":
            return "Отменен";
        case "CANCELLING":
            return "В процессе отмены";
        case "KASPI_DELIVERY_RETURN_REQUESTED":
            return "Ожидает возврата";
        case "RETURNED":
            return "Возвращен";
        default:
            return "Статус заказа";
    }
}
