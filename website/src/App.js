//--------------------------------------------------------------------------------------------------------------------
//Imports
import './App.css';
import InputArea from './components/Finance/InputArea';
import TableObject from './components/Finance/TableObject';
import Cake from './components/Finance/Cake';
import Diagram from './components/Finance/Diagram';

//--------------------------------------------------------------------------------------------------------------------
//Rendering
function App() {
    return (
        <div id="window">
            <div className="windowObject">
                <TableObject />
            </div>
            <div className="inputWindowObject">
                <InputArea />
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