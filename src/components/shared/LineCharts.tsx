import { FC } from "react";
import {
    Area,
    AreaChart,
    CartesianGrid,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
export const LineCharts: FC = () => {
    const data = [
        {
            date: "4 марта",
            tenge: 2400,
            amt: 2400,
        },
        {
            date: "5 марта",
            tenge: 4400,
            amt: 4400,
        },
        {
            date: "6 марта",
            tenge: 3400,
            amt: 3400,
        },
        {
            date: "7 марта",
            tenge: 1400,
            amt: 1400,
        },
        {
            date: "8 марта",
            tenge: 2700,
            amt: 2700,
        },
        {
            date: "10 марта",
            tenge: 3100,
            amt: 3100,
        },
        {
            date: "14 марта",
            tenge: 2000,
            amt: 2000,
        },
        {
            date: "18 марта",
            tenge: 4000,
            amt: 4000,
        },
    ];
    return (
        <div className="p-2 bg-orange-100 shadow-2xl rounded-xl">
            <div className="p-10 bg-white rounded-md">
                <AreaChart width={850} height={350} data={data}>
                    <CartesianGrid y={99999} strokeDasharray="0" />
                    <XAxis dataKey="date" padding={{ left: 30, right: 30 }} />
                    <YAxis strokeWidth={0} />
                    <Tooltip />
                    {/* <Legend /> */}

                    <Area
                        dot={{ stroke: "#FFA500", strokeWidth: 2 }}
                        type="monotone"
                        dataKey="tenge"
                        stroke="#FFA500"
                        fill="#FFA800"
                        activeDot={{ r: 8 }}
                    />
                </AreaChart>
            </div>
        </div>
    );
};
