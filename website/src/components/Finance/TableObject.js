//--------------------------------------------------------------------------------------------------------------------
//---------Table with name, category, date and cost, transforming to € currency, only displays current month----------
//--------------------------------------------------------------------------------------------------------------------
//Imports
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from '@mui/material';
import React, {
    useState,
    useEffect
} from 'react';
import axios from 'axios';

function TableObject() {

    //--------------------------------------------------------------------------------------------------------------------
    //Initialization
    const [rows, setRows] = useState([])

    var api = 'http://localhost:3000/'

    //--------------------------------------------------------------------------------------------------------------------
    //Displaying table objects
    //Data structure
    function createData(detail, category, date, amount) {
        return { detail, category, date, amount };
    }

    //Get data from db
    const getRows = () => {
        var today = new Date();
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();
        today = mm + "-" + yyyy
        axios.get(api + 'rangeDate/' + today)
            .then(response => {
                let tempRows = []
                for (let i = 0; i < response.data.length; i++) {
                    if (response.data[i].typ === 'income' || response.data[i].typ === 'savings') {
                        tempRows.push(createData(response.data[i].purpose, response.data[i].category, response.data[i].date, response.data[i].value.toFixed(2) + "€"))
                    } else if (response.data[i].typ === 'outcome') {
                        tempRows.push(createData(response.data[i].purpose, response.data[i].category, response.data[i].date, "-" + response.data[i].value.toFixed(2) + "€"))
                    }
                }
                setRows(tempRows)
            });
    }

    //--------------------------------------------------------------------------------------------------------------------
    //Gethering all data
    useEffect(() => getRows(), [])

    //--------------------------------------------------------------------------------------------------------------------
    //Rendering
    return (
        <TableContainer component={Paper} sx={{ width: '100%', maxHeight: '46vh', mt: '2vh' }}>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell align="center">Date</TableCell>
                        <TableCell align="right">Cost</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, index) => (
                        <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.detail}
                            </TableCell>
                            <TableCell align="left">{row.category}</TableCell>
                            <TableCell align="center">{row.date}</TableCell>
                            <TableCell align="right">{row.amount}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default TableObject;