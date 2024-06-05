export const getColorByStatisticsName = (name: string) => {
    switch (name) {
        case "Чек":
            return "bg-[#EAF6EC]";
        case "Поставок":
            return "bg-[#EDFBFE]";
        case "Продавцов":
            return "bg-[#FBEBEC]";
        case "Заказы":
            return "bg-[#D8E7FF]";
        default:
            return "";
    }
};
