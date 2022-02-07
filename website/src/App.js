//--------------------------------------------------------------------------------------------------------------------
//Imports
import './App.css';
import InputArea from './components/Finance/InputArea';
import TableObject from './components/Finance/TableObject';
import Cake from './components/Finance/Cake';
import Diagram from './components/Finance/Diagram';

//--------------------------------------------------------------------------------------------------------------------
//Rendering
//TODO: Routing
//https://stackoverflow.com/questions/65663582/bar-items-in-recharts-stacked-bar-graph-do-not-render-when-being-returned-throug
//Change localhost link - nopt hardcoded
function App() {
    return (
        <div id="window">
            <div className="windowObject">
                <TableObject />
            </div>
            <div className="windowObject">
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