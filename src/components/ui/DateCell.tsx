import { FC } from "react";

interface DateCellProps {
    timestamp: number | string;
}

export const DateCell: FC<DateCellProps> = ({ timestamp }) => {
    if (!timestamp) {
        return <div>-</div>;
    }

    let dateObject: Date | null = null;

    if (typeof timestamp === "string" && timestamp.includes("T")) {
        dateObject = new Date(timestamp);
    } else {
        let numericTimestamp =
            typeof timestamp === "string" ? parseInt(timestamp, 10) : timestamp;

        if (numericTimestamp < 1e12) {
            numericTimestamp *= 1000;
        }

        dateObject = new Date(numericTimestamp);
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
