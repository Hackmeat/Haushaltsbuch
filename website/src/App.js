import './App.css';

import Box from '@mui/material/Box';

import Input from './Input';
import Table from './Table';
import Cake from './Cake';
import Diagram from './Diagram';

function App() {

    return (
        <div id="window">
            <div className="windowObject">
                <Table />
            </div>
            <div className="windowObject">
                <Input />
            </div>
            <div className="windowObject">
                <Cake />
            </div>
            <div className="windowObject">
                <Diagram />
            </div>
        </div>
    );
}

export default App;