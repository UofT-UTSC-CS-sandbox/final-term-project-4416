import React from 'react';
import './App.css';
import CreateNote from './components/CreateNote';
import Login from './components/Login';
import Signup from './components/Signup';
import MindMap from './components/mindmap/MindMap';
import MindMapList from './components/mindmap/MindMapList'
import FlashCardList from './components/FlashCardList'
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/Note' element={<CreateNote/>}></Route>
        <Route path='/flashcard' element={<FlashCardList />}></Route>
        <Route path='/create-new-mind-map' element={<MindMap />}></Route>
        <Route path='/mind-map-list' element={<MindMapList/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;




