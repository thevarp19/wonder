import { Spin } from "antd";
import { FC } from "react";
import { useMediaQuery } from "react-responsive";
import {
    Area,
    AreaChart,
    CartesianGrid,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { CheckItem, DurationType } from "../types";
import { formatLocalDate } from "../utils";
interface AreaChartsProps {
    data: CheckItem[];
    duration: DurationType;
    loading: boolean;
}
export const AreaCharts: FC<AreaChartsProps> = ({
    data,
    duration,
    loading,
}) => {
    const isSmallScreen = useMediaQuery({ query: "(max-width: 640px" });
    // const data = [
    //     {
    //         count: 1400,
    //         income: 1300,
    //         localDate: "2024-06-07T00:00",
    //     },
    //     {
    //         count: 15000,
    //         income: 1400,
    //         localDate: "2024-06-07T02:00",
    //     },
    //     {
    //         count: 16900,
    //         income: 1500,
    //         localDate: "2024-06-07T04:00",
    //     },
    //     {
    //         count: 17000,
    //         income: 1600,
    //         localDate: "2024-06-07T06:00",
    //     },
    //     {
    //         count: 1800,
    //         income: 1700,
    //         localDate: "2024-06-07T08:00",
    //     },
    //     {
    //         count: 1900,
    //         income: 1800,
    //         localDate: "2024-06-07T10:00",
    //     },
    //     {
    //         count: 2000,
    //         income: 900,
    //         localDate: "2024-06-07T12:00",
    //     },
    //     {
    //         count: 2100,
    //         income: 1200,
    //         localDate: "2024-06-07T14:00",
    //     },
    //     {
    //         count: 2300,
    //         income: 1100,
    //         localDate: "2024-06-07T16:00",
    //     },
    // ];

    const formattedData = (data ?? []).map((item: any) => ({
        ...item,
        creation_datetime: formatLocalDate(item.creation_datetime, duration),
    }));

    if (loading) {
        <div className="flex items-center justify-center">
            <Spin size="large" />
        </div>;
    }
    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-[#EF7214] rounded-full text-white p-4">
                    <p className="text-base">{`${payload[0].value} ₸`} </p>
                </div>
            );
        }

        return null;
    };
    return (
        <div className="h-full bg-[#F7F9FB] rounded-xl overflow-x-scroll">
            <div className="flex flex-col gap-10 py-8 rounded-md">
                <h2 className="text-xl ps-6">Чек</h2>
                <AreaChart
                    margin={{ left: 30 }}
                    width={isSmallScreen ? 640 : 1200}
                    height={isSmallScreen ? 260 : 310}
                    data={formattedData}
                >
                    <defs>
                        <linearGradient
                            id="colorIncome"
                            x1="494.764"
                            y1="0.184326"
                            x2="494.764"
                            y2="247.43"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop stopColor="#EF7214" stopOpacity="0.45" />
                            <stop
                                offset="1"
                                stopColor="#EF7214"
                                stopOpacity="0"
                            />
                        </linearGradient>
                    </defs>
                    <CartesianGrid y={99999} strokeDasharray="0" />
                    <XAxis padding={{ left: 15 }} dataKey="creation_datetime" />
                    <YAxis strokeWidth={0} dataKey="total_value" />
                    <Tooltip content={<CustomTooltip />} />

                    <Area
                        dot={{ stroke: "#FFA500", strokeWidth: 5 }}
                        type="monotone"
                        dataKey="total_value"
                        stroke="#FFA500"
                        fillOpacity={1}
                        fill="url(#colorIncome)"
                        activeDot={{ r: 8 }}
                    />
                </AreaChart>
            </div>
        </div>
    );
};
