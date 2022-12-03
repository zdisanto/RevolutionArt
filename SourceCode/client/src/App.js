import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Auth from './pages/Auth/Auth';

const App = () => {
    return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/auth" element={<Auth />} />
                </Routes>
            </BrowserRouter>
    );
}

export default App;