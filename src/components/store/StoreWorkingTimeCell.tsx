import { DayOfWeekWorkResponse } from "@/roles/admin/types/api";
import { FC } from "react";

interface StoreWorkingTimeCellProps {
    dayOfWeeks: DayOfWeekWorkResponse[];
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
