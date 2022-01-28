import './App.css';
import InputArea from './InputArea';
import TableObject from './TableObject';
import Cake from './Cake';
import Diagram from './Diagram';

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