import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';

const App = () => {
    return (
        <Container maxWidth="xl">
            <Navbar />
        </Container>
    );
}

export default App;