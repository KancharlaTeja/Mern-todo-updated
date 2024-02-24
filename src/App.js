import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Login from './components/login';
import Signup from './components/signup';
import Todo from './todo';

function Sweet() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<Login/>}/>
                <Route path="/signup" element={<Signup />} />
                <Route path="/add-task/:email" element = {<Todo/>}/>
                
            </Routes>
        </BrowserRouter>
    );
}

export default Sweet;
