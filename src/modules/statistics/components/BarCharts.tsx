import { FC } from "react";
import { useMediaQuery } from "react-responsive";
import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    TooltipProps,
    XAxis,
    YAxis,
} from "recharts";
import { WeeklyOrderItem } from "../types";

const dayMapping: { [key: number]: string } = {
    1: "пн",
    2: "вт",
    3: "ср",
    4: "чт",
    5: "пт",
    6: "сб",
    7: "вс",
};

const mapDaysToStrings = (data: WeeklyOrderItem[]) => {
    return data.map((item) => ({
        ...item,
        day: dayMapping[item.day],
    }));
};

const CustomTooltip = ({ active, payload }: TooltipProps<any, any>) => {
    if (active && payload && payload.length) {
        return (
            <div className="px-7 py-1 rounded-full bg-[lightblue] text-white">
                <p className="text-center text-[18px] font-[500]">
                    {payload[0].value}
                </p>
            </div>
        );
    }

    return null;
};

interface BarChartsProps {
    data: WeeklyOrderItem[];
    duration: string;
}

export const BarCharts: FC<BarChartsProps> = ({ data }) => {
    const isSmallScreen = useMediaQuery({ query: "(max-width: 640px" });

    const mappedData = mapDaysToStrings(data);

    return (
        <div className="w-full sm:w-[50%] h-full p-6 sm:p-10 flex flex-col justify-center bg-[#F7F9FB] rounded-[32px]">
            <h2 className="text-base sm:text-[24px] font-[500] ml-7 mb-5">
                Заказы
            </h2>
            <ResponsiveContainer height={300}>
                <BarChart data={mappedData}>
                    <CartesianGrid strokeDasharray="0" strokeWidth={0} />
                    <XAxis dataKey="day" padding={{ left: 30, right: 30 }} />
                    <YAxis
                        dataKey="score"
                        tickSize={10}
                        axisLine={false}
                        tick={{ fontSize: isSmallScreen ? 10 : 14 }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar
                        dataKey="score"
                        fill="#C6EAFF"
                        barSize={isSmallScreen ? 16 : 24}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};
