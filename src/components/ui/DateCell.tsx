import { FC } from "react";

interface DateCellProps {
    timestamp: number | string;
}

export const DateCell: FC<DateCellProps> = ({ timestamp }) => {
    return (
        <div>
            <div>{new Date(timestamp).toLocaleDateString("ru-RU")} </div>
            {new Date(timestamp).toLocaleTimeString("ru-RU").substring(0, 5)}
        </div>
    );
};
