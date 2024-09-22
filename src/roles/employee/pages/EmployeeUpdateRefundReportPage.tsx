import { UpdateRefundReportForm } from "@/modules/report/components/UpdateRefundReportForm";
import { FC } from "react";
import { useParams } from "react-router-dom";

interface UpdateReportPageProps {}

export const EmployeeUpdateRefundReportPage: FC<
    UpdateReportPageProps
> = ({}) => {
    const { reportId } = useParams();

    return (
        <div className="flex flex-col items-center w-full h-full gap-4">
            <h2 className="text-[18px] font-semibold">
                Отчет о возврате {reportId}
            </h2>
            <UpdateRefundReportForm reportId={reportId || ""} />
        </div>
    );
};
