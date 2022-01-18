import FilledInput from '@mui/material/FilledInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import axios from 'axios';

import './App.css';

import React, { useEffect } from 'react';

function InputArea() {

    let purposeSearchValue = 0

    const [costs, setCosts] = React.useState({
        amount: '',
    });
    const [value, setValue] = React.useState(new Date());
    const [cat, setCat] = React.useState('');
    const [pur, setPur] = React.useState('');
    const [menuItemsCat, setMenuItemsCat] = React.useState([])
    const [menuItemsPur, setMenuItemsPur] = React.useState([])

    const handleChangeCost = (prop) => (event) => {
        setCosts({ ...costs, [prop]: event.target.value });
    };

    const handleChangeDate = (newValue) => {
        setValue(newValue);
        
    };

    const handleChangeCategory = (event) => {
        setCat(event.target.value);
        getPurpose(event.target.value)
    };

    const handleChangePurpose = (event) => {
        setPur(event.target.value);
    };

    function isNumeric(num) {
        return !isNaN(num)
    }

    function getCategory() {
        axios.get('http://localhost:3000/categorys')
            .then(response => {
                setMenuItemsCat(response.data)
            });
    }

    function getPurpose(index) {
        axios.get('http://localhost:3000/purposes/' + index)
            .then(response => {
                setMenuItemsPur(response.data)
            });
    }

    useEffect(getCategory, [])
    
 
    return (
        <div id="inputFormat">
            <div>
                <FormControl fullWidth sx={{ mt: '2vh', ml: '2vw', maxWidth: '22vw', minWidth: '22vw' }}>
                    <InputLabel id="cat">Category</InputLabel>
                    <Select
                        labelId="cat"
                        value={cat}
                        label="Category"
                        onChange={handleChangeCategory}
                    >
                        {menuItemsCat?.map((item, index) => (
                            <MenuItem key={index} value={item.id}>{item.category}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
            <div>
                <FormControl fullWidth sx={{ mt: '2vh', ml: '2vw', maxWidth: '22vw', minWidth: '22vw' }}>
                    <InputLabel id="pur">Purpose</InputLabel>
                    <Select
                        labelId="pur"
                        value={pur}
                        label="Purpose"
                        onChange={handleChangePurpose}
                    >
                        {menuItemsPur?.map((item, index) => (
                            <MenuItem key={index} value={item.id}>{item.purpose}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
            <div>
                <FormControl fullWidth sx={{ mt: '2vh', ml: '2vw', maxWidth: '18vw' }} variant="filled">
                    <InputLabel htmlFor="filled-adornment-amount">Amount</InputLabel>
                    <FilledInput
                        error={isNumeric(costs.amount) ? false : true}
                        id="filled-adornment-amount"
                        value={costs.amount}
                        onChange={handleChangeCost('amount')}
                        startAdornment={<InputAdornment position="start">€</InputAdornment>}
                    />
                </FormControl>
            </div>
            <div id="datePicker">
                <LocalizationProvider dateAdapter={AdapterDateFns} >
                    <DesktopDatePicker
                        label="Date picker"
                        inputFormat="dd/MM/yyyy"
                        value={value}
                        onChange={handleChangeDate}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
            </div>
        </div>
    );
}

export default InputArea;