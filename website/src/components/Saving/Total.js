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
        orderByDate(response.data)
        //get out all the data needed for total and tabscreens
    }

    //Sorting all savings by date
    function orderByDate(json){
        var temp
        for(var i = 0; i < json.length; i++) {
            temp = json[i].date.charAt(0) + "" + json[i].date.charAt(1)
            console.log(temp)
        }
    }


    useEffect(() => {
        getSavings()
    })
    //--------------------------------------------------------------------------------------------------------------------
    //Rendering
    return (
        <>
        
        </>
    );
}

export default Total;