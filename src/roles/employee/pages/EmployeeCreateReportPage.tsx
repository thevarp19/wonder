import { CreateReportForm } from "@/modules/report/components/CreateReportForm";
import { FC } from "react";

interface CreateReportPageProps {}

export const EmployeeCreateReportPage: FC<CreateReportPageProps> = ({}) => {
    return (
        <div className="flex flex-col items-center w-full h-full">
            <CreateReportForm />
        </div>
    );
};
