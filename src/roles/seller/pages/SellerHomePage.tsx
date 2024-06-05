import { AreaCharts } from "@/modules/statistics/components/AreaCharts";
import clsx from "clsx";
import { FC } from "react";

interface SellerHomePageProps {}

export const SellerHomePage: FC<SellerHomePageProps> = ({}) => {
    return (
        <div className="flex p-5 from-orange-500 to-white bg-gradient-to-r">
            <div className="flex gap-6">
                <div className="flex flex-col gap-4">
                    {/* <ResultsCard
                        statisticsName="Заказы"
                        iconSrc="/assets/img/box-open.svg"
                        bgColor="#D8E7FF"
                        statistics={statistics}
                    />
                    <ResultsCard
                        statisticsName="Продавцы"
                        iconSrc="/assets/img/box.svg"
                        bgColor="bg-color"
                        statistics={statistics}
                    />
                    <ResultsCard
                        statisticsName="Поставки"
                        iconSrc="/assets/img/box.svg"
                        bgColor="bg-color"
                        statistics={statistics}
                    />
                    <ResultsCard
                        statisticsName="Чек"
                        iconSrc="/assets/img/box.svg"
                        bgColor="bg-color"
                        statistics={statistics}
                    /> */}
                </div>
                <div>
                    <AreaCharts />
                </div>
            </div>
            <div className="flex flex-col gap-4">
                <div className=""></div>
                <div className={clsx("")}></div>
            </div>
        </div>
    );
};

// type ResultsCardProps = {
//     statisticsName: string;
//     iconSrc: string;
//     bgColor: string;
//     statistics: StatisticsInfo;
// };
// const ResultsCard = ({
//     statisticsName,
//     iconSrc,
//     bgColor,
//     statistics,
// }: ResultsCardProps) => {
//     return (
//         <Card
//             className="max-h-[155px]"
//             title={
//                 <div className="flex items-center justify-between gap-20">
//                     {statisticsName}{" "}
//                     <ResultIcon
//                         src={iconSrc}
//                         color={`bg-[${bgColor}] rounded-md p-4`}
//                     />
//                 </div>
//             }
//         >
//             <div>
//                 <div className="text-4xl">{statistics.count}</div>
//                 <div className="text-xl">
//                     {statistics.percent === null ? "-" : statistics.percent}
//                 </div>
//                 {/* <ResultPercentage /> */}
//             </div>
//         </Card>
//     );
// };

// const ResultIcon = ({ src, color }: { src: string; color: string }) => {
//     return (
//         <div
//             className={cn(
//                 "rounded-sm aspect-square w-10 flex items-center",
//                 color
//             )}
//         >
//             <Image src={src} alt="icon" />
//         </div>
//     );
// };
