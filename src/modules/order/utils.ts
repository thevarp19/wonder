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
