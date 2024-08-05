import { arrowFall, arrowRise } from "@/assets";
import DurationSwitch from "@/components/ui/DurationSwitch";
import { Image } from "@/components/ui/Image";
import { AreaCharts } from "@/modules/statistics/components/AreaCharts";
import { BarCharts } from "@/modules/statistics/components/BarCharts";
import { LastOrdersTable } from "@/modules/statistics/components/LastOrdersTable";
import { PieCharts } from "@/modules/statistics/components/PieCharts";
import { useGetAdminStatistics } from "@/modules/statistics/queries";
import { DurationType, HeaderItem, TopStore } from "@/modules/statistics/types";
import { cn } from "@/utils/shared.util";
import { Spin } from "antd";
import { FC, useState } from "react";

interface AdminHomePageProps {}

export const AdminHomePage: FC<AdminHomePageProps> = ({}) => {
    const [duration, setDuration] = useState<DurationType>("MONTHLY");

    const { data: statistics, isPending } = useGetAdminStatistics(duration);
    // const statistics = {
    //     ordersInfo: { count: 140, percent: 48 },
    //     sellersInfo: { count: 52, percent: -18 },
    //     suppliesInfo: { count: 42, percent: 18 },
    //     incomeInfo: { count: 80, percent: 50 },и
    // const topSellers = [
    //     { place: 1, name: "ИП QIT" },
    //     { place: 2, name: "ИП Techai" },
    //     { place: 3, name: "ИП Arena" },
    //     { place: 4, name: "ИП Orda" },
    //     { place: 5, name: "АО Arena" },
    //     { place: 6, name: "АО Technodom" },
    //     { place: 7, name: "ИП Techai" },
    //     { place: 8, name: "ИП Arena" },
    //     { place: 9, name: "ИП Orda" },
    //     { place: 10, name: "ИП Akhmediyarova" },
    // ];
    // const { data: topSellers, isPending: topSellersLoading } =
    //     useGetAdminTopSeller();
    // const sortedTopSellers = topSellers?.content
    //     ? topSellers.content
    //           .sort((a, b) => b.totalIncome - a.totalIncome)
    //           .slice(0, 4)
    //     : [];
    if (isPending) {
        return (
            <div className="flex items-center justify-center h-[500px]">
                <Spin size="large" />
            </div>
        );
    }
    return (
        <div className="flex flex-col sm:pb-0 pb-[68px]">
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
                        statisticsName="Продавцы"
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
                    <div className="flex flex-col gap-5 sm:flex-row">
                        <div className="sm:min-w-[825px] h-max sm:h-[525px] p-5 sm:p-8 bg-[#F7F9FB] flex flex-col gap-6 rounded-[34px]">
                            <h2 className="text-xs font-semibold sm:text-xl">
                                Таблица заказов
                            </h2>
                            <LastOrdersTable />
                        </div>
                        <div className="w-full h-[525px] bg-[#F7F9FB] rounded-[34px] ">
                            <TopSellersList
                                topSellers={statistics?.top_stores || []}
                            />
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
                {statistics?.percentage !== null && (
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

interface TopSellersListProps {
    topSellers: TopStore[];
}

const TopSellersList: FC<TopSellersListProps> = ({ topSellers }) => {
    return (
        <div className="p-8 bg-[#F7F9FB] flex flex-col items-center gap-5 rounded-[34px] h-max">
            <h2 className="text-xl font-semibold">ТОП Магазины</h2>
            <div className="grid grid-cols-1 gap-[5px]">
                {topSellers.map((seller, index) => (
                    <TopSellerCard
                        key={seller.pk}
                        place={index + 1}
                        name={seller.kaspi_store_name}
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
                return "bg-none border-[1px] border-[#EF7214] !text-black";
        }
    };

    return (
        <div className="flex items-center gap-4 p-[5px] rounded-xl">
            <div
                className={cn(
                    `${getPlaceColor(
                        place
                    )} w-[26px] h-[26px] rounded-full text-white flex justify-center items-center shadow-xl font-bold`
                )}
            >
                {place}
            </div>
            <div className="">{name}</div>
        </div>
    );
};
