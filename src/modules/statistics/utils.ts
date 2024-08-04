import dayjs from "dayjs";
import "dayjs/locale/ru";
import { DurationType } from "./types";

export const formatLocalDate = (dateString: string, duration: DurationType) => {
    dayjs.locale("ru");
    const date = dayjs(dateString);
    switch (duration) {
        case "DAILY":
            return date.format("HH:mm");
        case "WEEKLY":
            return date.format("ddd");
        case "MONTHLY":
            return date.format("MMM D");
        case "YEARLY":
            return date.format("MMM");
        default:
            return dateString;
    }
};
export function formatPercentage(value: number): string {
    return `${value.toFixed(1)}`;
}
