import React, {
    useState,
    useEffect
} from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts";
import axios from 'axios';

function Diagram() {

    const [yearStats, setYearStats] = useState([])

    const getYearStats = () => {
        var today = new Date();
        var yyyy = today.getFullYear();
        let temp = []
        //change to m <= 12
        for (let m = 0; m < 12; m++) {
            axios.get('http://localhost:3000/month/' + m + '-' + yyyy)
                .then((response) => {
                    
                    let date = new Date(1000, m, 1)
                    let month = date.toLocaleString('default', { month: 'long' });  
                    let object = {name: month}   
                    for (let i = 0; i < response.data.length; i++) {
                        object[response.data[i].category] = response.data[i].value
                    }  
                    temp.push(object)
                })
        }
        setYearStats(temp)
    }

    useEffect(() => getYearStats(), [])

    return (

        <BarChart
            width={800}
            height={400}
            data={yearStats}
            margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            {}
            <Bar dataKey="pv" stackId="a" fill="#8884d8" />
            <Bar dataKey="amt" stackId="a" fill="#82ca9d" />
            <Bar dataKey="uv" fill="#ffc658" />
        </BarChart>

    );
}

export default Diagram;