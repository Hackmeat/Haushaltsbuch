import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import React, { useState, useEffect } from 'react';

import axios from 'axios';

function TableObject() {

    const [rows, setRows] = useState([])

    function createData(detail, date, amount) {
        return { detail, date, amount };
    }

    const getRows = () => {

        var today = new Date();
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();

        today = yyyy + "-" + mm

        console.log(today)

        axios.get('http://localhost:3000/rangeDate/' + today)
            .then(response => {
                let tempRows = []
                for (let i = 0; i < response.data.length; i++) {
                    tempRows.push(createData(response.data[i].purpose, response.data[i].date, response.data[i].value.toFixed(2) + "€"))
                }
                setRows(tempRows)
            });
    }

    useEffect(() => getRows(), [])

    return (
        <TableContainer component={Paper} sx={{ maxWidth: '30vw', maxHeight: '48vh', ml: '10vw', mt: '2vh' }}>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
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