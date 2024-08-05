import { FC } from "react";
import { useMediaQuery } from "react-responsive";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { CityAnalyticsItem } from "../types";

// const data = [
//     { name: "Алматы", value: 38.6 },
//     { name: "Шымкент", value: 22.5 },
//     { name: "Астана", value: 30.8 },
//     { name: "Другие", value: 8.1 },
// ];
const COLORS = ["#EF7214", "#BAEDBD", "#95A4FC", "#B1E3FF"];

interface PieChartsProps {
    data: CityAnalyticsItem[];
}

export const PieCharts: FC<PieChartsProps> = ({ data }) => {
    const isSmallScreen = useMediaQuery({ query: "(max-width: 640px" });

    return (
        <div className="w-full sm:w-[50%] h-full p-5 sm:p-10 bg-[#F7F9FB] rounded-[32px] ">
            <h2 className="text-base sm:text-[24px] font-[500] sm:ml-7 sm:mb-5">
                Продажи по локациям
            </h2>
            <div className="sm:h-[80%] w-full flex gap-7 justify-between items-center">
                <div className="w-1/2 h-full">
                    <ResponsiveContainer height={isSmallScreen ? 170 : 300}>
                        <PieChart>
                            <Pie
                                data={data}
                                innerRadius={isSmallScreen ? 40 : 60}
                                outerRadius={isSmallScreen ? 50 : 80}
                                fill="#8884d8"
                                paddingAngle={3}
                                dataKey="order_count"
                            >
                                {data.map((_entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="flex w-1/2 gap-10 ">
                    <div className="flex flex-col gap-[10px] sm:gap-5">
                        {data.map((item, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-2"
                            >
                                <div
                                    style={{ backgroundColor: COLORS[index] }}
                                    className="w-2 h-2 rounded-full"
                                ></div>
                                <h2 className="text-[10px] sm:text-[18px]">
                                    {item.city}
                                </h2>
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col items-end justify-center gap-[10px] sm:gap-5">
                        {data.map((item, index) => (
                            <p
                                key={index}
                                className="text-[10px] sm:text-[18px]"
                            >
                                {item.percentage}%
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
