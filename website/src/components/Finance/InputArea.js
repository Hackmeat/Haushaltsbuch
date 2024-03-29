//--------------------------------------------------------------------------------------------------------------------
//------Place where you add data to your db, category and purpose can be selected, and numeric value can be set-------
//--------------------------------------------------------------------------------------------------------------------
//Imports
import {
    FilledInput,
    InputLabel,
    InputAdornment,
    FormControl,
    TextField,
    MenuItem,
    Select,
    Button
} from '@mui/material';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import axios from 'axios';
import React, {
    useEffect
} from 'react';

function InputArea() {

    //--------------------------------------------------------------------------------------------------------------------
    //Initialization
    const [costs, setCosts] = React.useState({
        amount: '',
    });
    const [date, setDate] = React.useState(new Date());
    const [cat, setCat] = React.useState('');
    const [pur, setPur] = React.useState('');
    const [menuItemsCat, setMenuItemsCat] = React.useState([])
    const [menuItemsPur, setMenuItemsPur] = React.useState([])

    var api = 'http://localhost:3000/'

    const handleChangeCost = (prop) => (event) => {
        setCosts({ ...costs, [prop]: event.target.value });
    };

    const handleChangeDate = (newValue) => {
        setDate(newValue);
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

    //--------------------------------------------------------------------------------------------------------------------
    //Getting all the data
    //All categorys
    function getCategory() {
        axios.get(api + 'categorys')
            .then(response => {
                setMenuItemsCat(response.data)
            });
    }

    //All purposes
    function getPurpose(index) {
        axios.get(api + 'purposes/' + index)
            .then(response => {
                setMenuItemsPur(response.data)
            });
    }

    //--------------------------------------------------------------------------------------------------------------------
    //Send data to the database
    async function sendData() {
        if (pur !== '' && costs.amount !== '') {
            let dd = String(date.getDate()).padStart(2, '0')
            let mm = String(date.getMonth() + 1).padStart(2, '0')
            let yyyy = date.getFullYear()
            let dateFormat = dd + "-" + mm + "-" + yyyy

            const res = await axios.post(api + 'add', {
                "purpose": pur,
                "value": costs.amount,
                "date": dateFormat
            })
        } else {
            console.log("error")
        }
    }

    //--------------------------------------------------------------------------------------------------------------------
    //Get context items
    useEffect(getCategory, [])

    //--------------------------------------------------------------------------------------------------------------------
    //Rendering
    return (
        <div id="inputFormat">
            <div className="inputObject">
                <FormControl fullWidth>
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
            <div className="inputObject">
                <FormControl fullWidth>
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
            <div className="inputObject">
                <FormControl fullWidth variant="filled">
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
            <div className="inputObject">
                <LocalizationProvider dateAdapter={AdapterDateFns} >
                    <DesktopDatePicker
                        id="datePicker"
                        label="Date picker"
                        inputFormat="dd-MM-yyyy"
                        mask="__-__-____"
                        value={date}
                        onChange={handleChangeDate}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
            </div>
            <div className="inputObject">
                <Button variant="outlined" onClick={sendData}>Submit</Button>
            </div>
        </div>
    );
}

export default InputArea;