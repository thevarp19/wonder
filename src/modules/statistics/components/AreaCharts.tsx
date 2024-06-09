import { Spin } from "antd";
import { FC } from "react";
import {
    Area,
    AreaChart,
    CartesianGrid,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { DurationType, GetDailyCountResponse } from "../types";
import { formatLocalDate } from "../utils";
interface AreaChartsProps {
    data: GetDailyCountResponse[];
    duration: DurationType;
    loading: boolean;
}
export const AreaCharts: FC<AreaChartsProps> = ({
    data,
    duration,
    loading,
}) => {
    // const data = [
    //     {
    //         count: 1400,
    //         income: 1300,
    //         localDate: "2024-06-07T00:00",
    //     },
    //     {
    //         count: 1500,
    //         income: 1400,
    //         localDate: "2024-06-07T02:00",
    //     },
    //     {
    //         count: 1600,
    //         income: 1500,
    //         localDate: "2024-06-07T04:00",
    //     },
    //     {
    //         count: 1700,
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
    //     {
    //         count: 3000,
    //         income: 1500,
    //         localDate: "2024-06-07T18:00",
    //     },
    //     {
    //         count: 4000,
    //         income: 1100,
    //         localDate: "2024-06-07T20:00",
    //     },
    //     {
    //         count: 2300,
    //         income: 1000,
    //         localDate: "2024-06-07T22:00",
    //     },
    // ];

    const formattedData = (data ?? []).map((item: any) => ({
        ...item,
        localDate: formatLocalDate(item.localDate, duration),
    }));

    return (
        <div className="h-full p-2 bg-orange-100 shadow-2xl rounded-xl">
            <div className="p-6 bg-white rounded-md">
                {loading && (
                    <div className="flex justify-center">
                        <Spin size="large" />
                    </div>
                )}
                <AreaChart width={800} height={310} data={formattedData}>
                    <CartesianGrid y={99999} strokeDasharray="0" />
                    <XAxis dataKey="localDate" />
                    <YAxis strokeWidth={0} dataKey="count" />
                    <Tooltip />
                    {/* <Legend /> */}

                    <Area
                        dot={{ stroke: "#FFA500", strokeWidth: 5 }}
                        type="monotone"
                        dataKey="income"
                        label={"Tenge"}
                        stroke="#FFA500"
                        fill="#FFA800"
                        activeDot={{ r: 8 }}
                    />
                </AreaChart>
            </div>
        </div>
    );
};
