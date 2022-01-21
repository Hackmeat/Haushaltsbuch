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
    const [cat, setCat] = useState([])

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
                    let object = { name: month }
                    for (let i = 0; i < response.data.length; i++) {
                        object[response.data[i].category] = response.data[i].value
                    }
                    temp.push(object)
                })
            setYearStats(temp)
        }
    }

    const getCategory = () => {
        let temp = []
        axios.get('http://localhost:3000/categorys')
            .then((response) => {       
                for (let i = 0; i < response.data.length; i++) {
                    let object = {}
                    object["name"] = response.data[i].category
                    object["typ_id"] = response.data[i].typ_id
                    temp.push(object)
                }
                setCat(temp)
            })
    }

    useEffect(() => {
        getYearStats()
        getCategory()
    }, [])

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
            {cat.map((cat, index) => {     
                for (let i = 0; i < yearStats.length; i++) {       
                    if (yearStats[i][cat.name]) {
                        if (cat.typ_id == "1") {
                            console.log(yearStats[i])
                            console.log(cat.name)     
                            return (<Bar key={index} dataKey={cat.name} stackId="a" fill={yearStats[i].cat_color} />)
                        } else if (cat.typ_id == "2") {
                            return (<Bar key={index} dataKey={cat.name} fill={yearStats[i].cat_color} />)
                        } else if (cat.typ_id == "3") {
                            return (<Bar key={index} dataKey={cat.name} stackId="a" fill={yearStats[i].cat_color} />)
                        }
                    }
                }
            })}
        </BarChart>
    );
}

export default Diagram;