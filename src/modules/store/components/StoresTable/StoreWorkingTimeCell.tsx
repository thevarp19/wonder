import { FC } from "react";
import { WorkDayOfWeekResponse } from "../../types";

interface StoreWorkingTimeCellProps {
    dayOfWeeks: WorkDayOfWeekResponse[];
}

export const StoreWorkingTimeCell: FC<StoreWorkingTimeCellProps> = ({
    dayOfWeeks,
}) => {
    return (
        <div>
            {dayOfWeeks[0].openTime}-{dayOfWeeks[0].closeTime}
        </div>
    );
};
