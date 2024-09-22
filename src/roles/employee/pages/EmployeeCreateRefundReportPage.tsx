import { CreateRefundReportForm } from "@/modules/report/components/CreateRefundReportForm";
import { FC } from "react";

interface CreateReportPageProps {}

export const EmployeeCreateRefundReportPage: FC<
    CreateReportPageProps
> = ({}) => {
    return (
        <div className="flex flex-col items-center w-full h-full">
            <CreateRefundReportForm />
        </div>
    );
};
