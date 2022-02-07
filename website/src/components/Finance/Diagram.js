//--------------------------------------------------------------------------------------------------------------------
//--------Displaying the diagramm chart, showing all months with expense in categorys and income with a legend--------
//--------------------------------------------------------------------------------------------------------------------
//Imports
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

    //--------------------------------------------------------------------------------------------------------------------
    //Initialization
    const [yearStats, setYearStats] = useState(null)
    const [cat, setCat] = useState([])

    //--------------------------------------------------------------------------------------------------------------------
    //Get data
    //getting the years statistics seperated into months
    const getYearStats = async () => {
        var today = new Date();
        var yyyy = today.getFullYear();
        let temp = []
        for (let m = 1; m <= 12; m++) {
            const response = await axios.get('http://localhost:3000/month/' + m + '-' + yyyy)          
            let date = new Date(1000, m - 1, 1)
            let month = date.toLocaleString('default', { month: 'short' });
            let object = { name: month }
            for (let i = 0; i < response.data.length; i++) {
                object[response.data[i].category] = response.data[i].value
            }
            temp.push(object)
        }
        setYearStats(temp)
    }

    //Getting all the categorys
    const getCategory = () => {
        let temp = []
        axios.get('http://localhost:3000/categorys')
            .then((response) => {
                for (let i = 0; i < response.data.length; i++) {
                    let object = {}
                    object["name"] = response.data[i].category
                    object["typ_id"] = response.data[i].typ_id
                    object["cat_color"] = response.data[i].cat_color
                    temp.push(object)
                }
                console.log(temp)
                setCat(temp)
            })
    }

    //Call data gethering fnctions
    useEffect(() => {
        getYearStats()
        getCategory()
    }, [])

    //--------------------------------------------------------------------------------------------------------------------
    //Rendering
    return (
        <div>
            {!yearStats && <p>Loading</p>}
            {yearStats && (
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
                                    return (<Bar key={index} dataKey={cat.name} stackId="a" fill={cat.cat_color} />)
                                } else if (cat.typ_id == "2") {
                                    return (<Bar key={index} dataKey={cat.name} stackId="b" fill={cat.cat_color} />)
                                } else if (cat.typ_id == "3") {
                                    return (<Bar key={index} dataKey={cat.name} stackId="a" fill={cat.cat_color} />)
                                }
                            }
                        }
                    })}
                </BarChart>
            )}
        </div>
    );
}

export default Diagram;