import { box, boxOpen, scan, tenge } from "@/assets";
import { Image } from "@/components/ui/Image";
import { AreaCharts } from "@/modules/statistics/components/AreaCharts";
import { ProductsCountTable } from "@/modules/statistics/components/ProductCountTable";
import {
    useGetAdminSalesInfo,
    useGetSellerDailyInfo,
    useGetSellerTopProducts,
} from "@/modules/statistics/queries";
import { StatisticsInfo } from "@/modules/statistics/types";
import { getColorByStatisticsName } from "@/modules/statistics/utils";
import { cn } from "@/utils/shared.util";
import { Card, Spin } from "antd";
import { FC } from "react";

interface SellerHomePageProps {}

export const SellerHomePage: FC<SellerHomePageProps> = ({}) => {
    // const topProducts = {
    //     content: [
    //         {
    //             productId: 7,
    //             productName: "Электрогриль DSP KB1036",
    //             productPrice: 40000,
    //             count: 16,
    //         },
    //         {
    //             productId: 6,
    //             productName: "Cronier CR-935 утюжок",
    //             productPrice: 80000,
    //             count: 14,
    //         },
    //         {
    //             productId: 2,
    //             productName: "Электрочайник Super Crest SCT-4022",
    //             productPrice: 150000,
    //             count: 18,
    //         },
    //         {
    //             productId: 4,
    //             productName: "VGR V-306 роторная от сети ",
    //             productPrice: 60000,
    //             count: 12,
    //         },
    //         {
    //             productId: 5,
    //             productName: "ABS V-306  от сети ",
    //             productPrice: 3500,
    //             count: 2,
    //         },
    //     ],
    // };
    // const topProductsLoading = false;
    const duration = "MONTH";
    const { data: statistics, isPending } = useGetAdminSalesInfo(duration);
    const { data: dailyInfo, isPending: getDailyLoading } =
        useGetSellerDailyInfo(duration);
    const { data: topProducts, isPending: topProductsLoading } =
        useGetSellerTopProducts();
    const sortedTopProducts = topProducts?.content
        ? topProducts.content.sort((a, b) => b.count - a.count).slice(0, 4)
        : [];
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
                            // { count: 30, percent: -12 }
                            statistics?.sellersInfo
                        }
                    />
                    <ResultsCard
                        statisticsName="Поставок"
                        iconSrc={scan}
                        statistics={
                            // { count: 65, percent: 42 }
                            statistics?.suppliesInfo
                        }
                    />
                    <ResultsCard
                        statisticsName="Чек"
                        iconSrc={tenge}
                        statistics={
                            // { count: 1243244, percent: 12 }
                            statistics?.incomeInfo
                        }
                    />
                </div>
                <div className="flex flex-col gap-5">
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
                                    ТОП Товары
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
                </div>
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
const TopProductsCard = ({
    place,
    name,
    sum,
}: {
    place: number;
    name: string;
    sum: number;
}) => {
    return (
        <div className="p-2 border-2 border-[#EF7214] rounded-xl w-full max-w-full max-h-max flex justify-center">
            <div className="flex items-center justify-start w-full gap-2">
                <div className="bg-[#EF7214] w-6 h-6 rounded-full text-white p-2 text-lg flex justify-center items-center shadow-xl font-bold">
                    {place}
                </div>
                <div className="flex justify-between w-full gap-3">
                    <div className="text-[10px] font-bold text-[#EF7214]">
                        {name}
                    </div>
                    <div className="text-sm font-semibold text-[#EF7214]">
                        {sum.toLocaleString("ru")}₸
                    </div>
                </div>
            </div>
        </div>
    );
};
