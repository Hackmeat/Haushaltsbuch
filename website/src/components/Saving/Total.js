//--------------------------------------------------------------------------------------------------------------------
//-------------------------------------Shows total investment and its development-------------------------------------
//--------------------------------------------------------------------------------------------------------------------
//Imports
import React, {
    useState,
    useEffect
} from 'react';
import axios from 'axios';

function Total() {

    //--------------------------------------------------------------------------------------------------------------------
    //Initialization
    var api = 'http://localhost:3000/'


    //--------------------------------------------------------------------------------------------------------------------
    //Get data
    const getSavings = async () => {
        const response = await axios.get(api + 'savings')
        console.log(response.data)
        //get out all the data needed for total and tabscreens
    }


    useEffect(() => {
        getSavings()
    })
    //--------------------------------------------------------------------------------------------------------------------
    //Rendering
    return (
        <></>
    );
}

export default Total;