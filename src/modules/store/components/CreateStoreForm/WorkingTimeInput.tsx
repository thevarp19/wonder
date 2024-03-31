import { cn } from "@/utils/shared.util";
import { Checkbox, TimePicker } from "antd";
import dayjs from "dayjs";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { WorkDayOfWeekRequest } from "../../types";

interface WorkingTimeInputProps {
    onChange: (values: WorkDayOfWeekRequest[]) => void;
}

const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
];

export const WorkingTimeInput: FC<WorkingTimeInputProps> = ({ onChange }) => {
    const [detailed, setDetailed] = useState(false);
    const [mainOpenTime, setMainOpenTime] = useState("09:00");
    const [mainCloseTime, setMainCloseTime] = useState("18:00");
    const [values, setValues] = useState<WorkDayOfWeekRequest[]>([
        {
            numericDayOfWeek: 1,
            openTime: "09:00",
            closeTime: "18:00",
        },
        {
            numericDayOfWeek: 2,
            openTime: "09:00",
            closeTime: "18:00",
        },
        {
            numericDayOfWeek: 3,
            openTime: "09:00",
            closeTime: "18:00",
        },
        {
            numericDayOfWeek: 4,
            openTime: "09:00",
            closeTime: "18:00",
        },
        {
            numericDayOfWeek: 5,
            openTime: "09:00",
            closeTime: "18:00",
        },
        {
            numericDayOfWeek: 6,
            openTime: "09:00",
            closeTime: "18:00",
        },
        {
            numericDayOfWeek: 7,
            openTime: "09:00",
            closeTime: "18:00",
        },
    ]);

    useEffect(() => {
        onChange(values);
    }, [values]);

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
                    onChange={(_, dateString) => {
                        setValues((prev) =>
                            prev.map((value) => ({
                                ...value,
                                openTime: `${dateString}`,
                            }))
                        );
                        setMainOpenTime(`${dateString}`);
                    }}
                />
                <span>until</span>
                <TimePicker
                    format="HH:mm"
                    needConfirm={false}
                    disabled={detailed}
                    defaultValue={dayjs("18:00", "HH:mm")}
                    onChange={(_, dateString) => {
                        setValues((prev) =>
                            prev.map((value) => ({
                                ...value,
                                closeTime: `${dateString}`,
                            }))
                        );
                        setMainCloseTime(`${dateString}`);
                    }}
                />
                <Checkbox
                    checked={detailed}
                    onChange={(e) => {
                        if (!e.target.checked) {
                            setValues((prev) =>
                                prev.map((_, idx) => ({
                                    numericDayOfWeek: idx + 1,
                                    openTime: mainOpenTime,
                                    closeTime: mainCloseTime,
                                }))
                            );
                        }
                        setDetailed(e.target.checked);
                    }}
                >
                    Detailed
                </Checkbox>
            </div>

            {detailed &&
                values.map((day, index) => (
                    <WorkingTimeUnit
                        key={index}
                        day={day}
                        index={index}
                        values={values}
                        setValues={setValues}
                    />
                ))}
        </div>
    );
};
interface WorkingTimeUnitProps {
    day: WorkDayOfWeekRequest;
    values: WorkDayOfWeekRequest[];
    setValues: Dispatch<SetStateAction<WorkDayOfWeekRequest[]>>;
    index: number;
}
const WorkingTimeUnit: FC<WorkingTimeUnitProps> = ({
    day,
    setValues,
    index,
}) => {
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
                    checked={active}
                    onChange={(e) => {
                        if (!e.target.checked) {
                            setValues((prev) => {
                                return prev.map((value, idx) => {
                                    if (idx === index) {
                                        return {
                                            ...value,
                                            numericDayOfWeek: -1,
                                        };
                                    }
                                    return value;
                                });
                            });
                        } else {
                            setValues((prev) => {
                                return prev.map((value, idx) => {
                                    if (idx === index) {
                                        return {
                                            ...value,
                                            numericDayOfWeek: index + 1,
                                        };
                                    }
                                    return value;
                                });
                            });
                        }
                        setActive(e.target.checked);
                    }}
                />
                <span>{days[index]}</span>
            </div>
            <TimePicker
                format="HH:mm"
                defaultValue={dayjs(day.openTime, "HH:mm")}
                needConfirm={false}
                disabled={!active}
                onChange={(_, dateString) => {
                    setValues((prev) =>
                        prev.map((value, idx) => {
                            if (idx === index) {
                                return {
                                    ...value,
                                    openTime: `${dateString}`,
                                };
                            }
                            return value;
                        })
                    );
                }}
            />
            <span>until</span>
            <TimePicker
                format="HH:mm"
                needConfirm={false}
                disabled={!active}
                defaultValue={dayjs(day.closeTime, "HH:mm")}
                onChange={(_, dateString) => {
                    setValues((prev) =>
                        prev.map((value, idx) => {
                            if (idx === index) {
                                return {
                                    ...value,
                                    closeTime: `${dateString}`,
                                };
                            }
                            return value;
                        })
                    );
                }}
            />
        </div>
    );
};
