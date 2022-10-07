import React from 'react';
import {Typography, Divider} from '@material-ui/core';

const App = () => {
    return (
        <div>
            <Typography variant="body1"><strong>Navbar</strong></Typography>
            <Divider style={{ margin: '20px 0' }} />
            <Typography variant="body1"><strong>Carousel</strong></Typography>
            <Divider style={{ margin: '20px 0' }} />
            <Typography variant="body1"><strong>Shop by catergory</strong></Typography>
            <Divider style={{ margin: '20px 0' }} />
            <Typography variant="body1"><strong>New Arrival</strong></Typography>
            <Divider style={{ margin: '20px 0' }} />
            <Typography variant="body1"><strong>Discover</strong></Typography>
            <Divider style={{ margin: '20px 0' }} />
            <Typography variant="body1"><strong>Other</strong></Typography>
        </div>
    );
}

export default App;