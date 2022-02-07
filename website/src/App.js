//--------------------------------------------------------------------------------------------------------------------
//Imports
import './App.css';
import React, { Component } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import Finance from './Finance';
import Saving from './Saving';

//--------------------------------------------------------------------------------------------------------------------
//Rendering
//Change localhost link - nopt hardcoded
class App extends Component {
    render() {
      return (      
         <BrowserRouter>
          <div>           
              <Routes>
               <Route path="/" element={<Finance />} exact/>
               <Route path="/Saving" element={<Saving />}/>
             </Routes>
          </div> 
        </BrowserRouter>
      );
    }
  }
   
  export default App;