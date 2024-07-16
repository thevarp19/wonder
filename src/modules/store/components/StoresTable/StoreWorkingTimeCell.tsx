import { FC } from "react";
import { WorkDayOfWeekResponse } from "../../types";

interface StoreWorkingTimeCellProps {
    dayOfWeeks: WorkDayOfWeekResponse[];
}

const formatTime = (time: string) => {
    return time.slice(0, 5);
};

export const StoreWorkingTimeCell: FC<StoreWorkingTimeCellProps> = ({
    dayOfWeeks,
}) => {
    return (
        <div>
            {formatTime(dayOfWeeks[0]?.opened_at)}-
            {formatTime(dayOfWeeks[0]?.closed_at)}
        </div>
    );
};
