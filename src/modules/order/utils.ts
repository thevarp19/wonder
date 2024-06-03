export function deliveryTypeMap(type: string) {
    switch (type) {
        case "DELIVERY_LOCAL":
            return "Cилами продавца";
        case "DELIVERY_PICKUP":
            return "Самовывоз";
        case "DELIVERY_REGIONAL_TODOOR":
            return "Kaspi доставка";
        case "DELiVERY_POSTOMAT":
            return "Kaspi Postomat";
        case "DELIVERY_REGIONAL_PICKUP":
            return "Доставка до областного склада с самовывозом";
        default:
            return "Доставка";
    }
}

export function deliveryTypeColorMap(type: string) {
    switch (type) {
        case "NEW":
            return "blue";
        case "SIGN_REQUIRED":
            return "orange";
        case "PICKUP":
            return "green";
        case "DELIVERY":
            return "purple";
        case "KASPI_DELIVERY":
            return "red";
        case "ARCHIVE":
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
