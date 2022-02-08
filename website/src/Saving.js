//--------------------------------------------------------------------------------------------------------------------
//Imports
import './App.css';
import Nav from './Nav';
import TabScreen from './components/Saving/TabScreen';
import InputArea from './components/Saving/InputArea';
import Total from './components/Saving/Total'

//--------------------------------------------------------------------------------------------------------------------
//Rendering
function Finance() {
    return (
        <>
            <Nav />
            <div id="window">
                <div className="windowObject">
                    <Total />
                </div>
                <div className="windowObject">
                    <InputArea />
                </div>
                <div className="windowObject">
                    <TabScreen />
                </div>
                <div className="windowObject">
                    
                </div>
            </div>
        </>

    );
}

export default Finance;