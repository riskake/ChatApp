import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import Home from './components/Home.jsx';

ReactDOM.render(
    <div className='appContainer'>
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<Home />} />
            </Routes>
        </BrowserRouter>
    </div>, 
    document.getElementById("app")
);