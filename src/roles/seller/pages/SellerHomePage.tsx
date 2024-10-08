import { arrowFall, arrowRise } from "@/assets";
import DurationSwitch from "@/components/ui/DurationSwitch";
import { Image } from "@/components/ui/Image";
import { AreaCharts } from "@/modules/statistics/components/AreaCharts";
import { BarCharts } from "@/modules/statistics/components/BarCharts";
import { PieCharts } from "@/modules/statistics/components/PieCharts";
import { ProductsCountTable } from "@/modules/statistics/components/ProductCountTable";
import { useGetSellerStatistics } from "@/modules/statistics/queries";
import { DurationType, HeaderItem } from "@/modules/statistics/types";

import { cn } from "@/utils/shared.util";
import { Spin } from "antd";
import { FC, useState } from "react";

interface SellerHomePageProps {}

export const SellerHomePage: FC<SellerHomePageProps> = ({}) => {
    const [duration, setDuration] = useState<DurationType>("MONTHLY");
    // const { data: statistics, isPending } = useGetSellerSalesInfo(duration);
    const { data: statistics, isPending } = useGetSellerStatistics(duration);

    // const statistics = {
    //     ordersInfo: { count: 140, percent: 48 },
    //     sellersInfo: { count: 52, percent: -18 },
    //     suppliesInfo: { count: 42, percent: 18 },
    //     incomeInfo: { count: 80, percent: 50 },
    // };
    if (isPending) {
        return (
            <div className="flex items-center justify-center h-[500px]">
                <Spin size="large" />
            </div>
        );
    }
    return (
        <div className="flex flex-col bg-white sm:pb-0 pb-[68px]">
            <div className="flex flex-col gap-7">
                <div className="bg-white rounded-md w-max">
                    <DurationSwitch
                        duration={duration}
                        setDuration={setDuration}
                    />
                </div>
                <div className="grid grid-cols-2 gap-[10px] sm:gap-6 sm:flex sm:justify-between">
                    <ResultsCard
                        statisticsName="Заказы"
                        statistics={statistics?.header[0]}
                        bgColor="blue"
                    />
                    <ResultsCard
                        statisticsName="Артикул"
                        statistics={statistics?.header[1]}
                        bgColor="orange"
                    />
                    <ResultsCard
                        statisticsName="Поставки"
                        statistics={statistics?.header[2]}
                        bgColor="blue"
                    />
                    <ResultsCard
                        statisticsName="Продажа"
                        statistics={statistics?.header[3]}
                        bgColor="orange"
                    />
                </div>
                <div className="flex flex-col gap-5">
                    <AreaCharts
                        data={statistics?.check || []}
                        duration={duration}
                        loading={isPending}
                    />
                    <div className="flex flex-col items-center justify-between w-full gap-5 sm:mt-10 sm:gap-10 sm:flex-row">
                        <BarCharts
                            data={statistics?.weekly_order || []}
                            duration={duration}
                        />
                        <PieCharts data={statistics?.city_analytics ?? []} />
                    </div>
                    <div className="flex gap-5">
                        <div className="w-full h-max sm:h-[525px] p-5 sm:p-8 bg-[#F7F9FB] flex flex-col gap-6 rounded-[34px]">
                            <h2 className="text-xs font-semibold sm:text-xl">
                                Остаток товаров
                            </h2>
                            <ProductsCountTable />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

type ResultsCardProps = {
    statisticsName: string;
    statistics: HeaderItem | undefined;
    bgColor?: string;
};
const ResultsCard = ({
    statisticsName,
    statistics,
    bgColor,
}: ResultsCardProps) => {
    const percentColor =
        statistics?.percentage != null
            ? statistics.percentage > 0
                ? "text-[#28A745]"
                : "text-[#F43749]"
            : "";

    return (
        <div
            className={`h-[98px] sm:h-[150px] sm:min-w-[265px] sm:max-w-[265px] p-5 sm:p-8 flex flex-col gap-[10px] rounded-xl sm:rounded-[20px] ${
                bgColor === "blue" ? "bg-[#E7F6FF]" : "bg-[#FFDBC0]"
            }`}
        >
            <div className="flex items-center justify-between text-[12px] sm:text-[18px]">
                {statisticsName}{" "}
            </div>
            <div
                className={`flex justify-between gap-[6px] sm:gap-5 ${
                    statisticsName === "Продажа" && "flex-col sm:gap-1 gap-1"
                }`}
            >
                <div className="text-xl sm:text-[32px] whitespace-nowrap">{`${
                    statistics?.value
                } ${statisticsName === "Продажа" ? "₸" : ""}`}</div>
                {statistics?.percentage !== null &&
                    statisticsName !== "Артикул" &&
                    statisticsName !== "Поставки" && (
                        <div
                            className={`flex justify-center items-center sm:p-2 ${percentColor}`}
                        >
                            {statistics?.percentage != null &&
                            statistics?.percentage > 0 ? (
                                <span className="flex items-center gap-[3px] sm:gap-[5px] text-[10px] sm:text-base">
                                    +{statistics?.percentage}%
                                    <Image
                                        src={arrowRise}
                                        alt="arrowRise"
                                        className={cn(
                                            "sm:w-5 sm:h-5 w-[14px] h-[14px]"
                                        )}
                                    />
                                </span>
                            ) : (
                                <span className="flex items-center gap-[3px] sm:gap-[5px] text-[10px] sm:text-base">
                                    {statistics?.percentage}%
                                    <Image
                                        src={arrowFall}
                                        alt="arrowFall"
                                        className={cn(
                                            "sm:w-5 sm:h-5 w-[14px] h-[14px]"
                                        )}
                                    />
                                </span>
                            )}
                        </div>
                    )}
            </div>
        </div>
    );
};

// const TopProductsCard = ({
//     place,
//     name,
//     sum,
// }: {
//     place: number;
//     name: string;
//     sum: number;
// }) => {
//     return (
//         <div className="p-2 border-2 border-[#EF7214] rounded-xl w-full max-w-full max-h-max flex justify-center">
//             <div className="flex items-center justify-start w-full gap-2">
//                 <div className="bg-[#EF7214] w-6 h-6 rounded-full text-white p-2 text-lg flex justify-center items-center shadow-xl font-bold">
//                     {place}
//                 </div>
//                 <div className="flex justify-between w-full gap-3">
//                     <div className="text-[10px] font-bold text-[#EF7214]">
//                         {name}
//                     </div>
//                     <div className="text-sm font-semibold text-[#EF7214]">
//                         {sum.toLocaleString("ru")}₸
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };
