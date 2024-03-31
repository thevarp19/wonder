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
    { name: "Monday", index: 1 },
    { name: "Tuesday", index: 2 },
    { name: "Wednesday", index: 3 },
    { name: "Thursday", index: 4 },
    { name: "Friday", index: 5 },
    { name: "Saturday", index: 6 },
    { name: "Sunday", index: 7 },
];

const mapResponseToRequest = (initialValues?: WorkDayOfWeekResponse[]) => {
    return days.map((day) => {
        const res = {
            name: day.name,
            index: day.index,
            numericDayOfWeek: -1,
            openTime: "09:00",
            closeTime: "18:00",
        };

        const initialValue = initialValues?.find(
            (value) => value.dayOfWeek === day.index
        );

        if (initialValue) {
            res.numericDayOfWeek = initialValue.dayOfWeek;
            res.openTime = initialValue.openTime;
            res.closeTime = initialValue.closeTime;
        }

        return res;
    });
};

interface WorkingTimeFormValue {
    name: string;
    index: number;
    numericDayOfWeek: number;
    openTime: string;
    closeTime: string;
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
                            prev?.map((value) => ({
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
                            prev?.map((value) => ({
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
                                prev?.map((value) => ({
                                    ...value,
                                    numericDayOfWeek: value.index,
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
                values.map((day) => (
                    <WorkingTimeUnit
                        key={uuidv4()}
                        {...day}
                        setValues={setValues}
                    />
                ))}
        </div>
    );
};

interface WorkingTimeUnitProps extends WorkingTimeFormValue {
    setValues: Dispatch<SetStateAction<WorkingTimeFormValue[]>>;
}

const WorkingTimeUnit: FC<WorkingTimeUnitProps> = ({
    name,
    openTime,
    closeTime,
    numericDayOfWeek,
    setValues,
    index,
}) => {
    const [active, setActive] = useState(numericDayOfWeek !== -1);
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
                                return prev.map((value) => {
                                    if (value.index === index) {
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
                                return prev.map((value) => {
                                    if (value.index === index) {
                                        return {
                                            ...value,
                                            numericDayOfWeek: index,
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
            <TimePicker
                format="HH:mm"
                defaultValue={dayjs(openTime, "HH:mm")}
                needConfirm={false}
                disabled={!active}
                onChange={(_, dateString) => {
                    setValues((prev) =>
                        prev.map((value) => {
                            if (value.index === index) {
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
                defaultValue={dayjs(closeTime, "HH:mm")}
                onChange={(_, dateString) => {
                    setValues((prev) =>
                        prev.map((value) => {
                            if (value.index === index) {
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
