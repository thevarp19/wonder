import dayjs from "dayjs";
import "dayjs/locale/ru";
import { DurationType } from "./types";

export const formatLocalDate = (dateString: string, duration: DurationType) => {
    dayjs.locale("ru");
    const date = dayjs(dateString);
    switch (duration) {
        case "DAY":
            return date.format("HH:mm");
        case "WEEK":
            return date.format("ddd");
        case "MONTH":
            return date.format("MMM D");
        case "YEAR":
            return date.format("MMM");
        default:
            return dateString;
    }
};
