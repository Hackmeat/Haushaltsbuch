import FilledInput from '@mui/material/FilledInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import AdapterDateFns from '@mui/lab/AdapterDateFns';

import './App.css';

import React from 'react';

function InputArea() {

    const [costs, setCosts] = React.useState({
        amount: '',
    });

    const handleChangeCost = (prop) => (event) => {
        setCosts({ ...costs, [prop]: event.target.value });
    };

    function isNumeric(num) {
        return !isNaN(num)
    }

    const [value, setValue] = React.useState(new Date());

    const handleChangeDate = (newValue) => {
        setValue(newValue);
    };

    return (
        <div id="inputFormat">
            <FormControl fullWidth sx={{ mt: '2vh', ml: '2vw', maxWidth: '18vw' }} variant="filled">
                <InputLabel htmlFor="filled-adornment-amount">Amount</InputLabel>
                <FilledInput
                    error={isNumeric(costs.amount) ? false : true}
                    helperText={"Numeric only"}
                    id="filled-adornment-amount"
                    value={costs.amount}
                    onChange={handleChangeCost('amount')}
                    startAdornment={<InputAdornment position="start">€</InputAdornment>}
                />
            </FormControl>
            <div id="datePicker">
                <LocalizationProvider dateAdapter={AdapterDateFns} >
                    <DesktopDatePicker
                        label="Date picker"
                        inputFormat="dd-MM-yyyy"
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