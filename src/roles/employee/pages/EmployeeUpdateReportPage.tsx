import { UpdateReportForm } from "@/modules/report/components/UpdateReportForm";
import { FC } from "react";
import { useParams } from "react-router-dom";

interface CreateReportPageProps {}

export const EmployeeUpdateReportPage: FC<CreateReportPageProps> = ({}) => {
    const { reportId } = useParams();

    return (
        <div className="flex flex-col items-center w-full h-full">
            <h2 className="text-[18px] font-semibold">Накладная {reportId}</h2>
            <UpdateReportForm reportId={reportId || ""} />
        </div>
    );
};
