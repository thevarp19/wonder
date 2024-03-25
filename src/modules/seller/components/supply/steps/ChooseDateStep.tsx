import { myLocalStorage } from "@/lib/storage/browserStorage";
import { cn } from "@/utils/shared.util";
import { App, Button, DatePicker } from "antd";
import dayjs from "dayjs";
import { FC, useEffect, useState } from "react";

interface ChooseDateStepProps {}

export const ChooseDateStep: FC<ChooseDateStepProps> = ({}) => {
    const [date, setDate] = useState<string>(
        myLocalStorage?.get("supply-date") || ""
    );
    const { message } = App.useApp();
    useEffect(() => {
        console.log(date, dayjs(myLocalStorage?.get("supply-date")));
    }, [date]);
    return (
        <div>
            <h1 className="text-2xl font-semibold">Please choose the date</h1>
            <div className="mt-4 h-96 max-w-72">
                <DatePicker
                    className="w-full"
                    open
                    format={"DD-MM-YYYY"}
                    value={date ? dayjs(date, "DD-MM-YYYY") : undefined}
                    onChange={(day, dateString) => {
                        if (day.toDate().getTime() < new Date().getTime()) {
                            message.error("You can't choose past date");
                            return false;
                        }
                        setDate(`${dateString}`);
                    }}
                />
            </div>
            <div className={cn("flex justify-end gap-4")}>
                <Button
                    danger
                    size="large"
                    type="primary"
                    className="mb-4"
                    onClick={() => {
                        myLocalStorage?.remove("supply-date");
                        message.success("Date removed successfully");
                        setDate("");
                    }}
                >
                    Delete
                </Button>
                <Button
                    size="large"
                    type="primary"
                    className="mb-4"
                    onClick={() => {
                        myLocalStorage?.set("supply-date", date);
                        message.success("Date saved successfully");
                    }}
                >
                    Save
                </Button>
            </div>
        </div>
    );
};
