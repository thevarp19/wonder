import { DatePicker } from "antd";
import { FC } from "react";

interface ChooseDateStepProps {}

export const ChooseDateStep: FC<ChooseDateStepProps> = ({}) => {
    return (
        <div>
            <h1>choose date</h1>
            <div className="mt-4 max-w-72">
                <DatePicker className="w-full" />
            </div>
        </div>
    );
};
