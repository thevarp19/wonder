export const mapWonderStatus = (status: string) => {
    const statusMapping: { [key: string]: { text: string; color: string } } = {
        ASSEMBLE: { text: "Сборка", color: "#8A8CD9" },
        PACKAGING: { text: "Упаковка", color: "#FFC555" },
        TRANSFER: { text: "Передача", color: "#59A8D4" },
        END: { text: "Отправлено", color: "#4AA785" },
        CANCELLED: { text: "Отменен", color: "#FF707D" },
    };

    return statusMapping[status] || { text: status, color: "default" };
};
export const mapStatusArchive = (status: string) => {
    const statusMapping: { [key: string]: { text: string; color: string } } = {
        // ASSEMBLE: { text: "Сборка", color: "#8A8CD9" },
        // PACKAGING: { text: "Упаковка", color: "#FFC555" },
        // TRANSFER: { text: "Передача", color: "#59A8D4" },
        // END: { text: "Отправлено", color: "#4AA785" },
        CANCELLED: { text: "Отменен", color: "#FF707D" },
        CANCELLING: { text: "Отменение", color: "#FFC555" },
        COMPLETED: { text: "Завершенный", color: "#4AA785" },
    };

    return statusMapping[status] || { text: status, color: "default" };
};

export const mapOrderStatus = (status: string) => {
    const statusMapping: { [key: string]: { text: string; color: string } } = {
        APPROVED_BY_BANK: {
            text: "Продавец должен его принять",
            color: "#4CAF50",
        },
        ACCEPTED_BY_MERCHANT: { text: "Принят", color: "#2196F3" },
        COMPLETED: { text: "Завершен", color: "#8E44AD" },
        CANCELLED: { text: "Отменен", color: "#E74C3C" },
        CANCELLING: { text: "В процессе отмены", color: "#F39C12" },
        KASPI_DELIVERY_RETURN_REQUESTED: {
            text: "Ожидает возврата",
            color: "#FF9800",
        },
        RETURNED: { text: "Возвращен", color: "#9E9E9E" },
    };

    return statusMapping[status] || { text: status, color: "default" };
};
export const mapDeliveryMode = (deliveryMode: string) => {
    const deliveryModeMapping: {
        [key: string]: { text: string; color: string };
    } = {
        Замлер: { text: "Заммлер", color: "#FFB9BF" },
        Express: { text: "Express", color: "#b3d1ff" },
        Самовывоз: { text: "Самовывоз", color: "#ffe1cc" },
        "Доставка продавца": { text: "Моя доставка", color: "#ccffcc" },
    };

    return (
        deliveryModeMapping[deliveryMode] || {
            text: deliveryMode,
            color: "default",
        }
    );
};
