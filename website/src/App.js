import './App.css';

import Box from '@mui/material/Box';

import Input from './Input';
import Table from './Table';
import Cake from './Cake';
import Diagram from './Diagram';

function App() {

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                maxWidth: '100vw',
                maxHeight: '100vh',
                alignItems: 'flex-start'
            }}
        >

            <Box sx={{ bgcolor: '#00ffff', height: '50vh', width: '50vw' }}>
                <Table />
            </Box>

            <Box sx={{ bgcolor: '#00ff00', height: '50vh', width: '50vw', alignSelf: 'flex-start' }}>
                <Input />
            </Box>

            <Box sx={{ bgcolor: '#ff00ff', height: '50vh', width: '50vw' }}>
                <Cake />
            </Box>

            <Box sx={{ bgcolor: '#ff0000', height: '50vh', width: '50vw' }}>
                <Diagram />
            </Box>
        </Box>
    );
}

export default App;