import { box } from "@/assets";
import { Image } from "@/components/ui/Image";
import { cn } from "@/utils/shared.util";
import { Card } from "antd";
import clsx from "clsx";
import { FC } from "react";

interface AdminHomePageProps {}

export const AdminHomePage: FC<AdminHomePageProps> = ({}) => {
    return (
        <div className="flex">
            <div className="flex flex-col gap-4">
                <ResultsCard />
                <ResultsCard />
                <ResultsCard />
                <ResultsCard />
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
            title={
                <div className="flex items-center justify-between">
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
