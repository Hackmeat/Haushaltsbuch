import FilledInput from '@mui/material/FilledInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';

import React, { useState, useEffect } from 'react';

function InputArea() {

    const [values, setValues] = React.useState({
        amount: '',
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    function isNumeric(num) {
        return !isNaN(num)
    }

    return (

        <FormControl fullWidth sx={{mt: '2vh', ml: '2vw', mr: '2vw', maxWidth: '23vw' }} variant="filled">
            <InputLabel htmlFor="filled-adornment-amount">Amount</InputLabel>
            <FilledInput
                error={isNumeric(values.amount) ? false : true}
                helperText={"Numeric only"}
                id="filled-adornment-amount"
                value={values.amount}
                onChange={handleChange('amount')}
                startAdornment={<InputAdornment position="start">€</InputAdornment>}
            />
        </FormControl>
    );
}

export default InputArea;