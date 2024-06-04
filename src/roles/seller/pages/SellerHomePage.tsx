import { box } from "@/assets";
import { LineCharts } from "@/components/shared/LineCharts";
import { Image } from "@/components/ui/Image";
import { cn } from "@/utils/shared.util";
import { Card } from "antd";
import clsx from "clsx";
import { FC } from "react";

interface SellerHomePageProps {}

export const SellerHomePage: FC<SellerHomePageProps> = ({}) => {
    return (
        <div className="flex p-5 from-orange-500 to-white bg-gradient-to-r">
            <div className="flex gap-6">
                <div className="flex flex-col gap-4">
                    <ResultsCard />
                    <ResultsCard />
                    <ResultsCard />
                    <ResultsCard />
                </div>
                <div>
                    <LineCharts />
                </div>
            </div>
            <div className="flex flex-col gap-4">
                <div className=""></div>
                <div className={clsx("")}></div>
            </div>
        </div>
    );
};

const ResultsCard = () => {
    return (
        <Card
            className="max-h-[155px]"
            title={
                <div className="flex items-center justify-between gap-20">
                    Results <ResultIcon src={box} color="bg-blue-100" />
                </div>
            }
        >
            <div>
                <p className="text-4xl">116</p>
                <ResultPercentage />
            </div>
        </Card>
    );
};

const ResultPercentage = () => {
    return <div>+11%</div>;
};

const ResultIcon = ({ src, color }: { src: string; color: string }) => {
    return (
        <div
            className={cn(
                "rounded-sm aspect-square w-10 flex items-center",
                color
            )}
        >
            <Image src={src} alt="icon" />
        </div>
    );
};
