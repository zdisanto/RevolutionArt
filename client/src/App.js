import React from 'react';
import { BrowserRouter} from 'react-router-dom';

import Header from './components/Header/Header';

const App = () => {
    
    return (
        <div>
            <BrowserRouter>
                <div className="flex relative dark:bg-main-dark-bg">
                    {/* below is Header */}
                    <div>
                        <Header />
                    </div>
                </div>
            </BrowserRouter>
        </div>
        
    );
}

export default App;