import { padNumbers } from "@/utils/shared.util";
import { WeeklyCalendar } from "@purjayadi/antd-weekly-calendar";
import { FC } from "react";
import { Link } from "react-router-dom";
import { useGetSuppliesByDate } from "../../queries";
import { GetSuppliesByDate } from "../../types";

interface SupplyEvent {
    startTime: Date;
    endTime: Date;
    title: string;
    location: string;
    allDay?: boolean;
    backgroundColor: string;
    eventId: string;
}

function mapDatesToEvents(dates: GetSuppliesByDate[]): SupplyEvent[] {
    const result: SupplyEvent[] = [];
    dates.forEach((date) => {
        let hour = 7;
        const formattedDate = new Date(date.date);
        const year = formattedDate.getFullYear();
        const month = formattedDate.getMonth();
        const day = formattedDate.getDate();

        date.supplies.forEach((supply) => {
            result.push({
                startTime: new Date(year, month, day, hour++),
                endTime: new Date(year, month, day, hour),
                // @ts-ignore
                title: (
                    <span
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            fontSize: "12px",
                            whiteSpace: "nowrap",
                        }}
                    >
                        <Link
                            className="!underline"
                            to={`/employee/supplies/${supply.supplyId}`}
                        >
                            {padNumbers(supply.supplyId, 8)}
                        </Link>
                        <span>{supply.sellerName}</span>
                        <span className="uppercase">{supply.supplyState}</span>
                    </span>
                ),
                location: "Store",
                backgroundColor: "black",
                eventId: supply.supplyId.toString(),
            });
        });
    });
    return result;
}

interface SuppliesCalendarProps {}

export const SuppliesCalendar: FC<SuppliesCalendarProps> = ({}) => {
    const { data } = useGetSuppliesByDate("2023-04-01", "2025-04-30");
    const events = mapDatesToEvents(data || []);
    return (
        <div className="week-calendar">
            <WeeklyCalendar events={events} weekends />
        </div>
    );
};
