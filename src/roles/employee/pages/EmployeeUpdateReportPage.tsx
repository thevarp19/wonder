import { UpdateReportForm } from "@/modules/report/components/UpdateReportForm";
import { FC } from "react";
import { useParams } from "react-router-dom";

interface UpdateReportPageProps {}

export const EmployeeUpdateReportPage: FC<UpdateReportPageProps> = ({}) => {
    const { reportId } = useParams();

    return (
        <div className="flex flex-col items-center w-full h-full gap-4">
            <h2 className="text-[18px] font-semibold">
                Отчет о передаче {reportId}
            </h2>
            <UpdateReportForm reportId={reportId || ""} />
        </div>
    );
};
