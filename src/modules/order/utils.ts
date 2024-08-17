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

export const mapDeliveryMode = (deliveryMode: string) => {
    const deliveryModeMapping: {
        [key: string]: { text: string; color: string };
    } = {
        Замлер: { text: "Замлер", color: "#bfc7fe" },
        Express: { text: "Express", color: "#b3d1ff" },
        Самовывоз: { text: "Самовывоз", color: "#ffe1cc" },
        "Доставка продавца": { text: "Доставка продавца", color: "#ccffcc" },
    };

    return (
        deliveryModeMapping[deliveryMode] || {
            text: deliveryMode,
            color: "default",
        }
    );
};
