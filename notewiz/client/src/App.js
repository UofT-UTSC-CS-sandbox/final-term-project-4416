import React from 'react';
import './App.css';
import CreateNote from './components/CreateNote';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FlashCardsView } from './components/FlashCardsView';
import FlashCardList from './components/FlashCardList';
import CreateFlashCard from './components/CreateFlashCard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<CreateNote />} />
        <Route path='/Note' element={<CreateNote />} />
        <Route path="/flashcards" element={<FlashCardsView/>} />
        <Route path="/flashcards-list" element={<FlashCardList/>} />
        <Route path="/create-new-flashcard" element={<CreateFlashCard />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;




