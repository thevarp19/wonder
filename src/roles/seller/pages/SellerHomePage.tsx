import { arrowFall, arrowRise } from "@/assets";
import DurationSwitch from "@/components/ui/DurationSwitch";
import { Image } from "@/components/ui/Image";
import { DurationType, StatisticsInfo } from "@/modules/statistics/types";
import { cn } from "@/utils/shared.util";
import { FC, useState } from "react";

interface SellerHomePageProps {}

export const SellerHomePage: FC<SellerHomePageProps> = ({}) => {
    const [duration, setDuration] = useState<DurationType>("MONTH");
    // const { data: statistics, isPending } = useGetSellerSalesInfo(duration);
    // const { data: dailyInfo, isPending: getDailyLoading } =
    //     useGetSellerDailyInfo(duration);
    // const { data: topProducts, isPending: topProductsLoading } =
    //     useGetSellerTopProducts();
    // const sortedTopProducts = topProducts?.content
    //     ? topProducts.content.sort((a, b) => b.count - a.count).slice(0, 4)
    //     : [];
    // if (isPending) {
    //     return (
    //         <div className="flex items-center justify-center h-[500px]">
    //             <Spin size="large" />
    //         </div>
    //     );
    // }
    const statistics = {
        ordersInfo: { count: 140, percent: 48 },
        sellersInfo: { count: 52, percent: -18 },
        suppliesInfo: { count: 42, percent: 18 },
        incomeInfo: { count: 80, percent: 50 },
    };
    return (
        <div className="flex flex-col bg-white p-7">
            <div className="flex flex-col gap-7">
                <div className="bg-white rounded-md w-max">
                    <DurationSwitch
                        duration={duration}
                        setDuration={setDuration}
                    />
                </div>
                <div className="flex justify-between gap-6">
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
                {/* <div className="flex flex-col gap-5">
                    <AreaCharts
                        data={dailyInfo || []}
                        duration={duration}
                        loading={getDailyLoading}
                    />
                    <div className="flex gap-5">
                        <div className="w-[65%] p-2 bg-[#fcdfc9] rounded-xl h-max">
                            <div className="bg-white rounded-xl ">
                                <ProductsCountTable />
                            </div>
                        </div>
                        <div className="w-[35%] p-2 bg-orange-100 shadow-2xl rounded-xl">
                            <div className="bg-white rounded-[10px] h-full flex flex-col gap-2">
                                <div className="bg-[#EF7214] rounded-md text-white font-semibold text-center">
                                    ТОП Продукты
                                </div>
                                {topProductsLoading ? (
                                    <Spin />
                                ) : (
                                    <div className="flex flex-col justify-center gap-2">
                                        {sortedTopProducts?.map(
                                            (item, index) => (
                                                <TopProductsCard
                                                    key={item.productId}
                                                    place={index + 1}
                                                    name={item.productName}
                                                    sum={item.productPrice}
                                                />
                                            )
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div> */}
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
            className={`h-[150px] min-w-[265px] p-8 flex flex-col gap-[10px] rounded-[20px] ${
                bgColor === "blue" ? "bg-[#E7F6FF]" : "bg-[#FFDBC0]"
            }`}
        >
            <div className="flex items-center justify-between text-[18px]">
                {statisticsName}{" "}
            </div>
            <div className="flex justify-between gap-5">
                <div className="text-[32px] whitespace-nowrap">{`${
                    statistics?.count
                } ${statisticsName === "Продажа" ? "₸" : ""}`}</div>
                {statistics?.percent !== null && (
                    <div
                        className={`flex justify-center items-center p-2 ${percentColor}`}
                    >
                        {statistics?.percent != null &&
                        statistics?.percent > 0 ? (
                            <span className="flex items-center gap-[5px]">
                                +{statistics?.percent}%
                                <Image
                                    src={arrowRise}
                                    alt="searchIcon"
                                    className={cn("w-5 h-5 ")}
                                />
                            </span>
                        ) : (
                            <span className="flex items-center gap-[5px]">
                                {statistics?.percent}%
                                <Image
                                    src={arrowFall}
                                    alt="searchIcon"
                                    className={cn("w-5 h-5 ")}
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
