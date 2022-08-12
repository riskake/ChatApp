import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import Home from './components/Home.jsx';
import Login from './components/Login.jsx';

ReactDOM.render(
    <div className='app_container'>
        <BrowserRouter>
            <Routes>
                <Route path={"/home"} element={<Home />} />
                <Route path={"/"} element={<Login />} />
            </Routes>
        </BrowserRouter>
    </div>, 
    document.getElementById("app")
);