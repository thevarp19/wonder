import { FC } from "react";

interface DateCellProps {
    timestamp: number | string;
}

export const DateCell: FC<DateCellProps> = ({ timestamp }) => {
    if (timestamp === null) {
        return <div>-</div>;
    }
    const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Almaty",
        hour: "2-digit",
        minute: "2-digit",
    };

    const dateFormatter = new Intl.DateTimeFormat("ru-RU", {
        timeZone: "Asia/Almaty",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    });

    const timeFormatter = new Intl.DateTimeFormat("ru-RU", options);

    return (
        <div>
            <div>{dateFormatter.format(new Date(timestamp))}</div>
            {timeFormatter.format(new Date(timestamp)).substring(0, 5)}
        </div>
    );
};
