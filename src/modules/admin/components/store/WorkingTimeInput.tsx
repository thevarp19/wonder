import { cn } from "@/utils/shared.util";
import { Checkbox, TimePicker } from "antd";
import { FC, useState } from "react";

interface WorkingTimeInputProps {}

export const WorkingTimeInput: FC<WorkingTimeInputProps> = ({}) => {
    return (
        <div className={cn("flex flex-col gap-3")}>
            <div className={cn("flex items-center gap-2")}>
                <span className="w-20">Mon-Sun: </span>
                <TimePicker format="HH:mm" needConfirm={false} />
                <span>until</span>
                <TimePicker format="HH:mm" needConfirm={false} />
                <Checkbox>Detailed</Checkbox>
            </div>
            <WorkingTimeUnit />
        </div>
    );
};

const WorkingTimeUnit = () => {
    const [active, setActive] = useState(true);
    return (
        <div
            className={cn(
                { "text-gray-400": !active },
                "flex items-center gap-2"
            )}
        >
            <div className={cn("flex items-center gap-2 w-20")}>
                <Checkbox
                    value={active}
                    onChange={(e) => {
                        setActive(e.target.checked);
                    }}
                />
                <span>Monday</span>
            </div>
            <TimePicker format="HH:mm" needConfirm={false} disabled={!active} />
            <span>until</span>
            <TimePicker format="HH:mm" needConfirm={false} disabled={!active} />
        </div>
    );
};
