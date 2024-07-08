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

const data = [
    {
        count: 1400,
        income: 1300,
        day: "пн",
    },
    {
        count: 15000,
        income: 1400,
        day: "вт",
    },
    {
        count: 16900,
        income: 1500,
        day: "ср",
    },
    {
        count: 17000,
        income: 1600,
        day: "чт",
    },
    {
        count: 1800,
        income: 1700,
        day: "пт",
    },
    {
        count: 1900,
        income: 1800,
        day: "сб",
    },
    {
        count: 2000,
        income: 900,
        day: "вс",
    },
];

const CustomTooltip = ({ active, payload }: TooltipProps<any, any>) => {
    if (active && payload && payload.length) {
        return (
            <div className="px-7 py-1 rounded-full bg-[lightblue] text-white">
                <p className="text-center text-[18px] font-[500]">
                    {payload[0].value} ₸
                </p>
            </div>
        );
    }

    return null;
};

interface BarChartsProps {
    duration: string;
}

export const BarCharts: FC<BarChartsProps> = () => {
    const isSmallScreen = useMediaQuery({ query: "(max-width: 640px" });

    return (
        <div className="w-full sm:w-[50%] h-full p-6 sm:p-10 flex flex-col justify-center bg-[#F7F9FB] rounded-[32px]">
            <h2 className="text-base sm:text-[24px] font-[500] ml-7 mb-5">
                Заказы
            </h2>
            <ResponsiveContainer height={300}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="0" strokeWidth={0} />
                    <XAxis dataKey="day" padding={{ left: 30, right: 30 }} />
                    <YAxis
                        dataKey="income"
                        tickSize={10}
                        axisLine={false}
                        tick={{ fontSize: isSmallScreen ? 10 : 14 }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar
                        dataKey="income"
                        fill="#C6EAFF"
                        barSize={isSmallScreen ? 16 : 24}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};
