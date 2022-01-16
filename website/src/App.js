import './App.css';

import Input from './Input';
import TableObject from './TableObject';
import Cake from './Cake';
import Diagram from './Diagram';

function App() {

    return (
        <div id="window">
            <div className="windowObject">
                <TableObject />
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