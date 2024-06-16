import React from 'react';
import './App.css';
import CreateNote from './components/CreateNote';
import Login from './components/Login';
import Signup from './components/Signup';
import NoteBrowser from './components/NoteBrowser';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/Note/:noteid' element={<CreateNote/>}></Route>
        <Route path='/browser' element={<NoteBrowser/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;




