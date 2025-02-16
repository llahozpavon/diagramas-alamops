import React from 'react';

import Diagrams from './pages/diagrams';
import { Route, Routes } from 'react-router-dom';

const App = () => {
    return (
        <>
            <Routes>
                <Route path="/" index element={<Diagrams />} />
            </Routes>
        </>
    );
};

export default App;
