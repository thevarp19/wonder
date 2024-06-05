import { FC } from "react";
import {
    Area,
    AreaChart,
    CartesianGrid,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
export const AreaCharts: FC = () => {
    const data = [
        {
            date: "4 марта",
            id: 1,
            sum: 10400,
        },
        {
            date: "5 марта",
            id: 2,
            sum: 4400,
        },
        {
            date: "6 марта",
            id: 3,
            sum: 3400,
        },
        {
            date: "7 марта",
            id: 4,
            sum: 1400,
        },
        {
            date: "8 марта",
            id: 5,
            sum: 2700,
        },
        {
            date: "10 марта",
            id: 6,
            sum: 3100,
        },
        {
            date: "14 марта",
            id: 7,
            sum: 2000,
        },
        {
            date: "18 марта",
            id: 8,
            sum: 4000,
        },
        {
            date: "19 марта",
            id: 9,
            sum: 1000,
        },
        {
            date: "20 марта",
            id: 10,
            sum: 2000,
        },
    ];
    return (
        <div className="p-2 bg-orange-100 shadow-2xl rounded-xl">
            <div className="p-10 bg-white rounded-md">
                <AreaChart width={800} height={350} data={data}>
                    <CartesianGrid y={99999} strokeDasharray="0" />
                    <XAxis dataKey="date" />
                    <YAxis strokeWidth={0} />
                    <Tooltip />
                    {/* <Legend /> */}

                    <Area
                        dot={{ stroke: "#FFA500", strokeWidth: 2 }}
                        type="monotone"
                        dataKey="sum"
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
