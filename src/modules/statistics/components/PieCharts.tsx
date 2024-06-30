import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

const data = [
    { name: "Алматы", value: 38.6 },
    { name: "Шымкент", value: 22.5 },
    { name: "Астана", value: 30.8 },
    { name: "Другие", value: 8.1 },
];
const COLORS = ["#EF7214", "#BAEDBD", "#95A4FC", "#B1E3FF"];

export const PieCharts = () => {
    return (
        <div className="w-[50%] h-full p-10 bg-[#F7F9FB] rounded-[32px]">
            <h2 className="text-[24px] font-[500] ml-7 mb-5">
                Продажи по локациям
            </h2>
            <div className="h-[80%] w-full flex justify-between items-center">
                <div className="w-1/2 h-full">
                    <ResponsiveContainer height={300}>
                        <PieChart>
                            <Pie
                                data={data}
                                innerRadius={60}
                                outerRadius={80}
                                fill="#8884d8"
                                paddingAngle={5}
                                dataKey="value"
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
                <div className="flex w-1/2 gap-10 justify">
                    <div className="flex flex-col gap-5">
                        {data.map((item, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-2"
                            >
                                <div
                                    style={{ backgroundColor: COLORS[index] }}
                                    className="w-2 h-2 rounded-full"
                                ></div>
                                <h2 className="text-[18px]">{item.name}</h2>
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col items-end justify-center gap-5">
                        {data.map((item) => (
                            <p className="text-[18px]">{item.value}%</p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
