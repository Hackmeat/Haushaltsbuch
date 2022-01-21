import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

import React, { useState, useEffect } from 'react';

import axios from 'axios';

import './App.css';

function Cake() {


    const [colorInner, setColorInner] = useState([])
    const [dataInner, setDataInner] = useState([])
    const [colorOuter, setColorOuter] = useState([])
    const [dataOuter, setDataOuter] = useState([])

    function createData(name, value) {
        return { name, value }
    }

    //Inner
    const getData = () => {
        let temp = []  
        axios.get('http://localhost:3000/expense/pur')
            .then(response => {
                for (let i = 0; i < response.data.length; i++) {
                    temp.push(createData(response.data[i].purpose, response.data[i].value))
                }
                setDataInner(temp)
                temp = []
                for (let i = 0; i < response.data.length; i++) {
                    temp.push(response.data[i].pur_color)
                }
                setColorInner(temp)
            })
    }
    //Outer
    const getCategory = () => {
        let temp = []
        axios.get('http://localhost:3000/expense/cat')
            .then(response => {
                for (let i = 0; i < response.data.length; i++) {
                    temp.push(createData(response.data[i].category, response.data[i].value))
                }
                setDataOuter(temp)
                temp = []
                for (let i = 0; i < response.data.length; i++) {
                    temp.push(response.data[i].cat_color)
                }
                setColorOuter(temp)
            })
    }

    useEffect(() => getData(), [])
    useEffect(() => getCategory(), [])

    return (

        <PieChart width={450} height={450}>
            <Pie
                data={dataInner}
                dataKey="value"
                cx={220}
                cy={220}
                outerRadius={180}
                fill="#82ca9d"
            >
                {dataInner.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colorInner[index % colorInner.length]} />
                ))}
            </Pie>
            <Pie
                data={dataOuter}
                dataKey="value"
                cx={220}
                cy={220}
                innerRadius={185}
                outerRadius={195}
            >
                {dataOuter.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colorOuter[index % colorOuter.length]} />
                ))}
            </Pie>
        </PieChart>
    );
}

export default Cake;