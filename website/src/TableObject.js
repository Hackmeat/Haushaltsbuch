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

    const [rows, setRows] = useState([])

    function createData(detail, category, date, amount) {
        return { detail, category, date, amount };
    }

    const getRows = () => {
        var today = new Date();
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();
        today = mm + "-" + yyyy
        axios.get('http://localhost:3000/rangeDate/' + today)
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

    useEffect(() => getRows(), [])

    return (
        <TableContainer component={Paper} sx={{ maxWidth: '40vw', maxHeight: '48vh', ml: '5vw', mt: '2vh' }}>
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