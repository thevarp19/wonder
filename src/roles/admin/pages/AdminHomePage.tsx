import { box, boxOpen, scan, tenge } from "@/assets";
import { Image } from "@/components/ui/Image";
import { AreaCharts } from "@/modules/statistics/components/AreaCharts";
import { useGetAdminSalesInfo } from "@/modules/statistics/queries";
import { StatisticsInfo } from "@/modules/statistics/types";
import { getColorByStatisticsName } from "@/modules/statistics/utils";
import { cn } from "@/utils/shared.util";
import { Card, Spin } from "antd";
import clsx from "clsx";
import { FC } from "react";

interface AdminHomePageProps {}

export const AdminHomePage: FC<AdminHomePageProps> = ({}) => {
    const { data: statistics, isPending } = useGetAdminSalesInfo("MONTH");

    if (isPending) {
        return (
            <div className="flex items-center justify-center h-[500px]">
                <Spin size="large" />
            </div>
        );
    }
    return (
        <div className="flex p-5 from-orange-500 to-white bg-gradient-to-r">
            <div className="flex gap-6">
                <div className="flex flex-col gap-4">
                    <ResultsCard
                        statisticsName="Заказы"
                        iconSrc={boxOpen}
                        statistics={
                            // { count: 42, percent: 18 }
                            statistics?.ordersInfo
                        }
                    />
                    <ResultsCard
                        statisticsName="Продавцов"
                        iconSrc={box}
                        statistics={
                            { count: 30, percent: -12 }
                            // statistics?.sellersInfo
                        }
                    />
                    <ResultsCard
                        statisticsName="Поставок"
                        iconSrc={scan}
                        statistics={
                            { count: 65, percent: 42 }
                            // statistics?.suppliesInfo
                        }
                    />
                    <ResultsCard
                        statisticsName="Чек"
                        iconSrc={tenge}
                        statistics={
                            { count: 1243244, percent: 12 }
                            // statistics?.incomeInfo
                        }
                    />
                </div>
                <div className="flex flex-col gap-5">
                    <AreaCharts />
                    <div className="flex gap-5">
                        <div className="w-[65%] p-2 shadow-2xl rounded-xl">
                            <div className="p-10 bg-white rounded-md">
                                <div className="bg-orange"></div>
                            </div>
                        </div>
                        <div className="w-[35%] p-2 bg-orange-100 shadow-2xl rounded-xl">
                            <div className="bg-white rounded-[10px] h-full flex flex-col gap-2">
                                <div className="bg-[#EF7214] rounded-md text-white font-semibold text-center">
                                    ТОП Продавцы
                                </div>
                                <div className="grid grid-cols-2 gap-2 place-items-center">
                                    <TopSellerCard
                                        place="1"
                                        name="John Doe"
                                        sum="1000"
                                    />
                                    <TopSellerCard
                                        place="2"
                                        name="John Doe"
                                        sum="1000"
                                    />
                                    <TopSellerCard
                                        place="3"
                                        name="John Doe"
                                        sum="1000"
                                    />
                                    <TopSellerCard
                                        place="4"
                                        name="John Doe"
                                        sum="1000"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-4">
                <div className=""></div>
                <div className={clsx("")}></div>
            </div>
        </div>
    );
};

type ResultsCardProps = {
    statisticsName: string;
    iconSrc: string;
    statistics: StatisticsInfo | undefined;
};
const ResultsCard = ({
    statisticsName,
    iconSrc,
    statistics,
}: ResultsCardProps) => {
    const bgColor = getColorByStatisticsName(statisticsName);
    const percentBgColor =
        statistics?.percent != null
            ? statistics.percent > 0
                ? "bg-[#7DF1B2]"
                : "bg-[#ff0e0e]"
            : "";

    return (
        <Card className="max-h-[155px] ">
            <div className="flex items-center justify-between text-3xl">
                {statisticsName}{" "}
                <ResultIcon src={iconSrc} color={bgColor ? `${bgColor}` : ""} />
            </div>
            <div className="flex gap-5 whitespace-nowrap">
                <div className="text-4xl">{`${statistics?.count} ${
                    statisticsName === "Чек" ? "₸" : ""
                }`}</div>
                {statistics?.percent !== null && (
                    <div
                        className={`text-sm rounded-xl flex justify-center items-center p-2  ${percentBgColor}`}
                    >
                        {statistics?.percent != null && statistics?.percent > 0
                            ? `+${statistics?.percent}%`
                            : `${statistics?.percent}%`}
                    </div>
                )}
            </div>
        </Card>
    );
};

const ResultIcon = ({ src, color }: { src: string; color: string }) => {
    return (
        <div
            className={cn(
                "rounded-md aspect-square justify-center w-16 h-16 flex items-center",
                color
            )}
        >
            <Image className="w-[50px] h-[50px]" src={src} alt="icon" />
        </div>
    );
};
const TopSellerCard = ({
    place,
    name,
    sum,
}: {
    place: string;
    name: string;
    sum: string;
}) => {
    return (
        <div className="p-2 border-2 border-[#EF7214] rounded-xl w-max flex flex-col items-center">
            <div className="flex items-center gap-2">
                <div className=" bg-[#EF7214] w-8 h-8 rounded-full text-white p-2 text-lg flex justify-center items-center shadow-xl font-bold">
                    {place}
                </div>
                <div className="text-base font-bold text-[#EF7214]">{name}</div>
            </div>
            <div className="text-2xl font-semibold text-[#EF7214]">{sum}₸</div>
        </div>
    );
};
