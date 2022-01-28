import {
    PieChart,
    Pie,
    Cell
} from "recharts";
import React, {
    useState,
    useEffect
} from 'react';
import axios from 'axios';
import './App.css';

function Cake() {

    const [colorInner, setColorInner] = useState([])
    const [dataInner, setDataInner] = useState([])
    const [colorOuter, setColorOuter] = useState([])
    const [dataOuter, setDataOuter] = useState([])
    const [income, setIncome] = useState([])
    const [incomeColor, setIncomeColor] = useState([])
    const [expense, setExpense] = useState([])
    const [expenseColor, setExpenseColor] = useState([])

    function createData(name, value) {
        return { name, value }
    }

    function dateRange(){
        var today = new Date();
        var yyyy = today.getFullYear();
        var mm = today.getMonth() + 1;
        return mm + "-" + yyyy
    }

    //Inner
    const getPurpose = () => {    
        let temp = []
        axios.get('http://localhost:3000/expense/pur/' + dateRange())
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
        axios.get('http://localhost:3000/expense/cat/' + dateRange())
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

    const getIncome = () => {
        let temp = []
        axios.get('http://localhost:3000/income/' + dateRange())
            .then(response => {
                for (let i = 0; i < response.data.length; i++) {
                    temp.push(createData(response.data[i].category, response.data[i].value))
                }
                setIncome(temp)
                temp = []
                for (let i = 0; i < response.data.length; i++) {
                    temp.push(response.data[i].cat_color)
                }
                setIncomeColor(temp)
            })
    }

    const getExpense = () => {
        let temp = []
        axios.get('http://localhost:3000/expense/' + dateRange())
            .then(response => {
                for (let i = 0; i < response.data.length; i++) {
                    temp.push(createData(response.data[i].typ_id, response.data[i].value))
                }
                setExpense(temp)
                temp = []
                for (let i = 0; i < response.data.length; i++) {
                    temp.push(response.data[i].cat_color)
                }
                setExpenseColor(temp)
            })
    }

    useEffect(() => {
        getIncome()
        getExpense()
        getCategory()
        getPurpose()
    }, [])
    

    return (
        <>
            <div className="pieDiv">
                <PieChart width={400} height={400}>
                    <Pie
                        data={dataInner}
                        dataKey="value"
                        cx={195}
                        cy={195}
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
                        cx={195}
                        cy={195}
                        innerRadius={185}
                        outerRadius={195}
                    >
                        {dataOuter.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={colorOuter[index % colorOuter.length]} />
                        ))}
                    </Pie>
                </PieChart>
                <PieChart width={400} height={400}>
                    <Pie
                        data={income}
                        dataKey="value"
                        cx={195}
                        cy={195}
                        outerRadius={180}
                        fill="#82ca9d"
                    >
                        {income.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={incomeColor[index % incomeColor.length]} />
                        ))}
                    </Pie>
                    <Pie
                        data={expense}
                        dataKey="value"
                        cx={195}
                        cy={195}
                        innerRadius={185}
                        outerRadius={195}
                    >
                        {expense.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={expenseColor[index % expenseColor.length]} />
                        ))}
                    </Pie>
                </PieChart>
            </div>
        </>
    );
}

export default Cake;

/*
 
            */