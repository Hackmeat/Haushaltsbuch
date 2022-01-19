import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

import './App.css';

function Cake() {

    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

    const data01 = [
        { name: "Group A", value: 400 },
        { name: "Group B", value: 300 },
        { name: "Group C", value: 300 },
        { name: "Group D", value: 200 }
    ];
    const data02 = [
        { name: "A1", value: 100 },
        { name: "A2", value: 300 },
        { name: "B1", value: 100 },
        { name: "B2", value: 80 },
        { name: "B3", value: 40 },
        { name: "B4", value: 30 },
        { name: "B5", value: 50 },
        { name: "C1", value: 100 },
        { name: "C2", value: 200 },
        { name: "D1", value: 150 },
        { name: "D2", value: 50 }
    ];

    return (

            <PieChart width={450} height={450}>
                <Pie
                    data={data02}
                    dataKey="value"
                    cx={220}
                    cy={220}
                    outerRadius={180}
                    fill="#82ca9d"
                >

                </Pie>
                <Pie
                    data={data01}
                    dataKey="value"
                    cx={220}
                    cy={220}
                    innerRadius={185}
                    outerRadius={195}
                >
                    {data01.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
            </PieChart>
    );
}

export default Cake;