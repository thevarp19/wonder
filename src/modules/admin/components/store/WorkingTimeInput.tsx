import { cn } from "@/utils/shared.util";
import { Checkbox, TimePicker } from "antd";
import dayjs from "dayjs";
import { FC, useState } from "react";

interface WorkingTimeInputProps {}
const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
];
export const WorkingTimeInput: FC<WorkingTimeInputProps> = ({}) => {
    const [detailed, setDetailed] = useState(false);
    return (
        <div className={cn("flex flex-col gap-3")}>
            <div
                className={cn("flex items-center gap-2", {
                    "text-gray-400": detailed,
                })}
            >
                <span className="w-28">Mon-Sun: </span>
                <TimePicker
                    format="HH:mm"
                    needConfirm={false}
                    disabled={detailed}
                    defaultValue={dayjs("09:00", "HH:mm")}
                />
                <span>until</span>
                <TimePicker
                    format="HH:mm"
                    needConfirm={false}
                    disabled={detailed}
                    defaultValue={dayjs("18:00", "HH:mm")}
                />
                <Checkbox
                    value={detailed}
                    onChange={(e) => {
                        setDetailed(e.target.checked);
                    }}
                >
                    Detailed
                </Checkbox>
            </div>
            <div
                className={cn({
                    hidden: !detailed,
                    "flex flex-col gap-2": detailed,
                })}
            >
                {days.map((day) => (
                    <WorkingTimeUnit day={day} />
                ))}
            </div>
        </div>
    );
};
interface WorkingTimeUnitProps {
    day: string;
}
const WorkingTimeUnit: FC<WorkingTimeUnitProps> = ({ day }) => {
    const [active, setActive] = useState(true);
    return (
        <div
            className={cn(
                { "text-gray-400": !active },
                "flex items-center gap-2"
            )}
        >
            <div className={cn("flex items-center gap-2 w-28")}>
                <Checkbox
                    defaultChecked={active}
                    value={active}
                    onChange={(e) => {
                        setActive(e.target.checked);
                    }}
                />
                <span>{day}</span>
            </div>
            <TimePicker
                format="HH:mm"
                defaultValue={dayjs("09:00", "HH:mm")}
                needConfirm={false}
                disabled={!active}
            />
            <span>until</span>
            <TimePicker
                format="HH:mm"
                needConfirm={false}
                disabled={!active}
                defaultValue={dayjs("18:00", "HH:mm")}
            />
        </div>
    );
};
