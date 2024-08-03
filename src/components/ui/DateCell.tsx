import { FC } from "react";

interface DateCellProps {
    timestamp: number | string;
}

export const DateCell: FC<DateCellProps> = ({ timestamp }) => {
    if (!timestamp) {
        return <div>-</div>;
    }

    let dateObject;

    if (typeof timestamp === "string") {
        const parsedTimestamp = parseInt(timestamp, 10);
        dateObject = isNaN(parsedTimestamp) ? null : new Date(parsedTimestamp);
    } else if (typeof timestamp === "number") {
        dateObject = new Date(timestamp);
    } else {
        dateObject = null;
    }

    if (!dateObject || isNaN(dateObject.getTime())) {
        return <div>Invalid Date</div>;
    }

    const dateFormatter = new Intl.DateTimeFormat("ru-RU", {
        timeZone: "Asia/Almaty",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    });

    const timeFormatter = new Intl.DateTimeFormat("ru-RU", {
        timeZone: "Asia/Almaty",
        hour: "2-digit",
        minute: "2-digit",
    });

    return (
        <div>
            {dateFormatter.format(dateObject)}{" "}
            {timeFormatter.format(dateObject)}
        </div>
    );
};
