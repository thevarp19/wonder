import { cn } from "@/utils/shared.util";
import { Checkbox, TimePicker } from "antd";
import dayjs from "dayjs";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { WorkDayOfWeekRequest } from "../../types";

interface WorkingTimeInputProps {
    onChange: (values: WorkDayOfWeekRequest[]) => void;
}

const days = [
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
    "Воскресенье",
];

export const WorkingTimeInput: FC<WorkingTimeInputProps> = ({ onChange }) => {
    const [detailed, setDetailed] = useState(false);
    const [mainOpenTime, setMainOpenTime] = useState("09:00");
    const [mainCloseTime, setMainCloseTime] = useState("18:00");
    const [values, setValues] = useState<WorkDayOfWeekRequest[]>([
        {
            day: 1,
            opened_at: "09:00",
            closed_at: "18:00",
        },
        {
            day: 2,
            opened_at: "09:00",
            closed_at: "18:00",
        },
        {
            day: 3,
            opened_at: "09:00",
            closed_at: "18:00",
        },
        {
            day: 4,
            opened_at: "09:00",
            closed_at: "18:00",
        },
        {
            day: 5,
            opened_at: "09:00",
            closed_at: "18:00",
        },
        {
            day: 6,
            opened_at: "09:00",
            closed_at: "18:00",
        },
        {
            day: 7,
            opened_at: "09:00",
            closed_at: "18:00",
        },
    ]);

    useEffect(() => {
        onChange(values);
    }, [values]);

    return (
        <div className={cn("flex flex-col gap-8 w-full")}>
            <div
                className={cn("flex flex-col gap-[10px]", {
                    "text-gray-400": detailed,
                })}
            >
                <span className="w-28">Пн-Вс: </span>
                <div className="flex items-center justify-between md:justify-normal gap-[10px]">
                    <TimePicker
                        format="HH:mm"
                        needConfirm={false}
                        disabled={detailed}
                        defaultValue={dayjs("09:00", "HH:mm")}
                        onChange={(_, dateString) => {
                            setValues((prev) =>
                                prev.map((value) => ({
                                    ...value,
                                    opened_at: `${dateString}`,
                                }))
                            );
                            setMainOpenTime(`${dateString}`);
                        }}
                    />
                    <span>до</span>
                    <TimePicker
                        format="HH:mm"
                        needConfirm={false}
                        disabled={detailed}
                        defaultValue={dayjs("18:00", "HH:mm")}
                        onChange={(_, dateString) => {
                            setValues((prev) =>
                                prev.map((value) => ({
                                    ...value,
                                    closed_at: `${dateString}`,
                                }))
                            );
                            setMainCloseTime(`${dateString}`);
                        }}
                    />
                </div>
                <Checkbox
                    checked={detailed}
                    onChange={(e) => {
                        if (!e.target.checked) {
                            setValues((prev) =>
                                prev.map((_, idx) => ({
                                    day: idx + 1,
                                    opened_at: mainOpenTime,
                                    closed_at: mainCloseTime,
                                }))
                            );
                        }
                        setDetailed(e.target.checked);
                    }}
                >
                    Подробно
                </Checkbox>
            </div>
            <div className="flex flex-col gap-3">
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
                "flex flex-col gap-[10px]"
            )}
        >
            <div className={cn("flex items-center gap-[10px] w-28")}>
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
                                            day: -1,
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
                                            day: index + 1,
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
            <div className="flex items-center justify-between md:justify-normal gap-[10px]">
                <TimePicker
                    format="HH:mm"
                    defaultValue={dayjs(day.opened_at, "HH:mm")}
                    needConfirm={false}
                    disabled={!active}
                    onChange={(_, dateString) => {
                        setValues((prev) =>
                            prev.map((value, idx) => {
                                if (idx === index) {
                                    return {
                                        ...value,
                                        opened_at: `${dateString}`,
                                    };
                                }
                                return value;
                            })
                        );
                    }}
                />
                <span>до</span>
                <TimePicker
                    format="HH:mm"
                    needConfirm={false}
                    disabled={!active}
                    defaultValue={dayjs(day.closed_at, "HH:mm")}
                    onChange={(_, dateString) => {
                        setValues((prev) =>
                            prev.map((value, idx) => {
                                if (idx === index) {
                                    return {
                                        ...value,
                                        closed_at: `${dateString}`,
                                    };
                                }
                                return value;
                            })
                        );
                    }}
                />
            </div>
        </div>
    );
};
