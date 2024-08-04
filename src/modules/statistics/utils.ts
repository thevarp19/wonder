import dayjs from "dayjs";
import "dayjs/locale/ru";
import { DurationType } from "./types";

export const formatLocalDate = (dateString: string, duration: DurationType) => {
    dayjs.locale("ru");
    const currentDate = dayjs();
    const dateNumber = parseInt(dateString, 10);

    switch (duration) {
        case "DAILY":
            // Assuming dateString represents the hour in the current day
            return currentDate.hour(dateNumber).minute(0).format("HH:mm");

        case "WEEKLY":
            // Assuming dateString represents the day of the month from the previous week to now
            let targetDate = currentDate.date(dateNumber);
            // If the target date is in the future, it means it's referring to the previous month
            if (targetDate.isAfter(currentDate)) {
                targetDate = targetDate.subtract(1, "month").date(dateNumber);
            }
            return targetDate.format("ddd, MMM D");

        case "MONTHLY":
            // Assuming dateString represents the day of the current or previous month
            let targetMonthDate = currentDate.date(dateNumber);
            if (targetMonthDate.isAfter(currentDate)) {
                targetMonthDate = targetMonthDate
                    .subtract(1, "month")
                    .date(dateNumber);
            }
            return targetMonthDate.format("MMM D");

        case "YEARLY":
            // Assuming dateString represents the month of the year
            let targetYearDate = currentDate.month(dateNumber - 1);
            if (targetYearDate.isAfter(currentDate)) {
                targetYearDate = targetYearDate
                    .subtract(1, "year")
                    .month(dateNumber - 1);
            }
            return targetYearDate.format("MMM");

        default:
            return dateString;
    }
};
export function formatPercentage(value: number): string {
    return `${value.toFixed(1)}`;
}
