//--------------------------------------------------------------------------------------------------------------------
//Imports
import './App.css';
import React, { Component } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import Finance from './Finance';
import Saving from './Saving';
import Debts from './Debts'

//--------------------------------------------------------------------------------------------------------------------
//Rendering
class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Routes>
                        <Route path="/" element={<Finance />} exact />
                        <Route path="/Saving" element={<Saving />} />
                        <Route path="/Debts" element={<Debts />} />
                    </Routes>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;