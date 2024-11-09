import React from "react";
import {
    AreaChart,
    Area,
    XAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const data = [
    { name: "January", Total: 1200 },
    { name: "February", Total: 2100 },
    { name: "March", Total: 800 },
    { name: "April", Total: 1600 },
    { name: "May", Total: 900 },
    { name: "June", Total: 1700 },
    { name: "July", Total: 1500 },
    { name: "August", Total: 1300 },
    { name: "September", Total: 1800 },
    { name: "October", Total: 2000 },
    { name: "November", Total: 1400 },
    { name: "December", Total: 1900 }
];
const Chart = ({ aspect, title }) => {
    return (
        <div className="p-4 shadow-lg rounded-lg bg-white">
            <div className="text-lg font-semibold mb-4">{title}</div>
            <ResponsiveContainer width="100%" aspect={aspect}>
                <AreaChart
                    width={730}
                    height={250}
                    data={data}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                    <defs>
                        <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="name" stroke="#8884d8" />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Area
                        type="monotone"
                        dataKey="Total"
                        stroke="#8884d8"
                        fillOpacity={1}
                        fill="url(#total)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Chart;

