import { arrowFall, arrowRise } from "@/assets";
import DurationSwitch from "@/components/ui/DurationSwitch";
import { Image } from "@/components/ui/Image";
import { AreaCharts } from "@/modules/statistics/components/AreaCharts";
import { LastOrdersTable } from "@/modules/statistics/components/LastOrdersTable";
import { DurationType, StatisticsInfo } from "@/modules/statistics/types";
import { cn } from "@/utils/shared.util";
import { FC, useState } from "react";

interface AdminHomePageProps {}

export const AdminHomePage: FC<AdminHomePageProps> = ({}) => {
    const [duration, setDuration] = useState<DurationType>("MONTH");
    // const { data: statistics, isPending } = useGetAdminSalesInfo(duration);
    // const { data: dailyInfo, isPending: getDailyLoading } =
    const statistics = {
        ordersInfo: { count: 140, percent: 48 },
        sellersInfo: { count: 52, percent: -18 },
        suppliesInfo: { count: 42, percent: 18 },
        incomeInfo: { count: 80, percent: 50 },
    };
    const topSellers = [
        { place: 1, name: "ИП QIT" },
        { place: 2, name: "ИП Techai" },
        { place: 3, name: "ИП Arena" },
        { place: 4, name: "ИП Orda" },
        { place: 5, name: "АО Arena" },
        { place: 6, name: "АО Technodom" },
        { place: 7, name: "ИП Techai" },
        { place: 8, name: "ИП Arena" },
        { place: 9, name: "ИП Orda" },
        { place: 10, name: "ИП Akhmediyarova" },
    ];
    //     useGetAdminDailyInfo(duration);
    // const { data: topSellers, isPending: topSellersLoading } =
    //     useGetAdminTopSeller();
    // const sortedTopSellers = topSellers?.content
    //     ? topSellers.content
    //           .sort((a, b) => b.totalIncome - a.totalIncome)
    //           .slice(0, 4)
    //     : [];
    // if (isPending) {
    //     return (
    //         <div className="flex items-center justify-center h-[500px]">
    //             <Spin size="large" />
    //         </div>
    //     );
    // }
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
                        statisticsName="Продавцы"
                        statistics={statistics?.sellersInfo}
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
                    <AreaCharts data={[]} duration={duration} loading={true} />
                    <div className="flex gap-5">
                        <div className="min-w-[825px] h-[525px] p-8 bg-[#F7F9FB] flex flex-col gap-6 rounded-[34px]">
                            <h2 className="text-xl font-semibold">
                                Таблица заказов
                            </h2>
                            <LastOrdersTable />
                        </div>
                        <div className="w-full h-[525px] bg-[#F7F9FB] rounded-[34px]">
                            <TopSellersList topSellers={topSellers} />
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

interface TopSellersListProps {
    topSellers: { place: number; name: string }[];
}

const TopSellersList: FC<TopSellersListProps> = ({ topSellers }) => {
    return (
        <div className="p-8 bg-[#F7F9FB] flex flex-col items-center gap-5 rounded-[34px] h-max">
            <h2 className="text-xl font-semibold">ТОП Магазины</h2>
            <div className="grid grid-cols-1 gap-[5px]">
                {topSellers.map((seller) => (
                    <TopSellerCard
                        key={seller.place}
                        place={seller.place}
                        name={seller.name}
                    />
                ))}
            </div>
        </div>
    );
};

const TopSellerCard = ({ place, name }: { place: number; name: string }) => {
    const getPlaceColor = (place: number) => {
        switch (place) {
            case 1:
                return "bg-yellow-400";
            case 2:
                return "bg-gray-400";
            case 3:
                return "bg-orange-400";
            default:
                return "bg-none border-[1px] border-[#EF7214] text-black";
        }
    };

    return (
        <div className="flex items-center gap-4 p-[5px] rounded-xl">
            <div
                className={`${getPlaceColor(
                    place
                )} w-[26px] h-[26px] rounded-full text-white flex justify-center items-center shadow-xl font-bold`}
            >
                {place}
            </div>
            <div className="text-sm ">{name}</div>
        </div>
    );
};
