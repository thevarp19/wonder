import { cn } from "@/utils/shared.util";
import { Checkbox, TimePicker } from "antd";
import dayjs from "dayjs";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { WorkDayOfWeekRequest, WorkDayOfWeekResponse } from "../../types";

interface UpdateWorkingTimeInputProps {
    onChange: (values: WorkDayOfWeekRequest[]) => void;
    initialValues?: WorkDayOfWeekResponse[];
}
const days = [
    { name: "Понедельник", index: 1 },
    { name: "Вторник", index: 2 },
    { name: "Среда", index: 3 },
    { name: "Четверг", index: 4 },
    { name: "Пятница", index: 5 },
    { name: "Суббота", index: 6 },
    { name: "Воскресенье", index: 7 },
];
const mapResponseToRequest = (initialValues?: WorkDayOfWeekResponse[]) => {
    return days.map((day) => {
        const res = {
            name: day.name,
            index: day.index,
            day: -1,
            opened_at: "09:00",
            closed_at: "18:00",
        };

        const initialValue = initialValues?.find(
            (value) => value.day === day.index
        );

        if (initialValue) {
            res.day = initialValue.day;
            res.opened_at = initialValue.opened_at;
            res.closed_at = initialValue.closed_at;
        }

        return res;
    });
};

interface WorkingTimeFormValue {
    name: string;
    index: number;
    day: number;
    opened_at: string;
    closed_at: string;
}

export const UpdateWorkingTimeInput: FC<UpdateWorkingTimeInputProps> = ({
    onChange,
    initialValues,
}) => {
    const [detailed, setDetailed] = useState(true);
    const [mainOpenTime, setMainOpenTime] = useState("09:00");
    const [mainCloseTime, setMainCloseTime] = useState("18:00");
    const [values, setValues] = useState<WorkingTimeFormValue[]>(
        mapResponseToRequest(initialValues)
    );

    useEffect(() => {
        setValues(mapResponseToRequest(initialValues));
    }, [initialValues]);

    useEffect(() => {
        if (values) onChange(values);
    }, [values]);

    return (
        <div className={cn("flex flex-col gap-8")}>
            <div
                className={cn("flex flex-col gap-2", {
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
                                prev?.map((value) => ({
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
                                prev?.map((value) => ({
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
                                prev?.map((value) => ({
                                    ...value,
                                    day: value.index,
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
                    values.map((day) => (
                        <WorkingTimeUnit
                            key={uuidv4()}
                            {...day}
                            setValues={setValues}
                        />
                    ))}
            </div>
        </div>
    );
};

interface WorkingTimeUnitProps extends WorkingTimeFormValue {
    setValues: Dispatch<SetStateAction<WorkingTimeFormValue[]>>;
}

const WorkingTimeUnit: FC<WorkingTimeUnitProps> = ({
    name,
    opened_at,
    closed_at,
    day,
    setValues,
    index,
}) => {
    const [active, setActive] = useState(day !== -1);
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
                                return prev.map((value) => {
                                    if (value.index === index) {
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
                                return prev.map((value) => {
                                    if (value.index === index) {
                                        return {
                                            ...value,
                                            day: index,
                                        };
                                    }
                                    return value;
                                });
                            });
                        }
                        setActive(e.target.checked);
                    }}
                />
                <span>{name}</span>
            </div>
            <div className="flex items-center justify-between md:justify-normal gap-[10px]">
                <TimePicker
                    format="HH:mm"
                    defaultValue={dayjs(opened_at, "HH:mm")}
                    needConfirm={false}
                    disabled={!active}
                    onChange={(_, dateString) => {
                        setValues((prev) =>
                            prev.map((value) => {
                                if (value.index === index) {
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
                    defaultValue={dayjs(closed_at, "HH:mm")}
                    onChange={(_, dateString) => {
                        setValues((prev) =>
                            prev.map((value) => {
                                if (value.index === index) {
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
