import dayjs from "dayjs";
import { DurationType } from "./types";

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

export const formatLocalDate = (dateString: string, duration: DurationType) => {
    const date = dayjs(dateString);
    switch (duration) {
        case "DAY":
            return date.format("HH:mm"); // Format to show hours and minutes
        case "WEEK":
            return date.format("ddd"); // Format to show day of the week (e.g., Mon, Tue)
        case "MONTH":
            return date.format("MMM D"); // Format to show month and day (e.g., Jan 1)
        case "YEAR":
            return date.format("MMM"); // Format to show month (e.g., Jan, Feb)
        default:
            return dateString; // Default to the original string if no duration matches
    }
};
