export const getColorByStatisticsName = (name: string) => {
    switch (name) {
        case "Чек":
            return "#EAF6EC";
        case "Поставок":
            return "#EDFBFE";
        case "Продавцов":
            return "#FBEBEC";
        case "Заказы":
            return "#D8E7FF";
        default:
            return "";
    }
};
