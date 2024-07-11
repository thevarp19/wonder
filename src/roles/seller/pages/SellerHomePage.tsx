import { arrowFall, arrowRise } from "@/assets";
import DurationSwitch from "@/components/ui/DurationSwitch";
import { Image } from "@/components/ui/Image";
import { AreaCharts } from "@/modules/statistics/components/AreaCharts";
import { BarCharts } from "@/modules/statistics/components/BarCharts";
import { LastOrdersTable } from "@/modules/statistics/components/LastOrdersTable";
import { PieCharts } from "@/modules/statistics/components/PieCharts";
import {
    useGetSellerDailyInfo,
    useGetSellerSalesInfo,
} from "@/modules/statistics/queries";
import { DurationType, StatisticsInfo } from "@/modules/statistics/types";
import { cn } from "@/utils/shared.util";
import { Spin } from "antd";
import { FC, useState } from "react";

interface SellerHomePageProps {}

export const SellerHomePage: FC<SellerHomePageProps> = ({}) => {
    const [duration, setDuration] = useState<DurationType>("MONTH");
    const { data: statistics, isPending } = useGetSellerSalesInfo(duration);
    const { data: dailyInfo, isPending: getDailyLoading } =
        useGetSellerDailyInfo(duration);
    // const { data: topProducts, isPending: topProductsLoading } =
    //     useGetSellerTopProducts();
    // const sortedTopProducts = topProducts?.content
    //     ? topProducts.content.sort((a, b) => b.count - a.count).slice(0, 4)
    //     : [];

    // const statistics = {
    //     ordersInfo: { count: 140, percent: 48 },
    //     sellersInfo: { count: 52, percent: -18 },
    //     suppliesInfo: { count: 42, percent: 18 },
    //     incomeInfo: { count: 80, percent: 50 },
    // };
    if (isPending || getDailyLoading) {
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
                        statistics={statistics?.ordersInfo}
                        bgColor="blue"
                    />
                    <ResultsCard
                        statisticsName="Артикул"
                        statistics={statistics?.suppliesInfo}
                        bgColor="orange"
                    />
                    <ResultsCard
                        statisticsName="Поставки"
                        statistics={statistics?.suppliesInfo}
                        bgColor="blue"
                    />
                    <ResultsCard
                        statisticsName="Продажа"
                        statistics={statistics?.incomeInfo}
                        bgColor="orange"
                    />
                </div>
                <div className="flex flex-col gap-5">
                    <AreaCharts
                        data={dailyInfo || []}
                        duration={duration}
                        loading={getDailyLoading}
                    />
                    <div className="flex flex-col items-center justify-between w-full gap-5 sm:mt-10 sm:gap-10 sm:flex-row">
                        <BarCharts duration={duration} />
                        <PieCharts />
                    </div>
                    <div className="flex gap-5">
                        <div className="w-full h-max sm:h-[525px] p-5 sm:p-8 bg-[#F7F9FB] flex flex-col gap-6 rounded-[34px]">
                            <h2 className="text-xs font-semibold sm:text-xl">
                                Таблица заказов
                            </h2>
                            <LastOrdersTable />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

type ResultsCardProps = {
    statisticsName: string;
    statistics: StatisticsInfo | undefined;
    bgColor?: string;
};
const ResultsCard = ({
    statisticsName,
    statistics,
    bgColor,
}: ResultsCardProps) => {
    const percentColor =
        statistics?.percent != null
            ? statistics.percent > 0
                ? "text-[#28A745]"
                : "text-[#F43749]"
            : "";

    return (
        <div
            className={`h-[98px] sm:h-[150px] sm:min-w-[265px] p-5 sm:p-8 flex flex-col gap-[10px] rounded-xl sm:rounded-[20px] ${
                bgColor === "blue" ? "bg-[#E7F6FF]" : "bg-[#FFDBC0]"
            }`}
        >
            <div className="flex items-center justify-between text-[12px] sm:text-[18px]">
                {statisticsName}{" "}
            </div>
            <div className="flex justify-between gap-[6px] sm:gap-5">
                <div className="text-xl sm:text-[32px] whitespace-nowrap">{`${
                    statistics?.count
                } ${statisticsName === "Продажа" ? "₸" : ""}`}</div>
                {statistics?.percent !== null && (
                    <div
                        className={`flex justify-center items-center p-2 ${percentColor}`}
                    >
                        {statistics?.percent != null &&
                        statistics?.percent > 0 ? (
                            <span className="flex items-center gap-[3px] sm:gap-[5px] text-[10px] sm:text-base">
                                +{statistics?.percent}%
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
                                {statistics?.percent}%
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
