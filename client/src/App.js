import React from 'react';
import { BrowserRouter} from 'react-router-dom';

import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';

const App = () => {
    
    return (
        <div>
            <BrowserRouter>
                <div className="flex relative dark:bg-main-dark-bg">
                    {/* below is Header */}
                    <div>
                        <Header />
                    </div>
                    {/* below is main page */}
                        <Sidebar/>
                    {/* below is footer */}
                    <div className="mt-24">
                        <p className="dark:text-gray-200 text-gray-700 text-center m-20">
                            © 2022 All rights reserved by RevolutionArt.com
                        </p>
                    </div>
                </div>
            </BrowserRouter>
        </div>
        
    );
}

export default App;